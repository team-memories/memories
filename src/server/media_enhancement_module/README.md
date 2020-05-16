# 미디어 품질 향상 모듈 (Media Quality Enhancement Module)

마이크로 서비스 관점에서 메인 GraphQL API 서버에서 분리하여 독립적으로 구현하였다.
단, 메인 GraphQL API 서버와의 미디어 파일 전송하는 데 걸리는 시간을 없애기 위해 둘 간의 공유 디스크를 하나 사용한다.
공유 디스크를 /media_data 에 마운트하며, 만약 1234_seoul.png 라는 파일을 받는다면,
메인 GraphQL API 서버는 /media_data/1234_seoul.png 에 파일을 저장하고 DB에 미디어 정보를 생성하며(isProcessing==true)
파일의 이름과 media 의 id를 미디어 품질 향상 모듈에 함께 전달한다.
미디어 품질향상 모듈은 해당 파일을 가공하며 나오는 부산물/결과물들을 해당 파일의 이름 뒤에 _enhanced 가 붙은 폴더 안에 저장한다.
eg.) /media_data/1234_seoul.png => image_preprocess 과정에서 파일을 /media_data/1234_seoul.png_enhanced/color_input/1234_seoul.png 로 복사한다.
그런 뒤, image_colorization 과정의 결과물이 /media_data/1234_seoul.png_enhanced/SR_input/1234_seoul.png 로 저장된다.
마지막으로 image_super_resolution 과정의 결과물이 /media_data/1234_seoul.png_enhanced/SR_output/1234_seoul.png 로 저장된다.

변환 과정이 끝나면 원본 파일과 최종 결과물을 AWS S3로 업로드하고 thumbnailUrl 과 originalUrl, convertedUrl 등을 media ID를 활용해 DB에 업데이트한다. 
 