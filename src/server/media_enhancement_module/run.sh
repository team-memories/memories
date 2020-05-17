#!/usr/bin/env bash
TAG=b0.1 && \
MEDIA_DATA=~/media_data/ && \
docker run --rm --name media_quality_enhancement_service -p 4001:4001 -v ${TAG}:/media_data/ media_quality_enhancement_service:${TAG}
docker run --rm --name image_super_resolution_service -p 4103:4103 -v ${TAG}:/media_data/ image_super_resolution_service:${TAG}
docker run --rm --name video_preprocessing_service -p 4201:4201 -v ${TAG}:/media_data/ video_preprocessing_service:${TAG}
docker run --rm --name video_colorization_service -p 4202:4202 -v ${TAG}:/media_data/ video_colorization_service:${TAG}
docker run --rm --name vsr_vfi_service -p 4203:4203 -v ${TAG}:/media_data/ vsr_vfi_service:${TAG}
