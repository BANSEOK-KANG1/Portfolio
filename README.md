# portfolio-refresh-dual-track

강반석 포트폴리오를 **역할 분기형 구조**로 다시 설계한 리뉴얼 패키지입니다.

## 들어 있는 파일
- `index.html`  
  새 허브 홈. Product / PM과 Performance Marketing / Marketing Analyst 두 트랙으로 분기합니다.
- `pm-home.html`  
  PM / Product 포지션용 랜딩.
- `marketing-home.html`  
  퍼포먼스 마케터 / 마케팅 분석가 포지션용 랜딩.
- `assets/css/portfolio-system.css`  
  공통 디자인 시스템.
- `assets/js/portfolio-system.js`  
  모바일 메뉴, 아주 가벼운 reveal 인터랙션, 이미지 fallback 처리.

## 이번 버전의 핵심
1. **폰트와 시각 톤을 더 현대적으로 정리**
   - IBM Plex Sans KR 중심의 산세리프 시스템
   - 여백, 타입 위계, 경계선, 톤온톤 surface 중심
   - 과한 그래픽 대신 “정리된 정보 구조”를 강조

2. **포트폴리오 진입점을 역할별로 분리**
   - PM / Product
   - Performance Marketing / Marketing Analyst

3. **기존 공개 자산을 버리지 않고 재배치**
   - `pm.html`
   - `intern.html`
   - `data-insight.html`
   - 기존 PDF 링크들

## 적용 방법
현재 GitHub Pages 레포 루트 기준으로 아래처럼 복사하면 됩니다.

- `index.html` → 루트 교체
- `pm-home.html` → 루트 추가
- `marketing-home.html` → 루트 추가
- `assets/css/portfolio-system.css` → 추가
- `assets/js/portfolio-system.js` → 추가

## 권장 후속 작업
- `contact.html`도 같은 디자인 시스템으로 맞추기
- 이메일 / GitHub 계정 표기를 한 버전으로 통일하기
- `data-insight.html`의 placeholder 문구(예: 표 미리보기, 막대 차트)를 실제 사례 카드로 교체하기
- 마케팅 트랙용 실전 자료 2~3개 추가하기
  - 매체 리포트 1건
  - 랜딩 전환 개선 1건
  - 크리에이티브 실험 1건

## 참고
이 패키지는 **기존 repo의 `assets/img/portrait.jpg`가 있다는 전제**로 작성했습니다.
이미지 경로가 다르면 각 HTML에서 프로필 이미지 경로만 수정하면 됩니다.
