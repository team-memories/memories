# 기술 설명
백엔드 서버는 크게 세가지로 나누어진다. 1) GraphQL API Server와  2) PostgreSQL을 사용하는 Database, 3) 품질 향상 서비스이다. GraphQL API Server는 Public하게 노출되며 Client와의 통신을 담당한다. Apollo Server와 Express.js 등 JavaScript 기술들로 만들어져있으며 품질 향상을 제외한 모든 비즈니스 로직을 담당한다. 품질 향상 서비스는 여러 가지 기술을 사용하여 미디어의 품질을 개선한다. 이미지면 Colorization, Super Resolution을 거치게 되고, 비디오면 Colorization, Super Resolution, Video Interpolation을 거치게 된다. 각각의 기술들은 요구하는 Dependency가 다르다. 이러한 Dependency 문제를 해결하기 위해 여러 기술이 같은 Dependency를 갖게 코드를 수정하기보다, 독립적으로 개발할 수 있도록 Containerization 기술인 Docker를 사용하여 각각의 기술들을 도커 이미지로 만들어서 사용하는 방식을 택하였다. 각각의 기술들을 Flask를 사용하여 독립적인 REST API 서버로서 구현하였고, 도커 이미지로 빌드되어 컨테이너로써 사용되게 된다. 단, 각각의 기술들 간에서 미디어를 주고받는 일은 피하고자 서로 공유된 디스크를 하나 사용할 수 있게 만들었다.

현재 서버에는 메인 API 서버, PostgreSQL, Image Colorization, Image Super Resolution, Video Colorization, Video Super Resolution + Video Frame Interpolation, Preprocessing 총 7개의 컨테이너를 사용 중이다. 이러한 컨테이너들을 오케스트레이션(Orchestration)하고 코드의 수정 사항을 반영하여 도커 컨테이너를 다시 띄우는 작업들을 쉽게 하려고 Kubernetes를 도입하였다. Terraform을 이용하여 전체적인 인프라를 코드로 관리하게끔 하였으며 Kubernetes 클러스터는 AWS에서 자체적으로 관리해주는 Kubernetes 서비스는 AWS EKS를 사용한다. 클라이언트로부터 요청이 들어오면 먼저 Amazon Elastic Load Balancing(ELB)가 요청을 받아서 GraphQL API Server가 돌아가고 있는 적절한 Amazon EC2 인스턴스에 할당한다. 모든 EC2 인스턴스는 AWS의 Kubernetes Service인 EKS에서 돌아간다. EKS의 EC2 인스턴스 개수는 서비스 사용량에 따라 동적으로 조정되며, 한쪽 Zone에 문제가 발생해도 서비스의 동작에는 문제가 일어나지 않도록 두 개의 Availability Zone을 운영한다. 사용자가 추억이 담긴 미디어를 업로드하려 한다면 GraphQL API Server가 미디어 파일을 받은 다음 일단 Database에 미디어를 등록하고 품질 향상이 필요하다는 정보를 남기고 품질 향상 서비스에게 품질 향상을 요청한다. 미디어 파일이 담겨있는 Volume을 전체 서비스에 걸쳐 공유하여 미디어 파일을 전송하지 않아도 된다. 품질 향상 서비스는 여러 가지 기술을 사용하여 미디어의 품질을 개선한다. 이미지면 Colorization, Super Resolution을 거치게 되고, 비디오면 Colorization, Super Resolution, Video Interpolation을 거치게 된다. 품질 향상이 완료되어 GraphQL API Server가 품질 향상 서비스로부터 Asynchronous하게 Response를 받게 되면 Callback 함수를 호출하여 원본 미디어 파일와 품질 향상된 미디어 파일을 Amazon S3에 업로드하고 URL을 받아 Database에 업데이트한다.

- Docker: Containerization module.
- FFMPEG: 영상 작업할 때 쓰이는 라이브러리 (소리 분리나, 영상 합성,FPS 추출 등)
- Kubernetes: 컨테이너들을 오케스트레이션(Orchestration)하고 코드의 수정
사항을 반영하여 도커 컨테이너를 다시 띄우는 작업들을 쉽게 하기 위해 사용
- Terraform: 코드로 인프라를 관리하기 위해 사용
- Amazon EKS: AWS에서 관리해주는 Kubernetes 서비스
- Amazon S3: 미디어 파일들을 저장하기 위해 사용
- Amazon EC2: 쿠버네티스 클러스터안에서 동작되는 Node로서 사용
- AWS Route 53: DNS
- AWS ELB(Elastic Load Balancing): AWS EC2 Instance의 부하를 확인하여
적절한 Instance로 요청을 할당.
- AWS Auto scale: 서비스의 사용량에 따라 동적으로 EC2 인스턴스 개수를 조절
- Node.js: 서버의 JavaScript 기술 스택을 돌릴 JavaScript 런타임 환경
- Apollo Server: GraphQL 서버를 만들기 위해 사용
- Express.js: Apollo Server와 integration되어 GraphQL spec으로 API 서버를
구성하는 역할
- PyTorch: 모델을 연구/개발, 훈련시키고, Inference 하는데 사용된다
- Tensorflow: 모델을 연구/개발, 훈련시키고, Inference 하는데 사용된다
- DeOldify: Colorization에 사용
- ISR(Image Super Resolution) : Image Super Resolution 라이브러리
- Zooming slow-mo: Video Super Resolution + Video Frame Interpolation 에 사용
