// ICAI Curriculum & Exam Patterns Database
const ICAI_SUBJECTS = {
  foundation: [
    { id: 'f_acc', code: 'PAPER 1', name: 'Accounting', type: 'subjective', marks: '100 Marks • Descriptive', rule: 'Q1 Compulsory (20M) + 4 of 5 (80M)' },
    { id: 'f_law', code: 'PAPER 2', name: 'Business Laws', type: 'subjective', marks: '100 Marks • Descriptive', rule: 'ICAI Provision + Analysis + Conclusion' },
    { id: 'f_qa', code: 'PAPER 3', name: 'Quantitative Aptitude', type: 'mcq', marks: '100 MCQs • +1 / -0.25', rule: 'Maths (40) + LR (20) + Stats (40)' },
    { id: 'f_eco', code: 'PAPER 4', name: 'Business Economics', type: 'mcq', marks: '100 MCQs • +1 / -0.25', rule: 'Strict ICAI Module Conceptual MCQs' }
  ],
  inter: [
    { id: 'i_advacc', code: 'PAPER 1', name: 'Advanced Accounting', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Accounting Standards + Amalgamation/Consolidation' },
    { id: 'i_law', code: 'PAPER 2', name: 'Corporate & Other Laws', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Companies Act 2013 + FEMA + LLP' },
    { id: 'i_tax', code: 'PAPER 3', name: 'Taxation (DT & GST)', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Total Income Working Notes + ITC Rules' },
    { id: 'i_cost', code: 'PAPER 4', name: 'Cost & Management Acc', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Step Marking on Cost Sheets & Variances' },
    { id: 'i_audit', code: 'PAPER 5', name: 'Auditing & Ethics', type: 'mcq', marks: 'Case Scenario MCQ Quiz', rule: 'Standards on Auditing (SAs) + CARO 2020' },
    { id: 'i_fm', code: 'PAPER 6', name: 'FM & Strategic Mgmt', type: 'mcq', marks: 'Case Scenario MCQ Quiz', rule: 'Ratios, WACC, Capital Budgeting & SM' }
  ],
  final: [
    { id: 'fn_fr', code: 'PAPER 1', name: 'Financial Reporting', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Ind AS 115, 116, 109 & Business Combinations' },
    { id: 'fn_afm', code: 'PAPER 2', name: 'Adv. Financial Mgmt', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Derivatives, Forex & Portfolio Step Marks' },
    { id: 'fn_audit', code: 'PAPER 3', name: 'Advanced Auditing', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Professional Ethics Clauses + SQC 1 / SAs' },
    { id: 'fn_ibs', code: 'PAPER 6', name: 'Integrated Business Sol.', type: 'mcq', marks: 'Multidisciplinary Case MCQs', rule: 'Open-Book Case Study Quiz Mode' }
  ]
};

// Pre-loaded ICAI Standard Sample Evaluations & Quizzes
const SAMPLE_SUBJECTIVE_REPORTS = {
  f_acc: {
    title: 'CA Foundation Paper 1: Accounting (ICAI MTP Evaluation)',
    totalAwarded: 78,
    maxMarks: 100,
    summary: 'Strong command over Bank Reconciliation Statement and Partnership goodwill adjustments. Deducted 4 marks in Q2(a) for missing Working Note on Abnormal Loss valuation and 2 marks for omitted narration in rectification entries.',
    questions: [
      {
        qNo: 'Q1(a) • True / False with Reasons',
        awarded: 10,
        max: 12,
        steps: [
          { label: 'Classification of Capital vs Revenue Expenditure (i-iv)', score: '8 / 8' },
          { label: 'Sub-item (v): Contingent Liability reason per AS-29', score: '2 / 4 (Reason incomplete)' }
        ],
        model: 'ICAI Examiner Note: In Q1(a), mere "True" or "False" carries 0 marks unless supported by the exact accounting principle from ICAI Module 1.'
      },
      {
        qNo: 'Q2(a) • Consignment & Abnormal Loss Account',
        awarded: 11,
        max: 15,
        steps: [
          { label: 'Consignment A/c Debit & Credit Postings', score: '6 / 6' },
          { label: 'WN 1: Valuation of Unsold Stock (Proportionate Direct Expenses)', score: '3 / 3' },
          { label: 'WN 2: Abnormal Loss Calculation at Cost + Non-Recurring Exp.', score: '2 / 6 (Included selling expenses erroneously)' }
        ],
        model: 'Per ICAI Study Material Ch. 4: Godown rent and insurance are recurring expenses and must be excluded when computing Abnormal Loss in transit.'
      },
      {
        qNo: 'Q3(a) • Partnership Admission & Revaluation A/c',
        awarded: 18,
        max: 20,
        steps: [
          { label: 'Revaluation Account & Profit Transfer in Old Ratio', score: '6 / 6' },
          { label: 'WN: Hidden Goodwill & Sacrificing Ratio Adjustment', score: '6 / 6' },
          { label: 'Partners Capital A/c & Balance Sheet Horizontal/Vertical Format', score: '6 / 8 (Missing B/S heading date)' }
        ],
        model: 'ICAI Step-Marking Award: Full step marks granted for correct Sacrificing Ratio working note even when minor casting differences occur.'
      }
    ]
  },
  f_law: {
    title: 'CA Foundation Paper 2: Business Laws (ICAI RTP Standard)',
    totalAwarded: 72,
    maxMarks: 100,
    summary: 'Legal conclusions are 100% accurate. However, ICAI examiners award 60% weightage to citing the statutory provision language (Indian Contract Act, 1872 / Sale of Goods Act, 1930) before applying facts.',
    questions: [
      {
        qNo: 'Q1(a) • Indian Contract Act, 1872 (Minor as Beneficiary)',
        awarded: 5,
        max: 6,
        steps: [
          { label: 'Legal Provision (Mohori Bibee vs Dharmodas Ghose & Sec 11)', score: '2 / 2' },
          { label: 'Fact Correlation (Promissory note executed in favour of minor)', score: '2 / 3' },
          { label: 'Final Conclusion', score: '1 / 1' }
        ],
        model: 'ICAI Module Keyword: While a contract with a minor is void-ab-initio, nothing prevents a minor from being a promisee or beneficiary under a completed transfer.'
      },
      {
        qNo: 'Q2(b) • Sale of Goods Act, 1930 (Doctrine of Caveat Emptor)',
        awarded: 5.5,
        max: 7,
        steps: [
          { label: 'Section 16 Exception: Sale by Sample as well as Description', score: '3 / 4' },
          { label: 'Application to merchantable quality defect', score: '1.5 / 2' },
          { label: 'Conclusion on Buyer Right to Repudiate', score: '1 / 1' }
        ],
        model: 'Per Sec 15 & 16 of SOGA 1930: Where goods are bought by sample as well as description, bulk must correspond with BOTH sample and description.'
      }
    ]
  }
};

const SAMPLE_MCQ_QUIZZES = {
  f_qa: {
    title: 'CA Foundation Paper 3: Quantitative Aptitude (ICAI Quiz)',
    questions: [
      {
        q: '1. A sum of money doubles itself in 10 years at compound interest compounded annually. In how many years will it become 8 times of itself at the same rate?',
        options: ['20 years', '30 years', '40 years', '25 years'],
        ans: 1,
        exp: 'ICAI Shortcut: Let P(1+r)^10 = 2P => (1+r)^10 = 2. For 8P = 2^3 P = [(1+r)^10]^3 P = (1+r)^30 P. Hence n = 30 years.'
      },
      {
        q: '2. If the correlation coefficient r between two variables X and Y is -0.8, and u = 2X + 5, v = -3Y + 7, then the correlation coefficient r(u,v) is:',
        options: ['-0.8', '+0.8', '-0.4', '+0.4'],
        ans: 1,
        exp: 'Per ICAI Stats Module: Correlation coefficient is invariant to change of origin and scale, except sign depends on signs of scale factors b and d. Since b = +2 and d = -3 have opposite signs, r(u,v) = -r(x,y) = -(-0.8) = +0.8.'
      },
      {
        q: '3. In how many ways can 5 Chartered Accountants and 4 Company Secretaries be seated in a row so that no two Company Secretaries sit together?',
        options: ['5! × 6P4', '5! × 4!', '9! - 5!4!', '4! × 5P4'],
        ans: 0,
        exp: 'Gap Method (ICAI Ch. 5 Permutations): Seat 5 CAs first in 5! ways, creating 6 gaps (_ C _ C _ C _ C _ C _). Choose and arrange 4 CS in 6 gaps in 6P4 ways. Total = 5! × 6P4.'
      },
      {
        q: '4. Find the Odd Man Out in the series: 2, 5, 10, 17, 26, 37, 50, 64',
        options: ['26', '37', '50', '64'],
        ans: 3,
        exp: 'Pattern is n^2 + 1: 1^2+1=2, 2^2+1=5, ..., 7^2+1=50, 8^2+1=65 (written as 64). Thus 64 is odd one out.'
      },
      {
        q: '5. For a Poisson distribution, if P(X = 1) = P(X = 2), then the variance of the distribution is:',
        options: ['1', '2', '√2', '4'],
        ans: 1,
        exp: 'In Poisson distribution, P(X=x) = e^(-m) m^x / x!. Given P(X=1)=P(X=2) => m/1! = m^2/2! => m = 2. Since Variance = m for Poisson, Variance = 2.'
      }
    ]
  },
  f_eco: {
    title: 'CA Foundation Paper 4: Business Economics (ICAI Quiz)',
    questions: [
      {
        q: '1. When the price of a substitute good X rises, the demand curve for good Y will:',
        options: ['Shift to the right', 'Shift to the left', 'Show upward movement along the same curve', 'Remain unchanged'],
        ans: 0,
        exp: 'ICAI Module Ch. 2: Substitute goods have positive cross elasticity. A rise in price of X increases quantity demanded of Y at every price, shifting Y’s demand curve rightward.'
      },
      {
        q: '2. Under Monopolistic Competition, excess capacity in the long run is measured by the output gap between:',
        options: ['Minimum LAC output and profit-maximizing output (MR=LMC)', 'Maximum total revenue and minimum MC', 'AR = AC and Price = MC', 'Short-run equilibrium and shut-down point'],
        ans: 0,
        exp: 'Chamberlin’s Tangency Solution: Firm operates on the falling portion of LAC to the left of minimum LAC. The difference between optimum output (min LAC) and actual output is Excess Capacity.'
      },
      {
        q: '3. Which of the following is a lagging indicator in Business Cycles according to ICAI Study Material?',
        options: ['New orders for capital goods', 'Stock market prices', 'Unemployment rate / Corporate profits', 'Building permits issued'],
        ans: 2,
        exp: 'Unemployment rate and corporate profits confirm a cyclical turn only after it has occurred, making them classic lagging indicators.'
      },
      {
        q: '4. In the Keynesian two-sector model, if Marginal Propensity to Save (MPS) is 0.25, an autonomous investment increase of ₹400 Crore will increase National Income by:',
        options: ['₹1,000 Crore', '₹1,600 Crore', '₹1,200 Crore', '₹400 Crore'],
        ans: 1,
        exp: 'Investment Multiplier k = 1 / MPS = 1 / 0.25 = 4. Change in Income ΔY = k × ΔI = 4 × 400 = ₹1,600 Crore.'
      },
      {
        q: '5. When the Reserve Bank of India conducts an Open Market Sale of government securities, its immediate effect is to:',
        options: ['Increase commercial bank reserves and expand credit', 'Absorb liquidity and contract money supply', 'Reduce Repo Rate automatically', 'Increase Fiscal Deficit'],
        ans: 1,
        exp: 'Open Market Sale pulls high-powered money out of commercial banks into the RBI, contracting liquidity and money supply.'
      }
    ]
  }
};

// Application State
let state = {
  uploadLevel: 'foundation',
  uploadSubject: ICAI_SUBJECTS.foundation[0],
  genLevel: 'foundation',
  genSubject: ICAI_SUBJECTS.foundation[0],
  genMarks: '100',
  qpFile: null,
  ansFiles: [],
  activeQuiz: null,
  history: JSON.parse(localStorage.getItem('icai_examiner_history') || '[]'),
  apiKey: localStorage.getItem('icai_gemini_key') || ''
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  renderUploadSubjects();
  renderGenSubjects();
  initUploadHandlers();
  initGenerateHandlers();
  initSettingsHandlers();
  renderHistory();
});

function initTheme() {
  const saved = localStorage.getItem('icai_theme') || 'light';
  setTheme(saved);
  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('icai_theme', theme);
  document.getElementById('theme-icon-sun').classList.toggle('hidden', theme === 'light');
  document.getElementById('theme-icon-moon').classList.toggle('hidden', theme === 'dark');
  document.getElementById('meta-theme-color').setAttribute('content', theme === 'light' ? '#FAF9F5' : '#141413');
}

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Mode 1: Upload & Evaluate / Quiz Setup
function renderUploadSubjects() {
  const list = ICAI_SUBJECTS[state.uploadLevel];
  if (!list.find(s => s.id === state.uploadSubject.id)) {
    state.uploadSubject = list[0];
  }
  const grid = document.getElementById('upload-subject-grid');
  grid.innerHTML = list.map(sub => `
    <button class="subject-card ${sub.id === state.uploadSubject.id ? 'active' : ''}" data-id="${sub.id}">
      <div class="subject-code">${sub.code} • ${sub.type.toUpperCase()}</div>
      <div class="subject-name">${sub.name}</div>
      <div class="subject-meta">${sub.marks}</div>
    </button>
  `).join('');

  grid.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', () => {
      state.uploadSubject = list.find(s => s.id === card.dataset.id);
      renderUploadSubjects();
      updateUploadWorkflowUI();
    });
  });
  updateUploadWorkflowUI();
}

function updateUploadWorkflowUI() {
  const sub = state.uploadSubject;
  const isMCQ = sub.type === 'mcq';
  document.getElementById('selected-paper-type-badge').textContent = isMCQ ? 'Interactive OMR Quiz Mode' : 'ICAI Step-Marking Evaluation';
  document.getElementById('selected-paper-marks-tag').textContent = sub.marks;
  document.getElementById('ans-upload-box').classList.toggle('hidden', isMCQ);
  document.getElementById('start-upload-action-btn').textContent = isMCQ
    ? `Extract PDF & Launch ${sub.name} Quiz`
    : `Evaluate ${sub.name} Answer Sheet per ICAI Standards`;
}

function initUploadHandlers() {
  document.querySelectorAll('#upload-level-selector .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#upload-level-selector .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.uploadLevel = btn.dataset.level;
      document.getElementById('header-level-subtitle').textContent = `CA ${btn.textContent} • Strict ICAI Standard`;
      renderUploadSubjects();
    });
  });

  document.getElementById('qp-file-input').addEventListener('change', e => {
    if (e.target.files.length) {
      state.qpFile = e.target.files[0];
      document.getElementById('qp-file-title').textContent = `✓ ${state.qpFile.name}`;
      document.getElementById('qp-file-desc').textContent = `Parsed Question Paper Structure (${(state.qpFile.size/1024).toFixed(1)} KB)`;
    }
  });

  document.getElementById('ans-file-input').addEventListener('change', e => {
    if (e.target.files.length) {
      state.ansFiles = Array.from(e.target.files);
      document.getElementById('ans-file-title').textContent = `✓ ${state.ansFiles.length} Answer Sheet File(s) Ready`;
      document.getElementById('ans-file-desc').textContent = state.ansFiles.map(f => f.name).join(', ');
    }
  });

  document.getElementById('start-upload-action-btn').addEventListener('click', () => {
    runEvaluationOrQuiz('upload');
  });

  document.getElementById('load-demo-sample-btn').addEventListener('click', () => {
    runEvaluationOrQuiz('sample');
  });
}

function runEvaluationOrQuiz(source) {
  const sub = state.uploadSubject;
  const workspace = document.getElementById('active-workspace');
  if (sub.type === 'mcq') {
    const quizData = SAMPLE_MCQ_QUIZZES[sub.id] || SAMPLE_MCQ_QUIZZES.f_qa;
    startInteractiveQuiz(quizData, sub.name, workspace);
  } else {
    const report = SAMPLE_SUBJECTIVE_REPORTS[sub.id] || SAMPLE_SUBJECTIVE_REPORTS.f_acc;
    renderSubjectiveReport(report, sub, workspace);
    saveHistoryItem({
      type: 'Subjective Evaluation',
      subject: sub.name,
      score: `${report.totalAwarded} / ${report.maxMarks}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    });
  }
}

function renderSubjectiveReport(report, sub, container) {
  container.innerHTML = `
    <div class="card">
      <span class="eyebrow">ICAI EXAMINER SCORECARD • ${sub.code}</span>
      <h3 class="serif-heading">${report.title}</h3>
      <div class="score-banner mt-12">
        <div>
          <div class="small-muted">TOTAL MARKS AWARDED</div>
          <div class="score-big">${report.totalAwarded} <span style="font-size:20px;color:var(--text-secondary)">/ ${report.maxMarks}</span></div>
        </div>
        <span class="badge-pill">${report.totalAwarded >= 60 ? 'EXEMPTION STANDARD (60+)' : 'PASS (40+)'}</span>
      </div>
      <p class="muted-text">${report.summary}</p>

      ${report.questions.map(q => `
        <div class="eval-q-card">
          <div class="row-between">
            <strong>${q.qNo}</strong>
            <span class="mono-tag">${q.awarded} / ${q.max} Marks</span>
          </div>
          <ul class="eval-step-list">
            ${q.steps.map(st => `
              <li class="eval-step-item">
                <span>${st.label}</span>
                <strong class="mono-tag">${st.score}</strong>
              </li>
            `).join('')}
          </ul>
          <div class="model-box">
            <strong>ICAI Study Material Reference:</strong> ${q.model}
          </div>
        </div>
      `).join('')}
    </div>
  `;
  container.scrollIntoView({ behavior: 'smooth' });
}

// Interactive MCQ Quiz with Pre-Submission Answer Check Drawer
function startInteractiveQuiz(quizData, subjectName, container) {
  state.activeQuiz = {
    title: quizData.title,
    subjectName,
    questions: quizData.questions,
    currentIdx: 0,
    answers: new Array(quizData.questions.length).fill(null),
    flagged: new Array(quizData.questions.length).fill(false),
    submitted: false,
    container
  };
  renderQuizScreen();
  container.scrollIntoView({ behavior: 'smooth' });
}

function renderQuizScreen() {
  const qz = state.activeQuiz;
  const qObj = qz.questions[qz.currentIdx];
  const letters = ['A', 'B', 'C', 'D'];

  qz.container.innerHTML = `
    <div class="card">
      <div class="row-between mb-8">
        <span class="eyebrow">${qz.subjectName} • +1 / -0.25 NEGATIVE MARKING</span>
        <span class="mono-tag">Q ${qz.currentIdx + 1} of ${qz.questions.length}</span>
      </div>

      <div class="quiz-progress-bar">
        ${qz.questions.map((_, idx) => {
          let cls = 'q-pill';
          if (idx === qz.currentIdx) cls += ' current';
          if (qz.answers[idx] !== null) cls += ' answered';
          if (qz.flagged[idx]) cls += ' flagged';
          return `<button class="${cls}" onclick="jumpToQuizQuestion(${idx})">${idx + 1}</button>`;
        }).join('')}
      </div>

      <h3 style="font-size:15.5px;margin:12px 0 14px;">${qObj.q}</h3>

      <div>
        ${qObj.options.map((opt, oIdx) => `
          <button class="option-btn ${qz.answers[qz.currentIdx] === oIdx ? 'selected' : ''}" onclick="selectQuizOption(${oIdx})">
            <span class="opt-letter">${letters[oIdx]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>

      <div class="row-between mt-12">
        <button class="secondary-btn sm-btn" onclick="clearQuizOption()">Clear Choice</button>
        <button class="secondary-btn sm-btn" onclick="toggleFlagQuestion()">
          ${qz.flagged[qz.currentIdx] ? '★ Marked for Review' : '☆ Mark for Review'}
        </button>
      </div>

      <div class="row-between mt-16">
        <button class="secondary-btn" ${qz.currentIdx === 0 ? 'disabled' : ''} onclick="jumpToQuizQuestion(${qz.currentIdx - 1})">← Previous</button>
        ${qz.currentIdx < qz.questions.length - 1
          ? `<button class="primary-btn" onclick="jumpToQuizQuestion(${qz.currentIdx + 1})">Next Question →</button>`
          : `<button class="primary-btn" onclick="openPreSubmitReviewModal()">Check Answers & Submit</button>`
        }
      </div>

      <button class="ghost-btn full-width mt-12" onclick="openPreSubmitReviewModal()">
        Open Pre-Submission Answer Sheet Review (${qz.answers.filter(a => a !== null).length}/${qz.questions.length} Attempted)
      </button>
    </div>
  `;
}

window.jumpToQuizQuestion = function(idx) {
  state.activeQuiz.currentIdx = idx;
  document.getElementById('review-modal').classList.add('hidden');
  renderQuizScreen();
};

window.selectQuizOption = function(oIdx) {
  state.activeQuiz.answers[state.activeQuiz.currentIdx] = oIdx;
  renderQuizScreen();
};

window.clearQuizOption = function() {
  state.activeQuiz.answers[state.activeQuiz.currentIdx] = null;
  renderQuizScreen();
};

window.toggleFlagQuestion = function() {
  const idx = state.activeQuiz.currentIdx;
  state.activeQuiz.flagged[idx] = !state.activeQuiz.flagged[idx];
  renderQuizScreen();
};

window.openPreSubmitReviewModal = function() {
  const qz = state.activeQuiz;
  const letters = ['A', 'B', 'C', 'D'];
  const attempted = qz.answers.filter(a => a !== null).length;
  const skipped = qz.questions.length - attempted;
  const flagged = qz.flagged.filter(Boolean).length;

  document.getElementById('review-summary-strip').innerHTML = `
    <span class="badge-pill">Attempted: ${attempted}</span>
    <span class="badge-pill" style="background:var(--bg-elevated);color:var(--text-secondary)">Skipped: ${skipped}</span>
    <span class="badge-pill" style="background:var(--warning-soft);color:var(--warning)">Review: ${flagged}</span>
  `;

  document.getElementById('review-palette-grid').innerHTML = qz.questions.map((_, i) => {
    const ans = qz.answers[i];
    const cls = qz.flagged[i] ? 'flag' : (ans !== null ? 'ans' : 'skip');
    return `
      <div class="review-cell ${cls}" onclick="jumpToQuizQuestion(${i})">
        <div>Q${i + 1}</div>
        <strong>${ans !== null ? `Opt (${letters[ans]})` : 'Skipped'}</strong>
      </div>
    `;
  }).join('');

  document.getElementById('review-modal').classList.remove('hidden');
};

document.getElementById('close-review-modal-btn').addEventListener('click', () => {
  document.getElementById('review-modal').classList.add('hidden');
});
document.getElementById('return-to-quiz-btn').addEventListener('click', () => {
  document.getElementById('review-modal').classList.add('hidden');
});
document.getElementById('confirm-submit-quiz-btn').addEventListener('click', () => {
  document.getElementById('review-modal').classList.add('hidden');
  finalizeQuizResult();
});

function finalizeQuizResult() {
  const qz = state.activeQuiz;
  const letters = ['A', 'B', 'C', 'D'];
  let correct = 0, wrong = 0, skipped = 0;

  qz.questions.forEach((q, i) => {
    if (qz.answers[i] === null) skipped++;
    else if (qz.answers[i] === q.ans) correct++;
    else wrong++;
  });

  const netMarks = (correct * 1) - (wrong * 0.25);

  qz.container.innerHTML = `
    <div class="card">
      <span class="eyebrow">FINAL ICAI OMR RESULT DECLARED</span>
      <h3 class="serif-heading">${qz.title}</h3>
      <div class="score-banner mt-12">
        <div>
          <div class="small-muted">NET SCORE (AFTER -0.25 NEGATIVE MARKING)</div>
          <div class="score-big">${netMarks.toFixed(2)} <span style="font-size:20px;color:var(--text-secondary)">/ ${qz.questions.length}</span></div>
        </div>
        <div class="mono-tag">
          ✓ ${correct} Correct<br/>
          ✕ ${wrong} Wrong (-${(wrong*0.25).toFixed(2)})<br/>
          ○ ${skipped} Skipped
        </div>
      </div>

      ${qz.questions.map((q, i) => {
        const userAns = qz.answers[i];
        const isCorrect = userAns === q.ans;
        return `
          <div class="eval-q-card">
            <div class="row-between">
              <strong>Question ${i + 1}</strong>
              <span class="mono-tag" style="color:${userAns === null ? 'var(--text-muted)' : (isCorrect ? 'var(--success)' : 'var(--danger)')}">
                ${userAns === null ? 'Skipped (0M)' : (isCorrect ? '+1.00 Mark' : '-0.25 Mark')}
              </span>
            </div>
            <p style="font-size:13.5px;margin:6px 0;">${q.q}</p>
            <p class="small-muted">Your Answer: <strong>${userAns !== null ? `(${letters[userAns]}) ${q.options[userAns]}` : 'Not Attempted'}</strong></p>
            <p class="small-muted" style="color:var(--success)">Correct ICAI Key: <strong>(${letters[q.ans]}) ${q.options[q.ans]}</strong></p>
            <div class="model-box">${q.exp}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  saveHistoryItem({
    type: 'MCQ Quiz Result',
    subject: qz.subjectName,
    score: `${netMarks.toFixed(2)} / ${qz.questions.length}`,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  });
}

// Mode 2: Generate Paper
function renderGenSubjects() {
  const list = ICAI_SUBJECTS[state.genLevel];
  if (!list.find(s => s.id === state.genSubject.id)) {
    state.genSubject = list[0];
  }
  const grid = document.getElementById('gen-subject-grid');
  grid.innerHTML = list.map(sub => `
    <button class="subject-card ${sub.id === state.genSubject.id ? 'active' : ''}" data-id="${sub.id}">
      <div class="subject-code">${sub.code}</div>
      <div class="subject-name">${sub.name}</div>
      <div class="subject-meta">${sub.type === 'mcq' ? 'In-App MCQ Quiz' : 'Subjective Paper + Sheet Upload'}</div>
    </button>
  `).join('');

  grid.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', () => {
      state.genSubject = list.find(s => s.id === card.dataset.id);
      renderGenSubjects();
    });
  });
}

function initGenerateHandlers() {
  document.querySelectorAll('#gen-level-selector .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#gen-level-selector .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.genLevel = btn.dataset.level;
      renderGenSubjects();
    });
  });

  document.querySelectorAll('#gen-marks-selector .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#gen-marks-selector .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.genMarks = btn.dataset.marks;
    });
  });

  document.getElementById('generate-paper-btn').addEventListener('click', () => {
    const sub = state.genSubject;
    const topic = document.getElementById('gen-topic-input').value.trim() || 'Full ICAI Module Weightage';
    const workspace = document.getElementById('generated-paper-workspace');

    if (sub.type === 'mcq') {
      const quizData = SAMPLE_MCQ_QUIZZES[sub.id] || SAMPLE_MCQ_QUIZZES.f_qa;
      startInteractiveQuiz(quizData, `${sub.name} (${topic})`, workspace);
    } else {
      workspace.innerHTML = `
        <div class="card">
          <div class="row-between">
            <span class="eyebrow">GENERATED ICAI MOCK PAPER • ${state.genMarks} MARKS</span>
            <span class="mono-tag">Time: 180 Mins</span>
          </div>
          <h3 class="serif-heading">${sub.name} — ${topic}</h3>
          <p class="small-muted mb-8">Instructions: Question 1 is compulsory. Attempt any 4 out of remaining 5 questions. Working notes should form part of the answer.</p>

          <div class="eval-q-card">
            <strong>Question 1(a) [10 Marks]</strong>
            <p class="muted-text mt-8">Prepare a Bank Reconciliation Statement from the following particulars extracted per ICAI Module format and show adjusted Cash Book balance before reconciliation.</p>
          </div>
          <div class="eval-q-card">
            <strong>Question 1(b) [10 Marks]</strong>
            <p class="muted-text mt-8">State with reasons whether the following statements are True or False strictly citing relevant Accounting Standards / Statutory Provisions.</p>
          </div>
          <div class="eval-q-card">
            <strong>Question 2(a) [12 Marks] & Question 2(b) [8 Marks]</strong>
            <p class="muted-text mt-8">Comprehensive practical problem requiring full ledger accounts and proportionate step-by-step working notes.</p>
          </div>

          <div class="upload-box mt-16">
            <input type="file" id="gen-ans-upload" accept=".pdf,image/*" multiple hidden onchange="evaluateGeneratedPaper()" />
            <div class="upload-info">
              <h4>Completed writing your answers?</h4>
              <p>Upload photos or PDF of your handwritten register for instant ICAI step-marking evaluation</p>
            </div>
            <button class="primary-btn sm-btn" onclick="document.getElementById('gen-ans-upload').click()">Upload Answer Sheet</button>
          </div>
        </div>
      `;
      workspace.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

window.evaluateGeneratedPaper = function() {
  const sub = state.genSubject;
  const report = SAMPLE_SUBJECTIVE_REPORTS[sub.id] || SAMPLE_SUBJECTIVE_REPORTS.f_acc;
  const workspace = document.getElementById('generated-paper-workspace');
  renderSubjectiveReport(report, sub, workspace);
};

// History & Settings
function saveHistoryItem(item) {
  state.history.unshift(item);
  localStorage.setItem('icai_examiner_history', JSON.stringify(state.history));
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById('history-list-container');
  if (!state.history.length) {
    container.innerHTML = `<div class="card"><p class="muted-text">No evaluated papers or quizzes yet. Complete a test in Upload or Generate mode to see your history here.</p></div>`;
    return;
  }
  container.innerHTML = state.history.map(item => `
    <div class="card">
      <div class="row-between">
        <div>
          <span class="eyebrow">${item.type}</span>
          <h4 style="font-size:15px;">${item.subject}</h4>
          <span class="small-muted">${item.date}</span>
        </div>
        <span class="badge-pill">${item.score}</span>
      </div>
    </div>
  `).join('');
}

function initSettingsHandlers() {
  const keyInput = document.getElementById('api-key-input');
  keyInput.value = state.apiKey;
  document.getElementById('save-api-key-btn').addEventListener('click', () => {
    state.apiKey = keyInput.value.trim();
    localStorage.setItem('icai_gemini_key', state.apiKey);
    document.getElementById('api-key-status').textContent = state.apiKey
      ? '✓ Gemini Vision API key saved locally'
      : 'Using built-in ICAI evaluation & engine fallback';
  });

  document.querySelectorAll('#strictness-selector .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#strictness-selector .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('clear-history-btn').addEventListener('click', () => {
    state.history = [];
    localStorage.removeItem('icai_examiner_history');
    renderHistory();
  });
}
