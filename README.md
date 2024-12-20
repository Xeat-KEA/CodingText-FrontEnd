# 👨‍💻 코딩테스트 블로그 서비스 CodingText

![image](https://github.com/user-attachments/assets/3c7b0591-87bd-476a-aac6-6c9ac1d0d059)
![image](https://github.com/user-attachments/assets/9e3dea35-3c08-47fe-94c1-e7f6982c6ed7)

- 배포 URL :   [CodingText.com](http://172.16.211.54/)

<br>

## 프로젝트 소개

- CodingText는 코딩테스트에 참여하고 이를 바탕으로 게시글을 작성할 수 있는, 코딩테스트 블로그 서비스 입니다.
- **문제 풀이 기록과 블로그 통합**: 문제 풀이 과정과 학습 내용을 기록하고, 관련 게시글을 쉽게 확인할 수 있습니다.
- **AI 기반 문제 생성**: OpenAI API를 통해 난이도, 알고리즘 유형 등 사용자 맞춤형 문제를 생성합니다.
- **검색 및 필터 기능**: 다양한 필터와 대화형 AI를 활용하여 필요한 문제와 정보를 효율적으로 탐색할 수 있습니다.
- **종합 도구 제공**: 문제 풀이를 위한 코드 에디터, 컴파일러, 메모장 등 학습에 필요한 도구를 한 페이지에서 제공합니다.
- **문제 기여 기능**: 생성한 AI 문제를 정식 등록 건의를 통해 플랫폼에 기여할 수 있습니다.

<br>

## 팀원 구성

<div align="center">
| **윤장호** | **김규리** | **김민서** | **박재학** | **최효성** | **이규동** | **박정재** | **이동석** |
| :------: |  :------: | :------: | :------: | :------: |  :------: | :------: | :------: |
| [<img width="184" src="https://github.com/user-attachments/assets/ac79c0fe-ba46-4151-9c15-ce57dd728e0e"> <br/> @seorang42](https://github.com/seorang42) | [<img width="196" alt="image" src="https://github.com/user-attachments/assets/77e141e9-0107-4832-9165-f5769eb3f929"> <br/> @lamiiiii](https://github.com/lamiiiii) | [<img width="169" alt="image" src="https://github.com/user-attachments/assets/c460e508-0d27-4363-826d-b4717e03db11" /> <br/> @hurrayPersimmon](https://github.com/hurrayPersimmon) | [<img width="146" alt="image" src="https://github.com/user-attachments/assets/f6de1872-d90b-4c26-8e5f-82a7bb2ef809" /> <br/> @parkjaehak
](https://github.com/parkjaehak) | [<img width="178" alt="image" src="https://github.com/user-attachments/assets/aa05746b-7037-4a7b-a92c-ed6727821855" /> <br/> @hyoseong-Choi](https://github.com/hyoseong-Choi) | [<img width="165" alt="image" src="https://github.com/user-attachments/assets/ca8db8cc-ecc0-44e2-b357-064f3dca67e2" /> <br/> @starboxxxx](https://github.com/starboxxxx) | [<img width="176" alt="image" src="https://github.com/user-attachments/assets/ad3857c3-cb2c-4b66-9305-b2f981d45334" /> <br/> @j-ash0224](https://github.com/j-ash0224) | [<img width="158" alt="image" src="https://github.com/user-attachments/assets/68ab5587-8f4e-4c94-a22b-393a3a33650d" /> <br/> @DaveLee-b](https://github.com/DaveLee-b) |

</div>

<br>

## 1. 개발 환경
- Frontend : Next.js, React, TypeScript
- Backend : Java, Spring
- Infrastructure : Xen Orchestra,Docker, AWS
- Database : Redis, Elasticsearch, Amazon RDS, MySQL
- CI/CD : Github, Jenkins
- 협업 툴 : Notion, Jira, Github, Slack
- 서비스 배포 환경: On-premises, Spring Cloud
- 디자인 : [Figma](https://www.figma.com/ko-kr/)

<br>

## 2. 채택한 개발 기술과 브랜치 전략

### Next.js
- SEO 최적화와 성능 향상이 중요한 요구사항이었기 때문에, **Next.js**를 선택했습니다.
- Next.js는 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 기본적으로 지원하여, 검색 엔진 최적화(SEO)와 빠른 로딩 속도를 동시에 만족시킬 수 있었습니다.
- 또한, 페이지 기반 라우팅, API 라우트 지원 등 생산성을 높이는 다양한 기능을 제공하여 개발 시간을 단축시킬 수 있었습니다.

### React
- UI 구축의 효율성과 코드의 재사용성을 고려하여 **React**를 선택했습니다.
- React는 컴포넌트 기반의 설계를 통해 복잡한 사용자 인터페이스를 쉽게 관리할 수 있도록 도와줍니다.
- 또한, React의 가상 DOM을 활용해 성능을 최적화할 수 있어 사용자 경험을 향상시키는 데 큰 도움이 되었습니다.

### TypeScript 
- 프로젝트의 규모와 복잡성을 고려해 **TypeScript**를 채택했습니다.
- TypeScript는 정적 타입을 지원하여 코드의 안정성을 높이고, 런타임 오류를 사전에 방지할 수 있습니다.
- 이를 통해 코드 품질을 향상시키고, 개발 중 발생할 수 있는 버그를 미리 예방할 수 있어 장기적으로 유지보수에 유리한 환경을 마련할 수 있었습니다.

### 브랜치 전략
브랜치 전략은 **Git Flow**를 기반으로 설정하여, 각 브랜치가 명확한 역할을 갖도록 했습니다. 이 전략은 협업 시 효율적인 작업 분담과 코드 통합을 가능하게 했습니다

- **main**: 배포 환경에 최적화된 안정적인 코드만을 관리하기 위해 main 브랜치를 배포 단계에서만 사용했습니다.
- **develop**: develop 브랜치는 개발 단계에서 Git Flow의 master 역할을 하며, 모든 기능이 통합되는 주요 브랜치로 설정했습니다. 기능 개발이 완료되면 각 feature 브랜치에서 develop 브랜치로 병합하여 전체 프로젝트의 통합 상태를 관리했습니다.
- **feature**: 각 기능 단위로 독립적인 개발을 진행하기 위해 feature 브랜치를 사용했습니다. 이를 통해 다른 기능 개발에 영향을 미치지 않고 독립적으로 작업할 수 있었으며, 기능 개발이 완료되면 develop 브랜치에 병합하고, 병합 후에는 feature 브랜치를 삭제하여 깔끔한 브랜치 관리를 할 수 있었습니다.

<br>

## 3. 프로젝트 구조

<br>

## 4. 역할 분담

### 윤장호

### 김규리

### 김민서

### 박재학

### 최효성

### 이규동

### 박정재

### 이동석

<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-09-10 ~ 2024-12-20
- UI 구현 : 2024-09-27 ~ 2024-10-22
- 기능 구현 : 2024-10-07 ~ 2024-11-30

<br>

## 6. 페이지별 기능

### [초기화면]

## 7. 트러블 슈팅

## 8. 향후 방향성

- **더 많은 언어 지원**: Kotlin, Go 등 다양한 프로그래밍 언어에 대한 지원을 확장하여, 사용자가 보다 다양한 언어로 작업할 수 있는 환경을 제공할 것입니다.
- **개인화된 서비스**: 사용자의 실력을 정밀하게 파악하고, 부족한 부분을 개선할 수 있도록 맞춤형 문제를 생성하고 추천하는 서비스를 제공할 것입니다.
- **자체 AI 모델 개발**: OpenAI API를 활용하지 않고, 서비스에 특화된 AI 모델을 개발하여 더욱 개인화된 경험을 제공할 것입니다.

## 9. 프로젝트 후기

### 윤장호

여러 새로운 라이브러리를 사용해볼 수 있었고, 기존에 알고 있던 기술도 더 단단히 할 수 있는 좋은 계기가 되었습니다. 또한 혼자서는 경험할 수 없는 여러 시행착오를 겪으며 성장할 수 있었고, 여러 분야의 팀원과의 협업을 통해 백엔드, 인프라 등 다양한 관점에서의 지식이 늘어 이후 협업에서도 큰 도움이 될 것 같습니다.

### 김규리

이번 프로젝트를 통해 TypeScript와 Next.js를 주로 사용하며 실무적인 역량을 키웠습니다. 예상치 못한 에러와 복잡한 예외 상황 속에서도 팀원들과 함께 해결 방안을 모색하며 성과를 냈고, 열정적인 협업 덕분에 단순히 결과물이 아니라 팀워크의 가치를 깊이 느낀 소중한 경험이었습니다.

### 김민서

이전 프로젝트에서 개선할 점을 갖고 실행하고자 PM으로 참여하여 MSA, k8s, 젠킨스 등 여러 기술을 접한 기회였습니다. 기술적으로 잘 알지 못하여 JIRA에서 티켓조차 나눠주지 못해 팀원들에게 미안합니다. 그래도 부족한 PM두고도 훌륭한 프로젝트로 마무리할 수 있게 도와준 팀원들에게 감사하고 싶습니다.

### 박재학

스프링 클라우드를 통한 msa 구축, CI/CD를 파이프라인 구축을 통한 devops 적용 등의 기술을 습득할 수 있었습니다. 또한 팀원들과 매일같이 프로젝트에 대해 피드백을 주고받으며 지식을 팀원들에게 전달하는 방법과 다른 팀원들이 전달해주는 내용을 잘 이해할 수 있는 능력을 키울 수 있었습니다.

### 최효성

코딩테스트 기능, 카프카로 CDC, 엘라스틱서치로 검색 등을 개발하면서 일반적인 crud가 아닌 색다른 기능을 개발할 수 있어 신선했고, 새로운 것들을 많이 배워갈 수 있는 프로젝트였습니다.

### 이규동

블로그 서비스 부분을 담당하여 개발을 진행해보았는데 고려해야 될 부분이 생각보다 많았습니다. 특히 이미지 처리와 관련해서는 많은 어려움이 있었지만 멘토님들께서 친절하게 피드백을 작성 해주셔서 많은 도움이 되었습니다. 개발 뿐만 아니라 다양한 협업 툴도 접해보는 등 많은 부분에서 크게 성장한 것 같습니다.

### 박정재

이번 프로젝트는 서로 다른 개성을 가진 팀원들과 협력하며 많은 것을 배운 값진 시간이었습니다. 처음 도전하는 기술과 환경에서 어려움도 있었지만, 이를 극복하며 성장할 수 있었습니다. 앞으로도 이 경험을 발판 삼아 목표를 이루기 위해 꾸준히 노력하고자 합니다!

### 이동석

처음에 아카데미에 지원하면서 잘 할수있을까 걱정이 많았지만 훌륭한 팀원들과 인연이 닿아 함께 프로젝트를 진행할 수 있어서 정말 행복했고 동시에 많은걸 얻어갈 수 있는 시간이었습니다!
