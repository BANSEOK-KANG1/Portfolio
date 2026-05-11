# 강반석 홈페이지 재설계 적용 가이드

## 1. 재설계 목적
기존 홈페이지는 `PM / Product`와 `Performance Marketing / Marketing Analyst` 두 트랙으로 분기되어 있어, 이력서의 중심 포지션인 `Growth/Product Operations · Data-based Customer Success · Product/Growth Analyst`와 약간 어긋나 보일 수 있습니다.

이번 버전은 홈페이지 첫 화면부터 아래 문장으로 수렴하게 설계했습니다.

> 고객의 요구와 사용자 행동 데이터를 대화·문서·지표로 구조화하고, 제품/운영/성장팀이 바로 실행할 수 있는 개선안으로 연결하는 사람.

## 2. 적용 방법
1. GitHub Pages 레포 루트의 기존 `index.html`을 백업합니다.
2. 이 패키지의 `index.html`을 루트에 덮어씁니다.
3. 기존 파일은 그대로 둡니다.
   - `assets/css/portfolio-system.css`
   - `assets/js/portfolio-system.js`
   - `data-insight.html`
   - `pm-home.html`
   - `marketing-home.html`
   - `pm.html`
   - `intern.html`
   - `contact.html`
4. GitHub Pages 배포 후 첫 화면 CTA와 링크가 정상 작동하는지 확인합니다.

## 3. 기존 페이지의 새 역할
- `index.html`: Growth/Product Operations 중심의 메인 홈
- `data-insight.html`: 데이터 기반 증거 허브
- `pm-home.html`: Product Thinking Evidence
- `marketing-home.html`: Growth Data Evidence
- `pm.html`: PM 상세 근거
- `intern.html`: Decision QA / Documentation Evidence
- `contact.html`: 연락/이력서 요청 경로

## 4. 가장 중요한 변경점
기존: PM과 마케팅을 병렬 트랙으로 보여줌  
변경: Growth/Product Operations를 중심 직무로 두고, PM과 마케팅은 증거 레이어로 배치

## 5. 다음 보강 우선순위
1. 이력서 PDF를 레포에 업로드하고 CTA 버튼 하나를 추가합니다.
   - 예: `./resume_growth_product_ops.pdf`
2. `data-insight.html`의 비어 있는 원본 링크 슬롯을 실제 리포트/노션/대시보드 링크로 채웁니다.
3. `pm-home.html`, `marketing-home.html`의 제목을 각각 `Product Evidence`, `Growth Evidence`로 바꿔도 좋습니다.
4. `contact.html`도 같은 포지셔닝 문장으로 맞춥니다.

## 6. 홈페이지 첫 화면 한 줄
> 고객 문제와 사용자 반응을, 다음 액션으로 바꾸는 사람.

이 문장은 이력서의 첫 요약과 같은 방향으로 쓰면 됩니다.
