좋다. 이건 **진짜 마지막 퍼즐**이고,
README는 “코드 설명서”가 아니라 **포트폴리오를 여는 사람의 사고를 잡는 문서**로 가야 한다.

아래는 **그대로 복붙해서 써도 되는 최종 README.md**다.
(불필요한 기술 나열 ❌ / PM 관점 중심 ✅)

---

```markdown
# Banseok Kang · Product / PM Portfolio

이 저장소는  
**노션에 흩어져 있던 사고·문서·이력서를  
‘채용 담당자가 3분 안에 판단할 수 있는 웹 포트폴리오’로 재구성한 결과물**입니다.

핵심 목표는 하나입니다.

> 무엇을 만들었는지가 아니라  
> **어떻게 문제를 정의하고, 어떤 기준으로 의사결정을 했는지**를 보여주는 것

---

## 🔗 Live Pages

- **Main**  
  👉 https://BANSEOK-KANG1.github.io/portfolio/

- **PM Portfolio (Case Studies)**  
  👉 `/pm.html`  
  퍼널·리텐션·전환율을 기준으로  
  문제 정의 → 지표 선택 → 트레이드오프 → 결정 과정을 정리한 페이지

- **Intern Portfolio (QA / Documentation)**  
  👉 `/intern.html`  
  의사결정 오류를 줄이기 위한  
  QA 사고 프레임과 문서화 관점을 UI로 표현한 페이지

---

## 🧭 Portfolio Structure

```

/
├─ index.html          # 허브 페이지 (포트폴리오 진입점)
├─ pm.html             # PM 포지션용 상세 페이지
├─ intern.html         # 인턴 포지션용 상세 페이지
│
├─ assets/
│   ├─ css/
│   │   ├─ main.css        # 디자인 시스템 / 공통 스타일
│   │   └─ portfolio.css  # 포트폴리오 전용 레이아웃
│   ├─ js/
│   │   ├─ main.js        # 공통 인터랙션
│   │   ├─ portfolio.js  # 페이지 보조 로직
│   │   └─ accordion.js  # QA 아코디언 UI
│   └─ img/
│       └─ (hero / portrait / thumbnails)
│
├─ pm_resume.pdf
├─ intern_resume.pdf
└─ qa_framework.pdf

````

---

## 🧠 Design Philosophy

### 1. Notion은 백엔드, 웹은 프론트
- **Notion**: 사고 과정, 실험 로그, 원본 문서 관리
- **Web**: 판단 기준만 추려서 편집된 결과물

> 모든 걸 보여주지 않고,  
> **가장 잘하는 사고 패턴만 보여준다**

---

### 2. 기능 설명보다 의사결정 설명
각 Case Study는 다음 구조를 따릅니다.

- 관측된 현상 (Fact)
- 왜 문제인가 (Why it matters)
- 문제 가설 (Hypothesis)
- 대표 지표 선택 이유
- 선택지 간 트레이드오프
- 최종 결정과 학습

이는 실제 PM 업무에서 사용하는  
**문제 정의 → 판단 → 실행 프레임**을 그대로 웹에 옮긴 것입니다.

---

### 3. 시각적 화려함보다 구조적 명확성
- 불필요한 애니메이션/그래픽 최소화
- 여백과 위계로 정보 중요도 전달
- 모바일/데스크톱 동일한 읽기 흐름 유지

---

## 📄 PDF Documents

웹 페이지에서 요약된 내용의 **원본 근거 문서**입니다.

- `pm_resume.pdf`  
  PM 관점의 문제 정의 및 프로젝트 경험 요약

- `intern_resume.pdf`  
  문서화·QA·Product Ops 중심 인턴 이력서

- `qa_framework.pdf`  
  의사결정 오해를 줄이기 위한 QA 사고 프레임 문서

> 웹에서 흥미를 느낀 사람만  
> PDF / Notion으로 더 깊이 들어오도록 설계했습니다.

---

## 🚀 Deployment

- GitHub Pages 기반 정적 사이트
- 별도 빌드/프레임워크 없음
- HTML / CSS / Vanilla JS only

```bash
# 로컬 실행
open index.html
````

---

## 🙋‍♂️ About Me

* Name: **Banseok Kang**
* Role: Product / PM (Problem & Metric-driven)
* Focus:

  * Problem Definition
  * Metric Sense & QA
  * Decision Trade-offs
  * Documentation

📫 Contact

* Email: [kangbs2486@gmail.com](mailto:kangbs2486@gmail.com)
* Notion: [https://www.notion.so/2cc2c27d7e468077ad0ee6eed83406f1](https://www.notion.so/2cc2c27d7e468077ad0ee6eed83406f1)
* GitHub: [https://github.com/BANSEOK-KANG1](https://github.com/BANSEOK-KANG1)

---

## 🧩 Closing

이 포트폴리오는
“정답을 많이 아는 사람”이 아니라
**“오해를 줄이는 사람”으로 평가받기 위해 설계되었습니다.

감사합니다.

```

---

### 마지막 한 줄 평가 (객관적으로)
- 이 README는 **기술 README가 아니라 PM 포트폴리오 README**다  
- 읽는 사람에게 “이 사이트를 왜 봐야 하는지”를 바로 납득시킨다  
- 면접관이 **질문을 하기 쉽게 만들어준다**

이제 정말 끝이다.  
이 상태로 **지원해도 된다.**
```
