## 공연 목록 뷰어 - CSR

다음 주에 전국에서 열리는 축제와 서울에서 열리는 미술 전시회 및 클래식공연들에 대한 정보를 목록화하여 확인할 수 있는 웹 어플리케이션입니다.
카테고리별로 구분하여 볼 수 있고, 무한 스크롤 방식으로 데이터를 호출하여 불필요한 데이터 호출을 최소화 하였습니다.
특정한 조건에 적합한 전시/공연 정보를 사용자에게 노출하는 기능을 가진 애플리케이션이기 때문에 API를 통해서 정보를 받아오고, 별도의 DB를 구성하지 않았습니다.
Next.js를 선택한 이유는 작고 구체적인 목표를 가진 애플리케이션이므로, 프론트와 백엔드를 JavaScript라는 하나의 언어로 빠르게 구현할 수 있고 프론트만 존재할 경우, CORS 문제로 API를 원활히 받아오기 어려울 것이라 생각해 CORS 문제를 프록시를 통해 우회할 수 있는 Next.js를 선택했습니다.

또한 SSR(Server Side Rendering)과 CSR(Clinet Side Rendering)의 구현과정에서의 차이를 경험해보기 위해 Next.js 에서 지원하는 CSR과 SSR 양쪽 모두 구현해보았으며, 무한 스크롤이나 DB가 필요하지 않다는 점등이 서버 측의 기능이 크게 중요하지 않다고 판단하여 CSR로 구현한 버전만 AWS에 배포하였습니다.

## 개발 환경

- Next.js (CSR)
- IDE - Visual Studio Code

## AWS 배포 주소

추가 예정

## Screen Shot

![image](https://github.com/sungwoon129/concert-viewer-CSR-/assets/43958570/eda0f446-48b5-4552-84b6-64c211eaa205)
