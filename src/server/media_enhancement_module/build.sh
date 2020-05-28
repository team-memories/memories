#!/usr/bin/env bash
TAG=b0.2 && \
docker build . -t media_quality_enhancement_service:${TAG} && \
cd image_colorization_module && \
docker build . -t image_colorization_service:${TAG} && \
cd - && \
cd image_super_resolution_module && \
docker build . -t image_super_resolution_service:${TAG} && \
cd - && \
cd video_preprocessing_module && \
docker build . -t video_preprocessing_service:${TAG} && \
cd - && \
cd video_colorization_module && \
docker build . -t video_colorization_service:${TAG} && \
cd - && \
cd video_super_resolution_and_frame_interpolation_module && \
docker build . -t vsr_vfi_service:${TAG}
