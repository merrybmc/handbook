// app.js - State controller and interactive learning-book UI
import { initDatabase, runQuery, getDatabaseSchema } from "./db-playground.js";
import { curriculum } from "./content.js";

const state = {
  activeCourse: localStorage.getItem("learning_book_course") || "sql",
  currentChapterId: null,
  completedChapters: {},
  editorInstance: null
};

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const curriculumList = document.getElementById("curriculum-list");
const courseSwitcher = document.getElementById("course-switcher");
const lessonBody = document.getElementById("lesson-body");
const progressPercentage = document.getElementById("progress-percentage");
const progressFill = document.getElementById("progress-fill");
const themeToggle = document.getElementById("theme-toggle");
const playgroundPanel = document.getElementById("playground-panel");

const prevChapterBtn = document.getElementById("prev-chapter-btn");
const nextChapterBtn = document.getElementById("next-chapter-btn");
const markCompleteBtn = document.getElementById("mark-complete-btn");

const runSqlBtn = document.getElementById("run-sql-btn");
const resetDbBtn = document.getElementById("reset-db-btn");
const resultPane = document.getElementById("result-table");
const schemaList = document.getElementById("schema-list");

const verificationPanel = document.getElementById("verification-panel");
const verificationStatusBadge = document.getElementById("verification-status-badge");
const verificationDesc = document.getElementById("verification-desc");
const verificationFeedback = document.getElementById("verification-feedback");

const tabTitles = document.querySelectorAll(".tab-title");
const tabPanes = document.querySelectorAll(".tab-pane");

function getChapterCourse(chapter) {
  return chapter.course || "sql";
}

function getActiveCurriculum() {
  return curriculum.filter(chapter => getChapterCourse(chapter) === state.activeCourse);
}

function loadProgress() {
  const saved = localStorage.getItem("sql_handbook_progress");
  if (!saved) return;

  try {
    state.completedChapters = JSON.parse(saved);
  } catch {
    state.completedChapters = {};
  }
}

function saveProgress() {
  localStorage.setItem("sql_handbook_progress", JSON.stringify(state.completedChapters));
  updateProgressUI();
}

function updateProgressUI() {
  const chapters = getActiveCurriculum();
  const total = chapters.length;
  const completed = chapters.filter(chapter => state.completedChapters[chapter.id]).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  progressPercentage.textContent = `${pct}%`;
  progressFill.style.width = `${pct}%`;

  chapters.forEach(chapter => {
    const dot = document.getElementById(`dot-${chapter.id}`);
    if (dot) dot.classList.toggle("completed", Boolean(state.completedChapters[chapter.id]));
  });
}

function initEditor() {
  const textArea = document.getElementById("sql-editor");
  state.editorInstance = CodeMirror.fromTextArea(textArea, {
    mode: "text/x-sql",
    theme: "dracula",
    lineNumbers: true,
    matchBrackets: true,
    indentUnit: 2,
    smartIndent: true,
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Enter": executeUserQuery
    }
  });
}

function initSidebar() {
  curriculumList.innerHTML = "";
  document.querySelectorAll(".course-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.course === state.activeCourse);
  });

  const chapters = getActiveCurriculum();
  const parts = [...new Set(chapters.map(chapter => chapter.part))];

  parts.forEach(part => {
    const section = document.createElement("div");
    section.className = "curriculum-section";

    const title = document.createElement("div");
    title.className = "section-title";
    title.textContent = part;
    section.appendChild(title);

    chapters
      .filter(chapter => chapter.part === part)
      .forEach(chapter => {
        const button = document.createElement("button");
        button.className = "chapter-btn";
        button.id = `btn-${chapter.id}`;
        button.type = "button";
        button.onclick = () => loadChapter(chapter.id);

        const left = document.createElement("div");
        left.className = "chapter-btn-left";

        const icon = document.createElement("i");
        const iconName = chapter.tags.includes("postgres")
          ? "server"
          : chapter.type === "practice"
            ? "square-pen"
            : "book-open";
        icon.setAttribute("data-lucide", iconName);
        icon.className = "chapter-icon";

        const label = document.createElement("span");
        label.className = "chapter-title";
        label.textContent = chapter.title.replace(/^\d+\.\s*/, "");

        left.appendChild(icon);
        left.appendChild(label);

        const status = document.createElement("div");
        status.className = "chapter-status";

        const dot = document.createElement("span");
        dot.className = "status-dot";
        dot.id = `dot-${chapter.id}`;
        status.appendChild(dot);

        button.appendChild(left);
        button.appendChild(status);
        section.appendChild(button);
      });

    curriculumList.appendChild(section);
  });

  lucide.createIcons();
}

function loadChapter(chapterId) {
  state.currentChapterId = chapterId;
  const chapter = curriculum.find(item => item.id === chapterId);
  if (!chapter) return;
  state.activeCourse = getChapterCourse(chapter);
  localStorage.setItem("learning_book_course", state.activeCourse);

  document.querySelectorAll(".chapter-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`btn-${chapterId}`)?.classList.add("active");

  lessonBody.innerHTML = chapter.content;
  playgroundPanel.style.display = state.activeCourse === "sql" ? "flex" : "none";

  if (chapter.exercise?.starterSql && state.editorInstance) {
    state.editorInstance.setValue(chapter.exercise.starterSql);
  }

  setupVerificationPanel(chapter);
  updateNavigationButtons(chapterId);
  updateCompleteButton(chapterId);
  lucide.createIcons();
}

function updateNavigationButtons(chapterId) {
  const chapters = getActiveCurriculum();
  const idx = chapters.findIndex(chapter => chapter.id === chapterId);
  prevChapterBtn.disabled = idx <= 0;
  nextChapterBtn.disabled = idx === chapters.length - 1;
}

function updateCompleteButton(chapterId) {
  const completed = Boolean(state.completedChapters[chapterId]);
  markCompleteBtn.className = completed ? "secondary-btn" : "success-btn";
  markCompleteBtn.innerHTML = completed
    ? `<i data-lucide="rotate-ccw"></i> 완료 취소`
    : `<i data-lucide="check-circle-2"></i> 학습 완료`;
}

function setupVerificationPanel(chapter) {
  verificationFeedback.className = "verification-feedback hidden";

  if (!chapter.exercise) {
    verificationPanel.style.display = "none";
    return;
  }

  verificationPanel.style.display = "block";
  verificationStatusBadge.textContent = "실습 대기";
  verificationStatusBadge.className = "status-badge";
  verificationDesc.innerHTML = chapter.exercise.description;
}

function validateUserAnswer(userResult, exercise) {
  if (!exercise) return false;

  if (exercise.type === "table_exists") {
    const table = exercise.tableName.toUpperCase();
    const tables = runQuery(`SELECT name FROM sqlite_master WHERE type='table' AND UPPER(name)='${table}';`);
    if (tables.error || tables.values.length === 0) return false;

    const columns = runQuery(`PRAGMA table_info(${exercise.tableName});`);
    if (columns.error || columns.values.length === 0) return false;

    const existing = columns.values.map(col => String(col[1]).toUpperCase());
    return exercise.columns.every(col => existing.includes(col.toUpperCase()));
  }

  if (exercise.type === "table_dropped") {
    const table = exercise.tableName.toUpperCase();
    const tables = runQuery(`SELECT name FROM sqlite_master WHERE type='table' AND UPPER(name)='${table}';`);
    return !tables.error && tables.values.length === 0;
  }

  if (exercise.type === "view_exists") {
    const view = exercise.viewName.toUpperCase();
    const views = runQuery(`SELECT name FROM sqlite_master WHERE type='view' AND UPPER(name)='${view}';`);
    return !views.error && views.values.length > 0;
  }

  if (exercise.type === "insert_check" || exercise.type === "update_check" || exercise.type === "delete_check") {
    const check = runQuery(exercise.checkQuery);
    if (check.error) return false;
    if (exercise.expectedCount !== undefined) return Number(check.values[0]?.[0]) === exercise.expectedCount;
    return check.values.length > 0;
  }

  if (exercise.type === "query") {
    if (!userResult || userResult.error) return false;
    const expected = runQuery(exercise.correctQuery);
    if (expected.error) return false;
    return compareResultSets(userResult, expected, exercise.correctQuery);
  }

  return false;
}

function compareResultSets(actual, expected, correctQuery) {
  if (actual.columns.length !== expected.columns.length) return false;
  if (actual.values.length !== expected.values.length) return false;

  const actualColumns = actual.columns.map(col => String(col).toUpperCase());
  const expectedColumns = expected.columns.map(col => String(col).toUpperCase());
  if (actualColumns.some((col, index) => col !== expectedColumns[index])) return false;

  const normalizeRows = rows => rows.map(row => row.map(value => value === null ? "NULL" : String(value).trim()));
  const actualRows = normalizeRows(actual.values);
  const expectedRows = normalizeRows(expected.values);

  if (!correctQuery.toLowerCase().includes("order by")) {
    const sortRows = (a, b) => a.join("|").localeCompare(b.join("|"));
    actualRows.sort(sortRows);
    expectedRows.sort(sortRows);
  }

  return expectedRows.every((expectedRow, rowIndex) =>
    expectedRow.every((value, colIndex) => value === actualRows[rowIndex][colIndex])
  );
}

function executeUserQuery() {
  const sql = state.editorInstance.getValue();
  if (!sql.trim()) return;

  const result = runQuery(sql);
  switchTab("result-table");
  renderQueryResult(result);
  refreshSchemaList();

  const chapter = curriculum.find(item => item.id === state.currentChapterId);
  if (chapter?.exercise) {
    const isCorrect = validateUserAnswer(result, chapter.exercise);
    renderVerificationResult(isCorrect);

    if (isCorrect && !state.completedChapters[state.currentChapterId]) {
      state.completedChapters[state.currentChapterId] = true;
      saveProgress();
      updateCompleteButton(state.currentChapterId);
    }
  }

  lucide.createIcons();
}

function renderQueryResult(result) {
  if (result.error) {
    resultPane.innerHTML = `
      <div class="result-meta">실행 오류</div>
      <div class="result-error">${result.error}</div>
    `;
    return;
  }

  resultPane.innerHTML = `
    <div class="result-meta">
      <span>실행 시간: ${result.executionTime}ms</span>
      <span>반환 행: ${result.rowCount}</span>
    </div>
    <div class="result-table-wrapper">
      <table>
        <thead>
          <tr>${result.columns.map(col => `<th>${col}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${result.values.map(row => `
            <tr>
              ${row.map(value => `<td>${value === null ? `<span class="text-muted">NULL</span>` : value}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderVerificationResult(isCorrect) {
  verificationFeedback.className = "verification-feedback";

  if (isCorrect) {
    verificationStatusBadge.textContent = "통과";
    verificationStatusBadge.className = "status-badge success";
    verificationFeedback.innerHTML = `
      <i data-lucide="check-circle-2" class="feedback-icon" style="color: var(--success)"></i>
      <span class="feedback-text" style="color: var(--success)">좋습니다. 요구한 결과와 일치합니다.</span>
    `;
    return;
  }

  verificationStatusBadge.textContent = "확인 필요";
  verificationStatusBadge.className = "status-badge failed";
  verificationFeedback.innerHTML = `
    <i data-lucide="alert-circle" class="feedback-icon" style="color: var(--danger)"></i>
    <span class="feedback-text" style="color: var(--danger)">결과의 컬럼, 행, 정렬 또는 데이터가 요구 조건과 다릅니다.</span>
  `;
}

function refreshSchemaList() {
  const schema = getDatabaseSchema();
  schemaList.innerHTML = "";

  if (schema.length === 0) {
    schemaList.innerHTML = `<p class="text-muted">표시할 테이블이 없습니다.</p>`;
    return;
  }

  schema.forEach(item => {
    const tableDiv = document.createElement("div");
    tableDiv.className = "schema-table";

    const header = document.createElement("button");
    header.className = "schema-table-header";
    header.type = "button";
    header.onclick = () => tableDiv.classList.toggle("expanded");
    header.innerHTML = `
      <span class="schema-table-name"><i data-lucide="table"></i> ${item.table}</span>
      <i data-lucide="chevron-down" class="schema-chevron"></i>
    `;

    const columnsDiv = document.createElement("div");
    columnsDiv.className = "schema-table-columns";
    columnsDiv.innerHTML = `
      <table>
        <thead>
          <tr><th>컬럼</th><th>타입</th><th>PK</th><th>NULL</th></tr>
        </thead>
        <tbody>
          ${item.columns.map(col => `
            <tr>
              <td class="${col.pk ? "col-pk" : ""}">${col.name}</td>
              <td><code>${col.type || "-"}</code></td>
              <td>${col.pk ? "Yes" : "No"}</td>
              <td>${col.notnull || col.pk ? "No" : "Yes"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    tableDiv.appendChild(header);
    tableDiv.appendChild(columnsDiv);
    schemaList.appendChild(tableDiv);
  });

  lucide.createIcons();
}

function switchTab(tabId) {
  tabTitles.forEach(title => title.classList.toggle("active", title.dataset.tab === tabId));
  tabPanes.forEach(pane => pane.classList.toggle("active", pane.id === tabId));
}

function bindEvents() {
  sidebarToggle.onclick = () => sidebar.classList.toggle("collapsed");
  runSqlBtn.onclick = executeUserQuery;

  resetDbBtn.onclick = async () => {
    if (!confirm("실습 데이터베이스를 처음 상태로 되돌릴까요? 직접 만든 테이블과 뷰도 삭제됩니다.")) return;
    await initDatabase();
    refreshSchemaList();
    resultPane.innerHTML = emptyResult("database", "실습 데이터베이스가 초기화되었습니다. 쿼리를 실행해 보세요.");
    lucide.createIcons();
  };

  tabTitles.forEach(title => {
    title.onclick = () => switchTab(title.dataset.tab);
  });

  courseSwitcher?.addEventListener("click", event => {
    const button = event.target.closest(".course-tab");
    if (!button) return;
    state.activeCourse = button.dataset.course;
    localStorage.setItem("learning_book_course", state.activeCourse);
    initSidebar();
    loadChapter(getActiveCurriculum()[0]?.id);
    updateProgressUI();
  });

  document.getElementById("start-learning-btn")?.addEventListener("click", () => loadChapter(getActiveCurriculum()[0]?.id));

  prevChapterBtn.onclick = () => {
    const chapters = getActiveCurriculum();
    const idx = chapters.findIndex(chapter => chapter.id === state.currentChapterId);
    if (idx > 0) loadChapter(chapters[idx - 1].id);
  };

  nextChapterBtn.onclick = () => {
    const chapters = getActiveCurriculum();
    const idx = chapters.findIndex(chapter => chapter.id === state.currentChapterId);
    if (idx < chapters.length - 1) loadChapter(chapters[idx + 1].id);
  };

  markCompleteBtn.onclick = () => {
    state.completedChapters[state.currentChapterId] = !state.completedChapters[state.currentChapterId];
    saveProgress();
    updateCompleteButton(state.currentChapterId);
    lucide.createIcons();
  };

  themeToggle.onclick = () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    state.editorInstance.setOption("theme", document.body.classList.contains("dark-mode") ? "dracula" : "default");
  };
}

function emptyResult(icon, message) {
  return `
    <div class="empty-result">
      <i data-lucide="${icon}"></i>
      <p>${message}</p>
    </div>
  `;
}

async function initApp() {
  loadProgress();
  if (!getActiveCurriculum().length) state.activeCourse = "sql";
  state.currentChapterId = getActiveCurriculum()[0]?.id;
  initSidebar();
  initEditor();
  bindEvents();
  loadChapter(state.currentChapterId);

  resultPane.innerHTML = emptyResult("loader", "브라우저 SQL 실습 데이터베이스를 준비하는 중입니다.");
  lucide.createIcons();

  try {
    await initDatabase();
    refreshSchemaList();
    resultPane.innerHTML = emptyResult("play-circle", "왼쪽 커리큘럼을 고르고 쿼리를 실행해 보세요.");
  } catch (err) {
    resultPane.innerHTML = `<div class="result-error">데이터베이스를 불러오지 못했습니다: ${err.message}</div>`;
  }

  updateProgressUI();
  lucide.createIcons();
}

window.addEventListener("load", initApp);
