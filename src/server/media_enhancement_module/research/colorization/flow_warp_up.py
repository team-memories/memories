# +
import tensorflow as tf

tf.compat.v1.disable_eager_execution()
# -

_flow_warp_ops = tf.load_op_library(
    tf.compat.v1.resource_loader.get_path_to_datafile("./lib/flow_warp.so"))


def flow_warp(image, flow):
    return _flow_warp_ops.flow_warp(image, flow)


@tf.RegisterGradient("FlowWarp")
def _flow_warp_grad(flow_warp_op, gradients):
    return _flow_warp_ops.flow_warp_grad(flow_warp_op.inputs[0],
                                         flow_warp_op.inputs[1],
                                         gradients)
