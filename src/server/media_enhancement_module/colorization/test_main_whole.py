# -*- coding: utf-8 -*-
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import os,time,cv2,scipy.io
import tensorflow as tf
import numpy as np
import utils_up as utils
import myflowlib_up as flowlib
import tensorflow_addons as tfa
import scipy.misc as sic
import subprocess
import network_up as net
import loss_up as loss
import argparse
tf.compat.v1.disable_eager_execution()

parser = argparse.ArgumentParser()
parser.add_argument("--model", default='Result_whole', type=str, help="Model Checkpoint path")
parser.add_argument("--test-dir", default='./data/color_input', type=str, help="Test dir path")
parser.add_argument("--is-image", action='store_true', default=False,  
                    help="Whether test is image or not / defualt=False, That is, Test is video ")
parser.add_argument("--use-gpu", action='store_false', default=True, help='Whether use or not /default=True')
parser.add_argument("--flow-root-dir", default='./data', type=str, help='root path of flow dir ')
ARGS = parser.parse_args()
print(ARGS)

model=ARGS.model
div_num= 4
test_dir = ARGS.test_dir
is_image = ARGS.is_image
flow_root_dir = ARGS.flow_root_dir
num_frame = 2 # number of read in frames


# 남은 gpu 메모리중 가장 큰 메모리의 gpu를 사용한다.
if ARGS.use_gpu:
    os.environ["CUDA_VISIBLE_DEVICES"]=str(np.argmax( [int(x.split()[2]) 
    for x in subprocess.Popen("nvidia-smi -q -d Memory | grep -A4 GPU | grep Free", shell=True, stdout=subprocess.PIPE).stdout.readlines()]))


def occlusion_mask(im0, im1, flow10):
#     warp_im0 = flow_warp_op(im0, flow10)
    warp_im0 = tfa.image.dense_image_warp(im0, flow10, name='occlusion_warp')
    # im0의 channel이 무조건 3이라는 가정하에
    warp_im0.set_shape([None, None, None, 3])
    diff = tf.abs(im1 - warp_im0)
    mask = tf.reduce_max(input_tensor=diff, axis=3, keepdims=True)
    mask = tf.less(mask, 0.05)
    mask = tf.cast(mask, tf.float32)
    mask = tf.tile(mask, [1,1,1,3])
    return mask, warp_im0


# frame 1개 pair 만들기
def prepare_input_w_flow(path, num_frames,gray=False):
    filename = os.path.basename(path)
    input_image_src, _ = utils.read_image_sequence(path, num_frames=num_frame)

    if not gray:
        input_flow_forward, input_flow_backward = \
        utils.read_flow_sequence(os.path.join(flow_root_dir,"FLOWImages", filename), num_frames=num_frame)
    else:
        input_flow_forward, input_flow_backward = \
        utils.read_flow_sequence(os.path.join(flow_root_dir,"FLOWImages_GRAY", filename), num_frames=num_frame)

    h=input_image_src.shape[0]//32*32
    w=input_image_src.shape[1]//32*32
    if input_flow_forward is None:
        return None, None, None
    return np.float32(np.expand_dims(input_image_src[:h,:w,:],axis=0)),\
        np.expand_dims(input_flow_forward[:h,:w,:],axis=0)/2.0,\
        np.expand_dims(input_flow_backward[:h,:w,:],axis=0)/2.0


config=tf.compat.v1.ConfigProto()
config.gpu_options.allow_growth=True
sess=tf.compat.v1.Session(config=config)


input_i=tf.compat.v1.placeholder(tf.float32,shape=[None,None,None,1*num_frame])
input_flow_forward=tf.compat.v1.placeholder(tf.float32,shape=[None,None,None,2*(num_frame-1)])
input_flow_backward=tf.compat.v1.placeholder(tf.float32,shape=[None,None,None,2*(num_frame-1)])


gray_flow_forward=tf.compat.v1.placeholder(tf.float32,shape=[None,None,None,2*(num_frame-1)])
gray_flow_backward=tf.compat.v1.placeholder(tf.float32,shape=[None,None,None,2*(num_frame-1)])
c0=tf.compat.v1.placeholder(tf.float32,shape=[None,None,None,3])
c1=tf.compat.v1.placeholder(tf.float32,shape=[None,None,None,3])



#   X0, X1: Gray frames
#   C0, C1: Colorized frames
with tf.compat.v1.variable_scope(tf.compat.v1.get_variable_scope()):
    X0, X1 = input_i[:,:,:,0:1], input_i[:,:,:,1:2]

    # colorization network 구축
    with tf.compat.v1.variable_scope('individual'):
        C0=net.VCN(utils.build(tf.tile(X0, [1,1,1,3])),reuse=False, div_num=4)
        C1=net.VCN(utils.build(tf.tile(X1, [1,1,1,3])),reuse=True, div_num=4)        


    #-------------RefineNet---------------#
    cmap_C, warp_C0 = occlusion_mask(c0, c1, gray_flow_backward[:,:,:,0:2])
    cmap_X, warp_X0 = occlusion_mask(tf.tile(input_i[:,:,:,0:1], [1,1,1,3]), tf.tile(input_i[:,:,:,1:2],[1,1,1,3]),gray_flow_backward[:,:,:,0:2])
    low_conf_mask = tf.cast(tf.greater(cmap_X - cmap_C, 0), tf.float32)
    
    coarse_C1 = c1*(-low_conf_mask+1) + tf.tile(input_i[:,:,:,1:2],[1,1,1,3])*low_conf_mask
    ref_input = tf.concat([coarse_C1, warp_C0, c1, low_conf_mask, cmap_C, cmap_X], axis=3)
    # ref_input = tf.concat([warp_C0, c1, cmap_C, cmap_X, low_conf_mask], axis=3)
    
    final_r1 = net.VCRN(ref_input)



# +
# print([var for var in tf.compat.v1.trainable_variables() if var.name.startswith('VCRN')])
# -

saver=tf.compat.v1.train.Saver(max_to_keep=1000)
sess.run([tf.compat.v1.global_variables_initializer()])

var_restore = [v for v in tf.compat.v1.trainable_variables()]
saver_restore=tf.compat.v1.train.Saver(var_restore)
ckpt=tf.train.get_checkpoint_state(model)
print("contain checkpoint: ", ckpt)
print('loaded '+ ckpt.model_checkpoint_path)
saver_restore.restore(sess,ckpt.model_checkpoint_path)


test_low=utils.get_names(test_dir)
numtest=len(test_low)
print(test_low[0])
out_folder = test_dir.split('/')[-1]
outputs= [None]*4

if is_image:
    for ind in range(numtest):
        # Read Image
        im=np.float32(scipy.misc.imread(test_low[ind], 'L'))/255.0

        # image crop (32배로)
        h=im.shape[0]//32*32
        w=im.shape[1]//32*32
        im=im[np.newaxis,:h,:w,np.newaxis]

        st=time.time()

        # colorization C0
        C0_im=sess.run(C0,feed_dict={input_i:np.concatenate((im,im),axis=3)})
        print("test time for %s --> %.3f"%(ind, time.time()-st))
        h,w = C0_im.shape[1:3]
        if not os.path.isdir("%s/%s" % (model, out_folder)):
            os.makedirs("%s/%s/predictions0" % (model, out_folder))
            os.makedirs("%s/%s/predictions1" % (model, out_folder))
            os.makedirs("%s/%s/predictions2" % (model, out_folder))
            os.makedirs("%s/%s/predictions3" % (model, out_folder))

        for ref_i in range(4):
            sic.imsave("%s/%s/predictions%d/final_%06d.jpg"%(model, out_folder, ref_i, ind),np.uint8(np.maximum(np.minimum(C0_im[0,:,:,ref_i*3:ref_i*3+3] * 255.0,255.0),0.0)))
            
        
else:
    for ind in range(numtest-1):
        input_image_src, input_flow_forward_src, input_flow_backward_src = prepare_input_w_flow(test_low[ind],num_frames=num_frame,gray=True)
        if input_image_src is None or input_flow_forward_src is None or input_flow_backward_src is None:
            print("Not able to read the images/flows.")
            continue
        st=time.time()

        C0_im, C1_im=sess.run([C0, C1],feed_dict={input_i:input_image_src,
            input_flow_backward:input_flow_backward_src
            })
        print("test time for %s --> %.3f"%(ind, time.time()-st))
        h,w = C0_im.shape[1:3]
        if not os.path.isdir("%s/%s" % (model, out_folder)):
            os.makedirs("%s/%s/predictions0" % (model, out_folder))
            os.makedirs("%s/%s/predictions1" % (model, out_folder))
            os.makedirs("%s/%s/predictions2" % (model, out_folder))
            os.makedirs("%s/%s/predictions3" % (model, out_folder))

        # refine network
        # 처음프레임에는 두장의 이미지 넣어주고, 그 뒤로는 예측한 output과 그 다음 프레임을 넣어줘서 다음 프레임을 정제함.
        if ind == 0:
            for ref_i in range(4):
                output= sess.run(final_r1,feed_dict={c0:C0_im[:,:,:,ref_i*3:ref_i*3+3], c1:C1_im[:,:,:,ref_i*3:ref_i*3+3], \
                        input_i:input_image_src,\
                        gray_flow_backward:input_flow_backward_src, input_flow_backward:input_flow_backward_src})
                outputs[ref_i] = output
                sic.imsave("%s/%s/predictions%d/final_%06d.jpg"%(model, out_folder, ref_i, ind),np.uint8(np.maximum(np.minimum(C0_im[0,:,:,ref_i*3:ref_i*3+3] * 255.0,255.0),0.0)))
                sic.imsave("%s/%s/predictions%d/final_%06d.jpg"%(model, out_folder, ref_i, ind+1),np.uint8(np.maximum(np.minimum(output[0,:,:,:] * 255.0,255.0),0.0)))

        else:
            for ref_i in range(4):
                output = sess.run(final_r1,feed_dict={c0:outputs[ref_i], c1:C1_im[:,:,:,:3], \
                        input_i:input_image_src, \
                        gray_flow_backward:input_flow_backward_src, input_flow_backward:input_flow_backward_src})
                outputs.append(output[0,:,:,:])
                sic.imsave("%s/%s/predictions%d/final_%06d.jpg"%(model, out_folder, ref_i, ind+1),np.uint8(np.maximum(np.minimum(output[0,:,:,:] * 255.0,255.0),0.0)))
