# Banseok Portfolio Website

퍼포먼스마케팅, 데이터 트래킹, Product Operations 방향성을 보여주기 위한 정적 포트폴리오 웹사이트입니다.
React나 빌드 도구 없이 `index.html`, `styles.css`, `script.js`만으로 구성되어 GitHub Pages에 바로 배포할 수 있습니다.

## 1. 파일 구조

```text
bansuk-portfolio-git/
├── index.html          # 홈페이지 본문 구조와 문구
├── styles.css          # 디자인 시스템, 반응형 레이아웃
├── script.js           # 모바일 메뉴, 스크롤 애니메이션, 현재 연도 표시
├── assets/
│   ├── favicon.svg     # 브라우저 탭 아이콘
│   └── resume.pdf      # 여기에 실제 이력서 PDF를 추가하면 버튼이 연결됨
├── content-guide.md    # 문구 수정 가이드
├── git-commands.txt    # GitHub 업로드 명령어
├── .gitignore
└── README.md
```

## 2. 바로 수정해야 할 부분

### 이메일
`index.html`에서 아래 문구를 찾아 실제 이메일로 바꾸세요.

```html
mailto:your-email@example.com
```

### 이력서 PDF
`assets/resume.pdf` 경로에 실제 이력서 파일을 넣으면 상단의 `이력서 다운로드` 버튼이 작동합니다.
파일명이 다르면 `index.html`의 아래 링크를 수정하세요.

```html
href="assets/resume.pdf"
```

### 회사명 공개 여부
현재 경력 섹션은 `글로벌알파미디어` 중심으로 구성되어 있습니다.
공개 포트폴리오에서 회사명 노출이 부담되면 아래처럼 바꾸세요.

```text
글로벌알파미디어 → 마케팅 에이전시 / 퍼포먼스마케팅팀
```

1개월 이하 단기 재직 경험은 메인 경력에서 제외하고, 필요할 때 면접 답변 또는 보조 경험으로만 설명하는 구성을 권장합니다.

## 3. GitHub Pages 배포 방법

1. GitHub에서 새 repository 생성
2. 이 폴더의 파일을 repository에 업로드
3. GitHub repository에서 `Settings` → `Pages` 이동
4. `Deploy from a branch` 선택
5. Branch: `main`, Folder: `/root` 선택
6. 저장 후 생성되는 GitHub Pages URL 확인

## 4. 로컬에서 확인하기

브라우저에서 `index.html` 파일을 직접 열면 됩니다.
VS Code를 사용한다면 Live Server 확장 프로그램으로 확인하는 방식이 가장 편합니다.

## 5. 디자인 방향

이 포트폴리오는 디자이너형 포트폴리오가 아니라 채용용 랜딩페이지에 가깝게 설계했습니다.
핵심 컨셉은 다음과 같습니다.

- Clean SaaS 스타일
- 데이터 대시보드 느낌의 카드 구조
- 한 섹션에 한 메시지만 배치
- 프로젝트별 Problem / Action / Tools / Metric 구조
- 모바일에서도 읽히는 반응형 레이아웃

## 6. 추천 수정 순서

1. 이메일과 이력서 PDF 연결
2. 첫 화면 문구 확정
3. 프로젝트별 실제 수치와 결과 추가
4. 회사명 공개 여부 결정
5. GitHub Pages 배포
6. 채용공고별로 자기소개/프로젝트 순서 미세 조정
