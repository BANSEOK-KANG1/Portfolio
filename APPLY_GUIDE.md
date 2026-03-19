# 적용 가이드

## 무엇이 달라졌는가

### 1) 홈의 역할이 바뀜
기존 홈이 “한 장의 자기소개”라면, 새 홈은 **트랙 분기 허브**입니다.
채용 담당자가 첫 화면에서 바로 아래 둘 중 하나를 선택하게 만드는 구조입니다.

- PM / Product
- Performance Marketing / Marketing Analyst

### 2) 폰트/디자인 톤
이번 시안은 아래를 기준으로 잡았습니다.

- 더 얇고 단정한 경계선
- 회색/화이트 베이스 + 하나의 포인트 컬러
- 카드 자체보다 **타입 위계와 여백**으로 정보 차이를 만들기
- 모바일에서도 헤더/카드가 과하게 무겁지 않게 설계

### 3) 마케팅 포트폴리오 랜딩 추가
기존 공개 자산 중 아래 내용을 마케팅 언어로 재해석해 연결했습니다.

- 전환 병목 재정의
- 조회수 → 참여율 KPI 전환
- QA / 리포팅 리스크 관리

## 추천 적용 순서
1. 새 `index.html` 교체
2. `pm-home.html`, `marketing-home.html` 추가
3. `assets/css/portfolio-system.css`, `assets/js/portfolio-system.js` 추가
4. 기존 `pm.html`, `intern.html`, `data-insight.html`와 링크 확인
5. 마지막으로 contact / branding / reflection 정리

## 바로 손봐야 하는 문구
아래는 실제 운영 전에 한번만 확인하면 됩니다.

- 이메일 주소
- GitHub 링크
- Notion 링크
- PM PDF 파일명
- QA PDF 파일명
- 프로필 이미지 경로

## 마케팅 트랙에서 가장 빨리 좋아지는 보강 포인트
우선순위대로 보면 이 3개가 가장 효과적입니다.

1. **랜딩 / 퍼널 개선 사례 1개**
   - 전환율 병목이 어디였고
   - 무엇을 바꿨고
   - 어떤 지표를 봤는지

2. **콘텐츠 / 크리에이티브 KPI 사례 1개**
   - 조회수 대신 무엇을 대표 지표로 삼았는지
   - 왜 그렇게 바꿨는지

3. **실제 리포트 화면 1개**
   - CAC/CPA/ROAS만 보여주기보다
   - 해석 기준과 다음 액션까지 같이 보이게

## 디자인 확장 제안
이번 버전 다음으로 손대면 좋은 페이지 순서:

1. `contact.html`
2. `data-insight.html`
3. `branding.html`
4. `reflection.html` 또는 archive 페이지로 전환
