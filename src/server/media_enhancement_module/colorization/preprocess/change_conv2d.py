# -*- coding: utf-8 -*-
# pretrained model parameter에서 slim.conv2d의 variable들을 tf.layers.conv2d로 바꿔줌.
old_check_file = "ckpt_woflow/model.ckpt" #기존 파일이름
new_check_file = "ckpt_woflow/model_renamed.ckpt" # 저장할 새로운 파일이름
import tensorflow as tf
tf.compat.v1.disable_eager_execution()
vars_to_rename = {
    "individual/g_conv1_1/weights": "individual/g_conv1_1/kernel",
    "individual/g_conv1_1/biases": "individual/g_conv1_1/bias",
    "individual/g_conv1_2/weights": "individual/g_conv1_2/kernel",
    "individual/g_conv1_2/biases": "individual/g_conv1_2/bias",
    "individual/g_conv2_1/weights": "individual/g_conv2_1/kernel",
    "individual/g_conv2_1/biases": "individual/g_conv2_1/bias",
    "individual/g_conv2_2/weights": "individual/g_conv2_2/kernel",
    "individual/g_conv2_2/biases": "individual/g_conv2_2/bias",
    "individual/g_conv3_1/weights": "individual/g_conv3_1/kernel",
    "individual/g_conv3_1/biases": "individual/g_conv3_1/bias",
    "individual/g_conv3_2/weights": "individual/g_conv3_2/kernel",
    "individual/g_conv3_2/biases": "individual/g_conv3_2/bias",
    "individual/g_conv4_1/weights": "individual/g_conv4_1/kernel",
    "individual/g_conv4_1/biases": "individual/g_conv4_1/bias",
    "individual/g_conv4_2/weights": "individual/g_conv4_2/kernel",
    "individual/g_conv4_2/biases": "individual/g_conv4_2/bias",
    "individual/g_conv5_1/weights": "individual/g_conv5_1/kernel",
    "individual/g_conv5_1/biases": "individual/g_conv5_1/bias",
    "individual/g_conv5_2/weights": "individual/g_conv5_2/kernel",
    "individual/g_conv5_2/biases": "individual/g_conv5_2/bias",
    "individual/g_conv6_1/weights": "individual/g_conv6_1/kernel",
    "individual/g_conv6_1/biases": "individual/g_conv6_1/bias",
    "individual/g_conv6_2/weights": "individual/g_conv6_2/kernel",
    "individual/g_conv6_2/biases": "individual/g_conv6_2/bias",
    "individual/g_conv7_1/weights": "individual/g_conv7_1/kernel",
    "individual/g_conv7_1/biases": "individual/g_conv7_1/bias",
    "individual/g_conv7_2/weights": "individual/g_conv7_2/kernel",
    "individual/g_conv7_2/biases": "individual/g_conv7_2/bias",
    "individual/g_conv8_1/weights": "individual/g_conv8_1/kernel",
    "individual/g_conv8_1/biases": "individual/g_conv8_1/bias",
    "individual/g_conv8_2/weights": "individual/g_conv8_2/kernel",
    "individual/g_conv8_2/biases": "individual/g_conv8_2/bias",
    "individual/g_conv9_1/weights": "individual/g_conv9_1/kernel",
    "individual/g_conv9_1/biases": "individual/g_conv9_1/bias",
    "individual/g_conv9_2/weights": "individual/g_conv9_2/kernel",
    "individual/g_conv9_2/biases": "individual/g_conv9_2/bias",
    "individual/g_up_1/up_conv1/weights": "individual/g_up_1/up_conv1/kernel",
    "individual/g_up_1/up_conv1/biases": "individual/g_up_1/up_conv1/bias",
    "individual/g_up_2/up_conv1/weights": "individual/g_up_2/up_conv1/kernel",
    "individual/g_up_2/up_conv1/biases": "individual/g_up_2/up_conv1/bias",
    "individual/g_up_3/up_conv1/weights": "individual/g_up_3/up_conv1/kernel",
    "individual/g_up_3/up_conv1/biases": "individual/g_up_3/up_conv1/bias",
    "individual/g_up_4/up_conv1/weights": "individual/g_up_4/up_conv1/kernel",
    "individual/g_up_4/up_conv1/biases": "individual/g_up_4/up_conv1/bias"
}


new_checkpoint_vars = {}
reader = tf.compat.v1.train.NewCheckpointReader(old_check_file)

for old_name in reader.get_variable_to_shape_map():
    if old_name in vars_to_rename:
        new_name = vars_to_rename[old_name]
    else:
        new_name = old_name
    new_checkpoint_vars[new_name] = tf.Variable(reader.get_tensor(old_name))

init = tf.compat.v1.global_variables_initializer()
saver = tf.compat.v1.train.Saver(new_checkpoint_vars)

with tf.compat.v1.Session() as sess:
    sess.run(init)
    saver.save(sess, new_check_file)  
