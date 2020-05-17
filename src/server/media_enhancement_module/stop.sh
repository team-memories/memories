#!/usr/bin/env bash
docker stop media_quality_enhancement_service
docker stop image_super_resolution_service
docker stop video_preprocessing_service
docker stop video_colorization_service
docker stop vsr_vfi_service
