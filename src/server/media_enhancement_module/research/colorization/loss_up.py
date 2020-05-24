#tensorflow 1.2.0 is needed
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import os,time,cv2,scipy.io
import tensorflow as tf
import utils_up as utils

def smoothL1_loss(x, y, sigma=0.05):
    x_y = tf.abs(x - y)
    less_mask = tf.less(x_y, sigma)
    greater_mask = tf.greater_equal(x_y, sigma)
    loss = 0.5*tf.reduce_mean(input_tensor=tf.square(tf.boolean_mask(tensor=x_y, mask=less_mask))) + sigma*tf.reduce_mean(input_tensor=tf.boolean_mask(tensor=x_y-0.5*sigma, mask=greater_mask))
    return loss

def compute_error(real,fake):
    return tf.reduce_mean(input_tensor=tf.abs(fake-real))

def Lp_loss(x, y):
    vgg_real = utils.build_vgg19(x*255.0)
    vgg_fake = utils.build_vgg19(y*255.0,reuse=True) 
    p0=compute_error(vgg_real['input']/255.0,vgg_fake['input']/255.0)
    p1=compute_error(vgg_real['conv1_2']/255.0,vgg_fake['conv1_2']/255.0)/2.6
    p2=compute_error(vgg_real['conv2_2']/255.0,vgg_fake['conv2_2']/255.0)/4.8
    p3=compute_error(vgg_real['conv3_2']/255.0,vgg_fake['conv3_2']/255.0)/3.7
    p4=compute_error(vgg_real['conv4_2']/255.,vgg_fake['conv4_2']/255.)/5.6
    p5=compute_error(vgg_real['conv5_2']/255.,vgg_fake['conv5_2']/255.)*10/1.5
    return p0+p1+p2+p3+p4+p5

def RankDiverse_loss(x, y, num):
    loss = []
    for i in range(num):
        loss.append(Lp_loss(x[:,:,:,3*i:3*i+3], y[:,:,:,3*i:3*i+3]))
    return tf.reduce_min(input_tensor=loss) + tf.reduce_sum(input_tensor=[0.01*pow(2, num-i)*loss[i] for i in range(num)]) 

def L1_loss(x, y):
    return tf.reduce_mean(input_tensor=tf.abs(x-y)) 

def KNN_loss(out,  KNN_idxs):
    out = tf.reshape(out, [-1,3])
    loss = []
    for i in range(KNN_idxs.get_shape()[-1]):
        loss.append(L1_loss(out, tf.gather_nd(out, KNN_idxs[:,i:i+1]))) 
    return tf.reduce_mean(input_tensor=loss)
