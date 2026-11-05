// ICAI Curriculum & Exam Patterns Database
const ICAI_SUBJECTS = {
  foundation: [
    { id: 'f_acc', code: 'PAPER 1', name: 'Accounting', type: 'subjective', marks: '100 Marks • Descriptive', rule: 'Q1 Compulsory (20M) + 4 of 5 (80M). Check Working Notes, Ledger Formats & Narrations.' },
    { id: 'f_law', code: 'PAPER 2', name: 'Business Laws', type: 'subjective', marks: '100 Marks • Descriptive', rule: 'Strict ICAI 3-Step Rule: Applicable Legal Provision + Fact Analysis + Conclusion.' },
    { id: 'f_qa', code: 'PAPER 3', name: 'Quantitative Aptitude', type: 'mcq', marks: '100 MCQs • +1 / -0.25', rule: 'Business Mathematics (40M) + Logical Reasoning (20M) + Statistics (40M).' },
    { id: 'f_eco', code: 'PAPER 4', name: 'Business Economics', type: 'mcq', marks: '100 MCQs • +1 / -0.25', rule: 'Strict ICAI Study Material Conceptual & Numerical MCQs.' }
  ],
  inter: [
    { id: 'i_advacc', code: 'PAPER 1', name: 'Advanced Accounting', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Accounting Standards (AS) + Company Accounts & Amalgamation/Consolidation.' },
    { id: 'i_law', code: 'PAPER 2', name: 'Corporate & Other Laws', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Companies Act 2013 Sections + FEMA + LLP Act.' },
    { id: 'i_tax', code: 'PAPER 3', name: 'Taxation (DT & GST)', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Income Tax Working Notes + GST ITC & Value of Supply Provisions.' },
    { id: 'i_cost', code: 'PAPER 4', name: 'Cost & Management Acc', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Step Marking on Cost Sheets, Marginal Costing & Variance Analysis.' },
    { id: 'i_audit', code: 'PAPER 5', name: 'Auditing & Ethics', type: 'mcq', marks: 'Case Scenario MCQ / Descriptive', rule: 'Standards on Auditing (SAs) + CARO 2020 Clauses.' },
    { id: 'i_fm', code: 'PAPER 6', name: 'FM & Strategic Mgmt', type: 'mcq', marks: 'Case Scenario MCQ / Descriptive', rule: 'Financial Ratios, WACC, Capital Budgeting & Strategic Management.' }
  ],
  final: [
    { id: 'fn_fr', code: 'PAPER 1', name: 'Financial Reporting', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Ind AS 115, 116, 109 & Business Combinations Step Marking.' },
    { id: 'fn_afm', code: 'PAPER 2', name: 'Adv. Financial Mgmt', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'Derivatives, Forex Exposure & Portfolio Management Working Notes.' },
    { id: 'fn_audit', code: 'PAPER 3', name: 'Advanced Auditing', type: 'subjective', marks: '30M MCQ + 70M Descriptive', rule: 'CA Act First/Second Schedule Ethics Clauses + SQC 1 / SAs.' },
    { id: 'fn_ibs', code: 'PAPER 6', name: 'Integrated Business Sol.', type: 'mcq', marks: 'Multidisciplinary Case MCQs', rule: 'Open-Book Case Study Quiz Mode.' }
  ]
};

// Auto-upgrade any old saved 'gemini-2.5-flash' to 'gemini-3.0-flash'
let savedModel = localStorage.getItem('icai_gemini_model') || 'gemini-3.0-flash';
if (savedModel === 'gemini-2.5-flash') {
  savedModel = 'gemini-3.0-flash';
  localStorage.setItem('icai_gemini_model', savedModel);
}

let state = {
  uploadLevel: 'foundation',
  uploadSubject: ICAI_SUBJECTS.foundation[0],
  genLevel: 'foundation',
  genSubject: ICAI_SUBJECTS.foundation[0],
  genMarks: '100',
  strictness: 'Strict ICAI Standard',
  qpFiles: [],
  ansFiles: [],
  generatedPaperText: '',
  activeQuiz: null,
  history: JSON.parse(localStorage.getItem('icai_examiner_history_v2') || '[]'),
  apiKey: localStorage.getItem('icai_gemini_key') || '',
  model: savedModel
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  renderUploadSubjects();
  renderGenSubjects();
  initUploadHandlers();
  initGenerateHandlers();
  initSettingsHandlers();
  updateApiUI();
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

window.switchTab = function(targetId) {
  document.querySelectorAll('.nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.target === targetId);
  });
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === targetId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });
}

function updateApiUI() {
  const hasKey = Boolean(state.apiKey && state.apiKey.length > 10);
  document.getElementById('quick-api-banner').classList.toggle('hidden', hasKey);
  document.getElementById('api-status-dot').classList.toggle('connected', hasKey);
  document.getElementById('api-status-label').textContent = hasKey ? 'AI Vision Ready' : 'Set API Key';
  document.getElementById('api-key-input').value = state.apiKey;

  const selectEl = document.getElementById('model-select');
  const customInput = document.getElementById('custom-model-input');
  const optionExists = Array.from(selectEl.options).some(opt => opt.value === state.model);
  if (optionExists) {
    selectEl.value = state.model;
    customInput.classList.add('hidden');
  } else {
    selectEl.value = 'custom';
    customInput.value = state.model;
    customInput.classList.remove('hidden');
  }

  document.getElementById('api-key-status').textContent = hasKey
    ? `✓ Connected (${state.model})`
    : 'Paste your free Gemini API key above to enable live PDF & handwriting checking';
}

// Smart Image Compressor (Shrinks 6MB+ camera photos to crisp 1600px JPEGs so requests never time out)
function fileToInlineData(file) {
  return new Promise((resolve, reject) => {
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|heic)$/i.test(file.name);
    if (isImage && file.size > 1200 * 1024) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const maxDim = 1800;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.84);
        resolve({
          inlineData: {
            mimeType: 'image/jpeg',
            data: dataUrl.split(',')[1]
          }
        });
      };
      img.onerror = () => readRawFile(file, resolve, reject);
      img.src = url;
    } else {
      readRawFile(file, resolve, reject);
    }
  });
}

function readRawFile(file, resolve, reject) {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result.split(',')[1];
    let mimeType = file.type;
    if (!mimeType) {
      if (file.name.toLowerCase().endsWith('.pdf')) mimeType = 'application/pdf';
      else mimeType = 'image/jpeg';
    }
    resolve({
      inlineData: {
        mimeType: mimeType,
        data: base64String
      }
    });
  };
  reader.onerror = err => reject(err);
  reader.readAsDataURL(file);
}

// Query Google's /v1beta/models endpoint to discover valid models for this user's API key
async function fetchAvailableGeminiModels(apiKey) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.models || [])
      .filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
      .map(m => m.name.replace(/^models\//, ''))
      .filter(name => name.includes('gemini'));
  } catch (e) {
    return [];
  }
}

// Call Gemini Multimodal API with Automatic Model Fallback & Self-Healing
async function callGeminiVisionAPI(promptText, fileParts = []) {
  if (!state.apiKey || state.apiKey.length < 10) {
    throw new Error('Please paste your free Gemini API Key in the banner at the top or in Settings so the app can read your uploaded files.');
  }

  // Build ordered candidate model list starting with user's selected model, then gemini-3.0-flash, etc.
  const fallbackOrder = [
    state.model,
    'gemini-3.0-flash',
    'gemini-3.0-pro',
    'gemini-2.5-pro',
    'gemini-2.0-flash'
  ];
  const candidateModels = [...new Set(fallbackOrder.filter(Boolean))];

  let lastErrorMsg = '';

  for (let i = 0; i < candidateModels.length; i++) {
    const modelId = candidateModels[i];
    try {
      const result = await trySingleModelRequest(modelId, promptText, fileParts);
      // If a fallback model succeeded, save it as the active model automatically!
      if (modelId !== state.model) {
        state.model = modelId;
        localStorage.setItem('icai_gemini_model', modelId);
        updateApiUI();
      }
      return result;
    } catch (err) {
      lastErrorMsg = err.message || '';
      // Check if the error message explicitly suggests a replacement model (e.g., "models/gemini-3.0-flash")
      const suggestedMatch = lastErrorMsg.match(/models\/([a-zA-Z0-9._-]+)/);
      if (suggestedMatch && suggestedMatch[1] && !candidateModels.includes(suggestedMatch[1])) {
        candidateModels.splice(i + 1, 0, suggestedMatch[1]);
      }

      // If it's a model availability / not found / deprecated error, continue to the next candidate
      const isModelIssue = /no longer available|not found|not supported|deprecated|update your code|404/i.test(lastErrorMsg);
      if (!isModelIssue) {
        throw err;
      }
    }
  }

  // Last resort: query the user's account for any supported Gemini model and try the newest flash/pro model
  const discovered = await fetchAvailableGeminiModels(state.apiKey);
  const unreadModels = discovered.filter(m => !candidateModels.includes(m)).sort().reverse();
  for (const dynModel of unreadModels.slice(0, 3)) {
    try {
      const result = await trySingleModelRequest(dynModel, promptText, fileParts);
      state.model = dynModel;
      localStorage.setItem('icai_gemini_model', dynModel);
      updateApiUI();
      return result;
    } catch (e) {
      lastErrorMsg = e.message;
    }
  }

  throw new Error(`Gemini API Error: ${lastErrorMsg}`);
}

async function trySingleModelRequest(modelId, promptText, fileParts) {
  const cleanModel = modelId.replace(/^models\//, '').trim();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${encodeURIComponent(state.apiKey)}`;
  const contents = [{
    role: 'user',
    parts: [
      ...fileParts,
      { text: promptText }
    ]
  }];

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.15,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const msg = errData?.error?.message || `HTTP Error ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('The AI model returned an empty response. Please check that your uploaded PDF or image is clear and readable.');
  }

  const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(cleaned);
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
  document.getElementById('selected-paper-type-badge').textContent = isMCQ ? 'PDF-to-Quiz OMR Mode' : 'Live ICAI Step-Marking Evaluator';
  document.getElementById('selected-paper-marks-tag').textContent = sub.marks;
  document.getElementById('ans-upload-box').classList.toggle('hidden', isMCQ);
  document.getElementById('start-upload-action-btn').textContent = isMCQ
    ? `Read Uploaded PDF & Start ${sub.name} Quiz`
    : `Evaluate Uploaded ${sub.name} Answer Sheet`;
}

function showUploadError(msg) {
  const box = document.getElementById('upload-error-box');
  if (!msg) {
    box.classList.add('hidden');
    box.textContent = '';
  } else {
    box.textContent = msg;
    box.classList.remove('hidden');
  }
}

function initUploadHandlers() {
  document.querySelectorAll('#upload-level-selector .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#upload-level-selector .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.uploadLevel = btn.dataset.level;
      document.getElementById('header-level-subtitle').textContent = `CA ${btn.textContent} • Live AI Vision Engine`;
      renderUploadSubjects();
    });
  });

  document.getElementById('qp-file-input').addEventListener('change', e => {
    if (e.target.files.length) {
      state.qpFiles = Array.from(e.target.files);
      document.getElementById('qp-upload-box').classList.add('has-file');
      document.getElementById('qp-file-title').textContent = `✓ ${state.qpFiles.length} Question Paper File(s) Loaded`;
      document.getElementById('qp-file-desc').textContent = state.qpFiles.map(f => `${f.name} (${(f.size/1024).toFixed(0)} KB)`).join(', ');
      showUploadError('');
    }
  });

  document.getElementById('ans-file-input').addEventListener('change', e => {
    if (e.target.files.length) {
      state.ansFiles = Array.from(e.target.files);
      document.getElementById('ans-upload-box').classList.add('has-file');
      document.getElementById('ans-file-title').textContent = `✓ ${state.ansFiles.length} Answer Sheet File(s) Loaded`;
      document.getElementById('ans-file-desc').textContent = state.ansFiles.map(f => `${f.name} (${(f.size/1024).toFixed(0)} KB)`).join(', ');
      showUploadError('');
    }
  });

  document.getElementById('start-upload-action-btn').addEventListener('click', async () => {
    await processLiveUpload();
  });
}

async function processLiveUpload() {
  showUploadError('');
  const sub = state.uploadSubject;
  const isMCQ = sub.type === 'mcq';
  const workspace = document.getElementById('active-workspace');
  const actionBtn = document.getElementById('start-upload-action-btn');

  if (!state.qpFiles.length) {
    showUploadError('Please upload the Question Paper (PDF or images) first.');
    return;
  }

  if (!isMCQ && !state.ansFiles.length) {
    showUploadError('Please upload your written Answer Sheet (PDF or photos of your pages) so the app can evaluate your answers against the question paper.');
    return;
  }

  if (!state.apiKey || state.apiKey.length < 10) {
    showUploadError('Please enter your free Gemini API Key in the top card (or Settings tab) to read your uploaded PDF/images.');
    document.getElementById('quick-api-banner').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  try {
    actionBtn.disabled = true;
    workspace.innerHTML = `
      <div class="card loader-card">
        <div class="spinner"></div>
        <span class="eyebrow">LIVE MULTIMODAL OCR & ICAI CHECKING (${state.model})</span>
        <h3 class="serif-heading">${isMCQ ? 'Extracting Questions & Solving ICAI Key from Your PDF...' : 'Reading Question Paper & Grading Your Handwritten Answer Sheet...'}</h3>
        <p class="small-muted mt-8">Optimizing image resolution & checking question numbering, max marks, working notes, legal provisions, and step-by-step calculations...</p>
      </div>
    `;
    workspace.scrollIntoView({ behavior: 'smooth' });

    const qpParts = await Promise.all(state.qpFiles.map(fileToInlineData));

    if (isMCQ) {
      const prompt = `You are an official ICAI Examiner for CA ${state.uploadLevel.toUpperCase()} - ${sub.name} (${sub.code}).
Carefully read the attached Question Paper file(s) and extract ALL Multiple Choice Questions (MCQs) in exact numbering order.
Solve each question strictly according to the ICAI Study Material, RTPs, MTPs, and Past Year Questions.
Return ONLY a valid JSON object matching this exact structure:
{
  "title": "Extracted Paper Title or Subject Name",
  "questions": [
    {
      "q": "Full question text including question number and any table/data",
      "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
      "ans": 0,
      "exp": "Detailed step-by-step ICAI Study Material explanation and formula used to arrive at the correct option (ans is 0 for A, 1 for B, 2 for C, 3 for D)"
    }
  ]
}`;
      const quizData = await callGeminiVisionAPI(prompt, qpParts);
      if (!quizData.questions || !quizData.questions.length) {
        throw new Error('Could not find MCQ questions in the uploaded file. Please verify the PDF/image contains readable questions.');
      }
      startInteractiveQuiz(quizData, sub.name, workspace);
    } else {
      const ansParts = await Promise.all(state.ansFiles.map(fileToInlineData));
      const allParts = [
        { text: '--- ATTACHED FILE GROUP 1: QUESTION PAPER ---' },
        ...qpParts,
        { text: '--- ATTACHED FILE GROUP 2: STUDENT HANDWRITTEN ANSWER SHEET ---' },
        ...ansParts
      ];

      const prompt = `You are a strict official ICAI Examiner evaluating a student's handwritten Answer Sheet against the uploaded Question Paper for CA ${state.uploadLevel.toUpperCase()} - ${sub.name} (${sub.code}).
Checking Strictness Level: ${state.strictness}.
Subject Rules: ${sub.rule}.

INSTRUCTIONS:
1. Read the Question Paper (Group 1) completely: identify total marks, each question/sub-question number (e.g., 1(a), 1(b), 2(a)), what it asks, and its maximum marks.
2. Read the Student's Handwritten Answer Sheet (Group 2) page by page: transcribe/summarize what the student actually wrote for each question number.
3. Evaluate every attempted (and unattempted compulsory) question strictly according to ICAI Study Material, Modules, RTPs, MTPs, and official Examiner checking guidelines:
   - For Accounting/Practical subjects: check format headers, journal narrations, ledger postings, and Working Notes. Award step marks for correct steps even if the final balance disagrees.
   - For Law/Theory subjects: check if the student cited the exact Legal Provision / Section, analyzed the given case facts, and wrote a matching Conclusion.
4. Return ONLY a valid JSON object with this exact schema:
{
  "title": "Evaluated Paper Title (from uploaded Question Paper)",
  "totalAwarded": 0,
  "maxMarks": 100,
  "summary": "Overall examiner feedback specifically referencing the student's actual handwritten answers, strengths, and where marks were lost.",
  "questions": [
    {
      "qNo": "Question Number & Brief Topic (e.g. Q1(a) - Bank Reconciliation Statement)",
      "studentSummary": "What the student actually wrote/calculated in their uploaded answer sheet",
      "awarded": 0,
      "max": 10,
      "steps": [
        {
          "label": "Specific step / working note / legal provision checked",
          "score": "Marks given / Max step marks (with brief reason for any deduction)"
        }
      ],
      "model": "Official ICAI Study Material model answer, provision, or correct working note for this specific question"
    }
  ]
}`;

      const report = await callGeminiVisionAPI(prompt, allParts);
      renderSubjectiveReport(report, sub, workspace);
      saveHistoryItem({
        type: 'Live Answer Sheet Evaluation',
        subject: sub.name,
        score: `${report.totalAwarded} / ${report.maxMarks}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
        payload: report,
        subMeta: sub
      });
    }
  } catch (err) {
    workspace.innerHTML = '';
    showUploadError(err.message || 'Failed to process uploaded files.');
  } finally {
    actionBtn.disabled = false;
  }
}

function renderSubjectiveReport(report, sub, container) {
  const pct = report.maxMarks > 0 ? Math.round((report.totalAwarded / report.maxMarks) * 100) : 0;
  let badgeText = 'NEEDS REVISION (<40%)';
  if (pct >= 60) badgeText = `EXEMPTION STANDARD (${pct}%)`;
  else if (pct >= 40) badgeText = `PASS (${pct}%)`;

  container.innerHTML = `
    <div class="card">
      <span class="eyebrow">LIVE ICAI EXAMINER SCORECARD • ${sub.code}</span>
      <h3 class="serif-heading">${report.title || sub.name}</h3>
      <div class="score-banner mt-12">
        <div>
          <div class="small-muted">TOTAL MARKS AWARDED</div>
          <div class="score-big">${report.totalAwarded} <span style="font-size:20px;color:var(--text-secondary)">/ ${report.maxMarks}</span></div>
        </div>
        <span class="badge-pill">${badgeText}</span>
      </div>
      <p class="muted-text">${report.summary || ''}</p>

      ${(report.questions || []).map(q => `
        <div class="eval-q-card">
          <div class="row-between">
            <strong>${q.qNo}</strong>
            <span class="mono-tag">${q.awarded} / ${q.max} Marks</span>
          </div>
          ${q.studentSummary ? `
            <div class="student-ans-box">
              <strong>What You Wrote:</strong> ${q.studentSummary}
            </div>
          ` : ''}
          <ul class="eval-step-list">
            ${(q.steps || []).map(st => `
              <li class="eval-step-item">
                <span>${st.label}</span>
                <strong class="mono-tag" style="flex-shrink:0;">${st.score}</strong>
              </li>
            `).join('')}
          </ul>
          <div class="model-box"><strong>ICAI Examiner Model Answer & Remarks:</strong>
${q.model || ''}</div>
        </div>
      `).join('')}
    </div>
  `;
  container.scrollIntoView({ behavior: 'smooth' });
}

// Interactive MCQ Quiz with Pre-Submission Answer Check Drawer
function startInteractiveQuiz(quizData, subjectName, container) {
  state.activeQuiz = {
    title: quizData.title || subjectName,
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

      <h3 style="font-size:15px;margin:12px 0 14px;white-space:pre-wrap;">${qObj.q}</h3>

      <div>
        ${(qObj.options || []).map((opt, oIdx) => `
          <button class="option-btn ${qz.answers[qz.currentIdx] === oIdx ? 'selected' : ''}" onclick="selectQuizOption(${oIdx})">
            <span class="opt-letter">${letters[oIdx] || oIdx + 1}</span>
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
        Review All Attempted & Skipped Answers Before Submitting (${qz.answers.filter(a => a !== null).length}/${qz.questions.length})
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
    else if (Number(qz.answers[i]) === Number(q.ans)) correct++;
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
        const isCorrect = userAns !== null && Number(userAns) === Number(q.ans);
        return `
          <div class="eval-q-card">
            <div class="row-between">
              <strong>Question ${i + 1}</strong>
              <span class="mono-tag" style="color:${userAns === null ? 'var(--text-muted)' : (isCorrect ? 'var(--success)' : 'var(--danger)')}">
                ${userAns === null ? 'Skipped (0M)' : (isCorrect ? '+1.00 Mark' : '-0.25 Mark')}
              </span>
            </div>
            <p style="font-size:13.5px;margin:6px 0;white-space:pre-wrap;">${q.q}</p>
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

// Mode 2: Live AI Paper Generator
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

function showGenError(msg) {
  const box = document.getElementById('gen-error-box');
  if (!msg) {
    box.classList.add('hidden');
    box.textContent = '';
  } else {
    box.textContent = msg;
    box.classList.remove('hidden');
  }
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

  document.getElementById('generate-paper-btn').addEventListener('click', async () => {
    showGenError('');
    const sub = state.genSubject;
    const topic = document.getElementById('gen-topic-input').value.trim() || 'Full ICAI Syllabus Weightage';
    const workspace = document.getElementById('generated-paper-workspace');
    const genBtn = document.getElementById('generate-paper-btn');

    if (!state.apiKey || state.apiKey.length < 10) {
      showGenError('Please paste your free Gemini API Key in the top card or Settings tab to generate fresh ICAI question papers.');
      document.getElementById('quick-api-banner').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    try {
      genBtn.disabled = true;
      workspace.innerHTML = `
        <div class="card loader-card">
          <div class="spinner"></div>
          <span class="eyebrow">SYNTHESIZING FRESH ICAI QUESTION PAPER (${state.model})</span>
          <h3 class="serif-heading">Drafting ${sub.name} (${state.genMarks} Marks)...</h3>
          <p class="small-muted mt-8">Aligning questions with ICAI Study Material, RTPs, MTPs & Past Year Question standards.</p>
        </div>
      `;
      workspace.scrollIntoView({ behavior: 'smooth' });

      if (sub.type === 'mcq') {
        const numQ = state.genMarks === '100' ? 25 : (state.genMarks === '50' ? 15 : 10);
        const prompt = `You are an official ICAI Paper Setter for CA ${state.genLevel.toUpperCase()} - ${sub.name} (${sub.code}).
Generate a fresh, high-quality ${numQ}-question Multiple Choice Question (MCQ) test covering: ${topic}.
Strictly follow ICAI Study Material, RTP, MTP, and Past Exam difficulty (include both numerical/practical and conceptual questions).
Return ONLY valid JSON matching this schema:
{
  "title": "CA ${state.genLevel.toUpperCase()} ${sub.name} (${topic})",
  "questions": [
    {
      "q": "Question number and full question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "ans": 0,
      "exp": "Detailed ICAI Study Material step-by-step solution (ans is 0, 1, 2, or 3)"
    }
  ]
}`;
        const quizData = await callGeminiVisionAPI(prompt, []);
        startInteractiveQuiz(quizData, `${sub.name} (${topic})`, workspace);
      } else {
        const prompt = `You are an official ICAI Paper Setter for CA ${state.genLevel.toUpperCase()} - ${sub.name} (${sub.code}).
Generate a complete, authentic ${state.genMarks}-Mark Subjective Question Paper focusing on: ${topic}.
Follow official ICAI numbering (e.g., Question 1 Compulsory, sub-questions (a), (b), (c) with exact mark allocations, realistic accounting figures/tables or legal case scenarios).
Return ONLY valid JSON matching this exact structure:
{
  "title": "CA ${state.genLevel.toUpperCase()} - ${sub.name} (${state.genMarks} Marks)",
  "instructions": "Question 1 is compulsory. Attempt remaining questions as per ICAI pattern. Working notes should form part of the answer.",
  "questions": [
    {
      "qNo": "Question 1(a)",
      "marks": 10,
      "text": "Full detailed question text with all figures/adjustments or case scenario facts"
    }
  ]
}`;
        const paper = await callGeminiVisionAPI(prompt, []);
        state.generatedPaperText = JSON.stringify(paper, null, 2);

        workspace.innerHTML = `
          <div class="card">
            <div class="row-between">
              <span class="eyebrow">GENERATED ICAI MOCK PAPER • ${state.genMarks} MARKS</span>
              <span class="mono-tag">${sub.code}</span>
            </div>
            <h3 class="serif-heading">${paper.title}</h3>
            <p class="small-muted mb-8">${paper.instructions}</p>

            ${(paper.questions || []).map(q => `
              <div class="eval-q-card">
                <div class="row-between">
                  <strong>${q.qNo}</strong>
                  <span class="mono-tag">[${q.marks} Marks]</span>
                </div>
                <p class="muted-text mt-8" style="white-space:pre-wrap;">${q.text}</p>
              </div>
            `).join('')}

            <div class="upload-box mt-16" id="gen-ans-box">
              <input type="file" id="gen-ans-upload" accept=".pdf,image/*" multiple hidden onchange="evaluateGeneratedPaper(this)" />
              <div class="upload-info">
                <h4 id="gen-ans-title">Write Your Answers & Upload Answer Sheet</h4>
                <p id="gen-ans-desc">Select photos or scanned PDF of your handwritten register to grade against this generated paper</p>
              </div>
              <button class="primary-btn sm-btn" onclick="document.getElementById('gen-ans-upload').click()">Upload & Check</button>
            </div>
            <div id="gen-eval-output" class="mt-16"></div>
          </div>
        `;
      }
    } catch (err) {
      workspace.innerHTML = '';
      showGenError(err.message || 'Failed to generate question paper.');
    } finally {
      genBtn.disabled = false;
    }
  });
}

window.evaluateGeneratedPaper = async function(inputEl) {
  if (!inputEl.files.length) return;
  const files = Array.from(inputEl.files);
  const sub = state.genSubject;
  const outContainer = document.getElementById('gen-eval-output');

  document.getElementById('gen-ans-title').textContent = `✓ ${files.length} Answer Sheet File(s) Selected`;
  outContainer.innerHTML = `
    <div class="card loader-card">
      <div class="spinner"></div>
      <span class="eyebrow">GRADING YOUR HANDWRITTEN ANSWERS</span>
      <h3 class="serif-heading">Checking Against Generated ${sub.name} Paper...</h3>
    </div>
  `;

  try {
    const ansParts = await Promise.all(files.map(fileToInlineData));
    const prompt = `You are a strict ICAI Examiner evaluating the attached handwritten Answer Sheet against this generated Question Paper:
${state.generatedPaperText}

Grade every question attempted by the student strictly per ICAI Study Material, RTPs, MTPs, and step-marking rules (${state.strictness}).
Return ONLY valid JSON with this exact structure:
{
  "title": "${sub.name} Mock Evaluation",
  "totalAwarded": 0,
  "maxMarks": ${Number(state.genMarks)},
  "summary": "Overall examiner feedback on the student's written answers",
  "questions": [
    {
      "qNo": "Question number",
      "studentSummary": "What the student wrote in the uploaded answer sheet",
      "awarded": 0,
      "max": 10,
      "steps": [
        { "label": "Step / Working Note / Legal Provision", "score": "Marks / Max" }
      ],
      "model": "Official ICAI model answer & remarks"
    }
  ]
}`;
    const report = await callGeminiVisionAPI(prompt, ansParts);
    renderSubjectiveReport(report, sub, outContainer);
    saveHistoryItem({
      type: 'Generated Paper Evaluation',
      subject: sub.name,
      score: `${report.totalAwarded} / ${report.maxMarks}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      payload: report,
      subMeta: sub
    });
  } catch (err) {
    outContainer.innerHTML = `<div class="error-banner">${err.message}</div>`;
  }
};

// History & Settings
function saveHistoryItem(item) {
  state.history.unshift(item);
  localStorage.setItem('icai_examiner_history_v2', JSON.stringify(state.history.slice(0, 30)));
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById('history-list-container');
  if (!state.history.length) {
    container.innerHTML = `<div class="card"><p class="muted-text">No evaluated papers or quizzes yet. Upload a Question Paper & Answer Sheet to run your first live evaluation.</p></div>`;
    return;
  }
  container.innerHTML = state.history.map((item, idx) => `
    <div class="card" style="cursor:pointer;" onclick="openHistoryItem(${idx})">
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

window.openHistoryItem = function(idx) {
  const item = state.history[idx];
  if (item && item.payload) {
    switchTab('tab-upload');
    renderSubjectiveReport(item.payload, item.subMeta || state.uploadSubject, document.getElementById('active-workspace'));
  }
};

function initSettingsHandlers() {
  const selectEl = document.getElementById('model-select');
  const customInput = document.getElementById('custom-model-input');

  const getSelectedModelValue = () => {
    if (selectEl.value === 'custom') {
      return customInput.value.trim() || 'gemini-3.0-flash';
    }
    return selectEl.value;
  };

  const saveKeyAction = (rawKey) => {
    state.apiKey = rawKey.trim();
    state.model = getSelectedModelValue();
    localStorage.setItem('icai_gemini_key', state.apiKey);
    localStorage.setItem('icai_gemini_model', state.model);
    updateApiUI();
    showUploadError('');
    showGenError('');
  };

  document.getElementById('save-api-key-btn').addEventListener('click', () => {
    saveKeyAction(document.getElementById('api-key-input').value);
  });

  document.getElementById('banner-save-key-btn').addEventListener('click', () => {
    saveKeyAction(document.getElementById('banner-api-key-input').value);
  });

  selectEl.addEventListener('change', () => {
    if (selectEl.value === 'custom') {
      customInput.classList.remove('hidden');
      customInput.focus();
    } else {
      customInput.classList.add('hidden');
      state.model = selectEl.value;
      localStorage.setItem('icai_gemini_model', state.model);
      updateApiUI();
    }
  });

  document.getElementById('detect-models-btn').addEventListener('click', async () => {
    const key = document.getElementById('api-key-input').value.trim() || state.apiKey;
    const statusEl = document.getElementById('api-key-status');
    if (!key) {
      statusEl.textContent = 'Paste your API key first to detect available models.';
      return;
    }
    statusEl.textContent = 'Querying Google AI for your account models...';
    const models = await fetchAvailableGeminiModels(key);
    if (models.length) {
      selectEl.innerHTML = models.map(m => `<option value="${m}">${m}</option>`).join('') +
        `<option value="custom">Custom Model ID</option>`;
      const preferred = models.find(m => m.includes('3.0-flash')) || models.find(m => m.includes('flash')) || models[0];
      state.model = preferred;
      selectEl.value = preferred;
      localStorage.setItem('icai_gemini_model', preferred);
      statusEl.textContent = `✓ Found ${models.length} models! Active: ${preferred}`;
    } else {
      statusEl.textContent = 'Could not list models. Check your API key or internet connection.';
    }
  });

  document.querySelectorAll('#strictness-selector .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#strictness-selector .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.strictness = btn.dataset.strict;
    });
  });

  document.getElementById('clear-history-btn').addEventListener('click', () => {
    state.history = [];
    localStorage.removeItem('icai_examiner_history_v2');
    renderHistory();
  });
}
