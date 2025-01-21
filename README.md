# 최애의 포토

## 프로젝트 소개

- 개인용 디지털 사진첩 생성 플랫폼, 최애의 포토
- 🗓️ 프로젝트 기간: 2024.12.27 ~ 2025.1.21

# 풀스택 3기 파트3 1팀

- [팀 문서](https://www.notion.so/chobodev/16924202780c809a9cdee8926986f244?v=16924202780c811580b1000c2847f948)
- [스토리북](https://6789154b0616d33f386b330c-hzopgexaja.chromatic.com/?path=/story/common-organisms-photocarddetail--others-photo-card-detail)
- [공통 컴포넌트 피그마](https://www.figma.com/design/r1mdbBRLniyQVRzajkxlus/1%ED%8C%80-%EC%B5%9C%EC%95%A0%EC%9D%98%ED%8F%AC%ED%86%A0-%EA%B3%B5%ED%86%B5%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8?node-id=0-1&p=f&t=Iiri5hbok9pEPmmi-0)
- [배포 링크](https://www.ooyoo.dev/)

## 팀원 구성
| 이름 | 역할 | Github |
|------|------|---------|
| 🧭 강대원 | FullStack | [@Daewony](https://github.com/Daewony) |
| 🌟 박수환 | FullStack | [@soohwanpak](https://github.com/soohwanpak) |
| 🏗️ 이현우 | FullStack | [@gealot](https://github.com/gealot) |
| 🎯 임예지 | FullStack | [@Bluemoon105](https://github.com/Bluemoon105) |
| 💫 정유석 | FullStack | [@yousuk88](https://github.com/yousuk88) |
| 🎨 함헌규 | FullStack | [@heonq](https://github.com/heonq) |

## 기술 스택(프론트엔드)

- Next.js
- Typescript
- Tailwind CSS
- Storybook
- Tanstack-query
- Zustand
- axios

---

## 팀원별 구현 기능 상세

### 강대원
- 프론트엔드 초기 세팅
- 공통 컴포넌트
  - 공통 버튼
  - GNB
- 카드 판매 상세 페이지(구매자 및 판매자) 구현
노션:

### 박수환

####
메인페이지 개발
- 등록되어있는 카드들 중 판매등록되어있는 카드목록 전체데이터 조회 API 구현
- 전체데이터 검색어, query로 데이터 조회 API 구현
- 모바일 화면 필터모달에 필요한 데이터 조회 API 구현

####
내 카드 목록 조회하기 모달( 판매할 포토카드 선택 모달)
- 내 카드 목록 조회하기 모달 개발
- 내가 가지고있는 카드 중 판매가능한 카드목록 조회 API 구현
- 내가 가지고있는 카드 중 판매가능한 카드목록 검색어, query로 데이터 조회 API 구현

####
나의 포토카드 판매하기 모달(교환 희망 정보 입력 모달( 판매할 포토카드 선택 후))
- 판매하기 모달 개발
- 원하는 판매수량, 가격 / 교환을 희망하는 카드의 장르, 등급, 설명 입력후 상점에 등록

공통컴포넌트
- 드롭다운, 검색창 구현

### 이현우

- 이번 프로젝트에서는 백엔드와 배포에 집중하였습니다
- 배포 시 문제가 되는 페이지들을 해결하고자 하였습니다
- 추가로 Lint + Code Format을 통해 배포 시 에러를 완화하는 과정을 프로젝트 중간에 도입

### 임예지

- 마이갤러리

- 마이갤러리 상세 페이지  
 - 마이갤러리 모달 제작

- 포토카드 생성 페이지

공통컴포넌트
- 성공 & 실패 컴포넌트 제작

### 정유석
![image](https://github.com/user-attachments/assets/122f58bb-e22b-4b87-a190-f2ceba42e544)
- 로그인, 회원가입 UI
  - 리액트 훅폼, 데이터 유효성 검사
  - 사용자 친화적 UI/UX 버튼 비활성화
  - 에러메세지 모달 팝업으로 사용성 개선
- 유저기능 전역상태 관리
  - zustand를 통한 전역 상태관리
  - 실시간 데이터를 업데이트를 위한 상태 구독

![image](https://github.com/user-attachments/assets/11ba8e64-fdc8-4eb0-9cd6-3e2b11bb15d6)
![image](https://github.com/user-attachments/assets/2929bb4c-9317-42a5-9cda-e68a03e99d52)
- 프로필 모달
  - 전역적으로 열림/닫힘
  - 반응형 디자인

![image](https://github.com/user-attachments/assets/8057115a-7e7f-4a9d-81e9-cd4df22bfb40)
![image](https://github.com/user-attachments/assets/af61c48c-eb79-4af6-a600-08afe4388950)
![image](https://github.com/user-attachments/assets/933da331-96c2-4c86-9ee0-5384dca5c414)
- 랜덤포인트 이벤트 페이지
  - 참여 가능 조건에 따른 동적인 화면 구현
  - 한 시간에 한 번 랜덤상자 뽑기기회를 부여하여 포인트 획득
  - 참여완료 시 다음참여 시간까지 카운트 다운으로 안내

### 함헌규


## 파일 구조

```
📦3-best-photo-1team-fe
 ┣ 📂.husky
 ┃ ┣ 📂_
 ┃ ┃ ┣ 📜.gitignore
 ┃ ┃ ┣ 📜applypatch-msg
 ┃ ┃ ┣ 📜commit-msg
 ┃ ┃ ┣ 📜h
 ┃ ┃ ┣ 📜husky.sh
 ┃ ┃ ┣ 📜post-applypatch
 ┃ ┃ ┣ 📜post-checkout
 ┃ ┃ ┣ 📜post-commit
 ┃ ┃ ┣ 📜post-merge
 ┃ ┃ ┣ 📜post-rewrite
 ┃ ┃ ┣ 📜pre-applypatch
 ┃ ┃ ┣ 📜pre-auto-gc
 ┃ ┃ ┣ 📜pre-commit
 ┃ ┃ ┣ 📜pre-merge-commit
 ┃ ┃ ┣ 📜pre-push
 ┃ ┃ ┣ 📜pre-rebase
 ┃ ┃ ┗ 📜prepare-commit-msg
 ┃ ┗ 📜pre-commit
 ┣ 📂.storybook
 ┃ ┣ 📂addon
 ┃ ┃ ┗ 📜register.tsx
 ┃ ┣ 📜main.ts
 ┃ ┣ 📜preview.tsx
 ┃ ┗ 📜setting.css
 ┣ 📂public
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📂direction
 ┃ ┃ ┃ ┣ 📜back.svg
 ┃ ┃ ┃ ┣ 📜down.svg
 ┃ ┃ ┃ ┣ 📜go.svg
 ┃ ┃ ┃ ┣ 📜left.svg
 ┃ ┃ ┃ ┣ 📜right.svg
 ┃ ┃ ┃ ┗ 📜up.svg
 ┃ ┃ ┣ 📂visibility
 ┃ ┃ ┃ ┣ 📜invisible.svg
 ┃ ┃ ┃ ┗ 📜visible.svg
 ┃ ┃ ┣ 📜alarm-default.svg
 ┃ ┃ ┣ 📜close.svg
 ┃ ┃ ┣ 📜dropdown.svg
 ┃ ┃ ┣ 📜exchange.svg
 ┃ ┃ ┣ 📜filter.svg
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┣ 📜menu.svg
 ┃ ┃ ┣ 📜minus.svg
 ┃ ┃ ┣ 📜plus.svg
 ┃ ┃ ┣ 📜profile.svg
 ┃ ┃ ┣ 📜search.svg
 ┃ ┃ ┗ 📜sold-out.svg
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜rBox.png
 ┃ ┃ ┣ 📜rBox1.png
 ┃ ┃ ┣ 📜rBox2.png
 ┃ ┃ ┣ 📜rBox3.png
 ┃ ┃ ┣ 📜rBoxPoint.png
 ┃ ┃ ┣ 📜random-boxes.webp
 ┃ ┃ ┣ 📜sample-image-1.webp
 ┃ ┃ ┣ 📜sample-image-2.webp
 ┃ ┃ ┗ 📜sample-image-3.webp
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂(auth)
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂(routes)
 ┃ ┃ ┃ ┣ 📂exchange-failure
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂exchange-success
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂my-gallery
 ┃ ┃ ┃ ┃ ┣ 📂[cardId]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂create-photo-card
 ┃ ┃ ┃ ┃ ┃ ┣ 📂fail
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂success
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂my-sales
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂photo-card
 ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂purchase-failure
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂purchase-success
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂sell-failure
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂sell-success
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┗ 📜BaskinRobbins-Bold.woff
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜globals.css
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜not-found.tsx
 ┃ ┃ ┗ 📜queryProvider.tsx
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Auth
 ┃ ┃ ┃ ┗ 📜AuthHeaderLogo.tsx
 ┃ ┃ ┣ 📂RandomPoint
 ┃ ┃ ┃ ┣ 📜ConfettiEffect.jsx
 ┃ ┃ ┃ ┗ 📜RandomPointModal.tsx
 ┃ ┃ ┣ 📂SuccessOrFail
 ┃ ┃ ┃ ┗ 📜Result.tsx
 ┃ ┃ ┣ 📂client
 ┃ ┃ ┃ ┗ 📜ClientProvider.tsx
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂AlertModal
 ┃ ┃ ┃ ┃ ┗ 📜CommonAlertModal.tsx
 ┃ ┃ ┃ ┣ 📂CardSummary
 ┃ ┃ ┃ ┃ ┣ 📜CardSummary.stories.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CardSummary.tsx
 ┃ ┃ ┃ ┃ ┗ 📜CardSummary.types.ts
 ┃ ┃ ┃ ┣ 📂CommonBtn
 ┃ ┃ ┃ ┃ ┣ 📜CodeExample.ts
 ┃ ┃ ┃ ┃ ┣ 📜CommonBtn.example.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CommonBtn.stories.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CommonBtn.tsx
 ┃ ┃ ┃ ┃ ┗ 📜CommonBtn.types.ts
 ┃ ┃ ┃ ┣ 📂CommonDropDown
 ┃ ┃ ┃ ┃ ┗ 📜DropDown.tsx
 ┃ ┃ ┃ ┣ 📂CommonSearchBox
 ┃ ┃ ┃ ┃ ┗ 📜SearchInput.tsx
 ┃ ┃ ┃ ┣ 📂amountControl
 ┃ ┃ ┃ ┃ ┣ 📜amountControl.stories.tsx
 ┃ ┃ ┃ ┃ ┣ 📜amountControl.tsx
 ┃ ┃ ┃ ┃ ┗ 📜amountControl.types.ts
 ┃ ┃ ┃ ┣ 📂commonInputSection
 ┃ ┃ ┃ ┃ ┣ 📜commonInputSection.tsx
 ┃ ┃ ┃ ┃ ┗ 📜commonInputSection.types.ts
 ┃ ┃ ┃ ┣ 📂filterGroup
 ┃ ┃ ┃ ┃ ┣ 📂organisms
 ┃ ┃ ┃ ┃ ┃ ┗ 📜DropDown.tsx
 ┃ ┃ ┃ ┃ ┗ 📂templates
 ┃ ┃ ┃ ┃ ┃ ┗ 📜filterGroup.tsx
 ┃ ┃ ┃ ┣ 📂filterModal
 ┃ ┃ ┃ ┃ ┣ 📂atoms
 ┃ ┃ ┃ ┃ ┃ ┣ 📂filterCategory
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜filterCategory.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜filterCategory.types.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📂filterOption
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜filterOption.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜filterOption.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂molecules
 ┃ ┃ ┃ ┃ ┃ ┣ 📂categoryGroup
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜categoryGroup.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂filterActions
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜filterActions.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂filterModalHeader
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜filterModalHeader.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📂optionGroup
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜optionGroup.tsx
 ┃ ┃ ┃ ┃ ┣ 📂organisms
 ┃ ┃ ┃ ┃ ┃ ┗ 📜filterSection.tsx
 ┃ ┃ ┃ ┃ ┗ 📂templates
 ┃ ┃ ┃ ┃ ┃ ┗ 📜filterModal.tsx
 ┃ ┃ ┃ ┣ 📂photoCard
 ┃ ┃ ┃ ┃ ┣ 📂atoms
 ┃ ┃ ┃ ┃ ┃ ┣ 📂description
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜description.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜description.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜description.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂divider
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜divider.types.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜horizontalDivider.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜horizontalDivider.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜verticalDivder.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜verticalDivider.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂genre
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜genre.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜genre.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂grade
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜grade.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜grade.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂labelContent
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜labelContent.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜labelContent.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜labelContent.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂labelTitle
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜labelTitle.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜labelTitle.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜labelTitle.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂ownerCardCount
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ownerCardCount.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ownerCardCount.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂ownerNickname
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ownerNickname.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ownerNickname.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂purchasePointLabel
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜purchasePointLabel.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜purchasePointLabel.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜purchasePointLabel.types.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📂stateBadge
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜stateBadge.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜stateBadge.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜stateBadge.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂molecules
 ┃ ┃ ┃ ┃ ┃ ┣ 📂cardInformationHeader
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜cardInformationHeader.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜cardInformationHeader.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜cardInformationHeader.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂cardSummaryGroup
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜cardSummaryGroup.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜cardSummaryGroup.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂customLabel
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜customLabel.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜customLabel.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📂nicknameLabel
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜nicknameLabel.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜nicknameLabel.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂organisms
 ┃ ┃ ┃ ┃ ┃ ┣ 📂photoCardDetail
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜codeExample.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜myCardDetailSection.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜othersCardDetailSection.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜photoCardDetail.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜photoCardDetail.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜photoCardDetail.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂photoCardListItem
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜cardAmountSection.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜codeExample.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜photoCardListItem.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜photoCardListItem.types.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜photocardListItem.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜tradeCardSection.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂photoCardPageHeader
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜codeExample.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜photoCardPageHeader.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜photoCardPageHeader.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜photoCardPageHeader.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂tradeList
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜tradeList.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜tradeList.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜tradeList.types.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📂tradeRequest
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜tradeRequest.stories.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜tradeRequest.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜tradeRequest.types.ts
 ┃ ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┃ ┣ 📂searchSection
 ┃ ┃ ┃ ┃ ┣ 📜codeExample.ts
 ┃ ┃ ┃ ┃ ┣ 📜searchSection.stories.tsx
 ┃ ┃ ┃ ┃ ┣ 📜searchSection.tsx
 ┃ ┃ ┃ ┃ ┗ 📜searchSection.types.ts
 ┃ ┃ ┃ ┣ 📂title
 ┃ ┃ ┃ ┃ ┣ 📜codeExample.ts
 ┃ ┃ ┃ ┃ ┣ 📜title.stories.tsx
 ┃ ┃ ┃ ┃ ┣ 📜title.tsx
 ┃ ┃ ┃ ┃ ┗ 📜title.types.ts
 ┃ ┃ ┃ ┗ 📜empty.tsx
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📂GNB
 ┃ ┃ ┃ ┃ ┣ 📜GNB.tsx
 ┃ ┃ ┃ ┃ ┣ 📜GNBActions.tsx
 ┃ ┃ ┃ ┃ ┣ 📜GNBLogo.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MobileNav.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MobileNavDefault.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MobileNavWithBack.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MobileNotificationMessages.tsx
 ┃ ┃ ┃ ┃ ┣ 📜NotificationBell.tsx
 ┃ ┃ ┃ ┃ ┣ 📜NotificationItem.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ProfileBurgerModal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ProfileModal.tsx
 ┃ ┃ ┃ ┃ ┗ 📜mockNotifications.ts
 ┃ ┃ ┃ ┗ 📜MainLayout.tsx
 ┃ ┃ ┣ 📂marketplace
 ┃ ┃ ┃ ┣ 📜BuyerView.tsx
 ┃ ┃ ┃ ┣ 📜LoginModal.tsx
 ┃ ┃ ┃ ┣ 📜MarketplaceHeader.tsx
 ┃ ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┃ ┣ 📜PhotoCardExchangeModal.tsx
 ┃ ┃ ┃ ┣ 📜ProductModal.tsx
 ┃ ┃ ┃ ┣ 📜SellerView.tsx
 ┃ ┃ ┃ ┣ 📜cardGenre.tsx
 ┃ ┃ ┃ ┗ 📜cardGrade.tsx
 ┃ ┃ ┣ 📂myGallery
 ┃ ┃ ┃ ┗ 📜MyGalleryModal.tsx
 ┃ ┃ ┣ 📂mySales
 ┃ ┃ ┃ ┣ 📂cardContainer
 ┃ ┃ ┃ ┃ ┗ 📜cardContainer.tsx
 ┃ ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┃ ┣ 📜header.tsx
 ┃ ┃ ┃ ┃ ┗ 📜header.types.ts
 ┃ ┃ ┃ ┗ 📂page
 ┃ ┃ ┃ ┃ ┗ 📜mySalesPage.tsx
 ┃ ┃ ┗ 📜empty.tsx
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜env.ts
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜empty.ts
 ┃ ┃ ┣ 📜filterOptions.ts
 ┃ ┃ ┣ 📜mediaQuery.ts
 ┃ ┃ ┗ 📜photoCardInformation.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜empty.ts
 ┃ ┃ ┣ 📜useAuthGuard.ts
 ┃ ┃ ┗ 📜useScreenWidth.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┗ 📂axios
 ┃ ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┃ ┃ ┣ 📜axiosInstance.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜empty.ts
 ┃ ┃ ┃ ┃ ┗ 📂marketplaceMain
 ┃ ┃ ┃ ┃ ┃ ┗ 📜mainpagecard.type.ts
 ┃ ┃ ┃ ┣ 📜axiosInstance.ts
 ┃ ┃ ┃ ┗ 📜createCardAxios.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜authService.ts
 ┃ ┃ ┣ 📜empty.ts
 ┃ ┃ ┣ 📜marketPlaceService.ts
 ┃ ┃ ┣ 📜mySales.ts
 ┃ ┃ ┣ 📜mygalleryPhotocardService.ts
 ┃ ┃ ┣ 📜notificationsService.ts
 ┃ ┃ ┗ 📜randomPointService.ts
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📜photoCardId.ts
 ┃ ┃ ┣ 📜purchaseAmountStore.ts
 ┃ ┃ ┣ 📜rerenderStore.ts
 ┃ ┃ ┣ 📜useAuthStore(prev).ts
 ┃ ┃ ┣ 📜useAuthStore.ts
 ┃ ┃ ┣ 📜useFilterStore.ts
 ┃ ┃ ┣ 📜useNotificationStore.ts
 ┃ ┃ ┣ 📜useProfileBurgerModalStore.ts
 ┃ ┃ ┗ 📜useProfileModalStore.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜cn.ts
 ┃ ┃ ┣ 📜convertCase.ts
 ┃ ┃ ┣ 📜empty.ts
 ┃ ┃ ┣ 📜formatTimeAgo.ts
 ┃ ┃ ┗ 📜normalizeCardData.ts
 ┃ ┗ 📜middleware.ts
 ┣ 📜.env
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.lintstagedrc.js
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜README.md
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.mjs
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.cjs
 ┣ 📜tailwind.config.ts
 ┗ 📜tsconfig.json``` 
