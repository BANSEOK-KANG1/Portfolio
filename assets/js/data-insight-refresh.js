const CASES = [
  {
    id: 'trend-q1',
    category: 'trend',
    categoryLabel: 'Trend intelligence',
    kind: 'Trend report',
    status: '구조 설계 완료',
    title: '검색 트렌드 리포트 2025Q1',
    summary: '검색량·연관어 기반으로 사회 관심사 흐름을 읽고, 수요 신호로 이어질 가능성이 있는 패턴을 구조화한 케이스입니다.',
    question: '어떤 검색 신호를 일시적 화제가 아니라 실제 수요의 전조지표로 읽어야 하는가?',
    metric: '검색량 변화율 · 연관어 클러스터 · 계절성 · 시차 비교',
    source: 'Google Trends, 네이버 데이터랩, 자체 키워드 메모',
    deliverable: '인사이트 리포트 · 요약 슬라이드 · 키워드 노트',
    tags: ['트렌드', '검색데이터', '수요예측'],
    highlights: [
      '단일 키워드 상승보다 연관어 덩어리의 이동을 먼저 해석하도록 설계',
      '시기성과 외부 이슈성 급등을 분리해 과대해석을 줄이는 구조',
      '콘텐츠 주제, 프로모션 타이밍, 카피 방향으로 연결 가능한 관점 강조'
    ],
    audience: [
      'Growth / Content / Strategy 팀이 선행 수요 신호를 빠르게 읽고 싶을 때',
      '브랜딩 메시지보다 먼저 시장의 관심 방향을 확인해야 할 때',
      '캠페인 캘린더와 검색 의도의 흐름을 함께 봐야 할 때'
    ],
    sourceUrl: '',
    sourceLabel: '원본 리포트 링크 연결'
  },
  {
    id: 'ad-dashboard',
    category: 'marketing',
    categoryLabel: 'Performance marketing',
    kind: 'Dashboard',
    status: '링크만 추가하면 공개',
    title: '광고 효율 대시보드',
    summary: '채널별 CTR, 전환율, ROAS를 같은 테이블에 섞지 않고, 대표 지표와 해석 기준을 분리해 읽히도록 정리한 대시보드형 케이스입니다.',
    question: '유입 성과를 볼 때 클릭 효율과 비즈니스 기여를 섞어 보지 않으려면 어떤 구조가 필요한가?',
    metric: 'CTR · CVR · CPA · ROAS · 신규/재방문 비중',
    source: '매체 리포트, GA4/애널리틱스, 스프레드시트 요약',
    deliverable: '운영 대시보드 · 월간 성과 노트 · 예산 재배분 포인트',
    tags: ['마케팅', '성과분석', '대시보드'],
    highlights: [
      '채널별 효율 비교보다 대표 지표의 역할을 먼저 구분하도록 메타를 배치',
      '숫자표만 보고 오해하지 않도록 해석 포인트를 같이 노출',
      '채널 자체보다 퍼널 병목과 레버리지가 먼저 읽히는 구조'
    ],
    audience: [
      '퍼포먼스 마케팅, 마케팅 분석, Growth 직무 포트폴리오 검토자',
      '월간 리포트를 보고 다음 액션까지 보고 싶은 협업자',
      '매체별 지표를 하나의 문맥으로 정리된 형태로 읽고 싶은 팀'
    ],
    sourceUrl: '',
    sourceLabel: '대시보드 링크 연결'
  },
  {
    id: 'retention',
    category: 'user',
    categoryLabel: 'User behavior',
    kind: 'Retention analysis',
    status: '구조 설계 완료',
    title: '유저 리텐션 분석',
    summary: '코호트 리텐션과 재방문 경로를 같은 화면에서 읽히게 정리하여, 단순 재방문 비율이 아니라 어디서 다시 살아나는지를 드러내는 케이스입니다.',
    question: '리텐션 숫자가 떨어진다는 현상을 어떤 세그먼트와 경로 기준으로 다시 봐야 행동 가능한 문제로 바뀌는가?',
    metric: 'D1 / D7 / D30 리텐션 · 재활성 트리거 · 주요 복귀 경로',
    source: '가입 코호트 데이터, 유입 경로, 재방문 행동 로그',
    deliverable: '리텐션 리포트 · 코호트 시각화 · 개선 가설 메모',
    tags: ['사용자행동', '리텐션', '코호트'],
    highlights: [
      '리텐션을 하나의 숫자로 보지 않고 코호트와 경로로 쪼개 읽는 구조',
      '복귀 행동 직전의 이벤트를 추적해 개입 포인트를 찾는 시선 강조',
      '마케팅 채널과 제품 경험이 어디서 연결되는지 보여주는 중간 허브 역할'
    ],
    audience: [
      '제품과 마케팅 사이의 전환 책임이 함께 걸리는 성장 조직',
      '리텐션 수치를 보고도 왜 그런지 설명이 부족하다고 느끼는 검토자',
      '재방문 전환 구조를 퍼널과 함께 이해하고 싶은 팀'
    ],
    sourceUrl: '',
    sourceLabel: '리텐션 문서 링크 연결'
  },
  {
    id: 'landing-ab',
    category: 'experiment',
    categoryLabel: 'Experiment design',
    kind: 'A/B test',
    status: '링크만 추가하면 공개',
    title: '랜딩 A/B 테스트',
    summary: '히어로 문구와 CTA를 바꾸는 실험이지만, 실제로는 무엇을 검증하려는지부터 보이게 설계한 테스트 케이스입니다.',
    question: '카피 문구 변경이 아니라 사용자가 어떤 맥락에서 첫 행동을 결정하는지 검증하려면 실험 구조를 어떻게 짜야 하는가?',
    metric: '전환율 · 클릭률 · 스크롤 도달 · 세그먼트별 반응',
    source: '랜딩 페이지 이벤트, AB 테스트 도구 결과, 카피 버전 로그',
    deliverable: '실험 설계서 · 결과 요약 · 다음 실험 제안',
    tags: ['AB테스트', '가설검증', '랜딩'],
    highlights: [
      '결과 수치보다 가설 정의와 해석 범위를 먼저 적는 구조',
      '유의성 여부뿐 아니라 다음 액션으로 이어지는 판단 기준을 노출',
      '카피 테스트를 퍼널 전환 맥락에서 읽히게 만드는 설명 방식'
    ],
    audience: [
      '실험을 많이 했는지보다 실험을 어떻게 설계하는지를 보고 싶은 팀',
      '마케팅 카피와 전환 경험을 함께 보는 역할의 검토자',
      '퍼널 중 어느 구간을 바꿨는지 빠르게 파악하고 싶은 협업자'
    ],
    sourceUrl: '',
    sourceLabel: '실험 문서 링크 연결'
  },
  {
    id: 'purchase-barrier',
    category: 'insight',
    categoryLabel: 'Insight memo',
    kind: 'Insight note',
    status: '메모형 자산',
    title: '통찰 노트: 구매 장벽',
    summary: '퍼널 이탈 구간을 진단하고, 질문·카피·보장 정책처럼 비용이 낮은 레버리지를 빠르게 제안하는 인사이트 메모입니다.',
    question: '전환 저하를 무조건 더 많은 예산이나 기능 문제로 보지 않고, 왜 사용자가 멈추는지 어떻게 빠르게 구조화할 수 있는가?',
    metric: '상세 체류 · 장바구니 진입 · 결제 이탈 · FAQ 클릭',
    source: '퍼널 요약, 사용자 반응 메모, 랜딩/상세 페이지 관찰',
    deliverable: '인사이트 메모 · Quick Win 리스트 · 카피 수정안',
    tags: ['인사이트', '레버리지', '퍼널'],
    highlights: [
      '큰 프로젝트가 아니라도 바로 실행 가능한 레버를 먼저 노출',
      '측정 지표와 정성 관찰을 한 문맥으로 묶어 해석하는 방식 강조',
      '실무에서 빠르게 공유하기 좋은 메모형 산출물 구조 유지'
    ],
    audience: [
      '짧은 시간 안에 병목을 잡아야 하는 운영/그로스 팀',
      '정교한 리서치보다 즉시 실행 가능한 개선 포인트가 필요한 경우',
      '문장 하나, 보장 정책 하나가 전환을 바꿀 수 있는 상황을 다루는 팀'
    ],
    sourceUrl: '',
    sourceLabel: '인사이트 메모 링크 연결'
  }
];

const CATEGORY_LABELS = {
  all: '전체',
  trend: '트렌드',
  marketing: '광고 / 대시보드',
  user: '사용자',
  experiment: '실험',
  insight: '인사이트'
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const state = { filter: 'all', activeId: null };

function createElement(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html !== undefined) el.innerHTML = html;
  return el;
}

function filterCases(filter) {
  if (filter === 'all') return CASES;
  return CASES.filter((item) => item.category === filter);
}

function getCounts() {
  return CASES.reduce((acc, item) => {
    acc.all += 1;
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, { all: 0 });
}

function renderFilters() {
  const bar = $('#filterBar');
  const counts = getCounts();
  const categories = ['all', ...Object.keys(CATEGORY_LABELS).filter((key) => key !== 'all')];
  bar.innerHTML = '';

  categories.forEach((category) => {
    const button = createElement('button', 'insight-filter');
    button.type = 'button';
    button.dataset.filter = category;
    button.setAttribute('aria-pressed', String(state.filter === category));
    if (state.filter === category) button.classList.add('is-active');
    button.innerHTML = `
      <span>${CATEGORY_LABELS[category]}</span>
      <span class="insight-filter__count">${counts[category] || 0}</span>
    `;
    button.addEventListener('click', () => {
      state.filter = category;
      renderFilters();
      renderGrid();
    });
    bar.appendChild(button);
  });
}

function revealCards(scope) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.insight-case.reveal', scope).forEach((card) => observer.observe(card));
  } else {
    $$('.insight-case.reveal', scope).forEach((card) => card.classList.add('is-visible'));
  }
}

function renderGrid() {
  const grid = $('#caseGrid');
  const items = filterCases(state.filter);
  grid.innerHTML = '';

  if (!items.length) {
    grid.appendChild(createElement('div', 'empty-state', '조건에 맞는 케이스가 없습니다.'));
    return;
  }

  items.forEach((item) => {
    const article = createElement('article', 'case-card reveal insight-case');
    article.innerHTML = `
      <div class="insight-case__head">
        <span class="insight-case__kind">${item.kind}</span>
        <span class="insight-case__status">${item.status}</span>
      </div>

      <div>
        <p class="case-card__eyebrow">${item.categoryLabel}</p>
        <h3>${item.title}</h3>
      </div>

      <p class="insight-case__summary">${item.summary}</p>

      <div class="insight-case__question">
        <strong>핵심 질문</strong>
        <p>${item.question}</p>
      </div>

      <dl class="insight-case__meta">
        <div>
          <dt>대표 지표</dt>
          <dd>${item.metric}</dd>
        </div>
        <div>
          <dt>산출물</dt>
          <dd>${item.deliverable}</dd>
        </div>
      </dl>

      <ul class="insight-case__tags">
        ${item.tags.map((tag) => `<li>#${tag}</li>`).join('')}
      </ul>

      <div class="insight-case__actions">
        <button class="insight-case__button insight-case__button--primary" type="button" data-open="${item.id}">구조 보기</button>
        <a class="insight-case__button" ${item.sourceUrl ? `href="${item.sourceUrl}" target="_blank" rel="noopener"` : 'href="#" aria-disabled="true"'}>${item.sourceLabel}</a>
      </div>
    `;
    grid.appendChild(article);
  });

  revealCards(grid);

  $$('[data-open]', grid).forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.open));
  });

  $$('a[aria-disabled="true"]', grid).forEach((anchor) => {
    anchor.addEventListener('click', (event) => event.preventDefault());
  });
}

function openModal(id) {
  const item = CASES.find((entry) => entry.id === id);
  if (!item) return;
  state.activeId = id;

  $('#modalCategory').textContent = item.categoryLabel;
  $('#modalTitle').textContent = item.title;
  $('#modalSummary').textContent = item.summary;
  $('#modalQuestion').textContent = item.question;
  $('#modalMetric').textContent = item.metric;
  $('#modalSource').textContent = item.source;
  $('#modalDeliverable').textContent = item.deliverable;
  $('#modalTags').innerHTML = item.tags.map((tag) => `<li>#${tag}</li>`).join('');
  $('#modalHighlights').innerHTML = item.highlights.map((point) => `<li>${point}</li>`).join('');
  $('#modalAudience').innerHTML = item.audience.map((point) => `<li>${point}</li>`).join('');

  const actions = $('#modalActions');
  actions.innerHTML = '';

  if (item.sourceUrl) {
    const sourceLink = createElement('a', 'button button--primary', item.sourceLabel);
    sourceLink.href = item.sourceUrl;
    sourceLink.target = '_blank';
    sourceLink.rel = 'noopener';
    actions.appendChild(sourceLink);
  } else {
    actions.appendChild(createElement('span', 'insight-case__status', '원본 링크 슬롯 비어 있음'));
  }

  const closeButton = createElement('button', 'button button--secondary', '닫기');
  closeButton.type = 'button';
  closeButton.addEventListener('click', closeModal);
  actions.appendChild(closeButton);

  $('#insightModal').hidden = false;
  document.body.classList.add('modal-open');
  $('.insight-modal__close').focus();
}

function closeModal() {
  $('#insightModal').hidden = true;
  document.body.classList.remove('modal-open');
  state.activeId = null;
}

function bindModal() {
  $$('[data-modal-close]').forEach((el) => el.addEventListener('click', closeModal));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('#insightModal').hidden) closeModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderGrid();
  bindModal();
});
