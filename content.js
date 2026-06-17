// content.js - Beginner-friendly SQL course: MySQL first, PostgreSQL advanced.

const tagLabels = {
  basic: "기초",
  mysql: "MySQL",
  sqld: "SQLD",
  gisa: "정보처리",
  advanced: "심화",
  postgres: "PostgreSQL",
  redis: "Redis",
  search: "검색",
  elasticsearch: "Elasticsearch",
  practice: "실습",
  vue: "Vue.js",
  react: "React 비교",
  frontend: "프런트엔드",
  todo: "Todo",
  shop: "쇼핑몰",
  router: "Router",
  pinia: "Pinia",
  typescript: "TypeScript",
  java: "Java",
  spring: "Spring Boot",
  backend: "Backend",
  oop: "OOP",
  jpa: "JPA",
  http: "HTTP",
  mvc: "MVC",
  db: "DB",
  boot: "Boot"
};

const esc = value => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const p = text => `<p>${text}</p>`;
const code = text => `<pre><code>${esc(text.trim())}</code></pre>`;
const ul = items => `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
const ol = items => `<ol>${items.map(item => `<li>${item}</li>`).join("")}</ol>`;

const table = (headers, rows) => `
  <div class="table-responsive">
    <table>
      <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  </div>
`;

const callout = (kind, title, body) => `
  <div class="alert ${kind}">
    <i data-lucide="${kind === "warning" ? "alert-triangle" : kind === "tip" ? "lightbulb" : "info"}" class="alert-icon"></i>
    <div class="alert-content">
      <h4>${title}</h4>
      <p>${body}</p>
    </div>
  </div>
`;

function renderExample(example) {
  return `
    <div class="example-card">
      <div class="example-label">따라 치는 예제</div>
      <h4>${example.title}</h4>
      ${p(example.desc)}
      ${code(example.sql)}
      ${example.explain ? `<div class="example-explain">${example.explain}</div>` : ""}
    </div>
  `;
}

function renderDrills(drills = []) {
  if (!drills.length) return "";

  return `
    <section class="lesson-section">
      <h3>추가 연습문제</h3>
      <div class="drill-list">
        ${drills.map((drill, index) => `
          <details class="drill-card">
            <summary>
              <span class="drill-number">${index + 1}</span>
              <span>${drill.prompt}</span>
            </summary>
            ${drill.hint ? `<p class="drill-hint"><strong>힌트:</strong> ${drill.hint}</p>` : ""}
            ${drill.answer ? code(drill.answer) : ""}
            ${drill.explain ? `<p class="drill-explain">${drill.explain}</p>` : ""}
          </details>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPracticeSteps(steps = []) {
  if (!steps.length) return "";

  return `
    <section class="lesson-section">
      <h3>처음 하는 사람용 실습 순서</h3>
      <div class="practice-steps">
        ${steps.map((step, index) => `
          <div class="practice-step">
            <span class="practice-step-number">${index + 1}</span>
            <div class="practice-step-body">${step}</div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLesson(chapter) {
  const tags = chapter.tags.map(tag => `<span class="lesson-tag ${tag}">${tagLabels[tag] || tag}</span>`).join("");
  const learningAid = chapter.analogy || chapter.studyHint ? `
    <section class="lesson-section">
      <h3>처음 배우는 사람을 위한 이해 지도</h3>
      ${chapter.analogy ? callout("tip", "비유로 먼저 잡기", chapter.analogy) : ""}
      ${chapter.studyHint ? callout("note", "왜 배우나요?", chapter.studyHint) : ""}
    </section>
  ` : "";
  const sections = chapter.sections.map(section => `
    <section class="lesson-section">
      <h3>${section.title}</h3>
      ${section.body.join("\n")}
    </section>
  `).join("");

  const examples = chapter.examples?.length ? `
    <section class="lesson-section">
      <h3>예제로 이해하기</h3>
      ${chapter.examples.map(renderExample).join("")}
    </section>
  ` : "";

  const practice = chapter.exercise ? `
    <div class="practice-container">
      <div class="practice-card">
        <div class="practice-header">
          <i data-lucide="terminal" style="color: var(--accent-cyan);"></i>
          <h4>오른쪽 실습창에서 검증하기</h4>
        </div>
        <p class="practice-desc">${chapter.exercise.description}</p>
      </div>
    </div>
  ` : "";
  const practiceGuide = chapter.practiceGuide ? `
    <div class="practice-container">
      <div class="practice-card">
        <div class="practice-header">
          <i data-lucide="square-pen" style="color: var(--accent-cyan);"></i>
          <h4>직접 만들어보기</h4>
        </div>
        <p class="practice-desc">${chapter.practiceGuide}</p>
      </div>
    </div>
  ` : "";

  return `
    <div class="lesson-header">
      <div class="lesson-meta">${tags}</div>
      <h2>${chapter.title}</h2>
      <p class="lesson-summary">${chapter.summary}</p>
    </div>
    <div class="lesson-body">
      ${chapter.goal ? callout("note", "이번 장 목표", chapter.goal) : ""}
      ${learningAid}
      ${sections}
      ${examples}
      ${renderDrills(chapter.drills)}
      ${renderPracticeSteps(chapter.practiceSteps)}
    </div>
    ${practice}
    ${practiceGuide}
  `;
}

const chapters = [
  {
    id: "ch1_intro",
    part: "Part 1. 데이터베이스와 학습 준비",
    title: "1. 데이터베이스를 처음 배우는 사람을 위한 큰 그림",
    tags: ["basic", "mysql"],
    type: "info",
    summary: "SQL을 외우기 전에 DB가 왜 필요한지, 테이블과 행과 열이 무엇인지, 앞으로 어떤 순서로 공부해야 하는지 잡습니다.",
    goal: "DB를 엑셀 파일 여러 개를 안전하게 연결해 둔 시스템이라고 생각할 수 있게 만드는 것이 목표입니다.",
    sections: [
      {
        title: "DB를 왜 쓰나요?",
        body: [
          p("쇼핑몰을 예로 들어 봅시다. 고객 정보, 상품 정보, 주문 정보, 결제 정보가 모두 필요합니다. 이걸 엑셀 파일로 관리하면 여러 사람이 동시에 수정하기 어렵고, 실수로 고객을 삭제하거나 주문 금액을 잘못 고칠 수도 있습니다. 데이터베이스는 이런 데이터를 정해진 규칙에 맞게 저장하고, 여러 사용자가 동시에 접근해도 최대한 안전하게 관리해 줍니다."),
          p("<strong>DBMS</strong>는 데이터베이스를 관리하는 프로그램입니다. MySQL과 PostgreSQL은 대표적인 관계형 DBMS입니다. 관계형이라는 말은 데이터를 표처럼 저장하고, 표와 표를 키로 연결한다는 뜻입니다."),
          table(["용어", "쉬운 뜻", "예시"], [
            ["테이블", "하나의 주제를 담은 표", "CUSTOMERS, ORDERS"],
            ["행(Row)", "실제 데이터 한 건", "고객 1명, 주문 1건"],
            ["열(Column)", "데이터의 항목", "이름, 이메일, 주문일"],
            ["기본키(PK)", "행 하나를 구분하는 고유 번호", "CUSTOMER_ID"],
            ["외래키(FK)", "다른 테이블의 행을 가리키는 값", "ORDERS.CUSTOMER_ID"]
          ])
        ]
      },
      {
        title: "RDBMS와 NoSQL은 무엇이 다른가요?",
        body: [
          p("<strong>RDBMS</strong>는 데이터를 표로 정리하고, 표와 표의 관계를 키로 연결하는 방식입니다. 비유하면 회사의 회계 장부나 엑셀 여러 시트를 규칙적으로 묶어 둔 시스템에 가깝습니다. 주문 표, 고객 표, 상품 표가 따로 있고 주문 표의 CUSTOMER_ID가 고객 표의 CUSTOMER_ID를 가리킵니다."),
          p("<strong>NoSQL</strong>은 하나의 방식이 아니라 관계형이 아닌 여러 저장 방식을 묶어 부르는 말입니다. JSON 문서를 그대로 저장하는 MongoDB, key-value로 빠르게 읽고 쓰는 Redis, 검색에 강한 Elasticsearch처럼 목적이 다릅니다. 비유하면 RDBMS가 정리된 장부라면, NoSQL은 상황별 전문 도구 상자입니다."),
          table(["구분", "RDBMS", "NoSQL"], [
            ["데이터 모양", "테이블, 행, 열", "문서, key-value, 그래프, 검색 색인 등 다양"],
            ["강점", "정확한 관계, 트랜잭션, JOIN, 데이터 무결성", "유연한 구조, 빠른 응답, 대용량 분산, 특수 목적 처리"],
            ["대표 제품", "MySQL, PostgreSQL, Oracle, SQL Server", "Redis, MongoDB, Elasticsearch, Cassandra"],
            ["잘 맞는 상황", "주문, 결제, 회원, 재고처럼 정확성이 중요한 원본 데이터", "캐시, 세션, 로그, 검색, 실시간 랭킹처럼 목적이 분명한 보조 저장소"],
            ["초보 학습 순서", "먼저 배우면 데이터 기본기가 잡힘", "RDBMS 기본 후 용도별로 배우면 이해가 쉬움"]
          ]),
          callout("tip", "둘 중 하나만 고르는 문제가 아닙니다", "실무에서는 MySQL/PostgreSQL을 원본 저장소로 두고, Redis는 캐시와 세션, Elasticsearch는 검색처럼 함께 쓰는 경우가 많습니다.")
        ]
      },
      {
        title: "왜 MySQL과 RDBMS부터 공부하면 좋은가요?",
        body: [
          p("RDBMS는 데이터 공부의 문법책 같은 역할을 합니다. 테이블을 어떻게 나눌지, 중복을 어떻게 줄일지, 여러 데이터를 어떻게 연결할지, 동시에 수정될 때 어떻게 안전하게 처리할지를 가장 기본적인 형태로 배울 수 있습니다."),
          ol([
            "<strong>SQL은 오래 쓰이는 공통 언어입니다.</strong> MySQL을 배우면 PostgreSQL, Oracle, SQL Server도 훨씬 쉽게 접근할 수 있습니다.",
            "<strong>데이터 설계 감각이 생깁니다.</strong> 고객, 주문, 상품을 어떤 테이블로 나누는지 이해하면 다른 저장소를 배울 때도 기준이 생깁니다.",
            "<strong>정확성이 중요한 서비스의 뼈대입니다.</strong> 결제, 주문, 재고, 권한처럼 틀리면 안 되는 데이터는 여전히 RDBMS가 중심입니다.",
            "<strong>NoSQL을 더 잘 고를 수 있습니다.</strong> RDBMS의 강점과 한계를 알아야 Redis나 Elasticsearch를 왜 붙이는지 이해할 수 있습니다."
          ]),
          p("처음에는 MySQL로 시작하는 것을 추천합니다. 설치와 자료가 많고 문법이 비교적 친절하며, 웹 개발 예제에서 가장 자주 만납니다. 이후 PostgreSQL을 배우면 윈도우 함수, JSON, CTE, 고급 인덱스 같은 심화 기능까지 넓힐 수 있습니다.")
        ]
      },
      {
        title: "SQL 공부 순서",
        body: [
          ol([
            "<strong>SELECT</strong>로 데이터를 읽는 법을 먼저 배웁니다.",
            "<strong>WHERE, ORDER BY</strong>로 원하는 데이터만 찾고 정렬합니다.",
            "<strong>JOIN</strong>으로 여러 테이블을 연결합니다.",
            "<strong>GROUP BY</strong>로 합계, 평균, 개수 같은 요약을 만듭니다.",
            "<strong>INSERT, UPDATE, DELETE</strong>로 데이터를 바꾸는 법을 배웁니다.",
            "<strong>테이블 설계, 인덱스, 트랜잭션</strong>을 공부해 실무 감각을 붙입니다.",
            "마지막으로 PostgreSQL의 고급 기능으로 SQL의 폭을 넓힙니다."
          ]),
          callout("tip", "처음에는 완벽히 이해하지 않아도 됩니다", "SQL은 한 번에 외우는 과목이 아닙니다. 같은 예제를 여러 번 바꿔 실행하면서 감을 잡는 쪽이 훨씬 빠릅니다.")
        ]
      },
      {
        title: "초보자가 꼭 붙잡아야 할 5가지 질문",
        body: [
          p("SQL을 처음 볼 때는 문법을 한 글자씩 해석하려고 하면 금방 지칩니다. 대신 매번 같은 질문을 던지면 훨씬 안정적으로 읽을 수 있습니다."),
          table(["질문", "SQL에서 보는 위치", "예시"], [
            ["어느 표에서 가져오나?", "<code>FROM</code>", "<code>FROM EMP</code>"],
            ["어떤 행만 남기나?", "<code>WHERE</code>", "<code>WHERE SAL >= 3000</code>"],
            ["어떤 컬럼을 보여주나?", "<code>SELECT</code>", "<code>SELECT ENAME, SAL</code>"],
            ["여러 표를 어떻게 붙이나?", "<code>JOIN ... ON</code>", "<code>ON E.DEPTNO = D.DEPTNO</code>"],
            ["어떤 순서로 보여주나?", "<code>ORDER BY</code>", "<code>ORDER BY SAL DESC</code>"]
          ]),
          p("이 다섯 질문에 답할 수 있으면 SELECT 문 대부분은 읽을 수 있습니다. 이후 GROUP BY, HAVING, 윈도우 함수는 이 기본 위에 얹히는 개념입니다.")
        ]
      }
    ],
    examples: [
      {
        title: "SQL 실습창이 살아 있는지 확인",
        desc: "문자 하나를 결과로 출력하는 가장 단순한 SELECT입니다.",
        sql: "SELECT 'MySQL Ready' AS status;",
        explain: "<code>AS status</code>는 결과 컬럼 이름을 status로 보여 달라는 뜻입니다."
      }
    ],
    drills: [
      {
        prompt: "문자 'Hello SQL'을 message라는 이름으로 출력해 보세요.",
        hint: "SELECT '문자' AS 별칭",
        answer: "SELECT 'Hello SQL' AS message;"
      },
      {
        prompt: "숫자 10과 20을 더한 결과를 total이라는 이름으로 출력해 보세요.",
        hint: "SQL에서도 간단한 계산이 됩니다.",
        answer: "SELECT 10 + 20 AS total;"
      },
      {
        prompt: "EMP 테이블에서 전체 행을 조회해 보세요.",
        hint: "모든 컬럼은 * 입니다.",
        answer: "SELECT * FROM EMP;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'MySQL Ready' AS status;",
      correctQuery: "SELECT 'MySQL Ready' AS status;",
      description: "<code>SELECT 'MySQL Ready' AS status;</code>를 실행해 학습 환경을 확인하세요."
    }
  },
  {
    id: "ch2_install",
    part: "Part 1. 데이터베이스와 학습 준비",
    title: "2. MySQL 설치와 접속 개념",
    tags: ["basic", "mysql"],
    type: "info",
    summary: "MySQL을 실제로 설치하고, 무료 GUI 도구로 데이터베이스를 눈으로 보며, 나중에 DataGrip과 PostgreSQL까지 자연스럽게 넘어가는 환경 세팅을 설명합니다.",
    goal: "내 컴퓨터에 MySQL 서버를 설치하고, DBeaver 또는 Workbench로 접속해 데이터베이스와 테이블을 직접 보고 쿼리를 실행할 수 있게 됩니다.",
    sections: [
      {
        title: "서버와 클라이언트",
        body: [
          p("MySQL Server는 데이터를 실제로 저장하고 SQL을 실행하는 프로그램입니다. Workbench나 DBeaver는 그 서버에 접속해 SQL을 보내고 결과를 보는 프로그램입니다. 즉, Workbench를 설치했다고 DB가 생기는 것이 아니라, MySQL Server에 연결해야 합니다."),
          table(["항목", "의미", "처음 배울 때 값"], [
            ["Host", "DB 서버가 있는 컴퓨터 주소", "localhost 또는 127.0.0.1"],
            ["Port", "DB 서버가 듣고 있는 문 번호", "MySQL 기본 3306"],
            ["User", "접속 계정", "root 또는 별도 학습 계정"],
            ["Password", "계정 비밀번호", "설치할 때 정한 값"],
            ["Database", "사용할 데이터 묶음", "study_shop"]
          ]),
          callout("note", "이 앱의 실습창", "오른쪽 실습창은 설치 없이 바로 연습할 수 있도록 브라우저 안에서 SQL을 실행합니다. 실제 MySQL 문법과 100% 같지는 않지만 기초 조회, 조인, 집계 연습에는 충분합니다.")
        ]
      },
      {
        title: "추천 환경: 무료로 시작하고 나중에 DataGrip으로 이동",
        body: [
          p("처음에는 비용을 쓰지 않아도 충분합니다. <strong>MySQL Server Community Edition</strong>을 설치하고, 화면으로 DB를 보기 위한 무료 도구로 <strong>DBeaver Community</strong>를 쓰는 조합을 추천합니다. MySQL Workbench도 무료이고 MySQL 전용이라 좋지만, 나중에 PostgreSQL까지 같이 볼 생각이면 DBeaver가 더 자연스럽습니다."),
          table(["단계", "추천 도구", "이유"], [
            ["지금 바로 시작", "MySQL Community Server + DBeaver Community", "무료이고 MySQL, PostgreSQL을 같은 방식으로 연결해 볼 수 있습니다."],
            ["MySQL 전용 관리", "MySQL Workbench", "MySQL 공식 GUI라 계정, 스키마, ERD를 MySQL 기준으로 보기 좋습니다."],
            ["나중에 본격 실무", "DataGrip", "유료지만 MySQL과 PostgreSQL을 포함한 여러 DB를 한 IDE에서 관리하기 좋습니다."],
            ["PostgreSQL 시작", "PostgreSQL + pgAdmin 또는 DBeaver", "pgAdmin은 PostgreSQL 전용 무료 GUI이고, DBeaver는 여러 DB 공용 GUI입니다."]
          ]),
          callout("tip", "내 추천 루트", "지금은 <strong>MySQL Server + DBeaver Community</strong>로 시작하세요. SQL이 익숙해지고 PostgreSQL도 같이 쓰기 시작할 때 DataGrip으로 넘어가면 기능 차이를 더 잘 느낄 수 있습니다.")
        ]
      },
      {
        title: "Windows에서 MySQL 설치 순서",
        body: [
          p("Windows라면 가장 쉬운 방법은 공식 MySQL Installer 또는 MSI 설치 방식입니다. 설치 중에는 MySQL Server, MySQL Shell, Workbench를 함께 설치할 수 있습니다. 설치 화면에서 어려운 옵션이 많아 보여도 초반에는 아래 값만 잡으면 됩니다."),
          table(["설치 항목", "초보자 추천값", "설명"], [
            ["Setup Type", "Developer Default 또는 Server only + Workbench", "공부용 PC라면 Developer Default가 편합니다."],
            ["Config Type", "Development Computer", "개인 PC 학습용 설정입니다."],
            ["Port", "3306", "MySQL 기본 포트입니다. 다른 DB와 충돌하지 않으면 그대로 둡니다."],
            ["Authentication", "Strong Password Encryption", "MySQL 8 기본 권장 방식입니다."],
            ["root password", "잊지 않을 강한 비밀번호", "DBeaver나 Workbench에서 접속할 때 필요합니다."],
            ["Windows Service", "체크", "컴퓨터를 켤 때 MySQL 서버가 자동으로 시작됩니다."]
          ]),
          ol([
            "<a href=\"https://dev.mysql.com/downloads/installer/\" target=\"_blank\">MySQL Installer 공식 다운로드</a>에서 설치 파일을 받습니다.",
            "설치 중 MySQL Server와 Workbench가 포함되도록 선택합니다.",
            "root 비밀번호를 정하고 꼭 따로 기록해 둡니다.",
            "설치가 끝나면 Windows 서비스에서 MySQL이 실행 중인지 확인합니다.",
            "Workbench 또는 DBeaver에서 Host <code>localhost</code>, Port <code>3306</code>, User <code>root</code>로 테스트 접속합니다."
          ]),
          callout("warning", "비밀번호와 포트", "root 비밀번호를 잊어버리면 초반에 꽤 귀찮아집니다. 그리고 3306 포트가 이미 사용 중이면 설치가 실패하거나 서버가 뜨지 않을 수 있습니다.")
        ]
      },
      {
        title: "DBeaver로 MySQL 접속하기",
        body: [
          p("DBeaver는 무료 Community Edition으로 시작하기 좋습니다. MySQL뿐 아니라 PostgreSQL, SQLite, MariaDB 등 여러 DB를 같은 화면에서 다룰 수 있어서 나중에 도구를 다시 배울 부담이 적습니다."),
          ol([
            "<a href=\"https://dbeaver.io/download/\" target=\"_blank\">DBeaver Community 공식 다운로드</a>에서 설치합니다.",
            "DBeaver를 열고 왼쪽 위 플러그 모양 또는 Database > New Database Connection을 선택합니다.",
            "MySQL을 선택합니다. 처음 연결할 때 드라이버 다운로드를 물어보면 Download를 누릅니다.",
            "Server Host는 <code>localhost</code>, Port는 <code>3306</code>, Username은 <code>root</code>, Password는 설치 때 정한 값을 넣습니다.",
            "Test Connection을 눌러 성공 메시지를 확인한 뒤 Finish를 누릅니다.",
            "왼쪽 Database Navigator에서 스키마, 테이블, 컬럼을 펼쳐 보며 구조를 확인합니다.",
            "SQL Editor를 열고 <code>SELECT VERSION();</code>을 실행해 실제 MySQL에 쿼리가 가는지 확인합니다."
          ]),
          table(["DBeaver 화면", "무엇을 보는 곳인가"], [
            ["Database Navigator", "연결한 DB, 스키마, 테이블, 컬럼 목록을 트리로 봅니다."],
            ["SQL Editor", "쿼리를 작성하고 실행합니다."],
            ["Result Grid", "SELECT 결과를 표로 봅니다."],
            ["ER Diagram", "테이블 관계를 그림으로 봅니다."],
            ["Data 탭", "테이블 안의 실제 행을 봅니다."]
          ])
        ]
      },
      {
        title: "처음 접속 후 꼭 만들 것: 학습용 DB와 학습용 계정",
        body: [
          p("처음에는 root로 접속해도 되지만, 계속 root만 쓰면 권한 개념을 배우기 어렵습니다. root는 관리자, study_user는 공부용 사용자라고 역할을 나누세요."),
          code(`
CREATE DATABASE study_shop
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

CREATE USER 'study_user'@'localhost'
IDENTIFIED BY 'study_password_123!';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX
ON study_shop.* TO 'study_user'@'localhost';

FLUSH PRIVILEGES;
          `),
          p("이제 DBeaver에서 새 연결을 하나 더 만들고 Username을 <code>study_user</code>로 넣어 접속해 보세요. Database에는 <code>study_shop</code>을 지정하면 됩니다."),
          callout("tip", "utf8mb4", "한글과 이모지까지 안전하게 저장하려면 MySQL에서는 문자셋을 <code>utf8mb4</code>로 두는 것이 일반적입니다.")
        ]
      },
      {
        title: "DataGrip으로 넘어갈 때의 연결 정보",
        body: [
          p("DataGrip은 유료 도구지만 SQL 작성, 자동완성, 스키마 탐색, 여러 DB 관리 경험이 좋습니다. 나중에 DataGrip을 쓰게 되면 연결 정보는 DBeaver와 거의 같습니다. 중요한 것은 DB 종류를 MySQL 또는 PostgreSQL로 고르고, Host/Port/User/Password/Database를 정확히 넣는 것입니다."),
          table(["DB", "Host", "Port", "User 예시", "Database 예시"], [
            ["MySQL", "localhost", "3306", "study_user", "study_shop"],
            ["PostgreSQL", "localhost", "5432", "postgres 또는 study_user", "study_shop"]
          ]),
          p("DataGrip에서는 왼쪽 Database Explorer에서 <strong>+</strong>를 눌러 Data Source를 만들고, MySQL 또는 PostgreSQL을 선택한 뒤 Test Connection을 누르면 됩니다. 드라이버가 없으면 DataGrip이 다운로드를 안내합니다.")
        ]
      },
      {
        title: "처음 만들면 좋은 학습 DB",
        body: [
          p("실제 MySQL을 설치했다면 root 계정으로 모든 것을 하기보다 학습용 데이터베이스와 학습용 계정을 따로 만드는 것이 좋습니다. 실무에서도 앱 계정, 관리자 계정, 조회 전용 계정을 분리합니다."),
          code(`
CREATE DATABASE study_shop DEFAULT CHARACTER SET utf8mb4;

CREATE USER 'study_user'@'localhost' IDENTIFIED BY 'strong_password';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX
ON study_shop.* TO 'study_user'@'localhost';

FLUSH PRIVILEGES;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "현재 DB가 동작하는지만 확인",
        desc: "설치가 되었는지 확인할 때는 간단한 SELECT부터 실행합니다.",
        sql: "SELECT 'Install Checked' AS status;",
        explain: "쿼리 결과가 한 줄 나오면 SQL을 보낼 수 있는 상태입니다."
      },
      {
        title: "실제 MySQL 버전 확인",
        desc: "DBeaver, Workbench, DataGrip 어디서든 연결 확인용으로 자주 씁니다.",
        sql: "SELECT VERSION();",
        explain: "결과로 MySQL 서버 버전이 나오면 클라이언트가 서버에 정상 접속한 것입니다."
      },
      {
        title: "현재 선택된 데이터베이스 확인",
        desc: "내 쿼리가 어느 DB를 대상으로 실행되는지 확인합니다.",
        sql: `
SELECT DATABASE();

USE study_shop;

SELECT DATABASE();
        `,
        explain: "<code>USE study_shop;</code>은 이후 쿼리의 기본 데이터베이스를 study_shop으로 바꿉니다."
      }
    ],
    drills: [
      {
        prompt: "MySQL 기본 포트 번호를 기억해 보세요.",
        answer: "3306"
      },
      {
        prompt: "PostgreSQL 기본 포트 번호를 기억해 보세요.",
        answer: "5432"
      },
      {
        prompt: "학습용 DB 이름을 study_shop으로 만든다고 가정하고 CREATE DATABASE 문을 작성해 보세요.",
        answer: "CREATE DATABASE study_shop DEFAULT CHARACTER SET utf8mb4;"
      },
      {
        prompt: "DBeaver에서 로컬 MySQL에 접속할 때 Host와 Port는 보통 무엇을 입력하나요?",
        answer: "Host는 localhost 또는 127.0.0.1, Port는 3306을 입력합니다."
      },
      {
        prompt: "MySQL과 PostgreSQL을 모두 공부할 무료 GUI 도구로 무엇을 추천했나요?",
        answer: "DBeaver Community를 추천했습니다. MySQL과 PostgreSQL을 같은 방식으로 연결해 볼 수 있기 때문입니다."
      },
      {
        prompt: "DataGrip에서 MySQL과 PostgreSQL을 연결할 때 공통으로 필요한 정보 5가지를 적어 보세요.",
        answer: "Host, Port, User, Password, Database입니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'Install Checked' AS status;",
      correctQuery: "SELECT 'Install Checked' AS status;",
      description: "<code>SELECT 'Install Checked' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch3_select_flow",
    part: "Part 2. SELECT 기초",
    title: "3. SELECT 기본 구조와 실행 순서",
    tags: ["basic", "mysql", "sqld"],
    type: "practice",
    summary: "SELECT가 데이터를 읽는 기본 문장이라는 점부터 시작해 FROM, WHERE, ORDER BY가 어떤 역할을 하는지 배웁니다.",
    goal: "SELECT 문을 보면 '어느 테이블에서, 어떤 행을, 어떤 컬럼으로, 어떤 순서로 보여주는가'를 읽을 수 있게 됩니다.",
    sections: [
      {
        title: "SELECT는 데이터 읽기 문장입니다",
        body: [
          p("가장 기본 형태는 <code>SELECT 컬럼 FROM 테이블;</code>입니다. 테이블은 데이터가 있는 표이고, 컬럼은 보고 싶은 항목입니다. 예를 들어 직원 테이블에서 이름과 급여만 보고 싶다면 이름 컬럼과 급여 컬럼만 SELECT하면 됩니다."),
          code(`
SELECT ENAME, SAL
FROM EMP;
          `),
          p("처음에는 SQL을 영어처럼 읽어 보세요. <strong>EMP에서 ENAME과 SAL을 선택한다</strong>라고 읽으면 됩니다.")
        ]
      },
      {
        title: "작성 순서와 실제 처리 순서",
        body: [
          p("SQL은 SELECT를 맨 앞에 쓰지만, DB는 먼저 FROM으로 테이블을 잡고 WHERE로 행을 걸러낸 뒤 SELECT 컬럼을 만듭니다. 이 순서를 알면 왜 SELECT에서 만든 별칭을 WHERE에서 바로 못 쓰는지 이해하기 쉽습니다."),
          table(["단계", "절", "역할"], [
            ["1", "FROM", "어느 테이블을 볼지 정합니다."],
            ["2", "WHERE", "조건에 맞는 행만 남깁니다."],
            ["3", "SELECT", "보여줄 컬럼과 계산식을 만듭니다."],
            ["4", "ORDER BY", "최종 결과를 정렬합니다."],
            ["5", "LIMIT", "몇 개만 보여줄지 제한합니다."]
          ])
        ]
      },
      {
        title: "SELECT 문을 읽는 연습",
        body: [
          p("아래 SQL을 보면 처음에는 복잡해 보여도, 순서대로 끊으면 어렵지 않습니다."),
          code(`
SELECT ENAME, JOB, SAL
FROM EMP
WHERE DEPTNO = 30
  AND SAL >= 1500
ORDER BY SAL DESC;
          `),
          ol([
            "<code>FROM EMP</code>: EMP 테이블에서 시작합니다.",
            "<code>WHERE DEPTNO = 30</code>: 30번 부서 직원만 남깁니다.",
            "<code>AND SAL >= 1500</code>: 그중 급여가 1500 이상인 직원만 남깁니다.",
            "<code>SELECT ENAME, JOB, SAL</code>: 이름, 직무, 급여만 보여줍니다.",
            "<code>ORDER BY SAL DESC</code>: 급여가 큰 직원부터 보여줍니다."
          ]),
          callout("tip", "SQL 실력은 읽기에서 시작합니다", "처음에는 직접 쓰는 것보다 남이 쓴 SQL을 정확히 읽는 연습이 더 중요합니다. 읽을 수 있으면 조금씩 바꿔 쓸 수 있습니다.")
        ]
      }
    ],
    examples: [
      {
        title: "급여가 높은 직원 찾기",
        desc: "EMP 테이블에서 급여가 3000 이상인 직원만 보고 급여가 높은 순서로 정렬합니다.",
        sql: `
SELECT ENAME, JOB, SAL
FROM EMP
WHERE SAL >= 3000
ORDER BY SAL DESC;
        `,
        explain: "<code>DESC</code>는 내림차순입니다. 큰 값이 먼저 나옵니다."
      },
      {
        title: "별칭 붙이기",
        desc: "컬럼 이름을 읽기 좋게 바꾸어 보여줄 수 있습니다.",
        sql: `
SELECT ENAME AS employee_name, SAL AS salary
FROM EMP;
        `,
        explain: "별칭은 결과 화면의 제목만 바꾸며 원래 테이블 컬럼명을 바꾸지는 않습니다."
      },
      {
        title: "중복 제거 DISTINCT",
        desc: "부서번호 목록처럼 중복을 제거한 값만 보고 싶을 때 사용합니다.",
        sql: `
SELECT DISTINCT DEPTNO
FROM EMP
ORDER BY DEPTNO;
        `,
        explain: "<code>DISTINCT</code>는 SELECT 결과에서 같은 행 조합을 한 번만 보여줍니다."
      }
    ],
    drills: [
      {
        prompt: "EMP에서 직원 이름 ENAME만 조회하세요.",
        answer: "SELECT ENAME FROM EMP;"
      },
      {
        prompt: "EMP에서 사번, 이름, 직무를 조회하세요.",
        answer: "SELECT EMPNO, ENAME, JOB FROM EMP;"
      },
      {
        prompt: "급여가 2000보다 큰 직원의 이름과 급여를 조회하세요.",
        answer: "SELECT ENAME, SAL FROM EMP WHERE SAL > 2000;"
      },
      {
        prompt: "급여가 낮은 순서로 직원 이름과 급여를 정렬하세요.",
        answer: "SELECT ENAME, SAL FROM EMP ORDER BY SAL ASC;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT ENAME, JOB, SAL FROM EMP WHERE SAL >= 3000 ORDER BY SAL DESC;",
      correctQuery: "SELECT ENAME, JOB, SAL FROM EMP WHERE SAL >= 3000 ORDER BY SAL DESC;",
      description: "<code>EMP</code>에서 급여가 3000 이상인 직원의 이름, 직무, 급여를 급여 내림차순으로 조회하세요."
    }
  },
  {
    id: "ch4_data_types",
    part: "Part 2. SELECT 기초",
    title: "4. 데이터 타입을 쉽게 이해하기",
    tags: ["basic", "mysql", "gisa"],
    type: "info",
    summary: "숫자, 문자, 날짜, 금액, JSON을 어떤 타입에 저장해야 하는지 초보자 관점에서 설명합니다.",
    goal: "컬럼을 만들 때 INT, VARCHAR, DECIMAL, DATE가 왜 다른지 이해합니다.",
    sections: [
      {
        title: "타입은 값의 그릇입니다",
        body: [
          p("데이터 타입은 컬럼에 어떤 종류의 값을 넣을 수 있는지 정하는 규칙입니다. 나이는 숫자, 이름은 문자, 주문일은 날짜, 금액은 정확한 소수 계산이 필요한 숫자입니다. 타입을 잘못 고르면 검색이 느려지거나, 계산이 틀리거나, 데이터가 이상하게 저장될 수 있습니다."),
          table(["저장할 값", "추천 타입", "이유"], [
            ["사번, 상품번호", "<code>INT</code> 또는 <code>BIGINT</code>", "정수이고 비교가 빠릅니다."],
            ["이름, 이메일", "<code>VARCHAR(n)</code>", "길이가 달라지는 문자입니다."],
            ["금액", "<code>DECIMAL(10,2)</code>", "소수 오차 없이 정확히 저장합니다."],
            ["가입일", "<code>DATE</code>", "날짜만 필요할 때 사용합니다."],
            ["생성 시각", "<code>DATETIME</code> 또는 <code>TIMESTAMP</code>", "날짜와 시간이 함께 필요합니다."],
            ["부가 옵션", "<code>JSON</code>", "구조가 자주 바뀌는 추가 정보에 사용합니다."]
          ])
        ]
      },
      {
        title: "초보자가 자주 하는 타입 실수",
        body: [
          ul([
            "전화번호를 숫자로 저장하면 앞자리 0이 사라질 수 있습니다. 전화번호는 문자로 저장하는 편이 안전합니다.",
            "돈을 FLOAT로 저장하면 0.1 + 0.2 같은 계산에서 오차가 생길 수 있습니다. 금액은 DECIMAL을 씁니다.",
            "날짜를 문자로 저장하면 날짜 계산과 정렬이 불편합니다. 날짜는 DATE나 DATETIME을 씁니다.",
            "무조건 TEXT로 저장하면 인덱스와 검증이 어려워집니다. 길이가 예상되면 VARCHAR를 먼저 고려합니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "상품 테이블 설계 예시",
        desc: "상품명은 문자, 가격은 DECIMAL, 재고는 정수로 둡니다.",
        sql: `
CREATE TABLE PRODUCTS_EXAMPLE (
  PRODUCT_ID INT PRIMARY KEY,
  NAME VARCHAR(100) NOT NULL,
  PRICE DECIMAL(10,2) NOT NULL,
  STOCK INT NOT NULL DEFAULT 0
);
        `,
        explain: "<code>NOT NULL</code>은 반드시 값이 있어야 한다는 뜻이고, <code>DEFAULT</code>는 값이 없을 때 기본값을 넣습니다."
      }
    ],
    drills: [
      {
        prompt: "고객 이메일을 저장할 컬럼 타입으로 무엇이 적절할까요?",
        answer: "VARCHAR(255) 정도가 일반적입니다. 이메일은 계산할 숫자가 아니라 문자입니다."
      },
      {
        prompt: "상품 가격 1500000.50을 정확히 저장하려면 어떤 타입이 좋을까요?",
        answer: "DECIMAL(10,2)"
      },
      {
        prompt: "PRODUCTS에서 가격이 1,000,000 이상인 상품만 조회하세요.",
        answer: "SELECT PRODUCT_ID, NAME, PRICE FROM PRODUCTS WHERE PRICE >= 1000000;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT PRODUCT_ID, NAME, PRICE, STOCK FROM PRODUCTS WHERE PRICE >= 1000000 ORDER BY PRICE DESC;",
      correctQuery: "SELECT PRODUCT_ID, NAME, PRICE, STOCK FROM PRODUCTS WHERE PRICE >= 1000000 ORDER BY PRICE DESC;",
      description: "상품 중 가격이 1,000,000 이상인 상품의 ID, 이름, 가격, 재고를 가격 내림차순으로 조회하세요."
    }
  },
  {
    id: "ch5_create_constraints",
    part: "Part 3. 테이블 만들기와 변경하기",
    title: "5. CREATE TABLE과 제약 조건",
    tags: ["basic", "mysql", "sqld"],
    type: "practice",
    summary: "테이블을 직접 만들면서 기본키, NOT NULL, UNIQUE, DEFAULT, CHECK, 외래키가 어떤 문제를 막아 주는지 배웁니다.",
    goal: "테이블은 단순한 빈 표가 아니라 데이터 규칙을 담는 설계도라는 점을 이해합니다.",
    sections: [
      {
        title: "테이블을 만든다는 것",
        body: [
          p("테이블을 만든다는 것은 컬럼 이름과 타입, 그리고 지켜야 할 규칙을 정하는 일입니다. 고객 테이블이라면 고객번호, 이름, 이메일 같은 컬럼이 필요하고, 고객번호는 중복되면 안 됩니다. 이메일도 보통 중복되면 안 됩니다."),
          table(["제약 조건", "막아 주는 문제", "예시"], [
            ["PRIMARY KEY", "같은 행을 구분하지 못하는 문제", "고객번호 중복 금지"],
            ["NOT NULL", "필수 값이 빠지는 문제", "이름 없이 고객 생성 금지"],
            ["UNIQUE", "중복되면 안 되는 값 중복", "이메일 중복 금지"],
            ["DEFAULT", "값이 없을 때 기본값 지정", "가입일 기본값 오늘"],
            ["CHECK", "허용 범위 밖 값 저장", "나이 음수 금지"],
            ["FOREIGN KEY", "없는 부모 데이터를 참조", "없는 고객의 주문 금지"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "고객 테이블 만들기",
        desc: "고객번호, 이름, 나이를 가진 테이블입니다.",
        sql: `
CREATE TABLE CUSTOMER (
  CUSTID INT PRIMARY KEY,
  NAME VARCHAR(20) NOT NULL,
  AGE INT
);
        `,
        explain: "이 앱에서는 이 테이블을 만드는지 자동 검증합니다."
      },
      {
        title: "MySQL 스타일 자동 증가",
        desc: "실제 MySQL에서는 ID를 자동 증가시킬 수 있습니다.",
        sql: `
CREATE TABLE customers (
  customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
        `
      }
    ],
    drills: [
      {
        prompt: "상품명은 반드시 있어야 합니다. 어떤 제약 조건을 붙이면 될까요?",
        answer: "NOT NULL"
      },
      {
        prompt: "이메일 중복 가입을 막고 싶습니다. 어떤 제약 조건을 붙이면 될까요?",
        answer: "UNIQUE"
      },
      {
        prompt: "DEPTNO, DNAME, LOC 컬럼을 가진 부서 테이블 CREATE 문을 작성해 보세요.",
        answer: "CREATE TABLE DEPT_EXAMPLE (\n  DEPTNO INT PRIMARY KEY,\n  DNAME VARCHAR(30) NOT NULL,\n  LOC VARCHAR(30)\n);"
      }
    ],
    exercise: {
      type: "table_exists",
      tableName: "CUSTOMER",
      columns: ["CUSTID", "NAME", "AGE"],
      starterSql: "CREATE TABLE CUSTOMER (\n  CUSTID INT PRIMARY KEY,\n  NAME VARCHAR(20) NOT NULL,\n  AGE INT\n);",
      description: "<code>CUSTOMER</code> 테이블을 만들고 <code>CUSTID</code>, <code>NAME</code>, <code>AGE</code> 컬럼을 포함하세요."
    }
  },
  {
    id: "ch6_alter_drop",
    part: "Part 3. 테이블 만들기와 변경하기",
    title: "6. ALTER, DROP, TRUNCATE",
    tags: ["mysql", "gisa"],
    type: "practice",
    summary: "이미 만든 테이블을 바꾸거나 지울 때 어떤 명령을 쓰는지, 왜 조심해야 하는지 배웁니다.",
    goal: "DDL은 구조를 바꾸는 강력한 명령이라서 되돌리기 어렵다는 감각을 갖습니다.",
    sections: [
      {
        title: "테이블 구조를 바꾸는 ALTER",
        body: [
          p("서비스를 만들다 보면 나중에 컬럼을 추가하거나 인덱스를 추가해야 할 때가 있습니다. 이때 <code>ALTER TABLE</code>을 씁니다. 하지만 큰 테이블에서 ALTER는 오래 걸리거나 잠금을 만들 수 있어 운영에서는 신중해야 합니다."),
          code(`
ALTER TABLE PRODUCTS ADD COLUMN DESCRIPTION VARCHAR(500);
ALTER TABLE PRODUCTS ADD INDEX idx_products_category (CATEGORY);
          `)
        ]
      },
      {
        title: "DROP, TRUNCATE, DELETE 차이",
        body: [
          table(["명령", "무엇을 지우나", "특징"], [
            ["DELETE", "조건에 맞는 행", "WHERE 가능, 트랜잭션으로 롤백 가능"],
            ["TRUNCATE", "테이블의 모든 행", "빠르지만 보통 DDL로 취급, 구조는 유지"],
            ["DROP", "테이블 자체", "구조와 데이터 모두 삭제"]
          ]),
          callout("warning", "실무 주의", "DROP과 TRUNCATE는 매우 위험합니다. 운영 DB에서는 실행 전 백업과 대상 확인이 필수입니다.")
        ]
      }
    ],
    examples: [
      {
        title: "임시 테이블 삭제",
        desc: "더 이상 필요 없는 TEMP_DATA 테이블을 삭제합니다.",
        sql: "DROP TABLE TEMP_DATA;",
        explain: "삭제 후 스키마 탭에서 TEMP_DATA가 사라지는지 확인할 수 있습니다."
      }
    ],
    drills: [
      {
        prompt: "상품 테이블에 브랜드 컬럼 BRAND를 추가하는 SQL을 작성하세요.",
        answer: "ALTER TABLE PRODUCTS ADD COLUMN BRAND VARCHAR(50);"
      },
      {
        prompt: "테이블 데이터만 전부 지우고 구조는 남기려면 어떤 명령을 쓰나요?",
        answer: "TRUNCATE TABLE 테이블명;"
      },
      {
        prompt: "조건 없이 DELETE를 쓰면 어떤 일이 생기나요?",
        answer: "테이블의 모든 행이 삭제됩니다. 그래서 DELETE 전에는 같은 WHERE 조건으로 SELECT를 먼저 해보는 습관이 좋습니다."
      }
    ],
    exercise: {
      type: "table_dropped",
      tableName: "TEMP_DATA",
      starterSql: "DROP TABLE TEMP_DATA;",
      description: "연습용 임시 테이블 <code>TEMP_DATA</code>를 삭제하세요."
    }
  },
  {
    id: "ch7_dml",
    part: "Part 4. 데이터 넣기, 바꾸기, 지우기",
    title: "7. INSERT, UPDATE, DELETE 기본",
    tags: ["basic", "mysql", "gisa"],
    type: "practice",
    summary: "데이터를 추가하고 수정하고 삭제하는 DML을 배웁니다. 실수하면 데이터가 바뀌므로 SELECT보다 더 조심해야 합니다.",
    goal: "데이터 변경 전에는 반드시 대상 행을 먼저 확인하는 습관을 만듭니다.",
    sections: [
      {
        title: "INSERT: 새 행 추가",
        body: [
          p("INSERT는 테이블에 새로운 행을 넣는 명령입니다. 컬럼 목록을 명시하면 값이 어떤 컬럼에 들어가는지 명확해져서 실수가 줄어듭니다."),
          code(`
INSERT INTO DEPT (DEPTNO, DNAME, LOC)
VALUES (50, 'MARKETING', 'SEOUL');
          `)
        ]
      },
      {
        title: "UPDATE와 DELETE는 WHERE가 생명입니다",
        body: [
          p("UPDATE와 DELETE에서 WHERE를 빼면 모든 행이 대상이 됩니다. 초보자에게 가장 위험한 실수입니다. 항상 변경 전에 같은 조건으로 SELECT를 실행해서 대상이 맞는지 확인하세요."),
          code(`
-- 먼저 확인
SELECT * FROM EMP WHERE ENAME = 'SMITH';

-- 확인 후 변경
UPDATE EMP
SET SAL = 2000
WHERE ENAME = 'SMITH';
          `),
          callout("warning", "무조건 먼저 SELECT", "UPDATE EMP SET SAL = 0; 같은 문장은 모든 직원 급여를 0으로 바꿉니다.")
        ]
      }
    ],
    examples: [
      {
        title: "부서 추가",
        desc: "DEPT 테이블에 마케팅 부서를 추가합니다.",
        sql: `
INSERT INTO DEPT (DEPTNO, DNAME, LOC)
VALUES (50, 'MARKETING', 'SEOUL');
        `
      },
      {
        title: "직원 급여 수정",
        desc: "SMITH의 급여를 2000으로 수정합니다.",
        sql: `
UPDATE EMP
SET SAL = 2000
WHERE ENAME = 'SMITH';
        `
      }
    ],
    drills: [
      {
        prompt: "DEPT에 60번, DESIGN, BUSAN 부서를 추가하세요.",
        answer: "INSERT INTO DEPT (DEPTNO, DNAME, LOC)\nVALUES (60, 'DESIGN', 'BUSAN');"
      },
      {
        prompt: "EMP에서 ALLEN의 급여를 1700으로 바꾸세요.",
        answer: "UPDATE EMP\nSET SAL = 1700\nWHERE ENAME = 'ALLEN';"
      },
      {
        prompt: "EMP에서 사번 7900인 직원을 삭제하세요.",
        answer: "DELETE FROM EMP\nWHERE EMPNO = 7900;"
      }
    ],
    exercise: {
      type: "insert_check",
      checkQuery: "SELECT * FROM DEPT WHERE DEPTNO = 50 AND DNAME = 'MARKETING' AND LOC = 'SEOUL';",
      starterSql: "INSERT INTO DEPT (DEPTNO, DNAME, LOC)\nVALUES (50, 'MARKETING', 'SEOUL');",
      description: "<code>DEPT</code>에 부서번호 50, 부서명 MARKETING, 위치 SEOUL인 행을 추가하세요."
    }
  },
  {
    id: "ch8_where_null",
    part: "Part 5. 조건과 함수",
    title: "8. WHERE 조건과 NULL",
    tags: ["basic", "mysql", "sqld"],
    type: "practice",
    summary: "원하는 행만 고르는 WHERE, 범위와 목록과 패턴 조건, 그리고 초보자가 가장 많이 헷갈리는 NULL을 배웁니다.",
    goal: "조건식을 보고 어떤 행이 남는지 스스로 예측할 수 있게 됩니다.",
    sections: [
      {
        title: "WHERE는 행을 거르는 필터입니다",
        body: [
          p("SELECT가 보고 싶은 컬럼을 고르는 것이라면 WHERE는 보고 싶은 행을 고르는 것입니다. 예를 들어 급여가 2000 이상인 직원만 보고 싶다면 WHERE SAL >= 2000을 씁니다."),
          table(["조건", "뜻", "예시"], [
            ["=", "같다", "DEPTNO = 10"],
            [">, >=", "크다, 크거나 같다", "SAL >= 3000"],
            ["BETWEEN", "범위 안", "SAL BETWEEN 1000 AND 2000"],
            ["IN", "목록 중 하나", "JOB IN ('CLERK', 'MANAGER')"],
            ["LIKE", "문자 패턴", "ENAME LIKE 'S%'"],
            ["IS NULL", "값이 없음", "COMM IS NULL"]
          ])
        ]
      },
      {
        title: "NULL은 0도 빈 문자열도 아닙니다",
        body: [
          p("NULL은 '값을 모른다' 또는 '값이 없다'는 표시입니다. 그래서 <code>COMM = NULL</code>처럼 비교하면 원하는 결과가 나오지 않습니다. NULL을 찾을 때는 반드시 <code>IS NULL</code> 또는 <code>IS NOT NULL</code>을 씁니다."),
          code(`
SELECT ENAME, COMM
FROM EMP
WHERE COMM IS NOT NULL;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "부서와 급여 조건 함께 쓰기",
        desc: "30번 부서에서 급여가 1500 이상인 직원만 찾습니다.",
        sql: `
SELECT ENAME, DEPTNO, SAL
FROM EMP
WHERE DEPTNO = 30
  AND SAL >= 1500;
        `
      },
      {
        title: "이름이 S로 시작하는 직원",
        desc: "%는 아무 문자 여러 개를 뜻합니다.",
        sql: `
SELECT ENAME
FROM EMP
WHERE ENAME LIKE 'S%';
        `
      }
    ],
    drills: [
      {
        prompt: "직무가 MANAGER인 직원의 이름과 직무를 조회하세요.",
        answer: "SELECT ENAME, JOB FROM EMP WHERE JOB = 'MANAGER';"
      },
      {
        prompt: "10번 또는 20번 부서 직원의 이름과 부서번호를 조회하세요.",
        answer: "SELECT ENAME, DEPTNO FROM EMP WHERE DEPTNO IN (10, 20);"
      },
      {
        prompt: "커미션이 NULL인 직원의 이름과 커미션을 조회하세요.",
        answer: "SELECT ENAME, COMM FROM EMP WHERE COMM IS NULL;"
      },
      {
        prompt: "급여가 1000 이상 2000 이하인 직원을 조회하세요.",
        answer: "SELECT ENAME, SAL FROM EMP WHERE SAL BETWEEN 1000 AND 2000;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT ENAME, COMM FROM EMP WHERE COMM IS NOT NULL ORDER BY COMM DESC;",
      correctQuery: "SELECT ENAME, COMM FROM EMP WHERE COMM IS NOT NULL ORDER BY COMM DESC;",
      description: "커미션이 NULL이 아닌 직원의 이름과 커미션을 커미션 내림차순으로 조회하세요."
    }
  },
  {
    id: "ch9_functions",
    part: "Part 5. 조건과 함수",
    title: "9. 문자열, 날짜, 숫자, NULL 함수",
    tags: ["basic", "mysql", "sqld"],
    type: "practice",
    summary: "SQL 함수는 값을 가공하는 도구입니다. 이름 자르기, 날짜 포맷, NULL 대체, 조건별 표시를 연습합니다.",
    goal: "SELECT 결과를 그대로 보여주는 것에서 한 단계 나아가 계산하고 변환해 보여줍니다.",
    sections: [
      {
        title: "함수는 값을 넣으면 결과를 돌려줍니다",
        body: [
          p("프로그래밍 함수처럼 SQL 함수도 입력값을 받아 결과를 만듭니다. <code>SUBSTRING(ENAME, 1, 3)</code>은 ENAME의 1번째 글자부터 3글자를 잘라 줍니다. <code>COALESCE(COMM, 0)</code>은 COMM이 NULL이면 0으로 바꿔 줍니다."),
          table(["분류", "MySQL 함수", "용도"], [
            ["문자열", "CONCAT, SUBSTRING, LEFT, RIGHT, TRIM", "문자 붙이기, 자르기, 공백 제거"],
            ["날짜", "NOW, CURDATE, DATE_FORMAT, DATE_ADD", "현재 날짜, 포맷, 날짜 더하기"],
            ["숫자", "ROUND, CEIL, FLOOR", "반올림, 올림, 내림"],
            ["NULL", "COALESCE, IFNULL, NULLIF", "NULL 대체와 비교"],
            ["조건", "CASE WHEN", "조건별 값 만들기"]
          ])
        ]
      },
      {
        title: "CASE는 SQL의 if문입니다",
        body: [
          p("<code>CASE WHEN 조건 THEN 값 ELSE 값 END</code> 형태로 조건에 따라 다른 값을 보여줄 수 있습니다."),
          code(`
SELECT ENAME, SAL,
       CASE
         WHEN SAL >= 3000 THEN 'HIGH'
         WHEN SAL >= 1500 THEN 'MIDDLE'
         ELSE 'LOW'
       END AS SAL_GRADE
FROM EMP;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "NULL 커미션을 0으로 바꾸기",
        desc: "커미션이 없는 직원을 계산에서 제외하지 않으려면 0으로 대체할 수 있습니다.",
        sql: `
SELECT ENAME, COALESCE(COMM, 0) AS COMMISSION
FROM EMP
ORDER BY ENAME;
        `
      },
      {
        title: "상품 가격에 천원 단위 반올림",
        desc: "숫자 함수를 이용해 표시용 값을 만들 수 있습니다.",
        sql: `
SELECT NAME, PRICE, ROUND(PRICE / 1000, 0) AS PRICE_THOUSAND
FROM PRODUCTS;
        `
      }
    ],
    drills: [
      {
        prompt: "EMP에서 이름 앞 2글자만 SHORT_NAME으로 조회하세요.",
        answer: "SELECT ENAME, SUBSTRING(ENAME, 1, 2) AS SHORT_NAME FROM EMP;"
      },
      {
        prompt: "급여가 3000 이상이면 HIGH, 아니면 NORMAL로 표시하세요.",
        answer: "SELECT ENAME, SAL,\n       CASE WHEN SAL >= 3000 THEN 'HIGH' ELSE 'NORMAL' END AS GRADE\nFROM EMP;"
      },
      {
        prompt: "커미션이 NULL이면 0으로 바꾸고 급여와 더한 총액을 조회하세요.",
        answer: "SELECT ENAME, SAL + COALESCE(COMM, 0) AS TOTAL_PAY FROM EMP;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT ENAME, COALESCE(COMM, 0) AS COMMISSION FROM EMP ORDER BY ENAME;",
      correctQuery: "SELECT ENAME, COALESCE(COMM, 0) AS COMMISSION FROM EMP ORDER BY ENAME;",
      description: "<code>COMM</code>이 NULL이면 0으로 바꿔 직원명과 커미션을 이름순으로 조회하세요."
    }
  },
  {
    id: "ch10_grouping",
    part: "Part 6. 집계와 그룹",
    title: "10. GROUP BY와 HAVING",
    tags: ["mysql", "sqld", "gisa"],
    type: "practice",
    summary: "여러 행을 부서별, 카테고리별, 고객별로 묶어서 개수, 합계, 평균을 구하는 방법을 배웁니다.",
    goal: "개별 행 조회와 요약 조회의 차이를 이해하고 WHERE와 HAVING을 구분합니다.",
    sections: [
      {
        title: "GROUP BY는 행을 묶습니다",
        body: [
          p("직원 14명을 그대로 보면 14행입니다. 하지만 부서별 직원 수를 알고 싶다면 부서번호별로 행을 묶어야 합니다. 이때 GROUP BY를 쓰고, COUNT, SUM, AVG 같은 집계 함수를 함께 씁니다."),
          table(["함수", "의미", "예시"], [
            ["COUNT(*)", "행 개수", "부서별 직원 수"],
            ["SUM(SAL)", "합계", "부서별 급여 합계"],
            ["AVG(SAL)", "평균", "부서별 평균 급여"],
            ["MIN(SAL)", "최솟값", "가장 낮은 급여"],
            ["MAX(SAL)", "최댓값", "가장 높은 급여"]
          ])
        ]
      },
      {
        title: "WHERE와 HAVING 차이",
        body: [
          p("WHERE는 그룹을 만들기 전에 행을 거릅니다. HAVING은 그룹을 만든 뒤 집계 결과를 기준으로 그룹을 거릅니다. 예를 들어 '급여가 1000 이상인 직원만 대상으로 부서별 합계를 구한 뒤, 합계가 5000 이상인 부서만 보기'라면 WHERE와 HAVING이 둘 다 필요합니다."),
          code(`
SELECT DEPTNO, COUNT(*) AS EMP_COUNT, SUM(SAL) AS TOTAL_SAL
FROM EMP
WHERE SAL >= 1000
GROUP BY DEPTNO
HAVING SUM(SAL) >= 5000;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "부서별 직원 수와 급여 합계",
        desc: "가장 기본적인 GROUP BY 예제입니다.",
        sql: `
SELECT DEPTNO, COUNT(*) AS EMP_COUNT, SUM(SAL) AS TOTAL_SAL
FROM EMP
GROUP BY DEPTNO
ORDER BY DEPTNO;
        `
      },
      {
        title: "상품 카테고리별 평균 가격",
        desc: "쇼핑몰 데이터에서도 같은 방식으로 그룹핑합니다.",
        sql: `
SELECT CATEGORY, COUNT(*) AS PRODUCT_COUNT, AVG(PRICE) AS AVG_PRICE
FROM PRODUCTS
GROUP BY CATEGORY;
        `
      }
    ],
    drills: [
      {
        prompt: "직무별 직원 수를 구하세요.",
        answer: "SELECT JOB, COUNT(*) AS EMP_COUNT\nFROM EMP\nGROUP BY JOB;"
      },
      {
        prompt: "부서별 평균 급여를 구하고 평균 급여 내림차순으로 정렬하세요.",
        answer: "SELECT DEPTNO, AVG(SAL) AS AVG_SAL\nFROM EMP\nGROUP BY DEPTNO\nORDER BY AVG_SAL DESC;"
      },
      {
        prompt: "직원이 3명 이상인 부서만 조회하세요.",
        answer: "SELECT DEPTNO, COUNT(*) AS EMP_COUNT\nFROM EMP\nGROUP BY DEPTNO\nHAVING COUNT(*) >= 3;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT DEPTNO, COUNT(*) AS EMP_COUNT, SUM(SAL) AS TOTAL_SAL FROM EMP GROUP BY DEPTNO ORDER BY DEPTNO;",
      correctQuery: "SELECT DEPTNO, COUNT(*) AS EMP_COUNT, SUM(SAL) AS TOTAL_SAL FROM EMP GROUP BY DEPTNO ORDER BY DEPTNO;",
      description: "부서별 직원 수와 급여 합계를 조회하고 부서번호순으로 정렬하세요."
    }
  },
  {
    id: "ch11_joins",
    part: "Part 7. JOIN으로 테이블 연결하기",
    title: "11. INNER JOIN과 OUTER JOIN",
    tags: ["basic", "mysql", "sqld"],
    type: "practice",
    summary: "테이블 하나로는 부족할 때 여러 테이블을 키로 연결하는 JOIN을 배웁니다.",
    goal: "직원 테이블의 부서번호로 부서명을 가져오는 과정을 이해합니다.",
    sections: [
      {
        title: "왜 JOIN이 필요한가요?",
        body: [
          p("EMP 테이블에는 DEPTNO가 있지만 부서명 DNAME은 없습니다. 부서명은 DEPT 테이블에 있습니다. 데이터를 이렇게 나누는 이유는 중복을 줄이고 수정 실수를 막기 위해서입니다. 대신 조회할 때는 두 테이블을 연결해야 합니다. 이것이 JOIN입니다."),
          table(["JOIN 종류", "결과", "언제 쓰나"], [
            ["INNER JOIN", "양쪽에 매칭되는 행만", "직원의 부서명을 가져올 때"],
            ["LEFT JOIN", "왼쪽 테이블 행은 모두 유지", "주문 없는 고객도 보고 싶을 때"],
            ["RIGHT JOIN", "오른쪽 테이블 행은 모두 유지", "대부분 LEFT JOIN으로 바꿔 씀"],
            ["SELF JOIN", "같은 테이블끼리 연결", "직원과 관리자 관계"]
          ])
        ]
      },
      {
        title: "ON은 연결 조건입니다",
        body: [
          p("<code>ON E.DEPTNO = D.DEPTNO</code>는 EMP의 부서번호와 DEPT의 부서번호가 같은 행끼리 붙이라는 뜻입니다. JOIN에서 ON 조건을 잘못 쓰면 결과가 폭발적으로 늘어날 수 있습니다."),
          code(`
SELECT E.ENAME, E.DEPTNO, D.DNAME
FROM EMP E
JOIN DEPT D ON D.DEPTNO = E.DEPTNO;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "직원명과 부서명 조회",
        desc: "EMP와 DEPT를 부서번호로 연결합니다.",
        sql: `
SELECT E.ENAME, D.DNAME
FROM EMP E
JOIN DEPT D ON D.DEPTNO = E.DEPTNO
ORDER BY E.ENAME;
        `
      },
      {
        title: "주문과 고객 연결",
        desc: "주문을 누가 했는지 고객명을 함께 봅니다.",
        sql: `
SELECT O.ORDER_ID, C.NAME, O.ORDER_DATE, O.TOTAL_AMOUNT
FROM ORDERS O
JOIN CUSTOMERS C ON C.CUSTOMER_ID = O.CUSTOMER_ID;
        `
      }
    ],
    drills: [
      {
        prompt: "직원명, 직무, 부서 위치를 조회하세요.",
        answer: "SELECT E.ENAME, E.JOB, D.LOC\nFROM EMP E\nJOIN DEPT D ON D.DEPTNO = E.DEPTNO;"
      },
      {
        prompt: "모든 부서를 보여주되 직원이 없으면 직원명은 NULL로 나오게 하세요.",
        answer: "SELECT D.DNAME, E.ENAME\nFROM DEPT D\nLEFT JOIN EMP E ON E.DEPTNO = D.DEPTNO;"
      },
      {
        prompt: "주문번호, 상품명, 수량을 조회하세요.",
        answer: "SELECT OD.ORDER_ID, P.NAME, OD.QUANTITY\nFROM ORDER_DETAILS OD\nJOIN PRODUCTS P ON P.PRODUCT_ID = OD.PRODUCT_ID;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON D.DEPTNO = E.DEPTNO ORDER BY E.ENAME;",
      correctQuery: "SELECT E.ENAME, D.DNAME FROM EMP E JOIN DEPT D ON D.DEPTNO = E.DEPTNO ORDER BY E.ENAME;",
      description: "직원명과 부서명을 함께 조회하고 직원명순으로 정렬하세요."
    }
  },
  {
    id: "ch12_subqueries_cte",
    part: "Part 7. JOIN으로 테이블 연결하기",
    title: "12. 서브쿼리와 CTE",
    tags: ["mysql", "sqld", "advanced"],
    type: "practice",
    summary: "쿼리 안에 또 다른 쿼리를 넣어 평균보다 큰 값, 특정 조건을 만족하는 목록 등을 찾습니다.",
    goal: "한 번에 답하기 어려운 질문을 중간 결과로 나누어 생각합니다.",
    sections: [
      {
        title: "서브쿼리는 쿼리 안의 쿼리입니다",
        body: [
          p("예를 들어 '전체 평균 급여보다 많이 받는 직원'을 찾으려면 먼저 전체 평균 급여를 알아야 합니다. 이 평균을 구하는 SELECT를 WHERE 안에 넣으면 됩니다."),
          code(`
SELECT ENAME, SAL
FROM EMP
WHERE SAL > (SELECT AVG(SAL) FROM EMP);
          `),
          p("괄호 안의 SELECT가 먼저 평균을 계산하고, 바깥 SELECT가 그 평균보다 큰 직원을 찾습니다.")
        ]
      },
      {
        title: "CTE는 이름 붙인 중간 결과입니다",
        body: [
          p("CTE는 <code>WITH 이름 AS (...)</code> 형태로 쿼리의 중간 결과에 이름을 붙이는 방식입니다. 긴 SQL을 단계별로 읽기 좋게 만들 수 있습니다."),
          code(`
WITH dept_salary AS (
  SELECT DEPTNO, AVG(SAL) AS AVG_SAL
  FROM EMP
  GROUP BY DEPTNO
)
SELECT E.ENAME, E.SAL, D.AVG_SAL
FROM EMP E
JOIN dept_salary D ON D.DEPTNO = E.DEPTNO
WHERE E.SAL >= D.AVG_SAL;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "평균보다 높은 급여",
        desc: "스칼라 서브쿼리는 결과가 한 값인 서브쿼리입니다.",
        sql: `
SELECT ENAME, SAL
FROM EMP
WHERE SAL > (SELECT AVG(SAL) FROM EMP)
ORDER BY SAL DESC;
        `
      }
    ],
    drills: [
      {
        prompt: "가장 높은 급여를 받는 직원의 이름과 급여를 조회하세요.",
        answer: "SELECT ENAME, SAL\nFROM EMP\nWHERE SAL = (SELECT MAX(SAL) FROM EMP);"
      },
      {
        prompt: "SALES 부서에 속한 직원 이름을 서브쿼리로 조회하세요.",
        answer: "SELECT ENAME\nFROM EMP\nWHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE DNAME = 'SALES');"
      },
      {
        prompt: "평균 상품 가격보다 비싼 상품을 조회하세요.",
        answer: "SELECT NAME, PRICE\nFROM PRODUCTS\nWHERE PRICE > (SELECT AVG(PRICE) FROM PRODUCTS);"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT ENAME, SAL FROM EMP WHERE SAL > (SELECT AVG(SAL) FROM EMP) ORDER BY SAL DESC;",
      correctQuery: "SELECT ENAME, SAL FROM EMP WHERE SAL > (SELECT AVG(SAL) FROM EMP) ORDER BY SAL DESC;",
      description: "전체 평균 급여보다 높은 직원의 이름과 급여를 급여 내림차순으로 조회하세요."
    }
  },
  {
    id: "ch13_window",
    part: "Part 8. 분석 SQL",
    title: "13. 윈도우 함수",
    tags: ["mysql", "sqld", "advanced"],
    type: "practice",
    summary: "GROUP BY처럼 행을 줄이지 않고 각 행 옆에 순위, 누계, 이전 값 같은 분석 결과를 붙입니다.",
    goal: "부서별 급여 순위처럼 '그룹 안에서의 계산'을 할 수 있게 됩니다.",
    sections: [
      {
        title: "GROUP BY와 무엇이 다른가요?",
        body: [
          p("GROUP BY는 여러 행을 하나의 요약 행으로 줄입니다. 반면 윈도우 함수는 원래 행을 유지하면서 분석 값을 옆에 붙입니다. 그래서 직원 한 명 한 명을 보면서 그 직원의 부서 내 순위를 함께 볼 수 있습니다."),
          table(["함수", "의미"], [
            ["ROW_NUMBER()", "중복 없이 1, 2, 3 순번"],
            ["RANK()", "동점이 있으면 다음 순위를 건너뜀"],
            ["DENSE_RANK()", "동점이 있어도 다음 순위를 건너뛰지 않음"],
            ["LAG()", "이전 행 값"],
            ["LEAD()", "다음 행 값"],
            ["SUM() OVER", "누계 또는 그룹별 합계"]
          ])
        ]
      },
      {
        title: "OVER 안의 PARTITION BY와 ORDER BY",
        body: [
          p("<code>PARTITION BY DEPTNO</code>는 부서별로 나누어 계산하라는 뜻이고, <code>ORDER BY SAL DESC</code>는 급여 높은 순서로 순위를 매기라는 뜻입니다."),
          code(`
SELECT DEPTNO, ENAME, SAL,
       RANK() OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) AS SAL_RANK
FROM EMP;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "부서별 급여 순위",
        desc: "각 직원이 자기 부서 안에서 몇 등인지 계산합니다.",
        sql: `
SELECT DEPTNO, ENAME, SAL,
       RANK() OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) AS SAL_RANK
FROM EMP
ORDER BY DEPTNO, SAL_RANK;
        `
      }
    ],
    drills: [
      {
        prompt: "전체 직원 급여 순위를 ROW_NUMBER로 매기세요.",
        answer: "SELECT ENAME, SAL,\n       ROW_NUMBER() OVER (ORDER BY SAL DESC) AS RN\nFROM EMP;"
      },
      {
        prompt: "부서별 급여 합계를 각 직원 행 옆에 붙이세요.",
        answer: "SELECT DEPTNO, ENAME, SAL,\n       SUM(SAL) OVER (PARTITION BY DEPTNO) AS DEPT_TOTAL\nFROM EMP;"
      },
      {
        prompt: "상품 카테고리별 가격 순위를 구하세요.",
        answer: "SELECT CATEGORY, NAME, PRICE,\n       RANK() OVER (PARTITION BY CATEGORY ORDER BY PRICE DESC) AS PRICE_RANK\nFROM PRODUCTS;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT DEPTNO, ENAME, SAL, RANK() OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) AS SAL_RANK FROM EMP ORDER BY DEPTNO, SAL_RANK;",
      correctQuery: "SELECT DEPTNO, ENAME, SAL, RANK() OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) AS SAL_RANK FROM EMP ORDER BY DEPTNO, SAL_RANK;",
      description: "부서별 급여 순위를 <code>RANK()</code>로 계산하세요."
    }
  },
  {
    id: "ch14_views_generated",
    part: "Part 8. 분석 SQL",
    title: "14. VIEW와 재사용 가능한 SELECT",
    tags: ["mysql", "gisa"],
    type: "practice",
    summary: "복잡한 SELECT에 이름을 붙여 테이블처럼 조회하는 VIEW를 배웁니다.",
    goal: "반복해서 쓰는 조회 SQL을 뷰로 감싸는 이유와 한계를 이해합니다.",
    sections: [
      {
        title: "VIEW는 저장된 SELECT입니다",
        body: [
          p("VIEW는 실제 데이터를 새로 저장하는 테이블이 아니라, SELECT 문에 이름을 붙인 가상 테이블입니다. 자주 쓰는 조인이나 필터를 숨겨서 쉽게 재사용할 수 있습니다."),
          code(`
CREATE VIEW V_DEPT20 AS
SELECT EMPNO, ENAME, DEPTNO
FROM EMP
WHERE DEPTNO = 20;
          `)
        ]
      },
      {
        title: "VIEW를 쓰는 이유",
        body: [
          ul([
            "복잡한 SELECT를 짧은 이름으로 재사용할 수 있습니다.",
            "필요한 컬럼만 보여주어 보안을 조금 더 쉽게 관리할 수 있습니다.",
            "분석가나 앱 개발자에게 단순한 조회 인터페이스를 줄 수 있습니다.",
            "단, 집계나 JOIN이 복잡한 VIEW는 INSERT, UPDATE가 제한될 수 있습니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "20번 부서 직원 뷰 만들기",
        desc: "뷰를 만든 뒤 SELECT * FROM V_DEPT20으로 조회할 수 있습니다.",
        sql: `
CREATE VIEW V_DEPT20 AS
SELECT EMPNO, ENAME, DEPTNO
FROM EMP
WHERE DEPTNO = 20;
        `
      }
    ],
    drills: [
      {
        prompt: "급여가 3000 이상인 직원만 보여주는 V_HIGH_SAL 뷰를 작성하세요.",
        answer: "CREATE VIEW V_HIGH_SAL AS\nSELECT EMPNO, ENAME, SAL\nFROM EMP\nWHERE SAL >= 3000;"
      },
      {
        prompt: "V_DEPT20 뷰를 조회하는 SQL을 작성하세요.",
        answer: "SELECT * FROM V_DEPT20;"
      },
      {
        prompt: "VIEW와 TABLE의 가장 큰 차이를 설명하세요.",
        answer: "TABLE은 실제 데이터를 저장하고, VIEW는 SELECT 정의를 저장해 가상 테이블처럼 보여줍니다."
      }
    ],
    exercise: {
      type: "view_exists",
      viewName: "V_DEPT20",
      starterSql: "CREATE VIEW V_DEPT20 AS\nSELECT EMPNO, ENAME, DEPTNO FROM EMP WHERE DEPTNO = 20;",
      description: "부서번호 20 직원의 사번, 이름, 부서번호만 보여주는 <code>V_DEPT20</code> 뷰를 만드세요."
    }
  },
  {
    id: "ch15_indexes",
    part: "Part 9. 성능 기초",
    title: "15. 인덱스를 초보자 눈높이로 이해하기",
    tags: ["mysql", "sqld", "advanced"],
    type: "info",
    summary: "인덱스가 왜 조회를 빠르게 만들고, 언제 오히려 부담이 되는지 설명합니다.",
    goal: "인덱스를 책의 목차나 사전의 색인처럼 이해합니다.",
    sections: [
      {
        title: "인덱스는 빨리 찾기 위한 별도 구조입니다",
        body: [
          p("책에서 특정 단어를 찾을 때 처음부터 끝까지 읽으면 오래 걸립니다. 색인을 보면 단어가 몇 페이지에 있는지 바로 찾을 수 있습니다. DB 인덱스도 비슷합니다. 조건에 맞는 행을 빨리 찾기 위한 별도 자료구조입니다."),
          p("하지만 인덱스는 공짜가 아닙니다. INSERT, UPDATE, DELETE가 일어날 때 인덱스도 같이 갱신해야 하므로 쓰기 비용이 늘고 저장 공간도 더 씁니다."),
          table(["상황", "인덱스 효과"], [
            ["WHERE로 자주 검색하는 컬럼", "효과가 큼"],
            ["JOIN 조건 컬럼", "효과가 큼"],
            ["ORDER BY에 자주 쓰는 컬럼", "정렬 비용을 줄일 수 있음"],
            ["값 종류가 너무 적은 컬럼", "단독 인덱스 효과가 작을 수 있음"],
            ["거의 수정만 하고 조회하지 않는 컬럼", "인덱스가 부담일 수 있음"]
          ])
        ]
      },
      {
        title: "인덱스를 왜 쓰는지 비유로 이해하기",
        body: [
          p("인덱스가 없다는 것은 도서관에서 책 제목도 서가 번호도 모른 채 모든 책장을 하나씩 뒤지는 것과 같습니다. 인덱스가 있다는 것은 도서 검색대에서 '이 책은 3층 B-12에 있다'는 위치표를 먼저 받는 것과 비슷합니다. DB는 이 위치표를 보고 필요한 데이터가 있는 곳으로 더 빨리 이동합니다."),
          p("다만 모든 책에 색인 스티커를 너무 많이 붙이면 새 책을 꽂을 때마다 스티커를 여러 군데 갱신해야 합니다. DB도 마찬가지로 인덱스가 많을수록 조회는 도움을 받을 수 있지만, 데이터를 추가하거나 고칠 때 일이 늘어납니다."),
          table(["비유", "DB에서의 의미"], [
            ["도서관 검색대", "인덱스"],
            ["책 전체를 훑기", "Full Table Scan"],
            ["검색대에서 위치 확인 후 이동", "Index Seek 또는 Index Range Scan"],
            ["스티커를 너무 많이 붙인 책", "인덱스가 과하게 많은 테이블"],
            ["사람들이 자주 찾는 책에만 안내판 설치", "자주 쓰는 WHERE, JOIN, ORDER BY 중심으로 인덱스 설계"]
          ]),
          callout("note", "인덱스의 핵심 질문", "이 컬럼으로 자주 찾는가, 찾았을 때 전체 중 일부만 가져오는가, 쓰기 비용을 감당할 만큼 이득이 큰가를 먼저 묻습니다.")
        ]
      },
      {
        title: "복합 인덱스의 순서",
        body: [
          p("복합 인덱스는 여러 컬럼을 묶은 인덱스입니다. <code>(customer_id, order_date)</code> 인덱스는 고객별 주문을 날짜순으로 찾는 데 좋습니다. 앞 컬럼부터 차례대로 잘 쓰는 것이 중요합니다."),
          code(`
CREATE INDEX idx_orders_customer_date
ON ORDERS (CUSTOMER_ID, ORDER_DATE);
          `)
        ]
      },
      {
        title: "B-Tree 인덱스가 빠른 이유",
        body: [
          p("MySQL의 일반 인덱스는 대부분 B-Tree 계열입니다. B-Tree는 값을 정렬된 나무 구조로 보관합니다. DB는 루트에서 시작해 중간 노드를 거쳐 리프 노드로 내려가며 찾을 범위를 빠르게 좁힙니다. 그래서 전체 테이블을 처음부터 끝까지 읽는 Full Scan보다 훨씬 적은 페이지를 읽을 수 있습니다."),
          table(["방식", "비유", "특징"], [
            ["Full Table Scan", "책 전체를 첫 페이지부터 끝까지 훑기", "작은 테이블에서는 괜찮지만 큰 테이블에서는 느립니다."],
            ["Index Range Scan", "색인에서 ㄱ~ㄴ 범위만 찾기", "범위 조건에 유리합니다."],
            ["Index Seek", "사전에서 특정 단어 위치로 바로 가기", "동등 조건, 고유 키 조회에 강합니다."],
            ["Covering Index", "색인만 보고 답까지 해결", "테이블 본문을 추가로 읽지 않아도 됩니다."]
          ])
        ]
      },
      {
        title: "복합 인덱스는 왼쪽부터 읽습니다",
        body: [
          p("<code>(CATEGORY, PRICE)</code> 인덱스는 CATEGORY로 먼저 정렬되고, 같은 CATEGORY 안에서 PRICE로 정렬된 구조라고 생각하면 됩니다. 그래서 CATEGORY 조건이 있으면 PRICE 정렬이나 범위 검색까지 잘 이어질 수 있습니다. 반대로 PRICE만 조건으로 쓰면 인덱스를 제대로 쓰기 어려울 수 있습니다."),
          table(["인덱스", "쿼리", "활용 가능성"], [
            ["<code>(CATEGORY, PRICE)</code>", "<code>WHERE CATEGORY = 'Electronics'</code>", "좋음"],
            ["<code>(CATEGORY, PRICE)</code>", "<code>WHERE CATEGORY = 'Electronics' ORDER BY PRICE</code>", "좋음"],
            ["<code>(CATEGORY, PRICE)</code>", "<code>WHERE PRICE >= 1000000</code>", "앞 컬럼 CATEGORY가 없어 제한적"],
            ["<code>(CUSTOMER_ID, ORDER_DATE)</code>", "<code>WHERE CUSTOMER_ID = 1 ORDER BY ORDER_DATE DESC</code>", "좋음"]
          ]),
          callout("note", "왼쪽 접두어 규칙", "복합 인덱스는 보통 왼쪽 컬럼부터 연속해서 사용할 때 가장 효과가 좋습니다. 그래서 컬럼 순서는 실제 WHERE와 ORDER BY 패턴을 보고 정해야 합니다.")
        ]
      },
      {
        title: "인덱스가 잘 안 타는 대표 상황",
        body: [
          ul([
            "컬럼을 함수로 감싼 경우: <code>WHERE DATE(ORDER_DATE) = '2026-05-10'</code>",
            "앞쪽 와일드카드 LIKE: <code>WHERE NAME LIKE '%phone%'</code>",
            "조건 컬럼의 값 종류가 너무 적은 경우: Y/N 같은 값",
            "테이블의 대부분 행을 가져오는 경우: 인덱스로 찾아도 결국 많이 읽어야 합니다.",
            "통계가 오래되어 옵티마이저가 잘못 판단하는 경우"
          ]),
          code(`
-- 인덱스에 불리한 방식
WHERE DATE(ORDER_DATE) = '2026-05-10'

-- 범위 조건으로 바꾼 방식
WHERE ORDER_DATE >= '2026-05-10'
  AND ORDER_DATE <  '2026-05-11'
          `)
        ]
      },
      {
        title: "인덱스 설계 체크리스트",
        body: [
          ol([
            "이 쿼리는 자주 실행되는가?",
            "WHERE 조건에 자주 등장하는 컬럼은 무엇인가?",
            "JOIN의 ON 조건에 쓰이는 컬럼은 무엇인가?",
            "ORDER BY나 GROUP BY에 자주 쓰이는 컬럼은 무엇인가?",
            "결과 행이 전체 중 얼마나 적은가? 선택도가 충분한가?",
            "쓰기 작업이 많은 테이블인가? 인덱스 추가 비용을 감당할 수 있는가?",
            "EXPLAIN으로 실제로 인덱스를 쓰는지 확인했는가?"
          ])
        ]
      }
    ],
    examples: [
      {
        title: "카테고리와 가격 검색",
        desc: "전자제품을 가격순으로 자주 본다면 category, price 인덱스를 고려합니다.",
        sql: `
SELECT NAME, CATEGORY, PRICE
FROM PRODUCTS
WHERE CATEGORY = 'Electronics'
ORDER BY PRICE DESC;
        `
      },
      {
        title: "커버링 인덱스 감각",
        desc: "아래 쿼리는 CATEGORY, PRICE, NAME만 필요합니다. 인덱스가 이 컬럼들을 포함하면 테이블 본문 접근을 줄일 수 있습니다.",
        sql: `
CREATE INDEX idx_products_category_price_name
ON PRODUCTS (CATEGORY, PRICE, NAME);

SELECT NAME, PRICE
FROM PRODUCTS
WHERE CATEGORY = 'Electronics'
ORDER BY PRICE DESC;
        `
      }
    ],
    drills: [
      {
        prompt: "주문 테이블에서 CUSTOMER_ID로 자주 검색한다면 어떤 인덱스를 만들 수 있나요?",
        answer: "CREATE INDEX idx_orders_customer ON ORDERS (CUSTOMER_ID);"
      },
      {
        prompt: "인덱스가 많으면 무조건 좋은가요?",
        answer: "아닙니다. 쓰기 성능과 저장 공간 비용이 증가하므로 자주 쓰는 조회 조건 중심으로 만들어야 합니다."
      },
      {
        prompt: "상품 카테고리별 가격순 조회 SQL을 작성하세요.",
        answer: "SELECT NAME, CATEGORY, PRICE\nFROM PRODUCTS\nWHERE CATEGORY = 'Electronics'\nORDER BY PRICE DESC;"
      },
      {
        prompt: "인덱스 (CUSTOMER_ID, ORDER_DATE)가 있을 때 가장 잘 맞는 조회 패턴은 무엇인가요?",
        answer: "특정 고객의 주문을 주문일 기준으로 찾거나 정렬하는 패턴입니다.\n\nSELECT *\nFROM ORDERS\nWHERE CUSTOMER_ID = 1\nORDER BY ORDER_DATE DESC;"
      },
      {
        prompt: "WHERE DATE(ORDER_DATE) = '2026-05-10'이 인덱스에 불리한 이유는 무엇인가요?",
        answer: "컬럼 ORDER_DATE를 함수 DATE()로 감싸면 일반 인덱스의 정렬된 값을 그대로 활용하기 어려워질 수 있기 때문입니다. 범위 조건으로 바꾸는 편이 좋습니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT NAME, CATEGORY, PRICE FROM PRODUCTS WHERE CATEGORY = 'Electronics' ORDER BY PRICE DESC;",
      correctQuery: "SELECT NAME, CATEGORY, PRICE FROM PRODUCTS WHERE CATEGORY = 'Electronics' ORDER BY PRICE DESC;",
      description: "전자제품 상품의 이름, 카테고리, 가격을 가격 내림차순으로 조회하세요."
    }
  },
  {
    id: "ch16_explain",
    part: "Part 9. 성능 기초",
    title: "16. EXPLAIN 실행 계획 읽기",
    tags: ["mysql", "advanced"],
    type: "info",
    summary: "DB가 SQL을 어떻게 실행하려는지 보여주는 실행 계획을 읽는 법을 배웁니다.",
    goal: "느린 SQL을 만나면 감으로 고치지 않고 실행 계획부터 확인하는 습관을 만듭니다.",
    sections: [
      {
        title: "실행 계획은 DB의 작업 계획서입니다",
        body: [
          p("SQL을 쓰면 DB는 여러 실행 방법 중 하나를 고릅니다. 전체 테이블을 다 읽을 수도 있고, 인덱스로 일부만 찾을 수도 있습니다. EXPLAIN은 DB가 선택한 방법을 보여줍니다."),
          table(["MySQL EXPLAIN 컬럼", "의미", "초보자 체크"], [
            ["type", "접근 방식", "ALL이면 전체 스캔인지 확인"],
            ["key", "실제 사용한 인덱스", "기대한 인덱스를 쓰는지 확인"],
            ["rows", "예상으로 읽을 행 수", "너무 크면 조건이나 인덱스 검토"],
            ["Extra", "추가 작업", "Using filesort, temporary 확인"]
          ])
        ]
      },
      {
        title: "처음에는 세 가지만 보세요",
        body: [
          ol([
            "<strong>얼마나 많이 읽는가</strong>: rows가 너무 큰가?",
            "<strong>인덱스를 쓰는가</strong>: key가 NULL인가?",
            "<strong>정렬/임시 테이블이 생기는가</strong>: Extra에 filesort나 temporary가 있는가?"
          ])
        ]
      }
    ],
    examples: [
      {
        title: "고객별 주문 조회",
        desc: "실제 MySQL에서는 앞에 EXPLAIN을 붙여 실행 계획을 확인합니다.",
        sql: `
EXPLAIN
SELECT ORDER_ID, CUSTOMER_ID, ORDER_DATE
FROM ORDERS
WHERE CUSTOMER_ID = 1
ORDER BY ORDER_DATE DESC;
        `
      }
    ],
    drills: [
      {
        prompt: "EXPLAIN에서 type이 ALL이면 어떤 의미인가요?",
        answer: "전체 테이블 스캔일 가능성이 큽니다. 항상 나쁜 것은 아니지만 큰 테이블에서는 인덱스 검토가 필요합니다."
      },
      {
        prompt: "ORDERS에서 고객 1번 주문을 최신순으로 조회하세요.",
        answer: "SELECT ORDER_ID, CUSTOMER_ID, ORDER_DATE\nFROM ORDERS\nWHERE CUSTOMER_ID = 1\nORDER BY ORDER_DATE DESC;"
      },
      {
        prompt: "실행 계획을 볼 때 가장 먼저 확인할 컬럼 3개를 적어 보세요.",
        answer: "type, key, rows"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT ORDER_ID, CUSTOMER_ID, ORDER_DATE FROM ORDERS WHERE CUSTOMER_ID = 1 ORDER BY ORDER_DATE DESC;",
      correctQuery: "SELECT ORDER_ID, CUSTOMER_ID, ORDER_DATE FROM ORDERS WHERE CUSTOMER_ID = 1 ORDER BY ORDER_DATE DESC;",
      description: "고객 1번의 주문번호, 고객ID, 주문일을 최신순으로 조회하세요."
    }
  },
  {
    id: "ch17_transactions",
    part: "Part 10. 트랜잭션과 동시성",
    title: "17. 트랜잭션, COMMIT, ROLLBACK",
    tags: ["mysql", "sqld", "gisa", "advanced"],
    type: "info",
    summary: "여러 SQL을 하나의 작업 단위로 묶는 트랜잭션과 ACID, 격리 수준을 배웁니다.",
    goal: "주문 생성과 재고 차감을 왜 한 덩어리로 처리해야 하는지 이해합니다.",
    sections: [
      {
        title: "트랜잭션은 하나의 업무 묶음입니다",
        body: [
          p("쇼핑몰에서 주문을 만들 때 주문 테이블에 행을 넣고, 주문상세를 넣고, 상품 재고를 줄입니다. 이 중 하나만 성공하고 나머지가 실패하면 데이터가 망가집니다. 그래서 여러 SQL을 하나의 트랜잭션으로 묶어 전부 성공하면 COMMIT, 문제가 생기면 ROLLBACK합니다."),
          code(`
START TRANSACTION;

UPDATE PRODUCTS
SET STOCK = STOCK - 1
WHERE PRODUCT_ID = 101 AND STOCK > 0;

INSERT INTO ORDERS (ORDER_ID, CUSTOMER_ID, ORDER_DATE, TOTAL_AMOUNT)
VALUES (2001, 1, CURRENT_DATE, 1500000);

COMMIT;
          `)
        ]
      },
      {
        title: "ACID",
        body: [
          table(["특성", "쉬운 설명"], [
            ["Atomicity", "전부 성공하거나 전부 취소됩니다."],
            ["Consistency", "작업 후에도 데이터 규칙이 깨지지 않습니다."],
            ["Isolation", "동시에 실행되는 작업끼리 중간 상태를 함부로 보지 않습니다."],
            ["Durability", "COMMIT된 데이터는 장애가 나도 보존됩니다."]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "개념 확인용 SELECT",
        desc: "브라우저 실습창은 트랜잭션 명령 일부가 DBMS별로 다를 수 있어 개념 확인 쿼리로 검증합니다.",
        sql: "SELECT 'TRANSACTION_STUDIED' AS status;"
      }
    ],
    drills: [
      {
        prompt: "작업을 최종 확정하는 명령은 무엇인가요?",
        answer: "COMMIT"
      },
      {
        prompt: "작업을 취소하고 이전 상태로 되돌리는 명령은 무엇인가요?",
        answer: "ROLLBACK"
      },
      {
        prompt: "주문 생성과 재고 차감을 하나의 트랜잭션으로 묶어야 하는 이유를 설명하세요.",
        answer: "주문은 생성됐는데 재고가 줄지 않거나, 재고만 줄고 주문이 없는 불일치 상태를 막기 위해서입니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'TRANSACTION_STUDIED' AS status;",
      correctQuery: "SELECT 'TRANSACTION_STUDIED' AS status;",
      description: "트랜잭션 개념 확인용으로 <code>SELECT 'TRANSACTION_STUDIED' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch18_normalization",
    part: "Part 11. 설계와 모델링",
    title: "18. 정규화와 ERD",
    tags: ["mysql", "sqld", "gisa"],
    type: "info",
    summary: "테이블을 어떻게 나누어야 중복과 수정 실수를 줄일 수 있는지 배웁니다.",
    goal: "고객, 주문, 상품, 주문상세가 왜 한 테이블에 있으면 안 되는지 이해합니다.",
    sections: [
      {
        title: "정규화는 중복을 줄이는 설계 방법입니다",
        body: [
          p("주문 테이블에 고객 이름, 이메일, 상품명, 상품가격을 모두 반복 저장하면 어떻게 될까요? 고객 이메일이 바뀔 때 과거 주문의 이메일도 모두 고쳐야 합니다. 상품 가격을 잘못 고친 행과 안 고친 행이 섞일 수도 있습니다. 정규화는 이런 중복과 이상 현상을 줄이기 위해 테이블을 주제별로 나누는 과정입니다."),
          table(["정규형", "핵심", "쉬운 예"], [
            ["1NF", "한 칸에는 하나의 값만", "전화번호 여러 개를 한 칸에 쉼표로 넣지 않음"],
            ["2NF", "복합키 일부에만 의존하는 컬럼 분리", "주문상세에서 상품명은 상품 테이블로"],
            ["3NF", "키가 아닌 컬럼끼리 의존하면 분리", "고객등급과 할인율을 별도 테이블로"],
            ["BCNF", "모든 결정자가 후보키", "더 엄격한 3NF"]
          ])
        ]
      },
      {
        title: "정규화 비유: 원본 주소록 하나만 관리하기",
        body: [
          p("친구의 전화번호를 내 수첩, 노트북 메모, 휴대폰 연락처, 단체 채팅방 공지에 각각 복사해 두었다고 생각해 봅시다. 친구 번호가 바뀌면 네 곳을 모두 고쳐야 합니다. 한 곳이라도 놓치면 어떤 곳은 옛 번호, 어떤 곳은 새 번호가 되어 헷갈립니다."),
          p("정규화는 이런 복사본을 줄이고 '친구 정보는 주소록 한 곳에서만 관리하자'고 정하는 일입니다. 주문 테이블에는 고객 이름과 이메일을 복사하지 않고 CUSTOMER_ID만 둡니다. 고객 이름과 이메일은 CUSTOMERS 테이블의 원본을 보러 가면 됩니다."),
          table(["나쁜 방식", "정규화된 방식"], [
            ["주문마다 고객 이름과 이메일을 반복 저장", "주문에는 CUSTOMER_ID만 저장"],
            ["상품명과 현재 가격을 주문마다 반복 저장", "상품 기본 정보는 PRODUCTS에 저장"],
            ["고객 정보가 바뀌면 주문 행 전체 수정", "CUSTOMERS 한 행만 수정"],
            ["삭제하면 필요한 정보까지 사라질 수 있음", "주제별 테이블이 분리되어 정보 보존이 쉬움"]
          ]),
          callout("tip", "정규화의 목표", "테이블을 많이 나누는 것이 목표가 아니라, 같은 사실을 한 곳에서 관리해 실수를 줄이는 것이 목표입니다.")
        ]
      },
      {
        title: "N:M 관계는 중간 테이블로 풉니다",
        body: [
          p("한 주문에는 여러 상품이 들어갈 수 있고, 한 상품은 여러 주문에 등장할 수 있습니다. 이것이 N:M 관계입니다. 관계형 DB에서는 N:M을 직접 저장하지 않고 ORDER_DETAILS 같은 중간 테이블로 풀어 1:N, N:1 관계로 만듭니다.")
        ]
      },
      {
        title: "정규화를 배우는 진짜 이유: 이상 현상",
        body: [
          p("정규형 이름을 외우는 것보다 중요한 것은 이상 현상을 이해하는 것입니다. 이상 현상은 테이블 설계가 좋지 않아 INSERT, UPDATE, DELETE 때 데이터가 꼬이는 문제입니다."),
          table(["이상 현상", "무슨 문제인가", "예시"], [
            ["삽입 이상", "필요한 데이터를 넣고 싶은데 다른 데이터가 없어 못 넣음", "상품을 등록하려는데 주문번호가 없어서 못 넣는 구조"],
            ["갱신 이상", "같은 의미의 값이 여러 곳에 있어 일부만 수정됨", "고객 이메일이 주문 행마다 반복되어 일부만 변경"],
            ["삭제 이상", "삭제하면 보존해야 할 정보까지 사라짐", "마지막 주문을 삭제했더니 상품 정보도 함께 사라짐"]
          ]),
          p("정규화는 이런 이상 현상을 줄이기 위해 데이터를 주제별 테이블로 나누고, 키로 연결하는 작업입니다.")
        ]
      },
      {
        title: "나쁜 테이블에서 출발해 보기",
        body: [
          p("아래처럼 주문, 고객, 상품 정보를 한 테이블에 다 넣으면 처음에는 편해 보입니다. 하지만 같은 고객 이름과 이메일, 같은 상품명과 가격이 주문마다 반복됩니다."),
          code(`
-- 나쁜 예: 모든 것을 한 테이블에 넣음
ORDER_FLAT(
  ORDER_ID,
  ORDER_DATE,
  CUSTOMER_ID,
  CUSTOMER_NAME,
  CUSTOMER_EMAIL,
  PRODUCT_ID,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  QUANTITY
)
          `),
          p("이 구조에서는 고객 이메일이 바뀌면 그 고객의 모든 주문 행을 찾아 수정해야 합니다. 상품명이 바뀌어도 과거 주문 행마다 반복 수정해야 합니다. 그래서 아래처럼 나눕니다."),
          code(`
CUSTOMERS(CUSTOMER_ID, NAME, EMAIL)
PRODUCTS(PRODUCT_ID, NAME, PRICE, STOCK)
ORDERS(ORDER_ID, CUSTOMER_ID, ORDER_DATE)
ORDER_DETAILS(DETAIL_ID, ORDER_ID, PRODUCT_ID, QUANTITY, UNIT_PRICE)
          `)
        ]
      },
      {
        title: "1NF, 2NF, 3NF를 천천히 이해하기",
        body: [
          table(["정규형", "확인 질문", "문제가 있으면"], [
            ["1NF", "한 칸에 값이 하나만 들어가 있는가?", "반복되는 값은 별도 행이나 별도 테이블로 분리"],
            ["2NF", "복합키 전체에 의존하는가?", "복합키 일부에만 의존하는 컬럼을 분리"],
            ["3NF", "키가 아닌 컬럼이 다른 키 아닌 컬럼을 결정하는가?", "이행 종속을 별도 테이블로 분리"],
            ["BCNF", "모든 결정자가 후보키인가?", "3NF보다 엄격하게 결정자 기준으로 분리"]
          ]),
          callout("tip", "처음엔 3NF까지면 충분합니다", "실무 초반에는 1NF, 2NF, 3NF를 확실히 이해하는 것이 중요합니다. BCNF는 특수한 함수 종속 문제가 보일 때 더 깊게 들어가면 됩니다.")
        ]
      },
      {
        title: "정규화와 반정규화",
        body: [
          p("정규화를 하면 중복이 줄고 데이터가 깨질 가능성이 줄어듭니다. 대신 조회할 때 JOIN이 늘어날 수 있습니다. 그래서 실무에서는 기본적으로 정규화된 모델을 만들고, 성능상 꼭 필요한 경우에만 계산 결과나 요약 테이블을 일부 중복 저장하는 반정규화를 고려합니다."),
          table(["방식", "장점", "단점"], [
            ["정규화", "중복 감소, 무결성 증가, 수정 안전", "JOIN 증가, 조회 SQL이 길어질 수 있음"],
            ["반정규화", "조회 단순화, 일부 성능 개선", "중복 증가, 갱신 불일치 위험"]
          ]),
          callout("warning", "반정규화는 나중에", "초보 단계에서는 먼저 정규화된 모델을 이해하세요. 반정규화는 성능 문제와 갱신 전략을 설명할 수 있을 때 선택하는 카드입니다.")
        ]
      }
    ],
    examples: [
      {
        title: "주문 전체 흐름 조회",
        desc: "정규화된 네 테이블을 JOIN해서 사람이 읽기 좋은 결과로 만듭니다.",
        sql: `
SELECT O.ORDER_ID, C.NAME, P.NAME AS PRODUCT_NAME, OD.QUANTITY
FROM ORDERS O
JOIN CUSTOMERS C ON C.CUSTOMER_ID = O.CUSTOMER_ID
JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O.ORDER_ID
JOIN PRODUCTS P ON P.PRODUCT_ID = OD.PRODUCT_ID
ORDER BY O.ORDER_ID, P.NAME;
        `
      },
      {
        title: "정규화된 테이블에 주문 넣는 순서",
        desc: "부모 테이블이 먼저 있어야 자식 테이블이 참조할 수 있습니다.",
        sql: `
-- 1. 고객이 있어야 주문을 넣을 수 있습니다.
INSERT INTO CUSTOMERS (CUSTOMER_ID, NAME, EMAIL, JOIN_DATE)
VALUES (10, 'Study User', 'study@example.com', '2026-05-28');

-- 2. 주문은 고객을 참조합니다.
INSERT INTO ORDERS (ORDER_ID, CUSTOMER_ID, ORDER_DATE, TOTAL_AMOUNT)
VALUES (9001, 10, '2026-05-28', 59000);

-- 3. 주문상세는 주문과 상품을 참조합니다.
INSERT INTO ORDER_DETAILS (DETAIL_ID, ORDER_ID, PRODUCT_ID, QUANTITY, UNIT_PRICE)
VALUES (9901, 9001, 202, 1, 59000);
        `
      }
    ],
    drills: [
      {
        prompt: "고객 이메일을 주문 테이블마다 반복 저장하면 어떤 문제가 생기나요?",
        answer: "이메일 변경 시 모든 주문 행을 수정해야 하고, 일부만 수정되면 데이터 불일치가 생깁니다."
      },
      {
        prompt: "주문과 상품의 N:M 관계를 풀어 주는 테이블 이름으로 무엇이 있나요?",
        answer: "ORDER_DETAILS"
      },
      {
        prompt: "고객명과 주문번호를 함께 조회하는 JOIN을 작성하세요.",
        answer: "SELECT C.NAME, O.ORDER_ID\nFROM CUSTOMERS C\nJOIN ORDERS O ON O.CUSTOMER_ID = C.CUSTOMER_ID;"
      },
      {
        prompt: "한 칸에 전화번호를 '010-1111-1111, 010-2222-2222'처럼 저장하면 어떤 정규형을 위반하나요?",
        answer: "1NF를 위반합니다. 한 칸에는 하나의 원자값만 들어가야 합니다."
      },
      {
        prompt: "고객 이메일을 ORDERS에 반복 저장하지 않고 CUSTOMERS에 두는 이유는 무엇인가요?",
        answer: "고객 이메일 변경 시 한 곳만 수정하면 되므로 갱신 이상을 줄일 수 있습니다."
      },
      {
        prompt: "정규화를 하면 항상 성능이 좋아지나요?",
        answer: "항상 그렇지는 않습니다. 중복과 이상 현상은 줄지만 JOIN이 늘어날 수 있습니다. 그래서 실무에서는 정규화를 기본으로 하고 필요한 경우 신중하게 반정규화합니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT O.ORDER_ID, C.NAME, P.NAME AS PRODUCT_NAME, OD.QUANTITY FROM ORDERS O JOIN CUSTOMERS C ON C.CUSTOMER_ID = O.CUSTOMER_ID JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O.ORDER_ID JOIN PRODUCTS P ON P.PRODUCT_ID = OD.PRODUCT_ID ORDER BY O.ORDER_ID, P.NAME;",
      correctQuery: "SELECT O.ORDER_ID, C.NAME, P.NAME AS PRODUCT_NAME, OD.QUANTITY FROM ORDERS O JOIN CUSTOMERS C ON C.CUSTOMER_ID = O.CUSTOMER_ID JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O.ORDER_ID JOIN PRODUCTS P ON P.PRODUCT_ID = OD.PRODUCT_ID ORDER BY O.ORDER_ID, P.NAME;",
      description: "주문, 고객, 주문상세, 상품을 조인해 주문번호, 고객명, 상품명, 수량을 조회하세요."
    }
  },
  {
    id: "ch19_programming",
    part: "Part 12. MySQL 실무 기능",
    title: "19. Stored Procedure, Function, Trigger",
    tags: ["mysql", "gisa", "advanced"],
    type: "info",
    summary: "DB 안에 저장해 두는 절차형 로직과 자동 실행 로직을 배웁니다.",
    goal: "프로시저와 함수와 트리거가 각각 어떤 상황에서 쓰이는지 구분합니다.",
    sections: [
      {
        title: "프로시저와 함수",
        body: [
          p("Stored Procedure는 여러 SQL을 하나의 이름으로 묶어 호출하는 기능입니다. Stored Function은 값을 반환하는 함수입니다. 프로시저는 업무 처리 흐름에, 함수는 계산 결과를 SELECT 안에서 재사용할 때 쓰는 경우가 많습니다."),
          table(["객체", "무엇인가", "예"], [
            ["Procedure", "호출해서 실행하는 SQL 묶음", "부서 급여 일괄 인상"],
            ["Function", "값을 반환하는 함수", "세금 계산 함수"],
            ["Trigger", "INSERT/UPDATE/DELETE 때 자동 실행", "주문상세 추가 시 재고 차감"],
            ["Event", "정해진 시간에 자동 실행", "매일 오래된 로그 삭제"]
          ])
        ]
      },
      {
        title: "트리거는 조심해야 합니다",
        body: [
          p("트리거는 자동으로 실행되기 때문에 편리하지만, 코드에서 보이지 않는 부작용을 만들 수 있습니다. 실무에서는 트리거 사용 여부를 문서화하고, 너무 복잡한 업무 로직은 애플리케이션 쪽에서 관리하는 편이 나을 때도 많습니다."),
          code(`
CREATE TRIGGER after_order_detail_insert
AFTER INSERT ON ORDER_DETAILS
FOR EACH ROW
BEGIN
  UPDATE PRODUCTS
  SET STOCK = STOCK - NEW.QUANTITY
  WHERE PRODUCT_ID = NEW.PRODUCT_ID;
END;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "프로시저 구조",
        desc: "MySQL 프로시저는 DELIMITER를 바꾸고 BEGIN-END 블록을 사용합니다.",
        sql: `
DELIMITER //
CREATE PROCEDURE raise_salary(IN p_deptno INT, IN p_rate DECIMAL(5,2))
BEGIN
  UPDATE EMP
  SET SAL = SAL * (1 + p_rate)
  WHERE DEPTNO = p_deptno;
END //
DELIMITER ;
        `
      }
    ],
    drills: [
      {
        prompt: "값을 반드시 반환해야 하는 DB 객체는 Procedure와 Function 중 무엇인가요?",
        answer: "Function"
      },
      {
        prompt: "INSERT가 발생했을 때 자동으로 실행되는 객체는 무엇인가요?",
        answer: "Trigger"
      },
      {
        prompt: "프로시저를 너무 남용하면 어떤 문제가 생길 수 있나요?",
        answer: "업무 로직이 DB 안에 숨어 배포, 테스트, 버전 관리가 어려워질 수 있습니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'PROCEDURE_REVIEWED' AS status;",
      correctQuery: "SELECT 'PROCEDURE_REVIEWED' AS status;",
      description: "문법 확인용으로 <code>SELECT 'PROCEDURE_REVIEWED' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch20_security_backup",
    part: "Part 12. MySQL 실무 기능",
    title: "20. 계정, 권한, 백업과 복구",
    tags: ["mysql", "advanced"],
    type: "info",
    summary: "DB 운영에서 가장 중요한 최소 권한 원칙과 백업, 복구 테스트를 배웁니다.",
    goal: "데이터는 잃어버리면 끝이라는 감각으로 권한과 백업을 바라봅니다.",
    sections: [
      {
        title: "최소 권한 원칙",
        body: [
          p("애플리케이션이 주문을 조회하고 추가하는 역할만 한다면 DROP TABLE 권한은 필요 없습니다. 필요한 권한만 주면 실수나 공격으로 인한 피해를 줄일 수 있습니다."),
          code(`
CREATE USER 'app_user'@'10.%' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON shop.* TO 'app_user'@'10.%';

CREATE USER 'report_user'@'%' IDENTIFIED BY 'another_password';
GRANT SELECT ON shop.* TO 'report_user'@'%';
          `)
        ]
      },
      {
        title: "백업은 복구까지가 백업입니다",
        body: [
          p("백업 파일이 있다는 것만으로는 부족합니다. 실제로 복구되는지 확인해야 합니다. 복구 테스트를 해보지 않은 백업은 장애 상황에서 믿기 어렵습니다."),
          code(`
mysqldump -u backup_user -p --single-transaction --routines --triggers shop > shop.sql
mysql -u root -p restored_shop < shop.sql
          `)
        ]
      }
    ],
    examples: [
      {
        title: "조회 전용 계정의 의미",
        desc: "리포트용 계정에는 SELECT만 부여합니다.",
        sql: `
GRANT SELECT ON shop.* TO 'report_user'@'%';
        `
      }
    ],
    drills: [
      {
        prompt: "권한을 부여하는 명령은 무엇인가요?",
        answer: "GRANT"
      },
      {
        prompt: "권한을 회수하는 명령은 무엇인가요?",
        answer: "REVOKE"
      },
      {
        prompt: "백업 파일이 있는 것만으로 충분하지 않은 이유는 무엇인가요?",
        answer: "복구가 실제로 되는지 검증하지 않으면 장애 상황에서 사용할 수 없는 백업일 수 있기 때문입니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'BACKUP_PLAN_READY' AS status;",
      correctQuery: "SELECT 'BACKUP_PLAN_READY' AS status;",
      description: "운영 파트 확인용으로 <code>SELECT 'BACKUP_PLAN_READY' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch21_mysql_ops",
    part: "Part 13. MySQL 운영 심화",
    title: "21. InnoDB, 로그, 복제, 파티셔닝",
    tags: ["mysql", "advanced"],
    type: "info",
    summary: "MySQL을 깊게 쓰기 위해 알아야 하는 InnoDB 내부 구성과 운영 기능을 소개합니다.",
    goal: "DB가 단순히 파일에 저장하는 것이 아니라 캐시, 로그, 인덱스, 복제 구조로 움직인다는 점을 이해합니다.",
    sections: [
      {
        title: "InnoDB 핵심 구성",
        body: [
          table(["구성", "쉬운 설명"], [
            ["Buffer Pool", "자주 읽는 데이터와 인덱스를 메모리에 올려 둡니다."],
            ["Redo Log", "장애가 나도 커밋된 변경을 다시 살릴 수 있게 기록합니다."],
            ["Undo Log", "롤백과 MVCC 읽기를 위해 이전 버전을 보관합니다."],
            ["Clustered Index", "PRIMARY KEY 순서로 실제 행을 저장합니다."],
            ["Secondary Index", "보조 인덱스가 PRIMARY KEY 값을 가리킵니다."]
          ]),
          p("처음에는 용어를 완벽히 외우기보다, InnoDB가 빠른 조회와 안전한 트랜잭션을 위해 메모리와 로그를 함께 쓴다고 이해하면 충분합니다.")
        ]
      },
      {
        title: "복제와 파티셔닝",
        body: [
          p("복제는 한 서버의 변경을 다른 서버로 전달하는 구조입니다. 읽기 분산, 백업, 장애 대응에 쓰입니다. 파티셔닝은 큰 테이블을 날짜나 범위 기준으로 나누어 관리하는 기능입니다. 단, 파티셔닝은 성능 만능 해결책이 아니며 쿼리 조건이 파티션 기준을 잘 타야 효과가 있습니다.")
        ]
      }
    ],
    examples: [
      {
        title: "운영 심화 개념 확인",
        desc: "브라우저 실습창에서는 운영 기능을 직접 만들 수 없으므로 상태 쿼리로 확인합니다.",
        sql: "SELECT 'MYSQL_OPS_REVIEWED' AS status;"
      }
    ],
    drills: [
      {
        prompt: "Redo Log는 무엇을 위해 있나요?",
        answer: "장애 후에도 커밋된 변경을 복구하기 위해 있습니다."
      },
      {
        prompt: "Undo Log는 어떤 기능과 관련이 있나요?",
        answer: "ROLLBACK과 MVCC 읽기와 관련이 있습니다."
      },
      {
        prompt: "파티셔닝이 항상 조회를 빠르게 하나요?",
        answer: "아닙니다. 쿼리 조건이 파티션 기준을 잘 활용할 때 효과가 있습니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'MYSQL_OPS_REVIEWED' AS status;",
      correctQuery: "SELECT 'MYSQL_OPS_REVIEWED' AS status;",
      description: "MySQL 운영 심화 확인용으로 <code>SELECT 'MYSQL_OPS_REVIEWED' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch22_app_integration",
    part: "Part 13. MySQL 운영 심화",
    title: "22. 애플리케이션 연동과 SQL Injection 방어",
    tags: ["mysql", "advanced"],
    type: "info",
    summary: "백엔드 코드에서 DB에 접속할 때 커넥션 풀과 파라미터 바인딩이 왜 중요한지 배웁니다.",
    goal: "사용자 입력을 SQL 문자열에 직접 붙이면 위험하다는 것을 확실히 이해합니다.",
    sections: [
      {
        title: "커넥션 풀",
        body: [
          p("DB 접속은 생각보다 비용이 큽니다. 요청이 올 때마다 새 연결을 만들고 끊으면 느립니다. 커넥션 풀은 미리 여러 연결을 만들어 두고 재사용하는 방식입니다."),
          code(`
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});
          `)
        ]
      },
      {
        title: "SQL Injection 방어",
        body: [
          p("사용자가 입력한 값을 문자열로 이어 붙여 SQL을 만들면 공격자가 SQL 구조를 바꿀 수 있습니다. 그래서 <code>?</code> 플레이스홀더와 파라미터 바인딩을 사용해야 합니다."),
          code(`
// 안전한 방식
const [rows] = await pool.execute(
  "SELECT * FROM orders WHERE customer_id = ?",
  [customerId]
);
          `),
          callout("warning", "절대 피할 것", "<code>\"SELECT * FROM users WHERE id = \" + userInput</code>처럼 사용자 입력을 직접 붙이지 마세요.")
        ]
      }
    ],
    examples: [
      {
        title: "고객별 주문 수",
        desc: "실습 데이터로 애플리케이션에서 자주 쓰는 집계 조회를 연습합니다.",
        sql: `
SELECT CUSTOMER_ID, COUNT(*) AS ORDER_COUNT
FROM ORDERS
GROUP BY CUSTOMER_ID
ORDER BY ORDER_COUNT DESC;
        `
      }
    ],
    drills: [
      {
        prompt: "커넥션 풀을 쓰는 이유를 설명하세요.",
        answer: "DB 연결을 매번 새로 만들지 않고 재사용해 성능과 안정성을 높이기 위해서입니다."
      },
      {
        prompt: "사용자 입력을 SQL에 직접 붙이면 어떤 위험이 있나요?",
        answer: "SQL Injection 공격으로 쿼리 구조가 바뀌거나 데이터가 유출, 변경, 삭제될 수 있습니다."
      },
      {
        prompt: "고객별 총 주문금액을 조회하세요.",
        answer: "SELECT CUSTOMER_ID, SUM(TOTAL_AMOUNT) AS TOTAL_AMOUNT\nFROM ORDERS\nGROUP BY CUSTOMER_ID\nORDER BY TOTAL_AMOUNT DESC;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT CUSTOMER_ID, COUNT(*) AS ORDER_COUNT FROM ORDERS GROUP BY CUSTOMER_ID ORDER BY ORDER_COUNT DESC;",
      correctQuery: "SELECT CUSTOMER_ID, COUNT(*) AS ORDER_COUNT FROM ORDERS GROUP BY CUSTOMER_ID ORDER BY ORDER_COUNT DESC;",
      description: "고객별 주문 수를 집계해 주문 수 내림차순으로 조회하세요."
    }
  },
  {
    id: "ch23_exam_sheet",
    part: "Part 14. 시험 대비와 종합 연습",
    title: "23. SQLD와 정보처리기사 핵심 정리",
    tags: ["sqld", "gisa", "practice"],
    type: "info",
    summary: "시험에서 반복되는 용어와 함정을 초보자도 이해할 수 있게 다시 정리합니다.",
    goal: "암기 포인트를 실제 SQL 예제와 연결합니다.",
    sections: [
      {
        title: "시험 용어를 쉬운 말로",
        body: [
          table(["용어", "쉬운 뜻"], [
            ["릴레이션", "테이블"],
            ["튜플", "행"],
            ["속성", "컬럼"],
            ["카디널리티", "행의 개수 또는 값의 다양성"],
            ["차수", "컬럼 수"],
            ["도메인", "컬럼이 가질 수 있는 값의 범위"],
            ["무결성", "데이터가 규칙에 맞고 모순이 없는 상태"]
          ])
        ]
      },
      {
        title: "자주 틀리는 포인트",
        body: [
          ul([
            "NULL은 <code>= NULL</code>이 아니라 <code>IS NULL</code>로 찾습니다.",
            "WHERE는 그룹 전, HAVING은 그룹 후입니다.",
            "PRIMARY KEY는 중복과 NULL이 모두 불가능합니다.",
            "FOREIGN KEY는 참조 무결성을 지키기 위한 제약입니다.",
            "DELETE는 행 삭제, DROP은 테이블 삭제, TRUNCATE는 전체 행 빠른 삭제입니다.",
            "COMMIT은 확정, ROLLBACK은 취소입니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "시험 요약 확인",
        desc: "작은 쿼리로 실습 완료를 체크합니다.",
        sql: "SELECT 'EXAM_REVIEW_DONE' AS status;"
      }
    ],
    drills: [
      {
        prompt: "관계형 모델에서 행을 뜻하는 용어는 무엇인가요?",
        answer: "튜플"
      },
      {
        prompt: "관계형 모델에서 컬럼을 뜻하는 용어는 무엇인가요?",
        answer: "속성"
      },
      {
        prompt: "WHERE와 HAVING의 차이를 한 문장으로 설명하세요.",
        answer: "WHERE는 그룹 전 행을 거르고, HAVING은 그룹 후 집계 결과를 거릅니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'EXAM_REVIEW_DONE' AS status;",
      correctQuery: "SELECT 'EXAM_REVIEW_DONE' AS status;",
      description: "시험 요약 확인용으로 <code>SELECT 'EXAM_REVIEW_DONE' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch24_project",
    part: "Part 14. 시험 대비와 종합 연습",
    title: "24. 미니 프로젝트: 쇼핑몰 분석 SQL",
    tags: ["mysql", "practice"],
    type: "practice",
    summary: "고객, 상품, 주문, 주문상세 테이블을 이용해 실무형 분석 질문을 SQL로 바꿉니다.",
    goal: "문제를 받으면 필요한 테이블, 조인 조건, 집계 기준, 정렬 기준을 스스로 찾습니다.",
    sections: [
      {
        title: "질문을 SQL로 바꾸는 순서",
        body: [
          ol([
            "무엇을 보고 싶은지 결과 컬럼을 정합니다.",
            "어느 테이블이 필요한지 찾습니다.",
            "테이블 사이의 연결 키를 확인합니다.",
            "필요한 조건 WHERE를 정합니다.",
            "요약이 필요하면 GROUP BY를 정합니다.",
            "보기 좋은 순서로 ORDER BY를 붙입니다."
          ])
        ]
      },
      {
        title: "고객별 구매액 문제 분석",
        body: [
          p("고객별 총 구매액을 구하려면 CUSTOMERS에서 고객명, ORDERS에서 주문, ORDER_DETAILS에서 수량과 단가가 필요합니다. 총액은 <code>QUANTITY * UNIT_PRICE</code>를 합산하면 됩니다."),
          code(`
SELECT C.NAME, SUM(OD.QUANTITY * OD.UNIT_PRICE) AS REVENUE
FROM CUSTOMERS C
JOIN ORDERS O ON O.CUSTOMER_ID = C.CUSTOMER_ID
JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O.ORDER_ID
GROUP BY C.CUSTOMER_ID, C.NAME
ORDER BY REVENUE DESC;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "카테고리별 매출",
        desc: "상품 카테고리별로 판매액을 집계합니다.",
        sql: `
SELECT P.CATEGORY, SUM(OD.QUANTITY * OD.UNIT_PRICE) AS REVENUE
FROM ORDER_DETAILS OD
JOIN PRODUCTS P ON P.PRODUCT_ID = OD.PRODUCT_ID
GROUP BY P.CATEGORY
ORDER BY REVENUE DESC;
        `
      }
    ],
    drills: [
      {
        prompt: "상품별 판매 수량을 많이 팔린 순서로 조회하세요.",
        answer: "SELECT P.NAME, SUM(OD.QUANTITY) AS SOLD_QTY\nFROM ORDER_DETAILS OD\nJOIN PRODUCTS P ON P.PRODUCT_ID = OD.PRODUCT_ID\nGROUP BY P.PRODUCT_ID, P.NAME\nORDER BY SOLD_QTY DESC;"
      },
      {
        prompt: "고객별 주문 횟수를 조회하세요.",
        answer: "SELECT C.NAME, COUNT(*) AS ORDER_COUNT\nFROM CUSTOMERS C\nJOIN ORDERS O ON O.CUSTOMER_ID = C.CUSTOMER_ID\nGROUP BY C.CUSTOMER_ID, C.NAME\nORDER BY ORDER_COUNT DESC;"
      },
      {
        prompt: "날짜별 매출 합계를 조회하세요.",
        answer: "SELECT O.ORDER_DATE, SUM(OD.QUANTITY * OD.UNIT_PRICE) AS REVENUE\nFROM ORDERS O\nJOIN ORDER_DETAILS OD ON OD.ORDER_ID = O.ORDER_ID\nGROUP BY O.ORDER_DATE\nORDER BY O.ORDER_DATE;"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT C.NAME, SUM(OD.QUANTITY * OD.UNIT_PRICE) AS REVENUE FROM CUSTOMERS C JOIN ORDERS O ON O.CUSTOMER_ID = C.CUSTOMER_ID JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O.ORDER_ID GROUP BY C.CUSTOMER_ID, C.NAME ORDER BY REVENUE DESC;",
      correctQuery: "SELECT C.NAME, SUM(OD.QUANTITY * OD.UNIT_PRICE) AS REVENUE FROM CUSTOMERS C JOIN ORDERS O ON O.CUSTOMER_ID = C.CUSTOMER_ID JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O.ORDER_ID GROUP BY C.CUSTOMER_ID, C.NAME ORDER BY REVENUE DESC;",
      description: "고객별 총 구매액을 구하고 구매액 내림차순으로 정렬하세요."
    }
  },
  {
    id: "ch25_pg_overview",
    part: "Part 15. PostgreSQL 심화",
    title: "25. PostgreSQL을 배우는 이유와 MySQL 차이",
    tags: ["postgres", "advanced"],
    type: "info",
    summary: "MySQL로 기본기를 잡은 뒤 PostgreSQL을 배우면 SQL 표준, 고급 타입, 분석 기능을 더 넓게 익힐 수 있습니다.",
    goal: "PostgreSQL이 MySQL과 비슷하면서도 어떤 점에서 더 엄격하고 강력한지 이해합니다.",
    sections: [
      {
        title: "PostgreSQL의 성격",
        body: [
          p("PostgreSQL은 표준 SQL을 폭넓게 지원하고 타입 시스템과 인덱스, 확장 기능이 강력합니다. 데이터 분석, 복잡한 조회, JSONB, 공간 데이터, 전문 검색처럼 고급 기능을 많이 다루는 프로젝트에서 자주 선택됩니다."),
          table(["주제", "MySQL", "PostgreSQL"], [
            ["자동 증가", "AUTO_INCREMENT", "GENERATED AS IDENTITY 또는 SERIAL"],
            ["UPSERT", "ON DUPLICATE KEY UPDATE", "ON CONFLICT DO UPDATE"],
            ["JSON", "JSON 타입과 함수", "JSONB와 GIN 인덱스가 강력"],
            ["스키마", "DB 중심 사용이 흔함", "DB 안의 schema를 적극 활용"],
            ["식별자", "대소문자 처리 비교적 관대", "따옴표 없는 식별자는 소문자로 접힘"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "PostgreSQL 테이블 예시",
        desc: "IDENTITY와 TIMESTAMPTZ를 사용하는 PostgreSQL 스타일입니다.",
        sql: `
CREATE TABLE app.users (
  user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
        `
      }
    ],
    drills: [
      {
        prompt: "PostgreSQL의 UPSERT 문법 키워드는 무엇인가요?",
        answer: "ON CONFLICT DO UPDATE"
      },
      {
        prompt: "MySQL의 자동 증가 키워드는 무엇인가요?",
        answer: "AUTO_INCREMENT"
      },
      {
        prompt: "PostgreSQL에서 시간대 정보를 포함하는 timestamp 타입은 무엇인가요?",
        answer: "TIMESTAMPTZ"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'POSTGRES_OVERVIEW' AS status;",
      correctQuery: "SELECT 'POSTGRES_OVERVIEW' AS status;",
      description: "PostgreSQL 파트 시작 확인용으로 <code>SELECT 'POSTGRES_OVERVIEW' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch26_pg_types",
    part: "Part 15. PostgreSQL 심화",
    title: "26. PostgreSQL 고급 타입: JSONB, 배열, 범위",
    tags: ["postgres", "advanced"],
    type: "info",
    summary: "PostgreSQL의 강력한 타입 시스템을 이용해 더 풍부한 데이터 규칙을 표현하는 방법을 배웁니다.",
    goal: "PostgreSQL이 단순한 표 저장소를 넘어 다양한 데이터 형태를 직접 다룰 수 있음을 이해합니다.",
    sections: [
      {
        title: "JSONB",
        body: [
          p("JSONB는 JSON 데이터를 이진 형태로 저장해 검색과 인덱싱에 유리하게 만든 타입입니다. 상품 옵션, 이벤트 로그, 사용자 설정처럼 구조가 자주 바뀌는 데이터를 저장할 때 유용합니다."),
          code(`
CREATE TABLE events (
  event_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  payload JSONB NOT NULL
);

CREATE INDEX idx_events_payload ON events USING GIN (payload);
          `)
        ]
      },
      {
        title: "배열, 범위, ENUM, DOMAIN",
        body: [
          table(["타입", "용도"], [
            ["ARRAY", "짧은 태그 목록이나 권한 목록"],
            ["RANGE", "예약 기간, 가격 구간처럼 시작과 끝이 있는 값"],
            ["ENUM", "정해진 상태값만 허용"],
            ["DOMAIN", "재사용 가능한 제약 타입"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "주문 상태 ENUM",
        desc: "상태값을 아무 문자열이나 받지 않고 정해진 값만 허용합니다.",
        sql: `
CREATE TYPE order_status AS ENUM ('READY', 'PAID', 'SHIPPED', 'CANCELED');

CREATE TABLE pg_orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status order_status NOT NULL,
  extra JSONB NOT NULL DEFAULT '{}'
);
        `
      }
    ],
    drills: [
      {
        prompt: "PostgreSQL에서 JSON 검색 성능을 위해 자주 함께 쓰는 인덱스는 무엇인가요?",
        answer: "GIN 인덱스"
      },
      {
        prompt: "정해진 상태값만 허용하고 싶을 때 사용할 수 있는 타입은 무엇인가요?",
        answer: "ENUM"
      },
      {
        prompt: "예약 기간처럼 시작과 끝이 있는 값을 표현하기 좋은 타입은 무엇인가요?",
        answer: "RANGE 타입"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'POSTGRES_TYPES' AS status;",
      correctQuery: "SELECT 'POSTGRES_TYPES' AS status;",
      description: "PostgreSQL 타입 확인용으로 <code>SELECT 'POSTGRES_TYPES' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch27_pg_sql",
    part: "Part 15. PostgreSQL 심화",
    title: "27. PostgreSQL 고급 SQL: DISTINCT ON, LATERAL, 재귀 CTE",
    tags: ["postgres", "advanced"],
    type: "info",
    summary: "PostgreSQL이 제공하는 고급 SQL 문법으로 그룹별 최신 행, 고객별 TOP N, 계층 구조를 다루는 방법을 배웁니다.",
    goal: "MySQL 기본 SQL에서 한 단계 넘어 PostgreSQL다운 표현 방식을 익힙니다.",
    sections: [
      {
        title: "DISTINCT ON",
        body: [
          p("PostgreSQL의 <code>DISTINCT ON</code>은 그룹별로 첫 번째 행만 뽑을 때 유용합니다. 예를 들어 고객별 최신 주문 1건을 찾을 수 있습니다."),
          code(`
SELECT DISTINCT ON (customer_id)
  customer_id, order_id, order_date
FROM orders
ORDER BY customer_id, order_date DESC;
          `)
        ]
      },
      {
        title: "LATERAL",
        body: [
          p("<code>LATERAL</code>은 바깥쪽 행의 값을 안쪽 서브쿼리에서 사용할 수 있게 합니다. 고객별 최근 주문 3개 같은 문제에 좋습니다."),
          code(`
SELECT c.customer_id, recent.order_id, recent.order_date
FROM customers c
LEFT JOIN LATERAL (
  SELECT order_id, order_date
  FROM orders o
  WHERE o.customer_id = c.customer_id
  ORDER BY order_date DESC
  LIMIT 3
) recent ON true;
          `)
        ]
      }
    ],
    examples: [
      {
        title: "재귀 CTE 개념",
        desc: "조직도, 카테고리 트리처럼 부모-자식 구조를 따라갈 때 씁니다.",
        sql: `
WITH RECURSIVE category_tree AS (
  SELECT id, parent_id, name, 1 AS depth
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  SELECT c.id, c.parent_id, c.name, ct.depth + 1
  FROM categories c
  JOIN category_tree ct ON ct.id = c.parent_id
)
SELECT * FROM category_tree;
        `
      }
    ],
    drills: [
      {
        prompt: "PostgreSQL에서 그룹별 최신 행 1건을 뽑을 때 유용한 문법은 무엇인가요?",
        answer: "DISTINCT ON"
      },
      {
        prompt: "바깥 행 값을 안쪽 서브쿼리에서 쓰게 해주는 JOIN 방식은 무엇인가요?",
        answer: "LATERAL"
      },
      {
        prompt: "조직도 같은 계층 구조를 SQL로 펼칠 때 쓰는 기능은 무엇인가요?",
        answer: "재귀 CTE, WITH RECURSIVE"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'POSTGRES_SQL_ADVANCED' AS status;",
      correctQuery: "SELECT 'POSTGRES_SQL_ADVANCED' AS status;",
      description: "고급 SQL 확인용으로 <code>SELECT 'POSTGRES_SQL_ADVANCED' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch28_pg_indexes",
    part: "Part 15. PostgreSQL 심화",
    title: "28. PostgreSQL 인덱스: GIN, GiST, BRIN",
    tags: ["postgres", "advanced"],
    type: "info",
    summary: "PostgreSQL의 다양한 인덱스가 각각 어떤 데이터와 검색에 맞는지 배웁니다.",
    goal: "B-Tree만 있는 것이 아니라 문제에 맞는 인덱스 종류를 고를 수 있다는 감각을 얻습니다.",
    sections: [
      {
        title: "인덱스 종류별 쓰임",
        body: [
          table(["인덱스", "잘 맞는 상황", "예"], [
            ["B-Tree", "일반 동등, 범위, 정렬", "id, created_at, price"],
            ["GIN", "JSONB, 배열, 전문 검색", "payload @> 조건"],
            ["GiST", "범위, 공간, 유사도", "예약 기간 겹침"],
            ["BRIN", "아주 큰 순차 데이터", "로그, 시계열"],
            ["Partial", "일부 행만 인덱싱", "취소되지 않은 주문만"],
            ["Expression", "표현식 결과 인덱싱", "lower(email)"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "표현식 인덱스와 부분 인덱스",
        desc: "이메일 소문자 검색, 활성 주문 검색처럼 조건에 맞춘 인덱스입니다.",
        sql: `
CREATE INDEX idx_users_lower_email ON users (lower(email));
CREATE INDEX idx_orders_active ON orders (created_at) WHERE status <> 'CANCELED';
CREATE INDEX idx_events_payload_gin ON events USING GIN (payload jsonb_path_ops);
        `
      }
    ],
    drills: [
      {
        prompt: "JSONB 검색에 자주 쓰는 PostgreSQL 인덱스는 무엇인가요?",
        answer: "GIN"
      },
      {
        prompt: "아주 큰 로그 테이블처럼 물리적 순서와 값이 비슷하게 증가하는 데이터에 유용한 인덱스는 무엇인가요?",
        answer: "BRIN"
      },
      {
        prompt: "lower(email) 검색을 빠르게 하려면 어떤 인덱스를 만들 수 있나요?",
        answer: "CREATE INDEX idx_users_lower_email ON users (lower(email));"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'POSTGRES_INDEXES' AS status;",
      correctQuery: "SELECT 'POSTGRES_INDEXES' AS status;",
      description: "PostgreSQL 인덱스 확인용으로 <code>SELECT 'POSTGRES_INDEXES' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch29_pg_mvcc",
    part: "Part 15. PostgreSQL 심화",
    title: "29. PostgreSQL MVCC, VACUUM, 락",
    tags: ["postgres", "advanced"],
    type: "info",
    summary: "PostgreSQL이 동시성을 처리하는 방식과 VACUUM이 왜 중요한지 배웁니다.",
    goal: "죽은 튜플, autovacuum, bloat라는 용어를 이해합니다.",
    sections: [
      {
        title: "MVCC는 여러 버전을 둡니다",
        body: [
          p("PostgreSQL은 UPDATE나 DELETE 때 기존 행을 바로 덮어쓰지 않습니다. 새 버전을 만들거나 죽은 튜플을 남겨 두고, 각 트랜잭션이 자기에게 맞는 버전을 읽게 합니다. 이 덕분에 읽기와 쓰기가 덜 충돌합니다."),
          p("하지만 오래된 버전이 계속 남으면 테이블과 인덱스가 부풀어 성능이 떨어집니다. 그래서 VACUUM이 필요합니다."),
          table(["용어", "의미"], [
            ["Dead Tuple", "더 이상 필요 없는 오래된 행 버전"],
            ["VACUUM", "죽은 튜플 공간을 재사용 가능하게 정리"],
            ["ANALYZE", "실행 계획용 통계를 갱신"],
            ["Autovacuum", "자동으로 VACUUM/ANALYZE를 수행하는 프로세스"],
            ["Bloat", "죽은 튜플 때문에 테이블/인덱스가 부푼 상태"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "VACUUM과 락 확인",
        desc: "운영 PostgreSQL에서 자주 보는 명령입니다.",
        sql: `
VACUUM (ANALYZE) orders;

SELECT relation::regclass, mode, granted
FROM pg_locks
WHERE relation IS NOT NULL;
        `
      }
    ],
    drills: [
      {
        prompt: "PostgreSQL에서 죽은 튜플을 정리하는 작업은 무엇인가요?",
        answer: "VACUUM"
      },
      {
        prompt: "실행 계획에 필요한 통계를 갱신하는 작업은 무엇인가요?",
        answer: "ANALYZE"
      },
      {
        prompt: "Autovacuum을 무작정 끄면 어떤 문제가 생길 수 있나요?",
        answer: "죽은 튜플이 쌓여 테이블과 인덱스가 부풀고 성능이 떨어질 수 있습니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'POSTGRES_MVCC' AS status;",
      correctQuery: "SELECT 'POSTGRES_MVCC' AS status;",
      description: "MVCC 확인용으로 <code>SELECT 'POSTGRES_MVCC' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch30_pg_extensions",
    part: "Part 15. PostgreSQL 심화",
    title: "30. PostgreSQL 확장과 성능 분석",
    tags: ["postgres", "advanced"],
    type: "info",
    summary: "PostgreSQL의 확장 생태계와 EXPLAIN ANALYZE를 이용한 성능 분석 흐름을 정리합니다.",
    goal: "PostgreSQL은 확장 가능한 DB 플랫폼이라는 점을 이해하고 다음 학습 방향을 잡습니다.",
    sections: [
      {
        title: "자주 쓰는 확장",
        body: [
          table(["확장", "용도"], [
            ["pg_stat_statements", "쿼리별 누적 실행 통계 확인"],
            ["pgcrypto", "암호화, UUID 생성"],
            ["uuid-ossp", "UUID 생성"],
            ["pg_trgm", "유사 문자열 검색"],
            ["PostGIS", "공간 데이터와 지도 기능"],
            ["unaccent", "악센트 제거 검색"]
          ])
        ]
      },
      {
        title: "성능 분석 흐름",
        body: [
          ol([
            "느린 쿼리를 찾습니다. pg_stat_statements나 로그를 봅니다.",
            "<code>EXPLAIN (ANALYZE, BUFFERS)</code>로 실제 실행 계획을 봅니다.",
            "가장 많이 읽는 노드, 예상과 실제 차이, 정렬/해시/중첩 루프를 확인합니다.",
            "인덱스, 통계, SQL 구조, 데이터 모델을 조정합니다.",
            "다시 EXPLAIN ANALYZE로 개선 여부를 확인합니다."
          ]),
          code(`
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM products
WHERE name ILIKE '%phone%';
          `)
        ]
      }
    ],
    examples: [
      {
        title: "확장 설치",
        desc: "권한이 있는 계정으로 필요한 확장을 켭니다.",
        sql: `
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
        `
      }
    ],
    drills: [
      {
        prompt: "쿼리별 누적 실행 통계를 보는 대표 확장은 무엇인가요?",
        answer: "pg_stat_statements"
      },
      {
        prompt: "지도나 공간 데이터를 다루는 PostgreSQL 확장은 무엇인가요?",
        answer: "PostGIS"
      },
      {
        prompt: "실제 실행 시간과 버퍼 사용량까지 보려면 어떤 EXPLAIN 옵션을 쓰나요?",
        answer: "EXPLAIN (ANALYZE, BUFFERS)"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'SQL_LEARNING_BOOK_COMPLETE' AS status;",
      correctQuery: "SELECT 'SQL_LEARNING_BOOK_COMPLETE' AS status;",
      description: "마지막 확인으로 <code>SELECT 'SQL_LEARNING_BOOK_COMPLETE' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch31_redis_intro",
    part: "Part 16. Redis 부록",
    title: "31. Redis 입문: 왜 쓰고 언제 쓰나",
    tags: ["redis", "advanced"],
    type: "info",
    summary: "Redis를 단순한 캐시가 아니라 메모리 기반 자료구조 서버로 이해합니다.",
    goal: "Redis가 MySQL을 대체하는 DB가 아니라, 빠른 읽기와 임시 상태 관리를 도와주는 보조 저장소라는 점을 이해합니다.",
    sections: [
      {
        title: "Redis는 무엇인가요?",
        body: [
          p("Redis는 데이터를 메모리에 저장하는 매우 빠른 Key-Value 저장소입니다. MySQL처럼 테이블과 JOIN을 중심으로 생각하는 DB가 아니라, <strong>key 하나에 value 하나</strong>를 빠르게 넣고 빼는 방식으로 생각합니다."),
          p("Redis는 캐시로 가장 많이 쓰이지만, 세션 저장소, 랭킹, 카운터, 분산 락, Pub/Sub, 작업 큐, Stream 기반 이벤트 처리에도 자주 쓰입니다."),
          table(["구분", "MySQL", "Redis"], [
            ["주 저장 위치", "디스크 중심, 메모리 캐시 활용", "메모리 중심"],
            ["데이터 모델", "테이블, 행, 열, 관계", "Key-Value와 자료구조"],
            ["강점", "정합성, 복잡한 조회, JOIN, 트랜잭션", "매우 빠른 읽기/쓰기, TTL, 원자적 카운터"],
            ["약점", "매우 짧은 응답시간 캐시에 불리", "복잡한 관계형 조회에 부적합"],
            ["대표 용도", "영구 데이터 원본", "캐시, 세션, 랭킹, 임시 상태"]
          ]),
          callout("warning", "Redis는 MySQL 대체재가 아닙니다", "주문, 결제, 고객 원장 같은 영구 핵심 데이터는 MySQL/PostgreSQL에 두고, Redis는 빠른 보조 저장소로 쓰는 것이 일반적입니다.")
        ]
      },
      {
        title: "Redis를 쓰면 좋은 상황",
        body: [
          ul([
            "같은 데이터를 매우 자주 읽어서 DB 부하가 커질 때",
            "로그인 세션처럼 만료 시간이 있는 데이터를 저장할 때",
            "조회수, 좋아요 수처럼 빠르게 증가시키는 카운터가 필요할 때",
            "실시간 랭킹처럼 점수 기준 정렬이 필요할 때",
            "짧은 시간 동안 중복 요청을 막아야 할 때",
            "여러 서버 사이에서 간단한 메시지를 발행/구독해야 할 때"
          ])
        ]
      },
      {
        title: "Redis 사고방식: key 설계가 중요합니다",
        body: [
          p("Redis에서는 테이블 설계 대신 key 설계가 중요합니다. key 이름만 봐도 어떤 데이터인지 알 수 있게 규칙을 정합니다."),
          table(["목적", "key 예시", "value 예시"], [
            ["상품 상세 캐시", "<code>product:101</code>", "상품 JSON"],
            ["사용자 세션", "<code>session:abc123</code>", "user_id, login_at"],
            ["게시글 조회수", "<code>post:77:view_count</code>", "12345"],
            ["일일 API 제한", "<code>rate:user:5:20260528</code>", "요청 횟수"],
            ["랭킹", "<code>rank:daily:sales</code>", "Sorted Set"]
          ]),
          callout("tip", "key 네이밍", "보통 <code>도메인:식별자:속성</code> 형태를 많이 씁니다. 예: <code>user:42:profile</code>, <code>product:101:stock</code>")
        ]
      },
      {
        title: "Redis를 직접 써 보는 가장 쉬운 방법",
        body: [
          p("처음 공부할 때는 PC에 복잡하게 설치하기보다 Docker Desktop으로 Redis Stack을 띄우는 방법이 가장 무난합니다. Redis Stack은 Redis 서버와 RedisInsight라는 화면 도구를 함께 제공해서, 명령어로 넣은 key가 실제로 어떻게 저장되는지 눈으로 확인하기 좋습니다."),
          code(`
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

docker exec -it redis-stack redis-cli
          `),
          ul([
            "<code>6379</code>: 애플리케이션이나 redis-cli가 Redis에 접속하는 기본 포트입니다.",
            "<code>8001</code>: 브라우저에서 RedisInsight를 여는 포트입니다. 실행 후 <code>http://localhost:8001</code>에 접속하면 됩니다.",
            "<code>redis-cli</code>: Redis에 직접 명령어를 입력하는 콘솔입니다. SQL 실습창처럼 Redis 명령을 손으로 쳐 보기에 좋습니다."
          ]),
          callout("warning", "로컬 학습용과 운영용은 다릅니다", "비밀번호, 네트워크 공개 범위, 영속성 설정 없이 띄운 Redis는 공부용입니다. 실제 서비스에서는 인증, 백업, 메모리 제한, 장애 대응을 반드시 설정해야 합니다.")
        ]
      },
      {
        title: "MySQL 옆에서 Redis가 하는 일",
        body: [
          p("Redis는 보통 MySQL 앞이나 옆에 붙습니다. MySQL이 원본 장부라면 Redis는 자주 꺼내 보는 포스트잇입니다. 포스트잇이 빠르다고 해서 원본 장부를 버리지는 않습니다. 포스트잇이 떨어지면 원본 장부에서 다시 적어 오면 됩니다."),
          ol([
            "사용자가 상품 101번을 요청합니다.",
            "애플리케이션이 Redis의 <code>product:101</code> key를 먼저 확인합니다.",
            "있으면 바로 응답합니다. 이것이 cache hit입니다.",
            "없으면 MySQL의 PRODUCTS 테이블에서 조회합니다. 이것이 cache miss입니다.",
            "조회한 결과를 Redis에 TTL과 함께 저장하고 사용자에게 응답합니다."
          ]),
          code(`
GET product:101

-- 값이 없으면 MySQL 조회 후 Redis에 5분 저장
SETEX product:101 300 '{"product_id":101,"name":"iPhone","price":1500000}'
          `)
        ]
      }
    ],
    examples: [
      {
        title: "Redis CLI 기본 명령",
        desc: "Redis를 설치하면 redis-cli에서 아래처럼 key-value를 다룹니다.",
        sql: `
SET user:1:name "Kim"
GET user:1:name

SETEX auth:code:abc123 300 "839201"
TTL auth:code:abc123

DEL user:1:name
        `,
        explain: "<code>SETEX</code>는 값을 저장하면서 만료 시간을 초 단위로 함께 지정합니다."
      }
    ],
    drills: [
      {
        prompt: "Redis가 MySQL보다 적합한 대표 상황 하나를 말해 보세요.",
        answer: "로그인 세션처럼 빠르게 읽고 만료 시간이 필요한 데이터를 저장할 때 Redis가 적합합니다."
      },
      {
        prompt: "상품 101번 상세 정보를 캐시한다면 key 이름을 어떻게 잡을 수 있나요?",
        answer: "product:101 또는 product:101:detail처럼 잡을 수 있습니다."
      },
      {
        prompt: "Redis에서 key가 자동으로 사라지게 하는 기능은 무엇인가요?",
        answer: "TTL, expire 기능입니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'REDIS_INTRO' AS status;",
      correctQuery: "SELECT 'REDIS_INTRO' AS status;",
      description: "Redis 입문 확인용으로 <code>SELECT 'REDIS_INTRO' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch32_redis_data_structures",
    part: "Part 16. Redis 부록",
    title: "32. Redis 자료구조: String, Hash, List, Set, Sorted Set",
    tags: ["redis", "advanced"],
    type: "info",
    summary: "Redis 실력의 핵심인 자료구조 선택법을 자세히 배웁니다.",
    goal: "문제를 보면 어떤 Redis 자료구조를 써야 하는지 판단할 수 있게 됩니다.",
    sections: [
      {
        title: "Redis는 자료구조 서버입니다",
        body: [
          p("Redis를 단순히 문자열 저장소로만 쓰면 장점을 절반도 못 씁니다. Redis의 강점은 key마다 String, Hash, List, Set, Sorted Set 같은 자료구조를 선택할 수 있다는 점입니다."),
          table(["자료구조", "특징", "대표 용도"], [
            ["String", "가장 기본. 문자열, 숫자, JSON 저장", "캐시, 카운터, 토큰"],
            ["Hash", "key 안에 field-value 여러 개 저장", "사용자 프로필, 상품 요약"],
            ["List", "순서 있는 목록. 양쪽 push/pop", "간단한 큐, 최근 본 목록"],
            ["Set", "중복 없는 집합", "좋아요 사용자 목록, 태그"],
            ["Sorted Set", "점수(score)로 정렬되는 집합", "랭킹, 우선순위"],
            ["Stream", "append-only 이벤트 로그", "이벤트 처리, 메시지 큐"]
          ])
        ]
      },
      {
        title: "String: 캐시와 카운터",
        body: [
          p("String은 가장 단순한 자료구조입니다. 숫자도 문자열로 저장되지만 Redis는 <code>INCR</code>, <code>DECR</code> 같은 원자적 증가 명령을 제공합니다."),
          code(`
SET product:101:stock 50
GET product:101:stock

INCR post:77:view_count
INCRBY post:77:view_count 10
          `),
          p("원자적이라는 말은 여러 요청이 동시에 와도 증가 연산이 꼬이지 않게 Redis가 한 번에 처리해 준다는 뜻입니다.")
        ]
      },
      {
        title: "Hash: 객체를 나눠 담기",
        body: [
          p("Hash는 하나의 key 안에 여러 field를 저장합니다. 사용자 프로필처럼 여러 속성이 있지만 전체를 하나의 단위로 보고 싶을 때 좋습니다."),
          code(`
HSET user:1 name "Kim" email "kim@example.com" grade "VIP"
HGET user:1 name
HGETALL user:1
HINCRBY user:1 login_count 1
          `),
          callout("tip", "Hash vs JSON String", "일부 필드만 자주 바꾼다면 Hash가 편하고, 애플리케이션에서 통째로 직렬화해 쓰는 캐시라면 JSON 문자열도 자주 씁니다.")
        ]
      },
      {
        title: "List, Set, Sorted Set 선택법",
        body: [
          table(["필요한 것", "추천 자료구조", "명령 예시"], [
            ["순서가 중요하고 중복 허용", "List", "<code>LPUSH, RPUSH, LPOP, LRANGE</code>"],
            ["중복 없이 포함 여부 확인", "Set", "<code>SADD, SISMEMBER, SREM</code>"],
            ["점수 기준 정렬과 랭킹", "Sorted Set", "<code>ZADD, ZRANGE, ZREVRANGE</code>"]
          ]),
          code(`
-- 최근 본 상품: List
LPUSH recent:user:1 101
LPUSH recent:user:1 202
LRANGE recent:user:1 0 9

-- 좋아요 사용자: Set
SADD post:77:likes user:1
SISMEMBER post:77:likes user:1

-- 일간 랭킹: Sorted Set
ZADD rank:daily:sales 1500 product:101
ZINCRBY rank:daily:sales 300 product:101
ZREVRANGE rank:daily:sales 0 9 WITHSCORES
          `)
        ]
      }
    ],
    examples: [
      {
        title: "게시글 조회수와 좋아요",
        desc: "조회수는 String 카운터, 좋아요 사용자는 Set으로 설계할 수 있습니다.",
        sql: `
INCR post:77:view_count

SADD post:77:likes user:1
SADD post:77:likes user:2
SCARD post:77:likes
        `
      },
      {
        title: "상품 랭킹",
        desc: "Sorted Set은 점수와 멤버를 함께 저장합니다.",
        sql: `
ZINCRBY rank:product:daily 1 product:101
ZINCRBY rank:product:daily 3 product:202
ZREVRANGE rank:product:daily 0 4 WITHSCORES
        `
      }
    ],
    drills: [
      {
        prompt: "실시간 랭킹을 만들 때 가장 적합한 Redis 자료구조는 무엇인가요?",
        answer: "Sorted Set입니다. score 기준으로 정렬하고 순위를 조회할 수 있습니다."
      },
      {
        prompt: "사용자 프로필의 name, email, grade를 Redis에 저장한다면 어떤 자료구조가 적합한가요?",
        answer: "Hash가 적합합니다. HSET user:1 name \"Kim\" email \"kim@example.com\" grade \"VIP\"처럼 저장할 수 있습니다."
      },
      {
        prompt: "중복 없이 좋아요 누른 사용자 목록을 저장하려면 어떤 자료구조가 좋나요?",
        answer: "Set이 좋습니다."
      },
      {
        prompt: "조회수를 1 증가시키는 Redis 명령을 작성해 보세요.",
        answer: "INCR post:77:view_count"
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'REDIS_STRUCTURES' AS status;",
      correctQuery: "SELECT 'REDIS_STRUCTURES' AS status;",
      description: "Redis 자료구조 확인용으로 <code>SELECT 'REDIS_STRUCTURES' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch33_redis_patterns_ops",
    part: "Part 16. Redis 부록",
    title: "33. Redis 실무 패턴: 캐시, TTL, 락, Pub/Sub, Stream, 영속성",
    tags: ["redis", "advanced"],
    type: "info",
    summary: "Redis를 실무에서 쓸 때 꼭 알아야 하는 캐시 전략과 운영 주의점을 깊게 정리합니다.",
    goal: "Redis를 빠른 저장소로만 보지 않고 장애, 만료, 정합성, 메모리 한계를 함께 고려합니다.",
    sections: [
      {
        title: "캐시 Aside 패턴",
        body: [
          p("가장 흔한 패턴은 Cache Aside입니다. 애플리케이션이 먼저 Redis에서 데이터를 찾고, 없으면 MySQL에서 읽어 Redis에 저장한 뒤 응답합니다."),
          ol([
            "클라이언트가 상품 101번을 요청합니다.",
            "애플리케이션이 Redis에서 <code>product:101</code>을 조회합니다.",
            "값이 있으면 바로 응답합니다. 이것을 cache hit라고 합니다.",
            "값이 없으면 MySQL에서 상품을 조회합니다. 이것을 cache miss라고 합니다.",
            "조회 결과를 Redis에 TTL과 함께 저장하고 응답합니다."
          ]),
          code(`
GET product:101

-- cache miss라면 MySQL 조회 후
SETEX product:101 300 '{"id":101,"name":"iPhone 15 Pro","price":1500000}'
          `)
        ]
      },
      {
        title: "TTL과 캐시 무효화",
        body: [
          p("캐시는 원본 데이터와 달라질 수 있습니다. 그래서 TTL을 두거나, 원본 데이터가 바뀔 때 캐시를 삭제해야 합니다. 이것을 캐시 무효화라고 합니다."),
          table(["전략", "설명", "주의점"], [
            ["TTL 만료", "일정 시간이 지나면 자동 삭제", "최대 TTL 시간만큼 오래된 값이 보일 수 있음"],
            ["수정 시 삭제", "DB 업데이트 후 관련 캐시 DEL", "삭제 실패 시 불일치 가능"],
            ["Write Through", "DB와 캐시를 함께 갱신", "쓰기 경로가 복잡해짐"],
            ["짧은 TTL + 삭제", "둘을 함께 사용", "실무에서 안전한 편"]
          ]),
          callout("warning", "캐시는 원본이 아닙니다", "Redis에 있는 캐시가 사라져도 MySQL/PostgreSQL 원본 데이터로 다시 만들 수 있어야 합니다.")
        ]
      },
      {
        title: "캐시 문제: 침투, 관통, 폭주",
        body: [
          table(["문제", "뜻", "대응"], [
            ["Cache Penetration", "존재하지 않는 key 요청이 계속 DB까지 감", "없는 값도 짧게 캐시, Bloom Filter"],
            ["Cache Breakdown", "인기 key 하나가 만료되어 순간적으로 DB에 몰림", "mutex lock, TTL 분산, 사전 갱신"],
            ["Cache Avalanche", "많은 key가 동시에 만료되어 DB 폭주", "TTL에 랜덤값 추가, 다층 캐시"],
            ["Hot Key", "특정 key에 요청이 과도하게 몰림", "복제, 분산 key, 로컬 캐시"]
          ])
        ]
      },
      {
        title: "분산 락은 신중하게",
        body: [
          p("여러 서버가 동시에 같은 작업을 하지 못하게 Redis로 락을 구현할 수 있습니다. 하지만 락 만료, 작업 시간 초과, 네트워크 지연을 고려해야 해서 단순해 보이지만 어렵습니다."),
          code(`
-- NX: 없을 때만 설정, EX: 만료 시간
SET lock:order:1001 "request-uuid" NX EX 10

-- 작업 완료 후에는 내가 잡은 락인지 확인하고 삭제해야 안전합니다.
          `),
          callout("warning", "락 value는 고유값으로", "락을 풀 때 다른 요청이 새로 잡은 락을 지우지 않도록 value에 request id 같은 고유값을 넣고 확인 후 삭제해야 합니다.")
        ]
      },
      {
        title: "Pub/Sub과 Stream",
        body: [
          p("Pub/Sub은 발행자가 메시지를 보내면 구독자가 즉시 받는 구조입니다. 단, 구독자가 꺼져 있으면 메시지가 보존되지 않습니다. Redis Stream은 메시지를 로그처럼 저장하고 Consumer Group으로 나눠 처리할 수 있어 작업 큐에 더 적합합니다."),
          table(["기능", "특징", "용도"], [
            ["Pub/Sub", "실시간 전달, 보존 약함", "간단한 알림, 채팅 이벤트"],
            ["Stream", "메시지 보존, consumer group", "이벤트 처리, 작업 큐"],
            ["List Queue", "간단한 push/pop 큐", "작은 규모 작업 큐"]
          ]),
          code(`
-- Pub/Sub
PUBLISH notice "hello"
SUBSCRIBE notice

-- Stream
XADD order-events * order_id 1001 status paid
XREAD COUNT 10 STREAMS order-events 0
          `)
        ]
      },
      {
        title: "영속성과 메모리 정책",
        body: [
          p("Redis는 메모리 기반이지만 디스크에 저장하는 옵션도 있습니다. RDB는 특정 시점 스냅샷이고, AOF는 쓰기 명령 로그입니다. 둘 다 장단점이 있어 용도에 맞게 선택합니다."),
          table(["항목", "설명"], [
            ["RDB Snapshot", "특정 시점 데이터를 덤프. 복구 빠름, 마지막 스냅샷 이후 데이터 손실 가능"],
            ["AOF", "쓰기 명령을 로그로 저장. 손실을 줄일 수 있지만 파일이 커질 수 있음"],
            ["maxmemory", "Redis가 사용할 메모리 상한"],
            ["eviction policy", "메모리가 찼을 때 어떤 key를 지울지 결정"],
            ["volatile-ttl", "TTL 있는 key 중 만료가 가까운 것부터 제거"],
            ["allkeys-lru", "전체 key 중 최근 덜 쓴 것 제거"]
          ]),
          callout("tip", "캐시 Redis와 영구 Redis는 다르게 운영", "캐시 용도라면 일부 key가 지워져도 다시 만들 수 있어야 하고, 세션/큐처럼 손실이 민감한 용도라면 영속성과 복제, 장애 대응을 더 엄격히 봐야 합니다.")
        ]
      }
    ],
    examples: [
      {
        title: "Cache Aside 의사 코드",
        desc: "실제 서비스 코드에서 가장 많이 쓰는 흐름입니다.",
        sql: `
value = redis.get("product:101")

if value is null:
    value = mysql.query("SELECT * FROM products WHERE product_id = 101")
    redis.setex("product:101", 300, json(value))

return value
        `
      },
      {
        title: "TTL 분산",
        desc: "여러 key가 동시에 만료되지 않도록 TTL에 작은 랜덤 값을 더합니다.",
        sql: `
SETEX product:101 300 "{...}"
SETEX product:102 327 "{...}"
SETEX product:103 286 "{...}"
        `
      }
    ],
    drills: [
      {
        prompt: "Cache Aside에서 cache miss가 발생하면 어떤 순서로 동작하나요?",
        answer: "Redis에서 값이 없음을 확인한 뒤 MySQL/PostgreSQL 원본 DB에서 조회하고, 그 결과를 Redis에 TTL과 함께 저장한 뒤 응답합니다."
      },
      {
        prompt: "많은 캐시 key가 동시에 만료되어 DB가 폭주하는 문제를 무엇이라고 하나요?",
        answer: "Cache Avalanche라고 합니다."
      },
      {
        prompt: "Redis Pub/Sub과 Stream의 가장 큰 차이는 무엇인가요?",
        answer: "Pub/Sub은 실시간 전달 중심이고 메시지 보존이 약합니다. Stream은 메시지를 로그처럼 저장하고 Consumer Group으로 처리할 수 있습니다."
      },
      {
        prompt: "Redis 메모리가 꽉 찼을 때 어떤 key를 지울지 정하는 설정을 무엇이라고 하나요?",
        answer: "Eviction policy입니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'REDIS_PATTERNS' AS status;",
      correctQuery: "SELECT 'REDIS_PATTERNS' AS status;",
      description: "Redis 실무 패턴 확인용으로 <code>SELECT 'REDIS_PATTERNS' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch34_redis_deep_dive",
    part: "Part 16. Redis 부록",
    title: "34. Redis 심화: 원자성, Pipeline, Lua, Cluster",
    tags: ["redis", "advanced"],
    type: "info",
    summary: "Redis를 실무에서 쓸 때 꼭 만나는 원자성, 파이프라인, Lua 스크립트, 장애 대응 개념을 초보자 눈높이로 정리합니다.",
    goal: "Redis가 빠른 이유와 위험한 사용법을 함께 이해하고, 캐시를 넘어 실무 패턴까지 판단할 수 있게 됩니다.",
    sections: [
      {
        title: "Redis는 빠른 계산대 하나처럼 생각하기",
        body: [
          p("Redis는 많은 명령을 매우 빠르게 처리하지만, 한 명령이 오래 걸리면 뒤의 명령들이 기다릴 수 있습니다. 비유하면 계산원이 엄청 빠른 편의점 계산대입니다. 손님이 작은 물건 하나씩 가져오면 순식간에 처리하지만, 누군가 수백 개 물건을 한 번에 계산하려고 하면 뒤 줄이 막힙니다."),
          p("그래서 Redis에서는 큰 key를 만들거나, 한 번에 너무 많은 데이터를 훑는 명령을 조심해야 합니다. <code>KEYS *</code>처럼 전체 key를 훑는 명령은 공부 중에는 괜찮아도 운영에서는 피하고, <code>SCAN</code>처럼 조금씩 나눠 보는 명령을 씁니다."),
          table(["좋은 습관", "이유"], [
            ["key 크기를 너무 크게 만들지 않기", "큰 value를 읽고 쓰면 Redis가 잠시 바빠집니다."],
            ["운영에서 <code>KEYS *</code> 피하기", "전체 key를 훑는 동안 다른 요청이 밀릴 수 있습니다."],
            ["만료 시간이 필요한 key에는 TTL 붙이기", "메모리가 계속 쌓이는 문제를 줄입니다."],
            ["Slow Log 확인하기", "느린 명령을 찾아 개선할 수 있습니다."]
          ])
        ]
      },
      {
        title: "원자성: 동시에 와도 한 번에 처리되는 명령",
        body: [
          p("원자성은 작업이 중간에 쪼개지지 않는다는 뜻입니다. 조회수 증가처럼 동시에 여러 요청이 와도 <code>INCR</code> 한 번이면 Redis가 순서대로 안전하게 증가시켜 줍니다. 반대로 <code>GET</code>으로 읽고 애플리케이션에서 +1 한 뒤 <code>SET</code>하면 동시에 들어온 요청끼리 값이 덮일 수 있습니다."),
          code(`
-- 좋은 방식: Redis가 증가를 한 번에 처리
INCR post:77:view_count

-- 조심해야 하는 방식: 읽기와 쓰기 사이에 다른 요청이 끼어들 수 있음
GET post:77:view_count
SET post:77:view_count 12346
          `),
          callout("tip", "Redis 명령을 먼저 찾아보기", "카운터, 집합 추가, 랭킹 점수 증가처럼 Redis가 이미 제공하는 원자 명령이 있으면 애플리케이션에서 직접 계산하지 않는 편이 안전합니다.")
        ]
      },
      {
        title: "Pipeline, Transaction, Lua의 차이",
        body: [
          p("Pipeline은 여러 명령을 택배 상자 하나에 묶어 보내는 것과 같습니다. 네트워크 왕복을 줄여 빨라지지만, 명령 묶음 전체가 하나의 거래처럼 자동 롤백되는 것은 아닙니다."),
          p("Transaction은 <code>MULTI</code>와 <code>EXEC</code> 사이의 명령을 순서대로 실행하게 예약하는 방식입니다. RDBMS 트랜잭션처럼 모든 오류를 자동으로 되돌리는 느낌과는 다르므로 조심해서 이해해야 합니다."),
          p("Lua 스크립트는 Redis 서버 안에서 짧은 절차를 한 번에 실행하는 방법입니다. '재고가 0보다 크면 1 감소시키고 성공을 반환한다'처럼 여러 명령이 중간에 끼어들면 안 되는 경우에 유용합니다."),
          table(["기능", "비유", "주 용도"], [
            ["Pipeline", "여러 편지를 한 봉투에 넣어 보내기", "대량 명령의 네트워크 왕복 감소"],
            ["MULTI/EXEC", "번호표를 뽑아 순서대로 처리 예약", "여러 명령을 연속 실행"],
            ["Lua Script", "계산대 안쪽에서 직원이 작은 절차를 끝내고 결과만 알려줌", "조건 확인과 변경을 한 번에 처리"]
          ]),
          code(`
MULTI
INCR post:77:view_count
EXPIRE post:77:view_count 86400
EXEC

-- Lua 예시 감각: 재고가 있으면 감소
EVAL "local stock=tonumber(redis.call('GET', KEYS[1]) or '0'); if stock <= 0 then return 0 end; redis.call('DECR', KEYS[1]); return 1" 1 product:101:stock
          `)
        ]
      },
      {
        title: "분산 락은 편하지만 위험할 수 있습니다",
        body: [
          p("분산 락은 여러 서버가 같은 작업을 동시에 하지 못하게 Redis에 자물쇠를 거는 방식입니다. 예를 들어 주문 정산 작업을 서버 A와 서버 B가 동시에 실행하면 안 될 때 <code>lock:settlement</code> 같은 key를 잠깐 잡습니다."),
          code(`
SET lock:order:1001 "request-uuid" NX EX 10

-- 해제할 때는 내가 잡은 락인지 value를 확인하고 지워야 안전합니다.
          `),
          ul([
            "<code>NX</code>: key가 없을 때만 설정합니다.",
            "<code>EX 10</code>: 10초 뒤 자동 만료되게 합니다.",
            "value에는 요청마다 다른 고유 ID를 넣어야 다른 요청의 락을 실수로 지우지 않습니다.",
            "결제, 금융, 재고 원장처럼 매우 중요한 처리는 Redis 락만 믿기보다 DB 트랜잭션과 함께 설계해야 합니다."
          ]),
          callout("warning", "락은 만능 안전장치가 아닙니다", "네트워크 지연, 작업 시간 초과, 서버 장애가 끼면 락 설계가 예상보다 어려워집니다. 중요한 데이터는 RDBMS의 제약조건과 트랜잭션을 우선으로 생각하세요.")
        ]
      },
      {
        title: "Sentinel과 Cluster를 언제 생각하나요?",
        body: [
          p("혼자 공부할 때는 Redis 서버 하나로 충분합니다. 하지만 서비스에서 Redis가 멈추면 로그인 세션, 캐시, 랭킹이 영향을 받습니다. 이때 장애 대응 구조를 고민합니다."),
          table(["구분", "쉬운 비유", "역할"], [
            ["Replication", "원본 노트를 복사해 두기", "읽기 분산과 장애 대비를 위해 복제본 유지"],
            ["Sentinel", "감시자와 대리 관리자", "마스터 장애를 감지하고 복제본을 새 마스터로 승격"],
            ["Cluster", "책장을 여러 구역으로 나눠 담당하기", "key를 여러 노드에 나눠 저장해 용량과 처리량 확장"]
          ]),
          p("처음에는 단일 Redis, 그다음 복제와 Sentinel, 대용량이 필요해지면 Cluster 순서로 이해하면 됩니다. Cluster는 key가 어느 노드에 들어갈지 hash slot으로 나뉘기 때문에 multi-key 명령을 쓸 때 제약이 생길 수 있습니다.")
        ]
      },
      {
        title: "운영 체크리스트",
        body: [
          ol([
            "<strong>maxmemory</strong>를 정해 Redis가 사용할 메모리 상한을 둡니다.",
            "<strong>eviction policy</strong>를 정해 메모리가 찼을 때 어떤 key를 지울지 결정합니다.",
            "<strong>TTL 없는 캐시 key</strong>가 무한히 쌓이지 않는지 확인합니다.",
            "<strong>big key</strong>와 느린 명령을 찾아 제거합니다.",
            "<strong>RDB/AOF</strong> 영속성 설정이 용도에 맞는지 확인합니다.",
            "<strong>비밀번호와 네트워크 접근 제한</strong>을 설정합니다.",
            "<strong>모니터링</strong>으로 메모리, hit ratio, connected clients, rejected connections를 봅니다."
          ]),
          callout("note", "캐시는 사라져도 되는 데이터부터", "처음 Redis를 쓸 때는 사라져도 MySQL에서 다시 만들 수 있는 캐시 데이터부터 적용하는 것이 안전합니다.")
        ]
      }
    ],
    examples: [
      {
        title: "SCAN으로 key를 조금씩 탐색하기",
        desc: "운영에서는 전체를 한 번에 훑기보다 커서를 이용해 조금씩 탐색합니다.",
        sql: `
SCAN 0 MATCH product:* COUNT 100
        `
      },
      {
        title: "세션 TTL 확인",
        desc: "로그인 세션이 자동으로 만료되는지 확인합니다.",
        sql: `
SETEX session:abc123 1800 '{"user_id":42}'
TTL session:abc123
        `
      }
    ],
    drills: [
      {
        prompt: "Pipeline은 어떤 문제를 줄이기 위해 쓰나요?",
        answer: "여러 Redis 명령을 보낼 때 네트워크 왕복 비용을 줄이기 위해 씁니다."
      },
      {
        prompt: "조회수 증가에 GET 후 SET보다 INCR이 더 안전한 이유는 무엇인가요?",
        answer: "INCR은 Redis가 증가 작업을 원자적으로 처리하므로 동시에 여러 요청이 와도 값이 덮일 가능성이 줄어듭니다."
      },
      {
        prompt: "Redis 락을 해제할 때 value를 확인해야 하는 이유는 무엇인가요?",
        answer: "내 요청이 잡은 락인지 확인하지 않으면, 이미 만료 후 다른 요청이 새로 잡은 락을 실수로 지울 수 있기 때문입니다."
      },
      {
        prompt: "Redis Cluster는 무엇을 위해 쓰나요?",
        answer: "key를 여러 노드에 나눠 저장해 Redis의 용량과 처리량을 확장하기 위해 씁니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'REDIS_DEEP_DIVE' AS status;",
      correctQuery: "SELECT 'REDIS_DEEP_DIVE' AS status;",
      description: "Redis 심화 확인용으로 <code>SELECT 'REDIS_DEEP_DIVE' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch35_elasticsearch_intro",
    part: "Part 17. Elasticsearch 부록",
    title: "35. Elasticsearch 입문: DB 검색과 검색 엔진의 차이",
    tags: ["elasticsearch", "search", "advanced"],
    type: "info",
    summary: "Elasticsearch를 MySQL LIKE 검색의 대체품이 아니라 검색 전용 엔진으로 이해합니다.",
    goal: "역색인, document, index, mapping, analyzer, relevance score의 기본 개념을 잡습니다.",
    sections: [
      {
        title: "왜 Elasticsearch를 쓰나요?",
        body: [
          p("MySQL의 <code>LIKE '%검색어%'</code>는 간단하지만 데이터가 많아지면 느려지고, 형태소 분석, 오타, 유사도, 랭킹 같은 검색 품질을 만들기 어렵습니다. Elasticsearch는 텍스트 검색을 위해 역색인(inverted index)을 만들고, 검색어와 문서의 관련도를 계산합니다."),
          table(["구분", "MySQL", "Elasticsearch"], [
            ["주 목적", "정확한 데이터 저장과 관계형 조회", "문서 검색과 관련도 랭킹"],
            ["검색 방식", "조건 비교, 인덱스, LIKE", "역색인, analyzer, score"],
            ["데이터 단위", "Row", "Document"],
            ["구조 정의", "Table Schema", "Mapping"],
            ["강점", "트랜잭션, JOIN, 정합성", "전문 검색, 필터, 집계, 랭킹"],
            ["주의점", "검색 품질 한계", "원본 DB 대체로 쓰기 어려움"]
          ])
        ]
      },
      {
        title: "핵심 용어",
        body: [
          table(["용어", "뜻"], [
            ["Index", "문서가 저장되는 논리적 공간. RDB의 테이블과 비슷하게 느껴질 수 있음"],
            ["Document", "JSON 형태의 데이터 한 건"],
            ["Mapping", "필드 타입과 분석 방식을 정하는 구조"],
            ["Analyzer", "문장을 토큰으로 쪼개고 정규화하는 분석기"],
            ["Inverted Index", "단어 -> 그 단어가 등장한 문서 목록 구조"],
            ["Score", "검색어와 문서가 얼마나 관련 있는지 나타내는 점수"]
          ]),
          p("검색 시스템에서는 데이터를 넣는 것만큼 '어떻게 분석해서 색인할 것인가'가 중요합니다. 한국어 검색은 형태소 분석기 선택도 중요해집니다.")
        ]
      },
      {
        title: "MySQL과 함께 쓰는 기본 구조",
        body: [
          p("Elasticsearch는 보통 원본 저장소가 아닙니다. MySQL/PostgreSQL에 원본 데이터를 저장하고, 검색에 필요한 필드만 Elasticsearch에 색인합니다. 상품명이 바뀌면 DB 업데이트 후 Elasticsearch 문서도 갱신해야 합니다."),
          ol([
            "상품 원본은 MySQL PRODUCTS 테이블에 저장합니다.",
            "검색에 필요한 상품명, 설명, 카테고리, 가격을 Elasticsearch에 document로 색인합니다.",
            "사용자가 검색하면 Elasticsearch에서 상품 ID 목록을 찾습니다.",
            "필요하면 MySQL에서 최신 상품 상세를 다시 조회합니다."
          ]),
          callout("warning", "동기화 지연", "DB와 Elasticsearch는 서로 다른 시스템입니다. 색인 지연이나 실패가 생길 수 있으므로 재시도와 재색인 전략이 필요합니다.")
        ]
      },
      {
        title: "검색 쿼리 감각",
        body: [
          code(`
GET products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "iphone" } }
      ],
      "filter": [
        { "term": { "category": "Electronics" } },
        { "range": { "price": { "gte": 1000000 } } }
      ]
    }
  },
  "sort": [
    { "_score": "desc" },
    { "price": "asc" }
  ]
}
          `),
          p("<code>match</code>는 분석기를 거치는 전문 검색에 쓰고, <code>term</code>은 정확히 일치하는 값에 씁니다. 가격 범위 같은 조건은 <code>filter</code>에 두면 관련도 점수 계산과 분리할 수 있습니다.")
        ]
      }
    ],
    examples: [
      {
        title: "상품 문서 예시",
        desc: "RDB의 한 행을 검색용 JSON document로 색인한다고 생각하면 됩니다.",
        sql: `
PUT products/_doc/101
{
  "product_id": 101,
  "name": "iPhone 15 Pro",
  "category": "Electronics",
  "price": 1500000,
  "tags": ["phone", "apple", "premium"]
}
        `
      }
    ],
    drills: [
      {
        prompt: "Elasticsearch의 검색 성능을 가능하게 하는 핵심 구조는 무엇인가요?",
        answer: "역색인, inverted index입니다."
      },
      {
        prompt: "RDB의 row와 비슷하게 Elasticsearch에서 데이터 한 건을 부르는 말은 무엇인가요?",
        answer: "Document입니다."
      },
      {
        prompt: "정확히 일치해야 하는 카테고리 필터에는 match와 term 중 무엇이 더 적합한가요?",
        answer: "term이 더 적합합니다."
      },
      {
        prompt: "Elasticsearch를 원본 DB처럼 쓰기 어려운 이유를 설명하세요.",
        answer: "관계형 트랜잭션과 JOIN, 강한 정합성 관리가 목적이 아니며, 보통 MySQL/PostgreSQL 원본 데이터의 검색용 색인으로 함께 운영하기 때문입니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'ELASTICSEARCH_INTRO' AS status;",
      correctQuery: "SELECT 'ELASTICSEARCH_INTRO' AS status;",
      description: "Elasticsearch 입문 확인용으로 <code>SELECT 'ELASTICSEARCH_INTRO' AS status;</code>를 실행하세요."
    }
  },
  {
    id: "ch36_local_stack_setup",
    part: "Part 17. Elasticsearch 부록",
    title: "36. Redis와 Elasticsearch 로컬 실습 환경",
    tags: ["redis", "elasticsearch", "search", "practice"],
    type: "info",
    summary: "Redis와 Elasticsearch를 무료로 직접 띄워 보고, MySQL과 함께 어떤 역할로 쓰는지 실습 흐름을 잡습니다.",
    goal: "Docker Desktop, RedisInsight, Kibana 또는 REST API를 이용해 로컬에서 Redis와 Elasticsearch를 만져볼 수 있게 됩니다.",
    sections: [
      {
        title: "처음에는 Docker Desktop이 가장 무난합니다",
        body: [
          p("Redis와 Elasticsearch는 서버 프로그램입니다. 윈도우에 직접 설치할 수도 있지만, 초보 학습 단계에서는 Docker Desktop으로 컨테이너를 띄우는 편이 정리하기 쉽습니다. 필요 없으면 컨테이너를 지우면 되고, 나중에 다시 같은 명령으로 만들 수 있습니다."),
          ul([
            "MySQL은 이미 앞 장처럼 MySQL Installer와 DBeaver 또는 MySQL Workbench로 시작해도 좋습니다.",
            "Redis는 Redis Stack Docker 이미지와 RedisInsight를 함께 쓰면 key를 눈으로 보기 쉽습니다.",
            "Elasticsearch는 공식 Docker 이미지로 시작하고, 화면 도구가 필요하면 Kibana를 붙입니다.",
            "DataGrip은 나중에 MySQL과 PostgreSQL을 한 프로그램에서 관리할 때 쓰기 좋습니다. Redis와 Elasticsearch는 전용 UI나 플러그인, REST API 도구를 함께 쓰는 경우가 많습니다."
          ]),
          callout("warning", "공부용 포트 공개 주의", "로컬 PC에서만 접근하는 공부용 설정으로 사용하세요. 회사 서버나 인터넷에 공개된 환경에서는 보안 설정 없이 Redis, Elasticsearch를 띄우면 위험합니다.")
        ]
      },
      {
        title: "Redis Stack 실행하기",
        body: [
          p("Redis를 처음 배울 때는 Redis Stack을 추천합니다. Redis 서버와 RedisInsight가 같이 들어 있어 명령어와 화면 확인을 동시에 할 수 있습니다."),
          code(`
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

docker exec -it redis-stack redis-cli
          `),
          ol([
            "Docker Desktop을 실행합니다.",
            "위 명령으로 Redis Stack 컨테이너를 띄웁니다.",
            "브라우저에서 <code>http://localhost:8001</code>을 열어 RedisInsight에 접속합니다.",
            "<code>redis-cli</code>에서 <code>SET hello redis</code>, <code>GET hello</code>를 실행합니다.",
            "RedisInsight에서 <code>hello</code> key가 생겼는지 확인합니다."
          ]),
          code(`
SET hello redis
GET hello

SETEX login:code:study 300 "123456"
TTL login:code:study
          `)
        ]
      },
      {
        title: "Elasticsearch 실행하기",
        body: [
          p("Elasticsearch는 버전과 보안 설정에 따라 실행 명령이 달라질 수 있습니다. 공식 문서의 최신 버전을 확인하는 습관이 좋습니다. 학습용으로는 단일 노드 구성을 먼저 띄우고, REST API로 문서를 넣고 검색해 보면 됩니다."),
          code(`
docker network create elastic

docker pull docker.elastic.co/elasticsearch/elasticsearch:9.4.1

docker run --name es01 --net elastic -p 9200:9200 \\
  -e "discovery.type=single-node" \\
  -e "xpack.security.enabled=false" \\
  -m 2GB docker.elastic.co/elasticsearch/elasticsearch:9.4.1
          `),
          ul([
            "<code>9200</code>: Elasticsearch REST API 포트입니다.",
            "<code>discovery.type=single-node</code>: 공부용 단일 노드 실행 설정입니다.",
            "<code>xpack.security.enabled=false</code>: 로컬 학습 편의를 위해 인증을 끄는 설정입니다. 운영에서는 사용하면 안 됩니다.",
            "Docker Desktop 메모리는 최소 4GB 이상 할당하는 것을 권장합니다."
          ]),
          callout("warning", "버전은 공식 문서를 확인하세요", "Elastic Stack은 버전 변화가 빠릅니다. Elasticsearch와 Kibana를 함께 쓸 때는 같은 버전으로 맞추는 것이 중요합니다.")
        ]
      },
      {
        title: "Elasticsearch 첫 실습 흐름",
        body: [
          p("Elasticsearch는 SQL 대신 HTTP 요청과 JSON으로 다룹니다. 처음에는 'index 만들기 -> document 넣기 -> 검색하기' 순서만 익히면 됩니다."),
          code(`
PUT http://localhost:9200/products

POST http://localhost:9200/products/_doc/101
{
  "product_id": 101,
  "name": "iPhone 15 Pro",
  "category": "Electronics",
  "price": 1500000
}

GET http://localhost:9200/products/_search
{
  "query": {
    "match": {
      "name": "iphone"
    }
  }
}
          `),
          p("브라우저 주소창만으로는 GET 요청 정도만 확인하기 쉽습니다. 실제 실습은 Kibana Dev Tools, Postman, VS Code REST Client 같은 도구를 쓰면 편합니다.")
        ]
      },
      {
        title: "MySQL, Redis, Elasticsearch 역할 분담",
        body: [
          p("세 도구를 한 줄로 정리하면 MySQL은 원본 장부, Redis는 빠른 메모지, Elasticsearch는 검색용 색인입니다. 셋을 섞어 쓰면 강력하지만, 각자 맡은 일이 다릅니다."),
          table(["도구", "비유", "주 역할", "예시"], [
            ["MySQL/PostgreSQL", "원본 장부", "정확한 저장, 관계, 트랜잭션", "주문, 결제, 회원, 재고"],
            ["Redis", "빠르게 꺼내 보는 메모지", "캐시, 세션, 카운터, 랭킹", "상품 상세 캐시, 로그인 세션"],
            ["Elasticsearch", "책 뒤의 색인과 검색 엔진", "전문 검색, 필터, 관련도 점수", "상품명 검색, 로그 검색"]
          ]),
          ol([
            "데이터의 원본은 MySQL 또는 PostgreSQL에 저장합니다.",
            "자주 읽는 데이터는 Redis에 TTL을 붙여 캐시합니다.",
            "검색이 필요한 데이터는 Elasticsearch에 document로 색인합니다.",
            "원본이 바뀌면 Redis 캐시를 지우거나 갱신하고, Elasticsearch 문서도 다시 색인합니다."
          ])
        ]
      },
      {
        title: "추천 학습 순서",
        body: [
          ol([
            "MySQL에서 SELECT, JOIN, GROUP BY, INSERT/UPDATE/DELETE를 충분히 연습합니다.",
            "인덱스와 정규화를 이해해 테이블 설계와 조회 성능의 기본을 잡습니다.",
            "PostgreSQL로 CTE, 윈도우 함수, JSON, 고급 인덱스를 넓힙니다.",
            "Redis로 캐시, TTL, 자료구조, 세션, 랭킹을 실습합니다.",
            "Elasticsearch로 document, index, analyzer, match/term 검색을 실습합니다.",
            "마지막으로 세 도구를 함께 쓰는 작은 프로젝트를 만듭니다. 예: 상품은 MySQL, 상품 캐시는 Redis, 상품 검색은 Elasticsearch."
          ]),
          callout("tip", "한 번에 다 외우지 않기", "Redis와 Elasticsearch는 SQL을 대체하는 과목이 아니라, RDBMS 기본기 위에 얹는 전문 도구입니다. MySQL을 먼저 단단히 잡으면 나머지도 훨씬 덜 어렵습니다.")
        ]
      }
    ],
    examples: [
      {
        title: "로컬 도구 점검 순서",
        desc: "컨테이너가 잘 떠 있는지 확인하는 흐름입니다.",
        sql: `
docker ps

docker exec -it redis-stack redis-cli PING

curl http://localhost:9200
        `
      }
    ],
    drills: [
      {
        prompt: "RedisInsight는 어떤 용도로 쓰나요?",
        answer: "Redis에 저장된 key와 자료구조를 화면으로 확인하고 관리하는 도구입니다."
      },
      {
        prompt: "Elasticsearch와 Kibana를 함께 쓸 때 버전을 맞춰야 하는 이유는 무엇인가요?",
        answer: "Elastic Stack 구성 요소는 같은 버전끼리 호환되도록 설계되므로 버전 차이로 접속이나 기능 문제가 생길 수 있기 때문입니다."
      },
      {
        prompt: "MySQL, Redis, Elasticsearch를 같이 쓸 때 원본 데이터는 어디에 두는 것이 일반적인가요?",
        answer: "MySQL 또는 PostgreSQL 같은 RDBMS에 원본 데이터를 두고 Redis와 Elasticsearch는 캐시와 검색용 보조 저장소로 쓰는 것이 일반적입니다."
      },
      {
        prompt: "Redis에 캐시한 상품 정보가 오래된 값이 되지 않게 하려면 어떤 전략을 쓸 수 있나요?",
        answer: "TTL을 설정하고, 원본 DB가 변경될 때 관련 Redis key를 삭제하거나 갱신합니다."
      }
    ],
    exercise: {
      type: "query",
      starterSql: "SELECT 'LOCAL_STACK_READY' AS status;",
      correctQuery: "SELECT 'LOCAL_STACK_READY' AS status;",
      description: "로컬 실습 환경 장 확인용으로 <code>SELECT 'LOCAL_STACK_READY' AS status;</code>를 실행하세요."
    }
  }
];

const vueChapters = [
  {
    id: "vue1_overview",
    course: "vue",
    part: "Vue Part 1. 시작 전 큰 그림",
    title: "1. Vue.js를 처음 배우는 사람을 위한 큰 그림",
    tags: ["vue", "frontend", "react"],
    type: "info",
    summary: "Vue가 어떤 문제를 해결하는 도구인지, React와 무엇이 비슷하고 다른지 먼저 잡습니다.",
    goal: "Vue를 'HTML을 더 똑똑하게 만드는 컴포넌트 도구'로 이해하고, Todo와 쇼핑몰 프로젝트 흐름을 그립니다.",
    analogy: "Vue는 레고 조립 설명서와 비슷합니다. 화면을 Header, TodoInput, TodoList 같은 작은 블록으로 나누고, 각 블록이 자기 역할을 하게 만든 뒤 조립합니다.",
    studyHint: "프런트엔드를 처음 배우면 문법보다 '상태가 바뀌면 화면도 바뀐다'는 감각이 먼저입니다. Vue는 이 감각을 비교적 부드럽게 익히게 해 줍니다.",
    sections: [
      {
        title: "Vue는 무엇을 쉽게 해 주나요?",
        body: [
          p("브라우저 화면은 HTML, CSS, JavaScript로 만들어집니다. 그런데 Todo 앱처럼 할 일을 추가하고 삭제하고 완료 표시까지 하려면, JavaScript로 DOM을 계속 직접 찾아 고쳐야 합니다. Vue는 이 과정을 <strong>데이터 중심</strong>으로 바꿔 줍니다."),
          p("Vue에서는 'todos 배열이 바뀌면 목록 화면도 바뀐다'고 생각합니다. 즉, 화면을 직접 만지는 대신 데이터 상태를 바꾸면 Vue가 화면 갱신을 맡아 줍니다."),
          table(["개념", "쉬운 뜻", "Todo 예시"], [
            ["상태(state)", "화면이 기억해야 하는 데이터", "할 일 목록, 입력창 글자"],
            ["템플릿(template)", "상태를 화면에 보여주는 HTML 모양", "<code>v-for</code>로 todo 목록 출력"],
            ["이벤트(event)", "사용자 행동", "추가 버튼 클릭, 체크박스 변경"],
            ["컴포넌트(component)", "화면 조각", "TodoInput, TodoList, TodoItem"]
          ])
        ]
      },
      {
        title: "React와 비교하면?",
        body: [
          table(["하고 싶은 일", "Vue", "React"], [
            ["상태 만들기", "<code>ref</code>, <code>reactive</code>", "<code>useState</code>"],
            ["목록 출력", "<code>v-for</code>", "<code>array.map()</code>"],
            ["조건 출력", "<code>v-if</code>, <code>v-show</code>", "<code>{condition && ...}</code>, 삼항 연산자"],
            ["입력 양방향 연결", "<code>v-model</code>", "<code>value</code>와 <code>onChange</code> 직접 연결"],
            ["재사용 로직", "Composable 함수", "Custom Hook"],
            ["전역 상태", "Pinia", "Redux, Zustand, Context"]
          ]),
          callout("tip", "React를 몰라도 됩니다", "이 학습서의 React 비교는 '아, 다른 프레임워크에서는 이렇게 부르는구나' 정도로 보면 됩니다. Vue를 배우는 데 React 선행 지식은 필요하지 않습니다.")
        ]
      },
      {
        title: "이 학습서에서 최소화하는 내용",
        body: [
          ul([
            "<strong>Vue CLI</strong>: 예전 강의에 자주 나오지만 지금은 Vite로 시작하는 편이 더 간단합니다.",
            "<strong>class 문법 기반 Vue</strong>: 이론적으로 가능하지만 Vue 3 실무에서는 Composition API와 <code>script setup</code>이 중심입니다.",
            "<strong>Bootstrap 설치</strong>: UI 라이브러리는 나중 문제입니다. 먼저 컴포넌트와 데이터 흐름을 잡습니다.",
            "<strong>Vuex 중심 학습</strong>: 기존 프로젝트 유지보수에서는 볼 수 있지만 새 Vue 3 프로젝트는 Pinia를 우선으로 봅니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "Vue의 첫 느낌",
        desc: "message가 바뀌면 화면의 문장도 바뀐다고 생각하면 됩니다.",
        sql: `
<script setup>
import { ref } from "vue";

const message = ref("Vue 공부 시작");
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="message = 'Todo 앱 만들자'">바꾸기</button>
</template>
        `
      }
    ],
    drills: [
      {
        prompt: "Vue에서 상태가 바뀌면 화면도 바뀐다는 말은 무슨 뜻인가요?",
        answer: "DOM을 직접 찾아 고치지 않아도, ref나 reactive 같은 상태를 바꾸면 Vue가 그 상태를 쓰는 화면을 다시 그려 준다는 뜻입니다."
      },
      {
        prompt: "React의 useState와 가장 비슷하게 볼 수 있는 Vue 기능은 무엇인가요?",
        answer: "ref입니다. 단, Vue의 ref는 스크립트 안에서 값을 읽거나 바꿀 때 .value를 사용합니다."
      }
    ],
    practiceGuide: "빈 Vue 프로젝트를 만들기 전에, 종이에 Todo 앱을 Header, Input, List, Item, Footer 컴포넌트로 나누어 그려 보세요."
  },
  {
    id: "vue2_environment",
    course: "vue",
    part: "Vue Part 1. 시작 전 큰 그림",
    title: "2. 개발 환경과 프로젝트 구조: Vite로 시작하기",
    tags: ["vue", "frontend"],
    type: "info",
    summary: "Vue CLI 대신 Vite로 시작하고, 프로젝트 폴더가 어떤 역할을 하는지 초보자 눈높이로 봅니다.",
    goal: "Vue 프로젝트를 생성하고, App.vue와 main.js가 어떤 관계인지 이해합니다.",
    analogy: "Vite 프로젝트는 작은 작업실입니다. main.js는 전원 스위치, App.vue는 첫 번째 작업대, components 폴더는 부품 보관함입니다.",
    studyHint: "처음에는 설정 파일을 다 이해하지 않아도 됩니다. 어떤 파일을 자주 만지는지부터 익히면 충분합니다.",
    sections: [
      {
        title: "프로젝트 생성",
        body: [
          p("지금 Vue 3를 새로 배울 때는 Vite로 시작하는 흐름이 가장 가볍습니다. Vue CLI는 오래된 강의에서 자주 나오지만, 이 학습서에서는 참고 정도로만 봅니다."),
          code(`
npm create vue@latest todo-vue
cd todo-vue
npm install
npm run dev
          `),
          p("질문이 나오면 처음에는 TypeScript는 No로 시작해도 됩니다. Todo 앱을 완성한 뒤 TypeScript 장에서 점진적으로 붙이는 방식이 더 덜 부담스럽습니다.")
        ]
      },
      {
        title: "폴더 구조를 집 구조처럼 보기",
        body: [
          table(["파일/폴더", "역할", "비유"], [
            ["<code>main.js</code>", "Vue 앱을 브라우저에 붙이는 시작점", "전원 스위치"],
            ["<code>App.vue</code>", "가장 바깥쪽 루트 컴포넌트", "집 전체의 거실"],
            ["<code>components/</code>", "재사용 컴포넌트 폴더", "레고 부품 상자"],
            ["<code>assets/</code>", "이미지, CSS 같은 정적 자원", "꾸미기 재료"],
            ["<code>package.json</code>", "실행 명령과 설치 목록", "프로젝트 설명서"]
          ])
        ]
      },
      {
        title: "React 프로젝트와 비교",
        body: [
          table(["역할", "Vue", "React"], [
            ["시작 파일", "<code>main.js</code>에서 <code>createApp(App)</code>", "<code>main.jsx</code>에서 <code>createRoot(...).render()</code>"],
            ["컴포넌트 파일", "<code>.vue</code> Single File Component", "<code>.jsx</code> 또는 <code>.tsx</code>"],
            ["개발 서버", "Vite", "Vite 또는 Next.js 개발 서버"],
            ["템플릿", "<code>&lt;template&gt;</code>", "JSX 반환값"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "main.js와 App.vue 관계",
        desc: "main.js가 App.vue를 가져와서 실제 HTML의 #app 위치에 꽂습니다.",
        sql: `
// main.js
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
        `
      }
    ],
    drills: [
      {
        prompt: "Vite 프로젝트에서 가장 바깥 루트 컴포넌트는 보통 어떤 파일인가요?",
        answer: "App.vue입니다."
      },
      {
        prompt: "Vue CLI 내용을 완전히 깊게 다루지 않는 이유는 무엇인가요?",
        answer: "새 Vue 3 프로젝트에서는 Vite가 더 가볍고 일반적이기 때문입니다. 기존 프로젝트 유지보수 때 Vue CLI를 만나면 그때 추가로 보면 됩니다."
      }
    ],
    practiceGuide: "Vite로 새 Vue 프로젝트를 하나 만들고, App.vue의 기본 화면 문구를 'Todo 학습 시작'으로 바꿔 보세요."
  },
  {
    id: "vue3_template_reactivity",
    course: "vue",
    part: "Vue Part 2. Todo 앱으로 배우는 초중급",
    title: "3. 템플릿 문법과 반응형 상태",
    tags: ["vue", "todo", "react"],
    type: "info",
    summary: "Todo 앱의 입력값과 목록을 만들기 전에, Vue 템플릿과 ref/reactive를 익힙니다.",
    goal: "ref, reactive, v-bind, v-if, v-for를 Todo 예시로 이해합니다.",
    analogy: "상태는 주방의 재료 상자이고 템플릿은 접시입니다. 재료가 바뀌면 Vue가 접시 위 모양을 다시 차려 줍니다.",
    studyHint: "Vue 초반의 핵심은 'HTML처럼 보이는 템플릿 안에서 상태를 표시한다'는 점입니다.",
    sections: [
      {
        title: "ref와 reactive",
        body: [
          p("<code>ref</code>는 숫자, 문자열, 배열, 객체 모두 담을 수 있는 반응형 상자입니다. 스크립트에서는 <code>.value</code>로 꺼내고, 템플릿에서는 자동으로 풀려서 그냥 이름으로 씁니다."),
          p("<code>reactive</code>는 객체를 통째로 반응형으로 만들 때 씁니다. 초보 단계에서는 <code>ref</code>만으로도 대부분의 Todo 앱을 만들 수 있습니다."),
          table(["상황", "추천", "예시"], [
            ["입력창 글자", "<code>ref</code>", "<code>const newTodo = ref('')</code>"],
            ["할 일 배열", "<code>ref</code>", "<code>const todos = ref([])</code>"],
            ["여러 설정을 담은 객체", "<code>reactive</code>", "<code>reactive({ filter: 'all' })</code>"]
          ])
        ]
      },
      {
        title: "v-if, v-for, v-bind",
        body: [
          table(["Vue 문법", "뜻", "React에서는"], [
            ["<code>v-if</code>", "조건이 참일 때만 보여줌", "<code>{condition && &lt;div /&gt;}</code>"],
            ["<code>v-for</code>", "배열을 반복 출력", "<code>todos.map(todo =&gt; ...)</code>"],
            ["<code>:class</code>", "class를 상태에 따라 바꿈", "<code>className={...}</code>"],
            ["<code>:disabled</code>", "속성을 상태에 따라 바꿈", "<code>disabled={...}</code>"]
          ]),
          callout("tip", "class 바인딩은 최소한만", "class와 style 바인딩은 실무에서 쓰지만 문법 자체가 목적은 아닙니다. 이 학습서에서는 완료된 Todo에 줄 긋기 정도로만 익힙니다.")
        ]
      }
    ],
    examples: [
      {
        title: "Todo 목록 첫 화면",
        desc: "todos 배열을 v-for로 출력하고, done 값에 따라 class를 바꿉니다.",
        sql: `
<script setup>
import { ref } from "vue";

const todos = ref([
  { id: 1, title: "Vue 템플릿 읽기", done: true },
  { id: 2, title: "Todo 앱 만들기", done: false }
]);
</script>

<template>
  <p v-if="todos.length === 0">아직 할 일이 없습니다.</p>

  <ul>
    <li v-for="todo in todos" :key="todo.id" :class="{ done: todo.done }">
      {{ todo.title }}
    </li>
  </ul>
</template>
        `
      }
    ],
    drills: [
      {
        prompt: "Vue에서 배열을 화면에 반복해서 보여줄 때 쓰는 문법은 무엇인가요?",
        answer: "v-for입니다."
      },
      {
        prompt: "React의 todos.map(...)과 비슷한 Vue 문법은 무엇인가요?",
        answer: "v-for입니다."
      }
    ],
    practiceGuide: "App.vue에 todos 배열을 만들고, 완료된 항목에는 줄이 그어지는 class를 붙여 보세요."
  },
  {
    id: "vue4_events_vmodel",
    course: "vue",
    part: "Vue Part 2. Todo 앱으로 배우는 초중급",
    title: "4. 이벤트와 v-model: Todo 추가하기",
    tags: ["vue", "todo", "react"],
    type: "info",
    summary: "입력창 값을 상태와 연결하고, 버튼 또는 Enter 키로 Todo를 추가합니다.",
    goal: "v-model, @click, @submit.prevent를 Todo 추가 기능으로 익힙니다.",
    analogy: "v-model은 입력창과 상태 사이에 양방향 전화선을 꽂는 것입니다. 입력창에 쓰면 상태가 바뀌고, 상태를 비우면 입력창도 비워집니다.",
    studyHint: "Vue에서는 입력 폼이 React보다 짧게 작성됩니다. 대신 v-model이 내부적으로 어떤 일을 대신하는지 이해해야 합니다.",
    sections: [
      {
        title: "v-model은 무엇을 대신하나요?",
        body: [
          p("입력창은 사용자가 글자를 치는 곳이고, 상태는 앱이 기억하는 값입니다. React에서는 <code>value</code>와 <code>onChange</code>를 직접 연결하는 경우가 많습니다. Vue는 <code>v-model</code> 하나로 이 연결을 만들어 줍니다."),
          table(["역할", "Vue", "React"], [
            ["입력값 상태", "<code>const newTodo = ref('')</code>", "<code>const [newTodo, setNewTodo] = useState('')</code>"],
            ["입력 연결", "<code>v-model=\"newTodo\"</code>", "<code>value={newTodo} onChange={...}</code>"],
            ["제출 이벤트", "<code>@submit.prevent</code>", "<code>onSubmit</code>에서 <code>event.preventDefault()</code>"]
          ])
        ]
      },
      {
        title: "Todo 추가 흐름",
        body: [
          ol([
            "입력창 글자를 <code>newTodo</code> 상태에 저장합니다.",
            "폼을 제출하면 앞뒤 공백을 제거합니다.",
            "빈 문자열이면 추가하지 않습니다.",
            "새 Todo 객체를 만들어 <code>todos</code> 배열에 넣습니다.",
            "입력창을 비웁니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "Todo 추가 기능",
        desc: "v-model과 submit 이벤트만으로 기본 추가 흐름을 만들 수 있습니다.",
        sql: `
<script setup>
import { ref } from "vue";

const newTodo = ref("");
const todos = ref([]);
let nextId = 1;

function addTodo() {
  const title = newTodo.value.trim();
  if (!title) return;

  todos.value.push({
    id: nextId++,
    title,
    done: false
  });

  newTodo.value = "";
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" placeholder="할 일을 입력하세요" />
    <button type="submit">추가</button>
  </form>
</template>
        `
      }
    ],
    drills: [
      {
        prompt: "@submit.prevent의 prevent는 어떤 일을 하나요?",
        answer: "브라우저가 폼 제출 시 페이지를 새로고침하는 기본 동작을 막습니다."
      },
      {
        prompt: "React에서 v-model과 비슷한 입력 제어 방식은 무엇인가요?",
        answer: "value와 onChange를 함께 사용하는 controlled input입니다."
      }
    ],
    practiceGuide: "빈 값은 추가되지 않게 만들고, 추가 후 입력창이 자동으로 비워지는지 확인하세요."
  },
  {
    id: "vue5_components_props_emit",
    course: "vue",
    part: "Vue Part 2. Todo 앱으로 배우는 초중급",
    title: "5. 컴포넌트, Props, Emit: Todo 앱 나누기",
    tags: ["vue", "todo", "react"],
    type: "info",
    summary: "Todo 앱을 TodoInput, TodoList, TodoItem으로 나누며 부모-자식 데이터 흐름을 익힙니다.",
    goal: "props는 내려주기, emit은 올려보내기라는 감각을 잡습니다.",
    analogy: "부모 컴포넌트는 가게 사장이고 자식 컴포넌트는 직원입니다. 사장은 필요한 정보를 내려주고(props), 직원은 일이 생기면 보고합니다(emit).",
    studyHint: "컴포넌트 통신은 Vue 초중급의 가장 중요한 고비입니다. 데이터가 어디에 있고, 누가 바꾸는지 꼭 말로 설명해 보세요.",
    sections: [
      {
        title: "컴포넌트로 나누는 기준",
        body: [
          table(["컴포넌트", "역할", "받는 데이터", "올리는 이벤트"], [
            ["TodoInput", "새 할 일 입력", "없음 또는 초기값", "add"],
            ["TodoList", "목록 전체 출력", "todos", "toggle, remove"],
            ["TodoItem", "할 일 한 줄 출력", "todo", "toggle, remove"],
            ["TodoFooter", "전체 삭제, 남은 개수", "count", "clear"]
          ]),
          p("처음에는 컴포넌트를 너무 잘게 나누려고 하지 않아도 됩니다. 한 파일이 길어지고 역할이 섞인다고 느껴질 때 나누면 됩니다.")
        ]
      },
      {
        title: "React와 비교",
        body: [
          table(["데이터 흐름", "Vue", "React"], [
            ["부모 -> 자식", "<code>defineProps</code>", "props 함수 파라미터"],
            ["자식 -> 부모", "<code>defineEmits</code> 후 <code>emit('add')</code>", "부모가 내려준 콜백 함수 호출"],
            ["컴포넌트 파일", "<code>TodoInput.vue</code>", "<code>TodoInput.jsx</code>"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "TodoInput.vue",
        desc: "자식 컴포넌트는 직접 부모의 todos를 수정하지 않고 add 이벤트만 올립니다.",
        sql: `
<script setup>
import { ref } from "vue";

const emit = defineEmits(["add"]);
const title = ref("");

function submit() {
  const value = title.value.trim();
  if (!value) return;
  emit("add", value);
  title.value = "";
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="title" placeholder="할 일" />
    <button>추가</button>
  </form>
</template>
        `
      },
      {
        title: "부모 App.vue에서 이벤트 받기",
        desc: "부모가 실제 todos 배열을 소유하고 변경합니다.",
        sql: `
<TodoInput @add="addTodo" />
<TodoList :todos="todos" @toggle="toggleTodo" @remove="removeTodo" />
        `
      }
    ],
    drills: [
      {
        prompt: "Vue에서 자식이 부모에게 사건을 알릴 때 사용하는 기능은 무엇인가요?",
        answer: "emit입니다. script setup에서는 defineEmits를 사용합니다."
      },
      {
        prompt: "React에서 emit과 비슷한 방식은 무엇인가요?",
        answer: "부모가 자식에게 onAdd 같은 콜백 함수를 props로 내려주고, 자식이 그 함수를 호출하는 방식입니다."
      }
    ],
    practiceGuide: "TodoInput.vue와 TodoList.vue를 만들고, App.vue가 todos 상태를 소유하도록 리팩토링해 보세요."
  },
  {
    id: "vue6_computed_watch_lifecycle",
    course: "vue",
    part: "Vue Part 2. Todo 앱으로 배우는 초중급",
    title: "6. computed, watch, Lifecycle: Todo 앱 똑똑하게 만들기",
    tags: ["vue", "todo", "react"],
    type: "info",
    summary: "남은 할 일 개수, 필터링, localStorage 저장을 통해 computed/watch/lifecycle을 익힙니다.",
    goal: "계산된 값은 computed, 변화 감지는 watch, 최초 실행은 lifecycle로 구분합니다.",
    analogy: "computed는 자동 계산기, watch는 경보 장치, lifecycle은 앱의 출근/퇴근 기록입니다.",
    studyHint: "computed와 watch를 헷갈리기 쉽습니다. 화면에 보여줄 계산 결과면 computed, 어떤 변화에 반응해 별도 일을 해야 하면 watch입니다.",
    sections: [
      {
        title: "computed와 watch 구분",
        body: [
          table(["상황", "Vue 선택", "React에서는"], [
            ["남은 할 일 개수 표시", "<code>computed</code>", "렌더 중 계산 또는 <code>useMemo</code>"],
            ["완료/미완료 필터링", "<code>computed</code>", "배열 filter 결과"],
            ["todos가 바뀔 때 localStorage 저장", "<code>watch</code>", "<code>useEffect</code>"],
            ["처음 화면이 뜰 때 저장된 데이터 불러오기", "<code>onMounted</code>", "<code>useEffect(..., [])</code>"]
          ])
        ]
      },
      {
        title: "Todo에 붙일 기능",
        body: [
          ol([
            "남은 할 일 개수를 computed로 만듭니다.",
            "필터 상태 all/active/done을 둡니다.",
            "필터링된 목록을 computed로 만듭니다.",
            "todos가 바뀔 때 watch로 localStorage에 저장합니다.",
            "onMounted에서 저장된 todos를 불러옵니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "computed와 watch 예시",
        desc: "Todo 앱이 새로고침 후에도 목록을 기억하게 만드는 기본 흐름입니다.",
        sql: `
<script setup>
import { computed, onMounted, ref, watch } from "vue";

const todos = ref([]);
const filter = ref("all");

const remainingCount = computed(() =>
  todos.value.filter(todo => !todo.done).length
);

const filteredTodos = computed(() => {
  if (filter.value === "active") return todos.value.filter(todo => !todo.done);
  if (filter.value === "done") return todos.value.filter(todo => todo.done);
  return todos.value;
});

watch(todos, value => {
  localStorage.setItem("todos", JSON.stringify(value));
}, { deep: true });

onMounted(() => {
  const saved = localStorage.getItem("todos");
  if (saved) todos.value = JSON.parse(saved);
});
</script>
        `
      }
    ],
    drills: [
      {
        prompt: "남은 할 일 개수처럼 상태에서 계산해 보여주는 값은 computed와 watch 중 무엇이 어울리나요?",
        answer: "computed가 어울립니다."
      },
      {
        prompt: "React의 useEffect와 가장 비슷한 Vue 개념 두 가지를 말해 보세요.",
        answer: "watch와 lifecycle hook(onMounted 등)입니다. 목적에 따라 나누어 씁니다."
      }
    ],
    practiceGuide: "Todo 앱에 all/active/done 필터 버튼과 남은 할 일 개수를 추가해 보세요."
  },
  {
    id: "vue7_composables",
    course: "vue",
    part: "Vue Part 2. Todo 앱으로 배우는 초중급",
    title: "7. Composables: Todo 로직을 재사용 함수로 빼기",
    tags: ["vue", "todo", "react"],
    type: "info",
    summary: "컴포넌트가 길어질 때 상태와 함수를 useTodos 같은 재사용 함수로 분리합니다.",
    goal: "Composable이 React Custom Hook과 비슷한 역할이라는 점을 이해합니다.",
    analogy: "Composable은 자주 쓰는 요리법을 레시피 카드로 빼 두는 것입니다. 컴포넌트마다 같은 로직을 다시 쓰지 않고 레시피를 가져다 씁니다.",
    studyHint: "초보 단계에서는 무조건 분리하지 마세요. 먼저 한 컴포넌트에서 완성하고, 반복되거나 길어진 로직을 나중에 빼면 됩니다.",
    sections: [
      {
        title: "언제 Composable로 빼나요?",
        body: [
          ul([
            "상태와 함수가 많아져 컴포넌트가 읽기 어려울 때",
            "여러 컴포넌트에서 같은 로딩/에러/API 호출 로직을 쓸 때",
            "Todo 관련 로직을 UI와 분리해 테스트하거나 재사용하고 싶을 때"
          ]),
          table(["Vue", "React"], [
            ["<code>useTodos()</code> Composable", "<code>useTodos()</code> Custom Hook"],
            ["<code>ref</code>, <code>computed</code> 반환", "<code>useState</code> 값과 함수 반환"],
            ["파일 예: <code>composables/useTodos.js</code>", "파일 예: <code>hooks/useTodos.js</code>"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "useTodos.js",
        desc: "Todo 상태와 변경 함수를 한 파일로 모읍니다.",
        sql: `
// src/composables/useTodos.js
import { computed, ref } from "vue";

export function useTodos() {
  const todos = ref([]);
  let nextId = 1;

  const remainingCount = computed(() =>
    todos.value.filter(todo => !todo.done).length
  );

  function addTodo(title) {
    todos.value.push({ id: nextId++, title, done: false });
  }

  function toggleTodo(id) {
    const todo = todos.value.find(item => item.id === id);
    if (todo) todo.done = !todo.done;
  }

  function removeTodo(id) {
    todos.value = todos.value.filter(todo => todo.id !== id);
  }

  return { todos, remainingCount, addTodo, toggleTodo, removeTodo };
}
        `
      }
    ],
    drills: [
      {
        prompt: "Composable 이름이 보통 use로 시작하는 이유는 무엇인가요?",
        answer: "상태와 로직을 사용하는 재사용 함수라는 관례를 드러내기 위해서입니다. React의 Custom Hook 이름과도 비슷합니다."
      },
      {
        prompt: "UI 마크업과 상태 변경 로직을 분리하면 어떤 장점이 있나요?",
        answer: "컴포넌트가 짧아지고, 같은 로직을 다른 화면에서 재사용하기 쉬워집니다."
      }
    ],
    practiceGuide: "App.vue에 있던 addTodo, toggleTodo, removeTodo, remainingCount를 useTodos.js로 옮겨 보세요."
  },
  {
    id: "vue8_router_shopping_intro",
    course: "vue",
    part: "Vue Part 3. 쇼핑몰로 배우는 중고급",
    title: "8. Vue Router: 쇼핑몰 페이지 나누기",
    tags: ["vue", "router", "shop", "react"],
    type: "info",
    summary: "쇼핑몰 예제로 홈, 상품 목록, 상품 상세, 장바구니 페이지를 라우터로 연결합니다.",
    goal: "SPA 라우팅, router-view, router-link, 동적 라우트를 이해합니다.",
    analogy: "라우터는 백화점 안내도입니다. /products는 상품 매장, /products/101은 101번 상품 진열대, /cart는 계산대입니다.",
    studyHint: "라우터는 페이지를 여러 HTML 파일로 나누는 것이 아니라, 주소에 따라 보여줄 컴포넌트를 바꾸는 장치입니다.",
    sections: [
      {
        title: "쇼핑몰 라우트 설계",
        body: [
          table(["주소", "컴포넌트", "역할"], [
            ["/", "HomeView", "메인 페이지"],
            ["/products", "ProductListView", "상품 목록"],
            ["/products/:id", "ProductDetailView", "상품 상세"],
            ["/cart", "CartView", "장바구니"],
            ["/checkout", "CheckoutView", "주문 페이지"]
          ])
        ]
      },
      {
        title: "React와 비교",
        body: [
          table(["라우팅 역할", "Vue Router", "React Router"], [
            ["링크", "<code>&lt;RouterLink to=\"/products\" /&gt;</code>", "<code>&lt;Link to=\"/products\" /&gt;</code>"],
            ["페이지 표시 위치", "<code>&lt;RouterView /&gt;</code>", "<code>&lt;Outlet /&gt;</code>"],
            ["URL 파라미터", "<code>useRoute().params.id</code>", "<code>useParams().id</code>"],
            ["이동", "<code>useRouter().push('/cart')</code>", "<code>useNavigate()('/cart')</code>"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "router/index.js",
        desc: "쇼핑몰의 주소와 페이지 컴포넌트를 연결합니다.",
        sql: `
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductListView from "@/views/ProductListView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import CartView from "@/views/CartView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/products", component: ProductListView },
    { path: "/products/:id", component: ProductDetailView, props: true },
    { path: "/cart", component: CartView }
  ]
});
        `
      }
    ],
    drills: [
      {
        prompt: "/products/101에서 101 같은 값을 무엇이라고 부르나요?",
        answer: "동적 라우트 파라미터(params)라고 부릅니다."
      },
      {
        prompt: "Vue Router의 RouterView는 React Router의 어떤 기능과 비슷한가요?",
        answer: "Outlet과 비슷합니다. 현재 주소에 맞는 페이지 컴포넌트를 표시하는 자리입니다."
      }
    ],
    practiceGuide: "쇼핑몰 프로젝트에 Home, Products, ProductDetail, Cart 네 페이지를 만들고 라우터로 이동해 보세요."
  },
  {
    id: "vue9_api_async",
    course: "vue",
    part: "Vue Part 3. 쇼핑몰로 배우는 중고급",
    title: "9. API 통신: 상품 목록 불러오기",
    tags: ["vue", "shop", "react"],
    type: "info",
    summary: "fetch/axios, async/await, 로딩/에러 상태를 쇼핑몰 상품 목록으로 배웁니다.",
    goal: "서버 데이터를 가져와 화면에 보여주는 기본 흐름을 익힙니다.",
    analogy: "API 호출은 창고에 상품 목록을 요청하는 전화입니다. 전화 중에는 로딩 표시를 하고, 실패하면 안내 문구를 보여 줘야 합니다.",
    studyHint: "비동기는 처음엔 어렵습니다. '요청 전, 성공, 실패, 완료' 네 칸으로 나누면 훨씬 덜 복잡합니다.",
    sections: [
      {
        title: "API 상태 네 가지",
        body: [
          table(["상태", "의미", "화면"], [
            ["idle", "아직 요청 전", "빈 화면 또는 기본 안내"],
            ["loading", "요청 중", "스피너 또는 로딩 문구"],
            ["success", "성공", "상품 목록"],
            ["error", "실패", "다시 시도 버튼과 에러 메시지"]
          ])
        ]
      },
      {
        title: "React와 비교",
        body: [
          table(["역할", "Vue", "React"], [
            ["첫 로딩 시 API 호출", "<code>onMounted</code>", "<code>useEffect(..., [])</code>"],
            ["상태 저장", "<code>ref([])</code>, <code>ref(false)</code>", "<code>useState</code>"],
            ["재사용 API 로직", "Composable", "Custom Hook"],
            ["HTTP 도구", "fetch 또는 axios", "fetch 또는 axios"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "상품 목록 불러오기",
        desc: "로딩과 에러까지 함께 관리하는 기본 예시입니다.",
        sql: `
<script setup>
import { onMounted, ref } from "vue";

const products = ref([]);
const loading = ref(false);
const error = ref("");

async function fetchProducts() {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("상품을 불러오지 못했습니다.");
    products.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProducts);
</script>

<template>
  <p v-if="loading">상품을 불러오는 중입니다.</p>
  <p v-else-if="error">{{ error }}</p>
  <ProductGrid v-else :products="products" />
</template>
        `
      }
    ],
    drills: [
      {
        prompt: "API 호출 중인지 화면에 표시하려면 어떤 상태가 필요할까요?",
        answer: "loading 같은 boolean 상태가 필요합니다."
      },
      {
        prompt: "React의 useEffect(..., [])와 비슷하게 첫 화면 표시 후 실행되는 Vue 훅은 무엇인가요?",
        answer: "onMounted입니다."
      }
    ],
    practiceGuide: "가짜 products 배열을 먼저 화면에 보여준 뒤, fetchProducts 함수 형태로 바꾸어 로딩/에러 상태를 추가해 보세요."
  },
  {
    id: "vue10_pinia_cart",
    course: "vue",
    part: "Vue Part 3. 쇼핑몰로 배우는 중고급",
    title: "10. Pinia: 장바구니 전역 상태 만들기",
    tags: ["vue", "pinia", "shop", "react"],
    type: "info",
    summary: "상품 상세와 장바구니 페이지가 공유하는 cart 상태를 Pinia로 관리합니다.",
    goal: "Pinia의 state, getters, actions를 장바구니 예제로 이해합니다.",
    analogy: "Pinia store는 쇼핑몰의 중앙 창고입니다. 여러 페이지가 같은 장바구니를 봐야 하므로 각 페이지에 따로 장바구니를 만들면 안 됩니다.",
    studyHint: "작은 Todo 앱은 부모 상태만으로 충분합니다. 하지만 쇼핑몰처럼 여러 페이지가 같은 데이터를 공유하면 전역 상태가 편해집니다.",
    sections: [
      {
        title: "Pinia가 필요한 순간",
        body: [
          ul([
            "상품 상세 페이지에서 '장바구니 담기'를 눌렀는데 Cart 페이지에서도 보여야 할 때",
            "헤더의 장바구니 개수 배지가 모든 페이지에서 보여야 할 때",
            "로그인 사용자 정보처럼 앱 전체에서 참조하는 데이터가 있을 때"
          ]),
          table(["개념", "Pinia", "React 쪽 예시"], [
            ["전역 상태 저장소", "store", "Redux store, Zustand store, Context"],
            ["상태", "state", "state"],
            ["계산 값", "getters", "selector, derived state"],
            ["변경 함수", "actions", "action, setter function"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "cart store",
        desc: "장바구니 목록, 총 개수, 총 금액, 추가/삭제 함수를 한곳에 둡니다.",
        sql: `
// stores/cart.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: []
  }),
  getters: {
    totalCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: state => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  actions: {
    addToCart(product) {
      const found = this.items.find(item => item.id === product.id);
      if (found) {
        found.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter(item => item.id !== id);
    }
  }
});
        `
      },
      {
        title: "컴포넌트에서 사용",
        desc: "어느 페이지에서든 같은 cart store를 가져다 씁니다.",
        sql: `
<script setup>
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
</script>

<template>
  <button @click="cart.addToCart(product)">
    장바구니 담기
  </button>
  <span>담긴 상품 수: {{ cart.totalCount }}</span>
</template>
        `
      }
    ],
    drills: [
      {
        prompt: "새 Vue 3 프로젝트에서 Vuex보다 Pinia를 우선 학습하는 이유는 무엇인가요?",
        answer: "Pinia가 Vue 3에서 더 간결하고 공식 권장 흐름에 가까우며 Composition API와 잘 맞기 때문입니다."
      },
      {
        prompt: "Pinia getters는 어떤 값을 만들 때 쓰나요?",
        answer: "state에서 계산해 낼 수 있는 총 개수, 총 금액 같은 파생 값을 만들 때 씁니다."
      }
    ],
    practiceGuide: "장바구니 store를 만들고, ProductDetailView에서 addToCart를 호출한 뒤 CartView에서 items와 totalPrice를 출력해 보세요."
  },
  {
    id: "vue11_slots_teleport_transition",
    course: "vue",
    part: "Vue Part 3. 쇼핑몰로 배우는 중고급",
    title: "11. Slots, Teleport, Transition: 재사용 UI 만들기",
    tags: ["vue", "shop", "react"],
    type: "info",
    summary: "공통 모달, 카드, 알림을 만들며 Vue 내장 컴포넌트와 slot을 익힙니다.",
    goal: "slot은 내용 주입, Teleport는 위치 이동, Transition은 등장/퇴장 애니메이션으로 이해합니다.",
    analogy: "slot은 액자입니다. 액자 모양은 같지만 안에 넣는 사진은 매번 다를 수 있습니다. Teleport는 모달을 화면 맨 위 레이어로 옮겨 붙이는 엘리베이터입니다.",
    studyHint: "고급 UI는 화려한 문법보다 재사용 가능한 컴포넌트 경계가 중요합니다.",
    sections: [
      {
        title: "쇼핑몰에서 어디에 쓰나요?",
        body: [
          table(["기능", "쇼핑몰 예시", "React에서는"], [
            ["slot", "ProductCard의 버튼 영역을 페이지마다 다르게 넣기", "children prop"],
            ["Teleport", "장바구니 확인 모달을 body 아래로 이동", "Portal"],
            ["Transition", "모달 열림/닫힘, 장바구니 항목 등장", "CSS Transition, animation library"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "BaseModal.vue",
        desc: "모달의 틀은 재사용하고 내용은 slot으로 받습니다.",
        sql: `
<script setup>
defineProps({
  open: Boolean
});

const emit = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="modal-backdrop" @click.self="emit('close')">
        <section class="modal">
          <header>
            <slot name="title">알림</slot>
          </header>
          <main>
            <slot />
          </main>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
        `
      }
    ],
    drills: [
      {
        prompt: "Vue slot은 React의 어떤 개념과 가장 비슷한가요?",
        answer: "children prop과 비슷합니다."
      },
      {
        prompt: "Teleport는 어떤 UI에 특히 유용한가요?",
        answer: "모달, 토스트, 드롭다운처럼 DOM 위치를 body 아래나 특정 영역으로 옮기는 UI에 유용합니다."
      }
    ],
    practiceGuide: "장바구니 담기 완료 모달을 BaseModal로 만들고, 제목과 본문을 slot으로 넣어 보세요."
  },
  {
    id: "vue12_typescript",
    course: "vue",
    part: "Vue Part 4. 실무 감각과 확장",
    title: "12. TypeScript 점진 적용: Todo와 쇼핑몰 타입 잡기",
    tags: ["vue", "typescript", "todo", "shop", "react"],
    type: "info",
    summary: "처음부터 타입으로 막히지 않도록, 완성한 기능에 Todo/Product/CartItem 타입을 점진적으로 붙입니다.",
    goal: "타입은 코드를 귀찮게 하는 것이 아니라 데이터 모양을 약속하는 계약서라는 점을 이해합니다.",
    analogy: "TypeScript는 택배 송장입니다. 상자 안에 무엇이 들어 있는지 이름표를 붙이면, 엉뚱한 물건을 넣으려 할 때 바로 알 수 있습니다.",
    studyHint: "노베이스라면 TypeScript를 처음부터 깊게 파기보다, Vue 기본 기능을 만든 뒤 타입을 얹는 순서가 좋습니다.",
    sections: [
      {
        title: "먼저 잡을 타입",
        body: [
          code(`
export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type CartItem = Product & {
  quantity: number;
};
          `),
          p("이렇게 타입을 만들어 두면 Todo에 title 없이 데이터를 넣거나, price에 문자열을 넣는 실수를 개발 중에 잡을 수 있습니다.")
        ]
      },
      {
        title: "Vue와 React 타입 비교",
        body: [
          table(["역할", "Vue + TS", "React + TS"], [
            ["props 타입", "<code>defineProps&lt;{ product: Product }&gt;()</code>", "<code>function Card({ product }: Props)</code>"],
            ["emit 타입", "<code>defineEmits&lt;{ add: [product: Product] }&gt;()</code>", "콜백 prop 타입 정의"],
            ["상태 타입", "<code>ref&lt;Product[]&gt;([])</code>", "<code>useState&lt;Product[]&gt;([])</code>"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "ProductCard props 타입",
        desc: "상품 카드가 어떤 데이터를 받는지 명확히 합니다.",
        sql: `
<script setup lang="ts">
import type { Product } from "@/types";

defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  addToCart: [product: Product];
}>();
</script>
        `
      }
    ],
    drills: [
      {
        prompt: "TypeScript를 처음부터 깊게 쓰기 어렵다면 어떤 순서가 좋나요?",
        answer: "먼저 JavaScript로 기능을 이해하고, Todo/Product/CartItem처럼 핵심 데이터 타입부터 점진적으로 붙이는 순서가 좋습니다."
      },
      {
        prompt: "Vue의 ref<Product[]>([])는 React의 어떤 코드와 비슷한가요?",
        answer: "useState<Product[]>([])와 비슷합니다."
      }
    ],
    practiceGuide: "Todo 타입을 만들고 todos 상태를 ref<Todo[]>([])로 바꿔 보세요. 그다음 Product와 CartItem 타입도 만들어 보세요."
  },
  {
    id: "vue13_project_architecture",
    course: "vue",
    part: "Vue Part 4. 실무 감각과 확장",
    title: "13. 쇼핑몰 프로젝트 구조와 리팩토링",
    tags: ["vue", "shop", "advanced"],
    type: "info",
    summary: "views, components, composables, stores, api 폴더를 나누고 기능이 커질 때 정리하는 법을 배웁니다.",
    goal: "파일을 어디에 둘지 판단하는 기준을 세웁니다.",
    analogy: "프로젝트 구조는 마트 진열대입니다. 채소, 과자, 냉동식품을 한 바구니에 넣으면 찾기 어렵듯, 파일도 역할별로 나누어야 합니다.",
    studyHint: "처음부터 완벽한 폴더 구조를 만들려고 하면 손이 멈춥니다. 기능이 생긴 뒤 역할이 보이면 분리하세요.",
    sections: [
      {
        title: "추천 구조",
        body: [
          code(`
src/
  api/
    products.js
  components/
    ProductCard.vue
    BaseModal.vue
  composables/
    useProducts.js
  stores/
    cart.js
  views/
    ProductListView.vue
    ProductDetailView.vue
    CartView.vue
  router/
    index.js
          `),
          table(["폴더", "넣는 것"], [
            ["api", "서버와 통신하는 함수"],
            ["components", "재사용 가능한 UI 조각"],
            ["composables", "상태와 로직 재사용 함수"],
            ["stores", "Pinia 전역 상태"],
            ["views", "라우터에 연결되는 페이지"]
          ])
        ]
      },
      {
        title: "리팩토링 기준",
        body: [
          ol([
            "한 컴포넌트가 너무 길어지면 UI 조각을 component로 뺍니다.",
            "API 호출이 여러 곳에 반복되면 api 함수로 뺍니다.",
            "상태와 로직이 여러 컴포넌트에서 반복되면 composable로 뺍니다.",
            "여러 페이지가 공유해야 하는 상태면 Pinia store로 뺍니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "api/products.js",
        desc: "API 주소와 호출 방식을 화면 컴포넌트에서 분리합니다.",
        sql: `
const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function getProducts() {
  const response = await fetch(BASE_URL + "/products");
  if (!response.ok) throw new Error("상품 조회 실패");
  return response.json();
}

export async function getProduct(id) {
  const response = await fetch(BASE_URL + "/products/" + id);
  if (!response.ok) throw new Error("상품 상세 조회 실패");
  return response.json();
}
        `
      }
    ],
    drills: [
      {
        prompt: "라우터에 연결되는 페이지 컴포넌트는 보통 어느 폴더에 두나요?",
        answer: "views 폴더에 둡니다."
      },
      {
        prompt: "API 호출 코드가 여러 컴포넌트에 흩어져 있으면 어디로 빼는 것이 좋나요?",
        answer: "api 폴더의 함수로 분리하는 것이 좋습니다."
      }
    ],
    practiceGuide: "쇼핑몰 프로젝트에 views, components, api, composables, stores 폴더를 만들고 현재 파일을 역할별로 옮겨 보세요."
  },
  {
    id: "vue14_forms_validation",
    course: "vue",
    part: "Vue Part 4. 실무 감각과 확장",
    title: "14. 폼과 검증: 주문 정보 입력하기",
    tags: ["vue", "shop", "react"],
    type: "info",
    summary: "주문자 이름, 전화번호, 주소 입력 폼을 만들며 v-model, computed 검증, 제출 흐름을 익힙니다.",
    goal: "폼 상태와 검증 메시지를 Vue스럽게 관리합니다.",
    analogy: "폼 검증은 계산대 직원이 주문서 빈칸을 확인하는 과정입니다. 이름, 연락처, 주소가 없으면 결제로 넘기지 않습니다.",
    studyHint: "폼 라이브러리를 쓰기 전에 작은 폼을 직접 만들어 보면, 나중에 라이브러리가 무엇을 대신해 주는지 이해됩니다.",
    sections: [
      {
        title: "주문 폼 상태",
        body: [
          table(["필드", "상태", "검증"], [
            ["이름", "name", "2글자 이상"],
            ["전화번호", "phone", "비어 있지 않음"],
            ["주소", "address", "비어 있지 않음"],
            ["요청사항", "memo", "선택"]
          ])
        ]
      },
      {
        title: "React와 비교",
        body: [
          table(["역할", "Vue", "React"], [
            ["입력 연결", "<code>v-model</code>", "<code>value + onChange</code>"],
            ["제출", "<code>@submit.prevent</code>", "<code>onSubmit</code>"],
            ["검증 결과", "<code>computed</code>", "렌더 중 계산 또는 <code>useMemo</code>"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "CheckoutForm.vue",
        desc: "computed로 제출 가능 여부를 계산합니다.",
        sql: `
<script setup>
import { computed, reactive } from "vue";

const form = reactive({
  name: "",
  phone: "",
  address: "",
  memo: ""
});

const canSubmit = computed(() =>
  form.name.trim().length >= 2 &&
  form.phone.trim() &&
  form.address.trim()
);

function submitOrder() {
  if (!canSubmit.value) return;
  console.log("주문 제출", { ...form });
}
</script>

<template>
  <form @submit.prevent="submitOrder">
    <input v-model="form.name" placeholder="이름" />
    <input v-model="form.phone" placeholder="전화번호" />
    <input v-model="form.address" placeholder="주소" />
    <textarea v-model="form.memo" placeholder="요청사항" />
    <button :disabled="!canSubmit">주문하기</button>
  </form>
</template>
        `
      }
    ],
    drills: [
      {
        prompt: "주문하기 버튼의 disabled 상태처럼 다른 상태에서 계산되는 값은 무엇으로 만들면 좋나요?",
        answer: "computed로 만들면 좋습니다."
      },
      {
        prompt: "React에서 v-model이 없을 때 입력값은 보통 어떻게 관리하나요?",
        answer: "value와 onChange를 직접 연결해서 관리합니다."
      }
    ],
    practiceGuide: "CheckoutView에 주문 폼을 만들고, 이름/전화번호/주소가 모두 입력되어야 주문 버튼이 활성화되게 해 보세요."
  },
  {
    id: "vue15_deploy_next_steps",
    course: "vue",
    part: "Vue Part 4. 실무 감각과 확장",
    title: "15. 배포와 다음 학습 순서",
    tags: ["vue", "frontend", "shop", "practice"],
    type: "info",
    summary: "Vite 앱을 빌드하고 배포할 때 필요한 최소 지식과 이후 학습 순서를 정리합니다.",
    goal: "Todo와 쇼핑몰 학습 후 무엇을 더 공부해야 하는지 길을 잡습니다.",
    analogy: "배포는 만든 가게를 내 컴퓨터 밖 쇼핑몰 거리에 오픈하는 일입니다. 빌드는 가게를 손님이 볼 수 있는 형태로 포장하는 과정입니다.",
    studyHint: "초중급 단계에서는 배포 플랫폼의 모든 기능보다, 빌드 결과물과 SPA 라우팅 설정을 이해하는 것이 더 중요합니다.",
    sections: [
      {
        title: "빌드와 배포",
        body: [
          code(`
npm run build
npm run preview
          `),
          p("<code>npm run build</code>를 실행하면 <code>dist</code> 폴더가 생깁니다. 이 폴더가 실제 배포되는 결과물입니다. Vercel, Netlify 같은 서비스는 이 과정을 자동으로 실행해 줍니다."),
          callout("warning", "SPA 라우팅 주의", "Vue Router의 history 모드를 쓰면 /products/101 같은 주소로 바로 접속했을 때 서버가 index.html을 돌려주도록 설정해야 합니다. Vercel은 Vite SPA에서 보통 자동으로 잘 처리되지만, 다른 호스팅에서는 rewrite 설정이 필요할 수 있습니다.")
        ]
      },
      {
        title: "다음 학습 순서",
        body: [
          ol([
            "Todo 앱을 Composition API로 끝까지 완성합니다.",
            "쇼핑몰에서 Router, API, Pinia, 폼을 연결합니다.",
            "TypeScript를 Todo와 Product 타입부터 점진 적용합니다.",
            "테스트는 컴포넌트 단위부터 시작합니다.",
            "성능은 목록 렌더링, 이미지 최적화, 코드 스플리팅 순서로 봅니다.",
            "Nuxt는 Vue 기본기와 Router/API 흐름이 잡힌 뒤 학습합니다."
          ])
        ]
      },
      {
        title: "이번 Vue 학습서에서 의도적으로 줄인 내용",
        body: [
          table(["내용", "왜 줄였나"], [
            ["Bootstrap", "Vue 핵심이 아니라 UI 라이브러리 사용법에 가깝습니다."],
            ["class 문법", "Vue 3 실무 중심 흐름과 거리가 있어 깊게 다루지 않습니다."],
            ["Vuex", "기존 프로젝트에서 볼 수 있지만 새 프로젝트는 Pinia가 더 자연스럽습니다."],
            ["Mixin/HOC", "개념은 알아두되 Composition API와 Composable이 더 실용적입니다."]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "작은 포트폴리오 과제",
        desc: "학습 내용을 한 번에 확인하는 미션입니다.",
        sql: `
1. Todo 앱
   - 추가, 삭제, 완료, 필터, localStorage
   - TodoInput, TodoList, TodoItem 컴포넌트 분리

2. 쇼핑몰 앱
   - 상품 목록, 상품 상세, 장바구니, 주문 폼
   - Router, API 함수, Pinia store 사용
   - ProductCard, BaseModal 재사용
        `
      }
    ],
    drills: [
      {
        prompt: "Vite 앱을 배포하기 전 만드는 결과물 폴더는 무엇인가요?",
        answer: "dist 폴더입니다."
      },
      {
        prompt: "Vue 기본기를 익힌 뒤 Nuxt를 배우는 것이 좋은 이유는 무엇인가요?",
        answer: "Nuxt는 Vue 위에 라우팅, 서버 렌더링, 파일 기반 구조 등을 얹은 프레임워크라 Vue 기본기가 있어야 이해가 쉽습니다."
      }
    ],
    practiceGuide: "Todo 앱과 쇼핑몰 앱을 각각 GitHub에 올리고, README에 기능 목록과 실행 방법을 정리해 보세요."
  }
];

const vuePracticeSteps = {
  vue1_overview: [
    "<strong>먼저 목표를 종이에 적습니다.</strong> Todo 앱은 '입력한다, 목록에 보인다, 완료한다, 삭제한다' 네 가지 기능을 만들고, 쇼핑몰은 '상품을 본다, 상세를 본다, 장바구니에 담는다, 주문 정보를 입력한다' 네 가지 흐름을 만든다고 적어 보세요.",
    "<strong>화면을 조각으로 나눕니다.</strong> Todo 앱은 <code>TodoHeader</code>, <code>TodoInput</code>, <code>TodoList</code>, <code>TodoItem</code>, <code>TodoFooter</code>로 나눕니다. 아직 코드를 쓰지 말고 각 조각이 맡을 일을 한 줄씩 적습니다.",
    "<strong>상태를 찾아 표시합니다.</strong> Todo 앱이 기억해야 하는 데이터는 <code>newTodo</code>와 <code>todos</code>입니다. 쇼핑몰은 <code>products</code>, <code>selectedProduct</code>, <code>cartItems</code>가 필요합니다.",
    "<strong>React 비교는 참고만 합니다.</strong> Vue의 <code>ref</code>를 React의 <code>useState</code>처럼 생각해도 되지만, 지금은 Vue 코드가 실제로 어떻게 움직이는지에 집중하세요.",
    "<strong>확인 기준:</strong> 이 장을 끝낸 뒤 '상태가 바뀌면 화면이 바뀐다', '컴포넌트는 화면 조각이다', 'props는 내려가고 emit은 올라간다'를 말로 설명할 수 있으면 됩니다."
  ],
  vue2_environment: [
    "<strong>터미널을 열 위치를 정합니다.</strong> 바탕화면이나 작업 폴더에서 터미널을 열고 <code>npm create vue@latest todo-vue</code>를 실행합니다. 처음이라면 TypeScript, Router, Pinia는 일단 No로 두고 시작해도 됩니다.",
    "<strong>프로젝트 폴더로 이동합니다.</strong> <code>cd todo-vue</code>를 입력한 뒤 <code>npm install</code>을 실행합니다. 이 단계는 프로젝트가 필요한 부품을 다운로드하는 과정입니다.",
    "<strong>개발 서버를 켭니다.</strong> <code>npm run dev</code>를 실행하고 터미널에 나온 주소를 브라우저에서 엽니다. 보통 <code>http://localhost:5173</code> 또는 비슷한 주소가 보입니다.",
    "<strong>가장 먼저 만질 파일을 확인합니다.</strong> <code>src/App.vue</code>를 열고 기본 문구를 <code>Todo 학습 시작</code>으로 바꿉니다. 저장하면 브라우저가 바로 바뀌는지 확인하세요.",
    "<strong>흔한 실수:</strong> 터미널에서 프로젝트 폴더 안으로 들어가지 않고 <code>npm run dev</code>를 실행하면 명령이 실패합니다. 현재 위치가 <code>todo-vue</code>인지 확인하세요."
  ],
  vue3_template_reactivity: [
    "<strong>App.vue를 비웁니다.</strong> 처음에는 기존 예제 코드를 모두 지우고 <code>&lt;script setup&gt;</code>과 <code>&lt;template&gt;</code> 두 영역만 남깁니다.",
    "<strong>상태를 하나 만듭니다.</strong> <code>const todos = ref([])</code>를 작성합니다. <code>ref</code>를 쓰려면 맨 위에서 <code>import { ref } from 'vue'</code>를 해야 합니다.",
    "<strong>임시 데이터를 넣습니다.</strong> 빈 배열로 시작하면 화면 확인이 어려우니 <code>{ id: 1, title: 'Vue 시작', done: false }</code> 같은 Todo 두 개를 먼저 넣으세요.",
    "<strong>목록을 출력합니다.</strong> <code>&lt;li v-for=\"todo in todos\" :key=\"todo.id\"&gt;{{ todo.title }}&lt;/li&gt;</code>를 작성합니다. 화면에 두 줄이 보이면 성공입니다.",
    "<strong>조건 문구를 추가합니다.</strong> todos가 비어 있을 때만 <code>아직 할 일이 없습니다</code>가 나오도록 <code>v-if</code>를 써 보세요. 확인하려면 배열을 잠깐 빈 배열로 바꾸면 됩니다.",
    "<strong>흔한 실수:</strong> <code>v-for</code>에는 <code>:key</code>를 붙이는 습관을 들이세요. key가 없으면 목록 변경 시 Vue가 어떤 항목이 어떤 항목인지 추적하기 어렵습니다."
  ],
  vue4_events_vmodel: [
    "<strong>입력 상태를 만듭니다.</strong> <code>const newTodo = ref('')</code>를 추가합니다. 입력창의 현재 글자를 저장하는 작은 메모지라고 생각하면 됩니다.",
    "<strong>입력창을 상태와 연결합니다.</strong> template에 <code>&lt;input v-model=\"newTodo\" /&gt;</code>를 만듭니다. 브라우저에서 글자를 치면 <code>newTodo</code>에 들어간다고 생각하세요.",
    "<strong>form으로 감쌉니다.</strong> input과 button을 <code>&lt;form @submit.prevent=\"addTodo\"&gt;</code>로 감쌉니다. 이렇게 하면 버튼 클릭과 Enter 키가 같은 추가 기능을 실행합니다.",
    "<strong>addTodo 함수를 작성합니다.</strong> <code>newTodo.value.trim()</code>으로 공백을 제거하고, 값이 없으면 <code>return</code>합니다. 값이 있으면 todos에 새 객체를 push합니다.",
    "<strong>추가 후 입력창을 비웁니다.</strong> 마지막 줄에 <code>newTodo.value = ''</code>를 넣습니다. 추가 버튼을 누른 뒤 입력창이 비워지면 잘 된 것입니다.",
    "<strong>확인 기준:</strong> 빈 문자열은 추가되지 않고, 정상 입력은 목록에 추가되고, 추가 후 입력창이 비워져야 합니다."
  ],
  vue5_components_props_emit: [
    "<strong>components 폴더를 만듭니다.</strong> <code>src/components</code> 폴더 안에 <code>TodoInput.vue</code>, <code>TodoList.vue</code>, <code>TodoItem.vue</code> 파일을 만듭니다.",
    "<strong>TodoInput을 먼저 옮깁니다.</strong> App.vue에 있던 입력 form을 <code>TodoInput.vue</code>로 옮기고, 추가할 제목을 부모에게 알려주기 위해 <code>defineEmits(['add'])</code>를 사용합니다.",
    "<strong>App.vue에서 TodoInput을 사용합니다.</strong> <code>import TodoInput from './components/TodoInput.vue'</code>를 작성하고 template에 <code>&lt;TodoInput @add=\"addTodo\" /&gt;</code>를 넣습니다.",
    "<strong>TodoList에 목록을 내려줍니다.</strong> <code>defineProps({ todos: Array })</code> 또는 타입 기반 props를 사용하고, App.vue에서는 <code>&lt;TodoList :todos=\"todos\" /&gt;</code>처럼 내려줍니다.",
    "<strong>TodoItem에서 이벤트를 올립니다.</strong> 삭제 버튼을 누르면 <code>emit('remove', todo.id)</code>, 체크하면 <code>emit('toggle', todo.id)</code>를 올리게 만듭니다.",
    "<strong>흔한 실수:</strong> 자식 컴포넌트가 props로 받은 배열을 직접 바꾸려고 하지 마세요. 실제 데이터 변경은 부모 App.vue에서 하도록 두는 것이 초보 단계에서 가장 안전합니다."
  ],
  vue6_computed_watch_lifecycle: [
    "<strong>남은 개수부터 만듭니다.</strong> <code>const remainingCount = computed(() =&gt; todos.value.filter(todo =&gt; !todo.done).length)</code>를 작성하고 화면에 출력합니다.",
    "<strong>필터 상태를 추가합니다.</strong> <code>const filter = ref('all')</code>을 만들고, 버튼 세 개 <code>all</code>, <code>active</code>, <code>done</code>을 만듭니다.",
    "<strong>보여줄 목록을 계산합니다.</strong> 원본 <code>todos</code>를 직접 지우지 말고 <code>filteredTodos</code> computed를 만들어 필터에 맞는 목록만 보여주세요.",
    "<strong>localStorage 저장을 붙입니다.</strong> <code>watch(todos, ... , { deep: true })</code>로 todos가 바뀔 때마다 문자열로 저장합니다.",
    "<strong>처음 로딩 때 불러옵니다.</strong> <code>onMounted</code> 안에서 저장된 값을 읽고 <code>todos.value</code>에 넣습니다. 새로고침해도 Todo가 남아 있으면 성공입니다.",
    "<strong>흔한 실수:</strong> localStorage에는 객체를 그대로 저장할 수 없습니다. 저장할 때는 <code>JSON.stringify</code>, 꺼낼 때는 <code>JSON.parse</code>를 사용해야 합니다."
  ],
  vue7_composables: [
    "<strong>먼저 App.vue가 길어진 지점을 확인합니다.</strong> todos 상태, addTodo, removeTodo, toggleTodo, remainingCount가 한 파일에 몰려 있으면 분리할 준비가 된 것입니다.",
    "<strong>composables 폴더를 만듭니다.</strong> <code>src/composables/useTodos.js</code> 파일을 만들고 Todo 관련 상태와 함수를 이 파일로 옮깁니다.",
    "<strong>함수로 감쌉니다.</strong> <code>export function useTodos() { ... }</code> 안에 상태와 함수를 넣고 마지막에 <code>return { todos, addTodo, ... }</code>를 작성합니다.",
    "<strong>App.vue에서 가져다 씁니다.</strong> <code>const { todos, addTodo, removeTodo } = useTodos()</code>처럼 꺼냅니다. 화면 동작이 이전과 같으면 리팩토링 성공입니다.",
    "<strong>한 번에 다 옮기지 않습니다.</strong> 먼저 add/remove만 옮기고 동작을 확인한 뒤, computed와 localStorage 로직을 옮기세요.",
    "<strong>확인 기준:</strong> 파일을 분리했는데 기능은 그대로 동작해야 합니다. 리팩토링은 동작을 바꾸는 일이 아니라 구조를 정리하는 일입니다."
  ],
  vue8_router_shopping_intro: [
    "<strong>라우터를 설치합니다.</strong> 기존 프로젝트에 붙인다면 <code>npm install vue-router</code>를 실행합니다. 새 프로젝트 생성 때 Router를 Yes로 골라도 됩니다.",
    "<strong>views 폴더를 만듭니다.</strong> <code>HomeView.vue</code>, <code>ProductListView.vue</code>, <code>ProductDetailView.vue</code>, <code>CartView.vue</code>를 만듭니다. 각 파일에는 처음엔 제목 하나만 넣어도 됩니다.",
    "<strong>router/index.js를 만듭니다.</strong> 각 주소와 View 컴포넌트를 연결합니다. 상세 페이지는 <code>/products/:id</code>처럼 동적 라우트를 씁니다.",
    "<strong>main.js에 라우터를 등록합니다.</strong> <code>createApp(App).use(router).mount('#app')</code> 형태로 라우터를 앱에 연결합니다.",
    "<strong>App.vue에 표시 자리를 둡니다.</strong> <code>&lt;RouterLink&gt;</code>로 메뉴를 만들고, 아래에 <code>&lt;RouterView /&gt;</code>를 넣습니다.",
    "<strong>확인 기준:</strong> 메뉴를 눌렀을 때 주소와 화면 제목이 함께 바뀌면 성공입니다."
  ],
  vue9_api_async: [
    "<strong>처음에는 진짜 서버 대신 가짜 데이터로 시작합니다.</strong> <code>src/data/products.js</code>에 상품 배열을 만들고 화면에 출력하세요. UI가 먼저 보여야 API 단계가 덜 어렵습니다.",
    "<strong>상태 세 가지를 만듭니다.</strong> <code>products</code>, <code>loading</code>, <code>error</code>를 각각 <code>ref</code>로 만듭니다.",
    "<strong>fetchProducts 함수를 만듭니다.</strong> 함수 시작에서 loading을 true로 바꾸고, try/catch/finally를 작성합니다. 아직 API가 없다면 <code>Promise.resolve(mockProducts)</code>로 연습해도 됩니다.",
    "<strong>onMounted에서 호출합니다.</strong> 페이지가 처음 열릴 때 <code>fetchProducts()</code>가 실행되게 만듭니다.",
    "<strong>화면을 세 갈래로 나눕니다.</strong> loading이면 로딩 문구, error가 있으면 에러 문구, 둘 다 아니면 상품 목록을 보여줍니다.",
    "<strong>흔한 실수:</strong> async 함수 안에서 에러가 났는데 catch가 없으면 화면이 조용히 멈춘 것처럼 보일 수 있습니다. 초보 단계에서는 항상 try/catch를 붙이세요."
  ],
  vue10_pinia_cart: [
    "<strong>Pinia를 설치합니다.</strong> <code>npm install pinia</code>를 실행하고 <code>main.js</code>에 <code>createPinia()</code>를 등록합니다.",
    "<strong>stores 폴더를 만듭니다.</strong> <code>src/stores/cart.js</code> 파일을 만들고 <code>defineStore('cart', ...)</code>로 장바구니 store를 만듭니다.",
    "<strong>가장 작은 상태부터 시작합니다.</strong> 처음에는 <code>items: []</code>만 두고, <code>addToCart(product)</code> 액션 하나만 만드세요.",
    "<strong>상품 상세에서 담아 봅니다.</strong> <code>const cart = useCartStore()</code>를 작성하고 버튼 클릭 시 <code>cart.addToCart(product)</code>를 호출합니다.",
    "<strong>CartView에서 확인합니다.</strong> 같은 store를 가져와 <code>cart.items</code>를 출력합니다. 상세에서 담은 상품이 CartView에 보이면 전역 상태 연결 성공입니다.",
    "<strong>그다음 totalCount와 totalPrice를 붙입니다.</strong> getters는 상태에서 계산되는 값입니다. 장바구니 총 개수와 총 금액을 getters로 만드세요."
  ],
  vue11_slots_teleport_transition: [
    "<strong>BaseModal.vue를 만듭니다.</strong> 처음에는 props <code>open</code>과 emit <code>close</code>만 둡니다. open이 true일 때만 모달이 보이게 만드세요.",
    "<strong>slot을 하나 넣습니다.</strong> 모달 본문에 <code>&lt;slot /&gt;</code>을 넣고, 부모에서 원하는 문장을 넣어 보세요. 내용이 바뀌면 slot 이해가 된 것입니다.",
    "<strong>title slot을 추가합니다.</strong> <code>&lt;slot name=\"title\"&gt;알림&lt;/slot&gt;</code>처럼 기본 제목을 둡니다. 부모가 제목을 넣으면 그 제목이 나오게 합니다.",
    "<strong>Teleport를 붙입니다.</strong> 모달 전체를 <code>&lt;Teleport to=\"body\"&gt;</code>로 감싸서 DOM 위치를 body 아래로 옮깁니다.",
    "<strong>Transition은 마지막에 붙입니다.</strong> 먼저 모달이 열리고 닫히는 기능을 완성한 뒤 <code>&lt;Transition name=\"fade\"&gt;</code>와 CSS를 추가하세요.",
    "<strong>흔한 실수:</strong> Transition을 먼저 붙이면 안 보이는 이유를 찾기 어려워집니다. 기능이 되는지 확인한 다음 애니메이션을 붙이세요."
  ],
  vue12_typescript: [
    "<strong>타입 파일을 하나 만듭니다.</strong> <code>src/types/index.ts</code>를 만들고 <code>Todo</code>, <code>Product</code>, <code>CartItem</code> 타입을 작성합니다.",
    "<strong>한 파일만 먼저 바꿉니다.</strong> 모든 파일을 한 번에 TypeScript로 바꾸지 말고 <code>ProductCard.vue</code> 하나만 <code>&lt;script setup lang=\"ts\"&gt;</code>로 바꿉니다.",
    "<strong>props 타입을 붙입니다.</strong> <code>defineProps&lt;{ product: Product }&gt;()</code>를 작성합니다. product에 없는 속성을 쓰면 에디터가 알려주는지 확인하세요.",
    "<strong>emit 타입은 나중에 붙입니다.</strong> <code>defineEmits&lt;{ addToCart: [product: Product] }&gt;()</code>처럼 이벤트 이름과 payload 모양을 정합니다.",
    "<strong>상태 타입을 붙입니다.</strong> 상품 목록은 <code>const products = ref&lt;Product[]&gt;([])</code>처럼 작성합니다.",
    "<strong>흔한 실수:</strong> TypeScript 에러가 많이 나면 기능을 새로 만들지 말고 타입 적용 범위를 줄이세요. 초보 단계에서는 '한 파일씩'이 가장 안전합니다."
  ],
  vue13_project_architecture: [
    "<strong>현재 파일을 펼쳐 봅니다.</strong> App.vue나 ProductListView.vue가 너무 길어졌다면 어떤 코드가 UI이고 어떤 코드가 데이터 호출인지 표시해 보세요.",
    "<strong>폴더를 역할별로 만듭니다.</strong> <code>views</code>, <code>components</code>, <code>api</code>, <code>composables</code>, <code>stores</code> 폴더를 만듭니다.",
    "<strong>페이지는 views로 옮깁니다.</strong> 라우터 주소와 직접 연결되는 파일은 <code>views</code>에 둡니다. 예: ProductListView, CartView.",
    "<strong>반복 UI는 components로 옮깁니다.</strong> ProductCard, BaseModal, AppHeader처럼 여러 곳에서 쓸 수 있는 조각은 components에 둡니다.",
    "<strong>API 호출은 api로 옮깁니다.</strong> <code>fetch('/products')</code> 같은 코드는 화면 파일 안에 계속 두지 말고 <code>api/products.js</code>로 빼세요.",
    "<strong>확인 기준:</strong> 파일을 옮긴 뒤에도 라우터 이동, 상품 목록, 장바구니가 그대로 동작해야 합니다."
  ],
  vue14_forms_validation: [
    "<strong>CheckoutView를 만듭니다.</strong> 이름, 전화번호, 주소, 요청사항 input을 먼저 화면에 배치합니다. 처음에는 검증 없이 입력만 되면 됩니다.",
    "<strong>form 상태를 reactive로 만듭니다.</strong> <code>reactive({ name: '', phone: '', address: '', memo: '' })</code>를 만들고 각 입력창에 <code>v-model</code>로 연결합니다.",
    "<strong>제출 가능 여부를 computed로 만듭니다.</strong> 이름은 2글자 이상, 전화번호와 주소는 비어 있지 않아야 한다는 조건을 <code>canSubmit</code>으로 계산합니다.",
    "<strong>버튼을 disabled 처리합니다.</strong> <code>:disabled=\"!canSubmit\"</code>을 붙이고, 입력을 채우기 전에는 버튼이 눌리지 않는지 확인합니다.",
    "<strong>제출 함수를 만듭니다.</strong> <code>@submit.prevent=\"submitOrder\"</code>를 붙이고, submitOrder 안에서 canSubmit이 false면 바로 return합니다.",
    "<strong>확인 기준:</strong> 빈 폼에서는 버튼이 비활성화되고, 필수값을 채우면 활성화되며, 제출 시 콘솔에 주문 정보가 찍히면 됩니다."
  ],
  vue15_deploy_next_steps: [
    "<strong>빌드 전에 로컬에서 확인합니다.</strong> <code>npm run dev</code>로 Todo와 쇼핑몰 주요 화면이 동작하는지 먼저 확인합니다.",
    "<strong>빌드 명령을 실행합니다.</strong> <code>npm run build</code>를 실행합니다. 에러가 나면 배포 전에 반드시 고쳐야 합니다.",
    "<strong>결과물을 미리 봅니다.</strong> <code>npm run preview</code>를 실행하고 브라우저에서 빌드된 앱이 정상인지 확인합니다.",
    "<strong>라우터 주소를 직접 새로고침합니다.</strong> <code>/products</code>, <code>/cart</code> 같은 주소에서 새로고침했을 때 화면이 뜨는지 확인하세요. SPA 배포에서 자주 틀리는 지점입니다.",
    "<strong>README를 정리합니다.</strong> 프로젝트 설명, 실행 방법, 주요 기능, 배포 주소를 적습니다. 나중에 포트폴리오로 볼 때 README가 첫인상입니다.",
    "<strong>다음 과제:</strong> Todo 앱과 쇼핑몰 앱을 각각 작은 GitHub repo로 만들고, 화면 캡처와 구현 기능 목록을 README에 붙여 보세요."
  ]
};

const learningGuides = {
  ch1_intro: {
    analogy: "데이터베이스는 책상 위에 흩어진 종이를 주제별 서랍에 넣고, 각 서랍에 라벨과 열쇠를 붙여 둔 정리함입니다. SQL은 그 정리함에서 원하는 종이를 찾고, 새 종이를 넣고, 잘못된 종이를 고치는 말입니다.",
    studyHint: "처음에는 용어를 외우기보다 고객, 주문, 상품처럼 현실의 사물을 표로 나누어 보는 감각을 잡는 것이 중요합니다."
  },
  ch2_install: {
    analogy: "MySQL 서버는 도서관 창고이고, DBeaver나 Workbench는 창고 안을 볼 수 있는 접수 데스크입니다. 서버가 켜져 있어야 접수 데스크에서 책을 찾을 수 있습니다.",
    studyHint: "직접 설치하고 접속해 보면 SQL이 추상적인 문장이 아니라 실제 저장소에 질문을 던지는 도구라는 감각이 생깁니다."
  },
  ch3_select_flow: {
    analogy: "SELECT는 식당 주문서와 비슷합니다. 어느 주방에서 가져올지 FROM으로 정하고, 어떤 조건의 메뉴만 받을지 WHERE로 거르고, 최종 접시에 무엇을 올릴지 SELECT로 정합니다.",
    studyHint: "SQL을 읽을 때는 작성 순서보다 처리 흐름을 이해해야 복잡한 쿼리도 덜 무섭습니다."
  },
  ch4_data_types: {
    analogy: "데이터 타입은 물건을 담는 용기입니다. 날짜는 달력 칸에, 금액은 숫자 상자에, 긴 설명은 글 상자에 넣어야 나중에 계산과 정렬이 쉬워집니다.",
    studyHint: "타입을 대충 정하면 지금은 들어가도 나중에 검색, 정렬, 계산, 저장 공간에서 문제가 생깁니다."
  },
  ch5_create_constraints: {
    analogy: "테이블 생성과 제약 조건은 건물 설계도와 출입 규칙입니다. PRIMARY KEY는 주민등록번호처럼 한 사람을 구분하고, NOT NULL은 반드시 적어야 하는 필수 칸입니다.",
    studyHint: "제약 조건은 귀찮은 문법이 아니라 잘못된 데이터가 들어오기 전에 문 앞에서 막아 주는 안전장치입니다."
  },
  ch6_alter_drop: {
    analogy: "ALTER는 집의 방 구조를 고치는 리모델링이고, DROP은 건물을 통째로 철거하는 일입니다. TRUNCATE는 건물은 두고 안의 짐만 빠르게 비우는 일에 가깝습니다.",
    studyHint: "구조 변경 명령은 되돌리기 어렵거나 영향 범위가 크므로, 실무에서는 항상 백업과 확인 습관이 필요합니다."
  },
  ch7_dml: {
    analogy: "INSERT, UPDATE, DELETE는 장부에 새 줄을 쓰고, 기존 줄을 고치고, 줄을 지우는 행동입니다. 펜을 들기 전에 어떤 줄을 건드리는지 확인해야 합니다.",
    studyHint: "데이터를 바꾸는 SQL은 SELECT보다 위험합니다. WHERE 없이 UPDATE나 DELETE를 실행하면 장부 전체가 바뀔 수 있습니다."
  },
  ch8_where_null: {
    analogy: "WHERE는 입구에서 손님을 골라 들여보내는 문지기입니다. NULL은 빈 문자열이나 0이 아니라 '아직 모름'이라는 빈칸 표시입니다.",
    studyHint: "조건식과 NULL을 정확히 이해해야 원하는 행만 골라낼 수 있고, 예상과 다른 결과를 줄일 수 있습니다."
  },
  ch9_functions: {
    analogy: "SQL 함수는 주방 도구입니다. 문자열 함수는 가위와 테이프, 날짜 함수는 달력 계산기, 숫자 함수는 계산기처럼 데이터를 보기 좋게 다듬습니다.",
    studyHint: "함수는 SELECT 결과를 만들 때 편리하지만, WHERE의 인덱스 컬럼을 함수로 감싸면 성능이 나빠질 수 있다는 점도 함께 기억하세요."
  },
  ch10_grouping: {
    analogy: "GROUP BY는 영수증 여러 장을 월별, 고객별, 카테고리별 묶음 상자로 나눈 뒤 합계 스티커를 붙이는 작업입니다.",
    studyHint: "집계는 분석 SQL의 출발점입니다. 행 하나하나를 보는 눈에서 묶음과 요약을 보는 눈으로 넘어가는 장입니다."
  },
  ch11_joins: {
    analogy: "JOIN은 퍼즐 조각을 맞추는 일입니다. 주문 조각에는 CUSTOMER_ID가 있고 고객 조각에도 CUSTOMER_ID가 있어서 두 조각을 맞춰 한 장의 그림으로 봅니다.",
    studyHint: "관계형 DB의 핵심은 데이터를 나누어 저장한 뒤 필요할 때 다시 연결하는 것입니다. JOIN을 이해하면 정규화된 테이블이 왜 필요한지도 보입니다."
  },
  ch12_subqueries_cte: {
    analogy: "서브쿼리는 큰 문제를 풀기 전에 작은 메모 계산을 해 두는 것이고, CTE는 그 메모에 이름을 붙여 위쪽에 정리해 두는 방식입니다.",
    studyHint: "복잡한 SQL은 한 번에 쓰려 하지 말고 중간 결과를 이름 붙여 나누면 훨씬 읽기 쉬워집니다."
  },
  ch13_window: {
    analogy: "윈도우 함수는 줄을 세운 뒤 각 사람에게 '네 앞뒤 사람과 비교한 순위나 누적합'을 알려주는 안내원입니다. 행을 줄이지 않고 옆에 계산 결과를 붙입니다.",
    studyHint: "GROUP BY가 여러 행을 한 행으로 접는다면, 윈도우 함수는 원래 행을 유지한 채 순위, 누적합, 이전값을 계산합니다."
  },
  ch14_views_generated: {
    analogy: "VIEW는 자주 보는 복잡한 지도에 이름을 붙여 바로 꺼내 보는 북마크입니다. 생성 컬럼은 계산식을 미리 적어 둔 자동 계산 칸입니다.",
    studyHint: "반복되는 SELECT를 재사용하면 실수를 줄이고, 팀원이 같은 기준의 데이터를 보게 만들 수 있습니다."
  },
  ch15_indexes: {
    analogy: "인덱스는 책 뒤의 찾아보기와 도서관 위치표입니다. 없으면 처음부터 끝까지 훑고, 있으면 원하는 위치로 바로 갑니다.",
    studyHint: "인덱스는 성능의 첫 단추입니다. 다만 색인이 많을수록 책을 새로 꽂을 때 일이 늘듯, 쓰기 비용과 저장 공간도 함께 늘어납니다."
  },
  ch16_explain: {
    analogy: "EXPLAIN은 택배 배송 경로 조회입니다. DB가 어떤 길로 데이터를 찾으려는지 미리 보여 주기 때문에, 막히는 구간을 찾아 개선할 수 있습니다.",
    studyHint: "느린 SQL을 감으로 고치기보다 실행 계획을 보고 테이블을 얼마나 읽는지, 인덱스를 쓰는지 확인하는 습관이 중요합니다."
  },
  ch17_transactions: {
    analogy: "트랜잭션은 은행 송금의 봉투입니다. 내 계좌에서 돈을 빼고 상대 계좌에 넣는 두 일이 모두 성공해야 봉투를 닫고, 중간에 실패하면 봉투째 취소합니다.",
    studyHint: "여러 변경이 하나의 업무 의미를 가질 때 COMMIT과 ROLLBACK을 이해해야 데이터가 중간 상태로 망가지지 않습니다."
  },
  ch18_normalization: {
    analogy: "정규화는 같은 연락처를 여러 노트에 복사하지 않고 원본 주소록 하나만 관리하는 방식입니다. 주문에는 고객 번호만 적고, 고객 정보는 고객 주소록에서 봅니다.",
    studyHint: "정규형 이름보다 중요한 것은 중복 때문에 생기는 삽입, 갱신, 삭제 이상을 눈으로 발견하는 능력입니다."
  },
  ch19_programming: {
    analogy: "Stored Procedure와 Trigger는 DB 안에 두는 자동 처리 규칙입니다. 계산대에서 특정 버튼을 누르면 정해진 절차가 자동으로 실행되는 것과 비슷합니다.",
    studyHint: "DB 내부 로직은 편리하지만 너무 많아지면 애플리케이션 흐름을 추적하기 어려워집니다. 언제 DB에 둘지 판단하는 감각이 필요합니다."
  },
  ch20_security_backup: {
    analogy: "계정과 권한은 건물 출입증이고, 백업은 중요한 장부의 복사본입니다. 모두에게 마스터키를 주거나 복사본을 만들지 않으면 사고 때 복구가 어렵습니다.",
    studyHint: "데이터는 저장하는 것만큼 지키고 되살리는 것이 중요합니다. 권한 최소화와 백업 복구 연습은 운영의 기본입니다."
  },
  ch21_mysql_ops: {
    analogy: "InnoDB와 로그, 복제는 자동차의 엔진, 블랙박스, 예비 차량입니다. 평소에는 보이지 않지만 장애가 나면 이 구조를 알아야 원인을 찾습니다.",
    studyHint: "운영 심화는 당장 모든 설정을 외우기보다 MySQL이 데이터를 안전하게 쓰고 복구하는 큰 흐름을 이해하는 것이 우선입니다."
  },
  ch22_app_integration: {
    analogy: "애플리케이션과 DB 연결은 식당 홀과 주방 사이의 주문 전달 통로입니다. SQL Injection 방어는 손님이 주문서에 주방 명령을 몰래 써 넣지 못하게 막는 일입니다.",
    studyHint: "SQL은 앱 코드와 만날 때 위험해질 수 있습니다. 입력값을 문자열로 이어 붙이지 않고 파라미터로 전달하는 습관을 반드시 익혀야 합니다."
  },
  ch23_exam_sheet: {
    analogy: "시험 정리는 여행 전 체크리스트입니다. 지도 전체를 다시 그리는 것이 아니라, 자주 틀리는 갈림길과 필수 준비물을 빠르게 확인합니다.",
    studyHint: "요약은 마지막에 빛납니다. 먼저 예제와 실습으로 감을 만든 뒤, 시험 전에는 용어와 차이를 압축해 반복하세요."
  },
  ch24_project: {
    analogy: "미니 프로젝트는 배운 재료로 직접 작은 요리를 해 보는 시간입니다. SELECT, JOIN, GROUP BY, 인덱스가 각각 따로가 아니라 한 접시에 올라옵니다.",
    studyHint: "문법을 안다고 실무 감각이 생기지는 않습니다. 작은 쇼핑몰 데이터를 끝까지 조회해 보면 SQL을 어디에 쓰는지 연결됩니다."
  },
  ch25_pg_overview: {
    analogy: "PostgreSQL은 기본 공구에 정밀 공구가 더 많은 작업대입니다. MySQL로 기본기를 익힌 뒤 PostgreSQL을 배우면 더 복잡한 데이터 표현과 분석이 쉬워집니다.",
    studyHint: "PostgreSQL은 MySQL을 대체해서 외우는 과목이 아니라, SQL 실력을 더 넓히는 다음 단계로 보면 좋습니다."
  },
  ch26_pg_types: {
    analogy: "JSONB, 배열, 범위 타입은 기본 서랍 외에 특수 수납함을 추가하는 느낌입니다. 반정형 데이터, 여러 값, 기간 같은 데이터를 더 자연스럽게 담을 수 있습니다.",
    studyHint: "고급 타입은 편리하지만 남용하면 관계형 설계가 흐려질 수 있습니다. 어떤 데이터가 테이블로 나뉘어야 하는지 먼저 판단하세요."
  },
  ch27_pg_sql: {
    analogy: "DISTINCT ON, LATERAL, 재귀 CTE는 복잡한 길찾기용 도구입니다. 최신 글 하나 찾기, 행마다 다른 계산 붙이기, 조직도 따라 내려가기 같은 문제를 푸는 데 씁니다.",
    studyHint: "고급 SQL은 한 번에 외우기 어렵습니다. 먼저 어떤 문제를 해결하려고 나온 문법인지 상황과 함께 익히세요."
  },
  ch28_pg_indexes: {
    analogy: "PostgreSQL 인덱스 종류는 검색 목적별 지도입니다. 일반 주소 찾기는 B-Tree, 태그와 JSON 내부 검색은 GIN, 위치와 범위는 GiST, 큰 로그의 넓은 범위는 BRIN이 어울립니다.",
    studyHint: "인덱스 종류를 외우기보다 데이터 모양과 검색 질문을 먼저 보고 맞는 도구를 고르는 연습이 중요합니다."
  },
  ch29_pg_mvcc: {
    analogy: "MVCC는 문서를 고치는 동안 독자가 이전 사본을 계속 읽을 수 있게 하는 복사본 관리 방식입니다. VACUUM은 오래된 사본을 치우는 청소입니다.",
    studyHint: "동시성과 정리는 PostgreSQL 운영의 핵심입니다. 왜 읽기와 쓰기가 서로 덜 막히는지, 왜 청소가 필요한지 흐름으로 이해하세요."
  },
  ch30_pg_extensions: {
    analogy: "PostgreSQL 확장은 스마트폰 앱 설치와 비슷합니다. 기본 기능에 없는 검색, 통계, UUID, 지리 정보 기능을 필요한 만큼 더합니다.",
    studyHint: "확장은 강력하지만 운영 환경의 버전과 권한에 영향을 받습니다. 설치 전 목적과 대안을 함께 확인하는 습관이 좋습니다."
  },
  ch31_redis_intro: {
    analogy: "Redis는 책상 위 포스트잇입니다. 원본 장부는 MySQL에 두고, 자주 보는 값이나 잠깐 필요한 값을 포스트잇에 적어 빠르게 확인합니다.",
    studyHint: "Redis는 빠르지만 모든 데이터를 영구 원본으로 맡기는 도구가 아닙니다. 캐시, 세션, 카운터처럼 목적이 분명할 때 빛납니다."
  },
  ch32_redis_data_structures: {
    analogy: "Redis 자료구조는 서랍 종류를 고르는 일입니다. 단일 메모는 String, 사용자 프로필은 Hash, 줄 세우기는 List, 중복 없는 명단은 Set, 점수 랭킹은 Sorted Set입니다.",
    studyHint: "Redis 실력은 명령어 수보다 자료구조 선택에서 갈립니다. 문제를 보고 어떤 그릇에 담을지 먼저 생각하세요."
  },
  ch33_redis_patterns_ops: {
    analogy: "캐시 패턴은 편의점 진열대 운영과 비슷합니다. 잘 팔리는 상품은 앞에 꺼내 두고, 오래된 상품은 치우고, 품절이나 몰림 상황에 대비합니다.",
    studyHint: "Redis를 실무에 붙이면 빠른 만큼 만료, 불일치, 장애도 함께 고민해야 합니다. TTL과 원본 DB 관계를 항상 같이 보세요."
  },
  ch34_redis_deep_dive: {
    analogy: "Redis 심화는 빠른 계산대를 안전하게 운영하는 법입니다. 줄을 빠르게 줄이는 Pipeline, 직원에게 작은 절차를 맡기는 Lua, 매장 확장용 Cluster를 상황에 맞게 씁니다.",
    studyHint: "빠른 도구일수록 잘못 쓰면 장애도 빠르게 커집니다. 원자성, 큰 key, 락, 메모리 정책을 함께 이해해야 합니다."
  },
  ch35_elasticsearch_intro: {
    analogy: "Elasticsearch는 책 뒤의 색인을 거대한 검색 엔진으로 만든 것입니다. MySQL이 정확한 장부라면 Elasticsearch는 단어와 관련도를 보고 빠르게 후보 문서를 찾아줍니다.",
    studyHint: "검색 엔진은 원본 DB가 아니라 검색을 잘하기 위한 별도 색인입니다. 왜 동기화가 필요한지 함께 이해해야 합니다."
  },
  ch36_local_stack_setup: {
    analogy: "로컬 실습 환경은 작은 실험실입니다. MySQL 원본 장부, Redis 포스트잇, Elasticsearch 검색 색인을 한 책상 위에 올려 놓고 역할 차이를 직접 만져봅니다.",
    studyHint: "설치는 공부의 목적이 아니라 실습을 위한 준비입니다. 한 번 띄워 보고, 넣고, 조회하고, 지우는 흐름을 손으로 익히면 개념이 훨씬 빨리 붙습니다."
  }
};

const javaSpringChapters = [
  {
    id: "js1_roadmap",
    course: "javaSpring",
    part: "Java Part 1. 시작 전 큰 그림",
    title: "1. Java와 Spring Boot를 왜 배우는가",
    tags: ["java", "spring", "backend"],
    type: "info",
    summary: "Java가 백엔드에서 오래 쓰이는 이유와 Spring Boot가 왜 Java 백엔드의 표준처럼 쓰이는지 큰 그림부터 잡습니다.",
    goal: "Java는 언어, Spring Boot는 서버 애플리케이션을 빠르고 안정적으로 만드는 도구라는 관계를 이해합니다.",
    analogy: "Java는 요리사의 기본 칼질이고, Spring Boot는 주방 설비가 갖춰진 식당입니다. 칼질을 알아야 재료를 다룰 수 있고, 주방 설비를 알아야 많은 손님에게 안정적으로 음식을 낼 수 있습니다.",
    studyHint: "처음에는 문법과 프레임워크 이름이 많이 나와서 복잡해 보입니다. 지금은 'Java로 생각을 코드로 표현하고, Spring Boot로 그 코드를 웹 서비스로 연결한다'는 큰 줄기만 잡아도 충분합니다.",
    sections: [
      {
        title: "김영한 로드맵 흐름으로 보는 학습 순서",
        body: [
          p("이 학습서는 인프런 김영한 강사의 실전 자바 로드맵과 스프링 완전 정복 로드맵의 순서를 참고해 재구성했습니다. Java 입문, Java 기본, 중급, 고급으로 언어 기본기를 쌓고, 그 다음 Spring 입문, 핵심 원리, HTTP, MVC, DB, 고급 원리, Spring Boot 활용으로 넘어갑니다."),
          p("노베이스라면 처음부터 Spring Boot 프로젝트를 크게 만들기보다 Java로 변수, 조건문, 반복문, 객체, 컬렉션을 손에 익힌 뒤 Spring으로 넘어가는 편이 훨씬 덜 힘듭니다. Spring은 결국 Java 코드 위에서 움직입니다."),
          table(["구간", "무엇을 배우나", "왜 필요한가"], [
            ["Java 입문", "변수, 조건문, 반복문, 메서드", "생각을 코드로 표현하는 기본 문법"],
            ["Java 기본/OOP", "클래스, 객체, 상속, 다형성", "큰 프로그램을 역할별로 나누는 방법"],
            ["Java 중급", "예외, 컬렉션, 제네릭", "실무 코드에서 데이터를 안전하게 다루는 방법"],
            ["Java 고급", "스레드, I/O, 네트워크, 람다, 스트림", "서버 프로그램의 성능과 표현력을 이해하는 기반"],
            ["Spring Boot", "DI, MVC, DB, JPA, 트랜잭션", "웹 API와 실제 백엔드 서비스를 만드는 방법"]
          ])
        ]
      },
      {
        title: "백엔드 개발자가 하는 일",
        body: [
          p("백엔드는 사용자가 버튼을 누른 뒤 보이지 않는 곳에서 요청을 받고, 검증하고, 데이터베이스에 저장하고, 결과를 다시 보내는 영역입니다. 예를 들어 쇼핑몰에서 주문 버튼을 누르면 서버는 상품 재고를 확인하고, 주문을 저장하고, 결제 상태를 기록하고, 사용자에게 성공 응답을 보냅니다."),
          ul([
            "<strong>Java</strong>: 계산, 조건 판단, 객체 설계처럼 서버 내부 로직을 작성합니다.",
            "<strong>Spring Boot</strong>: HTTP 요청을 받고, 필요한 객체를 연결하고, DB 접근과 설정을 쉽게 처리합니다.",
            "<strong>DB/JPA</strong>: 주문, 회원, 상품 같은 데이터를 저장하고 조회합니다.",
            "<strong>테스트</strong>: 기능이 실제로 원하는 대로 동작하는지 자동으로 확인합니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "서버가 하는 일을 아주 작게 표현하기",
        desc: "사용자 이름을 받아 환영 문장을 만드는 것도 작은 백엔드 로직입니다.",
        sql: `
public class WelcomeService {
    public String welcome(String name) {
        return name + "님, 환영합니다!";
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "Java와 Spring Boot의 관계를 한 문장으로 설명해보세요.",
        answer: "Java는 프로그램을 작성하는 언어이고, Spring Boot는 Java로 웹 서버와 백엔드 기능을 쉽게 만들게 도와주는 프레임워크입니다."
      },
      {
        prompt: "백엔드가 쇼핑몰 주문 과정에서 해야 할 일을 3개만 적어보세요.",
        answer: "요청 받기, 주문 데이터 검증하기, DB에 주문 저장하기, 결제 결과 기록하기, 응답 보내기 등이 있습니다."
      }
    ]
  },
  {
    id: "js2_environment",
    course: "javaSpring",
    part: "Java Part 1. 시작 전 큰 그림",
    title: "2. 개발 환경 세팅: JDK, IntelliJ, Gradle",
    tags: ["java", "backend"],
    type: "info",
    summary: "Java 코드를 작성하고 실행하기 위한 JDK, IntelliJ IDEA, Gradle의 역할을 초보자 눈높이로 정리합니다.",
    goal: "Hello World를 실행하고, 프로젝트 폴더 구조가 어떤 의미인지 이해합니다.",
    analogy: "JDK는 요리 도구 세트, IntelliJ는 작업대, Gradle은 재료 준비와 포장을 자동화하는 매니저입니다. 셋이 함께 있어야 편하게 개발할 수 있습니다.",
    studyHint: "처음 설치할 때 가장 많이 막히는 부분은 PATH, JDK 버전, 프로젝트 위치입니다. 오류가 나면 코드보다 실행 환경부터 확인하세요.",
    sections: [
      {
        title: "무엇을 설치해야 하나",
        body: [
          ul([
            "<strong>JDK 21 또는 17</strong>: Java 코드를 컴퓨터가 실행할 수 있게 컴파일하고 실행하는 도구입니다.",
            "<strong>IntelliJ IDEA Community</strong>: 무료로 사용하기 좋은 Java 개발 도구입니다. Spring Boot까지 본격적으로 하면 Ultimate가 편하지만, 처음 Java 학습은 Community로 충분합니다.",
            "<strong>Gradle</strong>: 직접 설치하지 않아도 프로젝트에 포함된 Gradle Wrapper로 실행할 수 있습니다.",
            "<strong>Git</strong>: 실습 코드를 저장하고 되돌릴 때 사용합니다."
          ]),
          code(`
java -version
javac -version
          `),
          p("위 명령에서 버전이 출력되면 JDK가 정상 설치된 것입니다. 명령을 찾을 수 없다는 메시지가 나오면 설치가 안 되었거나 환경 변수 PATH가 연결되지 않은 것입니다.")
        ]
      },
      {
        title: "프로젝트 구조 읽기",
        body: [
          table(["위치", "역할"], [
            ["src/main/java", "실제 애플리케이션 코드가 들어갑니다."],
            ["src/test/java", "테스트 코드가 들어갑니다."],
            ["build.gradle", "프로젝트 이름, Java 버전, 라이브러리 의존성을 적습니다."],
            ["gradlew, gradlew.bat", "프로젝트에 맞는 Gradle을 실행하는 파일입니다."],
            [".gitignore", "Git에 올리지 않을 파일 목록입니다."]
          ]),
          p("처음에는 폴더가 많아 보여도 실제로 자주 만지는 곳은 src/main/java, src/test/java, build.gradle 정도입니다.")
        ]
      }
    ],
    examples: [
      {
        title: "Hello World",
        desc: "Java 프로그램의 가장 작은 시작점입니다.",
        sql: `
public class HelloJava {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "JDK와 IntelliJ의 역할 차이는 무엇인가요?",
        answer: "JDK는 Java 코드를 컴파일하고 실행하는 도구이고, IntelliJ는 코드를 편하게 작성하고 실행하도록 도와주는 개발 환경입니다."
      },
      {
        prompt: "src/main/java와 src/test/java에는 각각 무엇을 넣나요?",
        answer: "src/main/java에는 실제 기능 코드, src/test/java에는 그 기능을 검증하는 테스트 코드를 넣습니다."
      }
    ]
  },
  {
    id: "js3_java_basics",
    course: "javaSpring",
    part: "Java Part 2. 문법 기초",
    title: "3. 변수, 타입, 조건문, 반복문",
    tags: ["java", "basic"],
    type: "info",
    summary: "프로그래밍을 처음 시작하는 사람이 가장 먼저 익혀야 하는 변수, 타입, if, for, while을 다룹니다.",
    goal: "값을 저장하고, 조건에 따라 다른 코드를 실행하고, 같은 작업을 반복할 수 있습니다.",
    analogy: "변수는 이름표가 붙은 상자입니다. 조건문은 갈림길이고, 반복문은 같은 작업을 정해진 횟수만큼 해주는 자동 반복 장치입니다.",
    studyHint: "처음에는 문법을 외우기보다 '이 값이 어디에 저장되고, 어떤 조건에서 어떤 줄이 실행되는가'를 소리 내어 따라가는 것이 좋습니다.",
    sections: [
      {
        title: "변수와 타입",
        body: [
          p("변수는 값을 저장하는 이름입니다. Java는 타입을 중요하게 봅니다. 숫자를 담을지, 문자를 담을지, 참/거짓을 담을지 미리 정해야 합니다."),
          table(["타입", "예시", "언제 쓰나"], [
            ["int", "10", "정수"],
            ["long", "10000000000L", "큰 정수"],
            ["double", "3.14", "소수"],
            ["boolean", "true", "조건 판단"],
            ["String", "\"hello\"", "문자열"]
          ])
        ]
      },
      {
        title: "조건문과 반복문",
        body: [
          p("조건문은 '만약 결제 금액이 5만원 이상이면 무료배송'처럼 상황에 따라 다른 행동을 하게 합니다. 반복문은 상품 목록 전체를 출력하거나, 주문 내역을 하나씩 검사할 때 씁니다."),
          p("<code>if</code>는 갈림길, <code>for</code>는 횟수가 정해진 반복, <code>while</code>은 조건이 참인 동안 계속하는 반복이라고 생각하면 됩니다.")
        ]
      }
    ],
    examples: [
      {
        title: "무료 배송 조건",
        desc: "조건에 따라 다른 문장을 출력합니다.",
        sql: `
int price = 60000;

if (price >= 50000) {
    System.out.println("무료 배송입니다.");
} else {
    System.out.println("배송비 3000원이 추가됩니다.");
}
        `
      },
      {
        title: "반복문으로 장바구니 금액 합계 구하기",
        desc: "배열에 담긴 금액을 하나씩 더합니다.",
        sql: `
int[] prices = {12000, 30000, 8000};
int total = 0;

for (int price : prices) {
    total += price;
}

System.out.println("총 금액 = " + total);
        `
      }
    ],
    drills: [
      {
        prompt: "점수가 90점 이상이면 A, 80점 이상이면 B, 아니면 C를 출력하는 코드를 작성해보세요.",
        answer: `
int score = 85;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}
        `
      }
    ]
  },
  {
    id: "js4_methods_arrays",
    course: "javaSpring",
    part: "Java Part 2. 문법 기초",
    title: "4. 메서드와 배열: 코드를 묶고 데이터를 모으기",
    tags: ["java", "basic"],
    type: "info",
    summary: "반복되는 코드를 메서드로 분리하고, 같은 종류의 값을 배열로 모아 다룹니다.",
    goal: "메서드의 입력값과 반환값을 이해하고, 배열을 반복문과 함께 사용할 수 있습니다.",
    analogy: "메서드는 자주 쓰는 일을 버튼 하나로 묶어둔 리모컨 버튼입니다. 배열은 같은 종류의 물건을 번호 순서대로 꽂아둔 서랍장입니다.",
    studyHint: "메서드를 볼 때는 이름보다 먼저 입력과 출력을 보세요. 무엇을 받아서 무엇을 돌려주는지 알면 코드가 훨씬 덜 무섭습니다.",
    sections: [
      {
        title: "메서드를 쓰는 이유",
        body: [
          p("같은 계산을 여러 번 복사해서 쓰면 나중에 수정할 때 모두 찾아 바꿔야 합니다. 메서드로 빼면 한 곳만 고치면 됩니다."),
          ul([
            "코드 이름을 붙여 의도를 드러낼 수 있습니다.",
            "중복을 줄일 수 있습니다.",
            "작은 단위로 테스트하기 쉬워집니다."
          ])
        ]
      },
      {
        title: "배열과 반복문",
        body: [
          p("배열은 여러 값을 순서대로 저장합니다. 첫 번째 위치는 0번입니다. 이 0부터 시작하는 규칙 때문에 처음에는 헷갈리지만, 컴퓨터가 순서를 세는 방식이라고 받아들이면 됩니다.")
        ]
      }
    ],
    examples: [
      {
        title: "할인 금액 계산 메서드",
        desc: "가격과 할인율을 받아 할인된 가격을 반환합니다.",
        sql: `
public static int discount(int price, int rate) {
    return price - (price * rate / 100);
}

public static void main(String[] args) {
    int result = discount(10000, 10);
    System.out.println(result);
}
        `
      }
    ],
    drills: [
      {
        prompt: "두 숫자를 받아 더한 값을 반환하는 add 메서드를 만들어보세요.",
        answer: `
public static int add(int a, int b) {
    return a + b;
}
        `
      }
    ]
  },
  {
    id: "js5_oop_class",
    course: "javaSpring",
    part: "Java Part 3. 객체지향 기본",
    title: "5. 클래스와 객체: 역할별로 코드 나누기",
    tags: ["java", "oop"],
    type: "info",
    summary: "객체지향의 출발점인 클래스, 객체, 필드, 메서드를 쇼핑몰 예제로 이해합니다.",
    goal: "클래스는 설계도, 객체는 설계도로 만든 실제 물건이라는 감각을 잡습니다.",
    analogy: "클래스는 붕어빵 틀이고 객체는 실제 붕어빵입니다. 같은 틀로 만들었지만 각각의 붕어빵은 팥의 양이나 상태가 다를 수 있습니다.",
    studyHint: "객체지향은 한 번에 이해하려고 하면 어렵습니다. 먼저 '데이터와 기능을 한 덩어리로 묶는다'는 정도로 시작하세요.",
    sections: [
      {
        title: "왜 클래스를 쓰나",
        body: [
          p("회원 이름, 이메일, 나이를 따로따로 변수로 들고 다니면 코드가 금방 어지러워집니다. Member 클래스로 묶으면 회원이라는 개념을 코드로 표현할 수 있습니다."),
          p("객체는 상태와 행동을 함께 가질 수 있습니다. 예를 들어 Order 객체는 주문 금액이라는 상태와 cancel()이라는 행동을 가질 수 있습니다.")
        ]
      },
      {
        title: "필드와 메서드",
        body: [
          table(["구성요소", "뜻", "예시"], [
            ["필드", "객체가 기억하는 값", "name, price, quantity"],
            ["메서드", "객체가 할 수 있는 행동", "changeName(), calculateTotal()"],
            ["생성자", "객체가 처음 만들어질 때 필요한 초기화", "new Member(\"kim\")"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "상품 객체 만들기",
        desc: "상품 이름과 가격을 하나의 객체로 묶습니다.",
        sql: `
public class Product {
    String name;
    int price;

    public Product(String name, int price) {
        this.name = name;
        this.price = price;
    }

    public void printInfo() {
        System.out.println(name + " : " + price + "원");
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "Member 클래스를 만들고 name, email 필드와 printInfo 메서드를 작성해보세요.",
        answer: `
public class Member {
    String name;
    String email;

    public Member(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public void printInfo() {
        System.out.println(name + " / " + email);
    }
}
        `
      }
    ]
  },
  {
    id: "js6_oop_design",
    course: "javaSpring",
    part: "Java Part 3. 객체지향 기본",
    title: "6. 캡슐화, 상속, 다형성",
    tags: ["java", "oop"],
    type: "info",
    summary: "객체지향에서 가장 중요한 캡슐화와 다형성을 쉬운 예제로 익힙니다.",
    goal: "다형성이 Spring의 핵심 원리인 DI와 왜 연결되는지 이해할 준비를 합니다.",
    analogy: "캡슐화는 리모컨 내부 회로를 숨기고 버튼만 제공하는 것입니다. 다형성은 같은 결제 버튼을 눌러도 카드 결제, 카카오페이 결제처럼 실제 방식이 달라질 수 있는 구조입니다.",
    studyHint: "상속 자체보다 다형성이 더 중요합니다. 부모 타입으로 자식 구현체를 갈아끼울 수 있다는 점이 Spring을 이해하는 핵심 다리입니다.",
    sections: [
      {
        title: "캡슐화",
        body: [
          p("객체의 필드를 모두 public으로 열어두면 아무 곳에서나 값을 망가뜨릴 수 있습니다. 필드는 private으로 숨기고, 필요한 기능만 메서드로 공개하는 습관을 들이면 안전한 코드를 만들 수 있습니다.")
        ]
      },
      {
        title: "다형성",
        body: [
          p("다형성은 역할과 구현을 분리하는 힘입니다. Payment 인터페이스는 '결제한다'는 역할만 말하고, CardPayment와 PointPayment가 실제 결제 방식을 구현합니다."),
          callout("tip", "Spring으로 이어지는 핵심", "Spring의 DI는 결국 인터페이스 역할에 실제 구현 객체를 넣어주는 구조입니다. 그래서 Java 다형성을 알면 Spring 핵심 원리가 훨씬 잘 보입니다.")
        ]
      }
    ],
    examples: [
      {
        title: "결제 인터페이스와 구현체",
        desc: "같은 pay() 호출이 다른 구현으로 동작합니다.",
        sql: `
interface Payment {
    void pay(int amount);
}

class CardPayment implements Payment {
    public void pay(int amount) {
        System.out.println("카드로 " + amount + "원 결제");
    }
}

class PointPayment implements Payment {
    public void pay(int amount) {
        System.out.println("포인트로 " + amount + "원 결제");
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "다형성을 쓰면 어떤 장점이 있나요?",
        answer: "클라이언트 코드는 Payment 같은 역할에만 의존하고, 실제 구현은 CardPayment나 PointPayment로 바꿀 수 있어 변경에 강한 구조를 만들 수 있습니다."
      }
    ]
  },
  {
    id: "js7_collections_generics",
    course: "javaSpring",
    part: "Java Part 4. 중급 문법",
    title: "7. 컬렉션과 제네릭: List, Set, Map",
    tags: ["java", "advanced"],
    type: "info",
    summary: "실무에서 매일 쓰는 List, Set, Map과 타입 안정성을 주는 제네릭을 다룹니다.",
    goal: "목록, 중복 없는 집합, key-value 저장소를 상황에 맞게 고를 수 있습니다.",
    analogy: "List는 줄 서 있는 대기열, Set은 중복 없는 출입 명단, Map은 사전처럼 key로 value를 찾는 구조입니다.",
    studyHint: "컬렉션은 외우는 과목이 아니라 상황에 맞는 상자를 고르는 과목입니다. 순서가 중요한지, 중복을 허용하는지, 이름표로 찾아야 하는지를 먼저 보세요.",
    sections: [
      {
        title: "컬렉션 선택 기준",
        body: [
          table(["자료구조", "특징", "예시"], [
            ["List", "순서 있음, 중복 허용", "주문 목록, 댓글 목록"],
            ["Set", "중복 제거", "좋아요를 누른 회원 id 목록"],
            ["Map", "key로 value 조회", "상품 id -> 상품 정보"]
          ])
        ]
      },
      {
        title: "제네릭",
        body: [
          p("<code>List&lt;String&gt;</code>처럼 꺾쇠 안에 타입을 쓰면 이 List에는 String만 담겠다는 뜻입니다. 제네릭을 쓰면 잘못된 타입을 넣는 실수를 컴파일 단계에서 막을 수 있습니다.")
        ]
      }
    ],
    examples: [
      {
        title: "상품 이름 목록",
        desc: "ArrayList에 값을 넣고 반복합니다.",
        sql: `
List<String> products = new ArrayList<>();
products.add("Keyboard");
products.add("Mouse");

for (String product : products) {
    System.out.println(product);
}
        `
      },
      {
        title: "상품 id로 가격 찾기",
        desc: "Map은 key를 통해 value를 빠르게 찾습니다.",
        sql: `
Map<Long, Integer> priceMap = new HashMap<>();
priceMap.put(1L, 12000);
priceMap.put(2L, 30000);

System.out.println(priceMap.get(1L));
        `
      }
    ],
    drills: [
      {
        prompt: "회원 id 중복을 제거하려면 List, Set, Map 중 무엇이 어울리나요?",
        answer: "Set이 어울립니다. Set은 같은 값을 중복해서 저장하지 않습니다."
      }
    ]
  },
  {
    id: "js8_exceptions",
    course: "javaSpring",
    part: "Java Part 4. 중급 문법",
    title: "8. 예외 처리: 실패를 프로그램의 일부로 다루기",
    tags: ["java", "backend"],
    type: "info",
    summary: "try-catch, checked/unchecked exception, 예외 메시지 설계를 배웁니다.",
    goal: "오류를 무조건 숨기지 않고, 필요한 위치에서 의미 있게 처리하는 감각을 익힙니다.",
    analogy: "예외 처리는 화재 경보기입니다. 경보를 꺼버리는 것이 목적이 아니라 어디서 문제가 났고 어떻게 대피할지 알려주는 것이 목적입니다.",
    studyHint: "catch에서 아무것도 하지 않는 코드는 초보자에게 특히 위험합니다. 에러가 사라진 것이 아니라 보이지 않게 숨어버린 것입니다.",
    sections: [
      {
        title: "예외가 필요한 이유",
        body: [
          p("파일이 없거나, 숫자로 바꿀 수 없는 문자열이 들어오거나, DB 연결이 끊기는 일은 실제 서비스에서 자주 일어납니다. 예외는 이런 실패 상황을 코드로 표현하는 방법입니다."),
          p("Spring에서도 예외 처리는 중요합니다. 컨트롤러에서 잘못된 요청을 받았을 때 400 응답을 보내거나, 없는 데이터를 조회했을 때 404 응답을 보내는 구조로 이어집니다.")
        ]
      }
    ],
    examples: [
      {
        title: "숫자 변환 예외 처리",
        desc: "문자열을 숫자로 바꾸는 과정에서 실패할 수 있습니다.",
        sql: `
try {
    int value = Integer.parseInt("abc");
    System.out.println(value);
} catch (NumberFormatException e) {
    System.out.println("숫자로 바꿀 수 없는 값입니다.");
}
        `
      }
    ],
    drills: [
      {
        prompt: "catch 블록을 비워두면 왜 위험한가요?",
        answer: "문제가 발생했는데도 아무 기록이나 대응 없이 넘어가므로 나중에 장애 원인을 찾기 어려워집니다."
      }
    ]
  },
  {
    id: "js9_threads_io_lambda",
    course: "javaSpring",
    part: "Java Part 5. 고급 기본기",
    title: "9. 스레드, I/O, 람다와 스트림 큰 그림",
    tags: ["java", "advanced"],
    type: "info",
    summary: "Java 고급 로드맵의 핵심인 동시성, 입출력, 람다/스트림을 초보자에게 필요한 수준으로 연결합니다.",
    goal: "각 기술을 왜 배우는지 알고, Spring 서버와 어떤 관련이 있는지 이해합니다.",
    analogy: "스레드는 여러 직원이 동시에 일하는 것이고, I/O는 외부와 물건을 주고받는 창구이며, 스트림은 컨베이어 벨트 위 데이터를 차례대로 가공하는 방식입니다.",
    studyHint: "고급 문법은 처음부터 깊게 파면 지칩니다. 백엔드 입문 단계에서는 '왜 존재하는지'와 '어떤 위험이 있는지'를 먼저 잡고, 나중에 다시 깊게 들어가면 됩니다.",
    sections: [
      {
        title: "스레드와 동시성",
        body: [
          p("웹 서버는 여러 사용자의 요청을 동시에 처리해야 합니다. 이때 스레드 개념이 등장합니다. 동시에 실행되는 코드가 같은 값을 함께 바꾸면 예상하지 못한 문제가 생길 수 있는데, 이것이 동시성 문제입니다.")
        ]
      },
      {
        title: "I/O와 네트워크",
        body: [
          p("파일을 읽고 쓰거나, 다른 서버와 통신하거나, 사용자의 요청을 받는 일은 모두 I/O와 연결됩니다. Spring Boot에서는 많은 부분을 감춰주지만, 내부적으로는 이런 입출력 위에서 동작합니다.")
        ]
      },
      {
        title: "람다와 스트림",
        body: [
          p("람다는 함수를 값처럼 전달하는 문법이고, 스트림은 컬렉션 데이터를 필터링하고 변환하고 집계하는 도구입니다. Java 백엔드 코드에서 목록 처리 로직을 읽기 좋게 만드는 데 자주 쓰입니다.")
        ]
      }
    ],
    examples: [
      {
        title: "스트림으로 비싼 상품만 고르기",
        desc: "List에서 조건에 맞는 데이터만 걸러냅니다.",
        sql: `
List<Integer> prices = List.of(10000, 50000, 9000, 120000);

List<Integer> expensive = prices.stream()
        .filter(price -> price >= 50000)
        .toList();

System.out.println(expensive);
        `
      }
    ],
    drills: [
      {
        prompt: "여러 요청이 동시에 같은 재고 값을 줄이면 어떤 문제가 생길 수 있나요?",
        answer: "동시에 같은 값을 읽고 수정하면서 재고가 잘못 계산될 수 있습니다. 이런 문제를 동시성 문제라고 합니다."
      }
    ]
  },
  {
    id: "js10_spring_intro",
    course: "javaSpring",
    part: "Spring Part 1. Spring Boot 입문",
    title: "10. Spring Boot 첫 프로젝트와 웹 동작 방식",
    tags: ["spring", "boot", "backend"],
    type: "info",
    summary: "Spring Initializr로 프로젝트를 만들고, Controller가 HTTP 요청을 받는 흐름을 배웁니다.",
    goal: "브라우저 요청이 Controller 메서드까지 도착하고 문자열/JSON으로 응답되는 과정을 이해합니다.",
    analogy: "Spring Boot 애플리케이션은 식당이고 Controller는 주문을 받는 카운터입니다. 사용자가 URL로 주문서를 보내면 Controller가 어떤 응답을 줄지 결정합니다.",
    studyHint: "처음 Spring을 볼 때 어노테이션이 낯섭니다. 어노테이션은 Spring에게 '이 클래스는 이런 역할이야'라고 붙이는 이름표라고 생각하세요.",
    sections: [
      {
        title: "프로젝트 만들기",
        body: [
          p("Spring Initializr에서 Gradle, Java, Spring Boot, Java 21 또는 17을 선택하고 Web 의존성을 추가합니다. 압축을 풀고 IntelliJ에서 열면 기본 프로젝트가 준비됩니다."),
          code(`
./gradlew bootRun

# Windows
gradlew.bat bootRun
          `),
          p("서버가 실행되면 브라우저에서 <code>http://localhost:8080</code>으로 접근할 수 있습니다.")
        ]
      },
      {
        title: "Controller와 응답",
        body: [
          p("<code>@Controller</code>나 <code>@RestController</code>는 이 클래스가 웹 요청을 처리한다는 표시입니다. <code>@GetMapping</code>은 GET 요청의 주소를 메서드와 연결합니다.")
        ]
      }
    ],
    examples: [
      {
        title: "첫 REST Controller",
        desc: "/hello로 요청하면 문자열을 반환합니다.",
        sql: `
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "hello spring";
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "@GetMapping(\"/hello\")의 의미는 무엇인가요?",
        answer: "GET 방식으로 /hello 주소에 요청이 들어오면 해당 메서드를 실행하라는 뜻입니다."
      }
    ]
  },
  {
    id: "js11_spring_core",
    course: "javaSpring",
    part: "Spring Part 2. 핵심 원리",
    title: "11. IoC, DI, Spring Bean",
    tags: ["spring", "oop", "backend"],
    type: "info",
    summary: "Spring 핵심 원리의 중심인 제어의 역전, 의존관계 주입, Bean을 객체지향 관점에서 이해합니다.",
    goal: "new로 직접 만들던 객체를 Spring 컨테이너가 대신 만들고 연결해주는 이유를 이해합니다.",
    analogy: "DI는 조립 공장과 같습니다. 자동차 부품이 서로 직접 만들지 않고, 공장이 필요한 부품을 조립해 완성차로 만들어 줍니다.",
    studyHint: "Spring은 마법이 아니라 객체 생성과 연결을 대신 해주는 도구입니다. 객체지향의 역할과 구현 분리를 편하게 적용하도록 도와준다고 보면 됩니다.",
    sections: [
      {
        title: "직접 생성의 문제",
        body: [
          p("서비스 코드 안에서 <code>new MemoryMemberRepository()</code>를 직접 호출하면 구현체를 바꾸기 어렵습니다. 나중에 DBMemberRepository로 바꾸려면 여러 코드를 수정해야 합니다."),
          p("Spring은 객체를 Bean으로 등록하고 필요한 곳에 주입합니다. 덕분에 코드는 인터페이스에 의존하고 실제 구현은 설정으로 바꿀 수 있습니다.")
        ]
      },
      {
        title: "Bean 등록 방식",
        body: [
          ul([
            "<code>@Component</code>: 클래스를 자동으로 Bean 등록합니다.",
            "<code>@Service</code>: 비즈니스 로직을 담당하는 Bean이라는 의미를 더합니다.",
            "<code>@Repository</code>: DB 접근 Bean이라는 의미를 더하고 예외 변환에도 관여합니다.",
            "<code>@Configuration</code> + <code>@Bean</code>: 직접 생성 로직을 작성해 Bean으로 등록합니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "생성자 주입",
        desc: "필요한 객체를 생성자로 받으면 테스트와 변경에 강해집니다.",
        sql: `
@Service
public class OrderService {
    private final MemberRepository memberRepository;

    public OrderService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "생성자 주입을 권장하는 이유를 적어보세요.",
        answer: "필수 의존성을 누락하기 어렵고, 객체 생성 후 의존성이 바뀌지 않으며, 테스트에서 가짜 객체를 넣기 쉽습니다."
      }
    ]
  },
  {
    id: "js12_http",
    course: "javaSpring",
    part: "Spring Part 3. HTTP와 웹 기본",
    title: "12. HTTP 기본: 요청, 응답, 메서드, 상태코드",
    tags: ["http", "backend", "spring"],
    type: "info",
    summary: "Spring MVC를 배우기 전에 꼭 필요한 HTTP 요청/응답 구조를 정리합니다.",
    goal: "GET, POST, PUT, PATCH, DELETE와 2xx/3xx/4xx/5xx 상태코드의 의미를 구분합니다.",
    analogy: "HTTP는 웹에서 쓰는 택배 송장 규칙입니다. 요청은 주문서, 응답은 배송 결과, 상태코드는 배송 상태 안내 문구입니다.",
    studyHint: "Spring 코드를 잘 짜도 HTTP를 모르면 API 설계가 흔들립니다. URL, 메서드, 상태코드만 제대로 잡아도 백엔드 감각이 크게 좋아집니다.",
    sections: [
      {
        title: "HTTP 메서드",
        body: [
          table(["메서드", "의미", "예시"], [
            ["GET", "조회", "상품 목록 조회"],
            ["POST", "등록 또는 처리 요청", "주문 생성"],
            ["PUT", "전체 수정 또는 대체", "회원 정보 전체 수정"],
            ["PATCH", "부분 수정", "배송지 일부 수정"],
            ["DELETE", "삭제", "장바구니 상품 삭제"]
          ])
        ]
      },
      {
        title: "상태코드",
        body: [
          table(["범위", "뜻", "예시"], [
            ["2xx", "성공", "200 OK, 201 Created"],
            ["3xx", "리다이렉션", "302 Found"],
            ["4xx", "클라이언트 요청 오류", "400 Bad Request, 404 Not Found"],
            ["5xx", "서버 오류", "500 Internal Server Error"]
          ])
        ]
      }
    ],
    examples: [
      {
        title: "상품 API 주소 설계",
        desc: "같은 /products라도 메서드에 따라 의미가 달라집니다.",
        sql: `
GET    /products       // 상품 목록 조회
GET    /products/1     // 1번 상품 조회
POST   /products       // 상품 등록
PATCH  /products/1     // 1번 상품 일부 수정
DELETE /products/1     // 1번 상품 삭제
        `
      }
    ],
    drills: [
      {
        prompt: "없는 상품 id를 조회하면 어떤 상태코드가 어울리나요?",
        answer: "404 Not Found가 어울립니다. 요청한 자원을 찾을 수 없다는 뜻입니다."
      }
    ]
  },
  {
    id: "js13_mvc",
    course: "javaSpring",
    part: "Spring Part 4. MVC와 API",
    title: "13. Spring MVC: Controller, Service, Repository",
    tags: ["spring", "mvc", "backend"],
    type: "info",
    summary: "백엔드 코드를 계층별로 나누는 기본 구조를 Todo API 예제로 학습합니다.",
    goal: "Controller, Service, Repository의 책임을 구분하고 작은 REST API를 설계할 수 있습니다.",
    analogy: "Controller는 카운터 직원, Service는 주방장, Repository는 창고 담당자입니다. 카운터가 모든 일을 직접 하면 식당이 금방 엉망이 됩니다.",
    studyHint: "처음에는 파일이 많아져서 복잡해 보이지만, 책임을 나누는 연습입니다. 어디에 어떤 코드를 둬야 하는지 계속 의식하세요.",
    sections: [
      {
        title: "계층을 나누는 이유",
        body: [
          ul([
            "<strong>Controller</strong>: HTTP 요청/응답을 처리합니다.",
            "<strong>Service</strong>: 핵심 비즈니스 규칙을 처리합니다.",
            "<strong>Repository</strong>: 데이터 저장소와 통신합니다.",
            "<strong>DTO</strong>: API 요청/응답에 사용할 데이터 모양을 정의합니다."
          ]),
          p("예를 들어 Todo 완료 처리는 Controller가 요청을 받고, Service가 완료 가능 여부를 판단하고, Repository가 실제 데이터를 저장합니다.")
        ]
      }
    ],
    examples: [
      {
        title: "Todo Controller",
        desc: "Service를 호출해 목록을 반환합니다.",
        sql: `
@RestController
@RequestMapping("/todos")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<TodoResponse> findAll() {
        return todoService.findAll();
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "비즈니스 규칙은 Controller와 Service 중 어디에 두는 것이 좋나요?",
        answer: "Service에 두는 것이 좋습니다. Controller는 HTTP 요청과 응답을 다루는 역할에 집중하는 편이 유지보수에 좋습니다."
      }
    ]
  },
  {
    id: "js14_validation_exception",
    course: "javaSpring",
    part: "Spring Part 4. MVC와 API",
    title: "14. 검증과 예외 처리",
    tags: ["spring", "mvc", "backend"],
    type: "info",
    summary: "잘못된 요청을 검증하고, 예외를 일관된 API 응답으로 바꾸는 방법을 배웁니다.",
    goal: "Bean Validation과 @ControllerAdvice의 역할을 이해합니다.",
    analogy: "검증은 입구 보안 검색대이고, 예외 처리는 문제가 생겼을 때 손님에게 같은 형식으로 안내하는 고객센터입니다.",
    studyHint: "초보자는 정상 흐름만 만들기 쉽지만 실무 API는 실패 응답이 더 중요할 때가 많습니다. 실패도 설계 대상입니다.",
    sections: [
      {
        title: "입력값 검증",
        body: [
          p("회원 가입에서 이메일이 비어 있거나 비밀번호가 너무 짧으면 DB에 저장하기 전에 막아야 합니다. Spring에서는 Bean Validation으로 요청 DTO에 검증 규칙을 붙일 수 있습니다.")
        ]
      },
      {
        title: "전역 예외 처리",
        body: [
          p("<code>@ControllerAdvice</code>는 여러 Controller에서 발생하는 예외를 한 곳에서 처리할 수 있게 해줍니다. API 응답 형식을 일정하게 유지하는 데 유용합니다.")
        ]
      }
    ],
    examples: [
      {
        title: "요청 DTO 검증",
        desc: "이름은 비어 있으면 안 되고, 가격은 0보다 커야 합니다.",
        sql: `
public record ProductCreateRequest(
        @NotBlank String name,
        @Positive int price
) {
}

@PostMapping("/products")
public ProductResponse create(@Valid @RequestBody ProductCreateRequest request) {
    return productService.create(request);
}
        `
      }
    ],
    drills: [
      {
        prompt: "검증을 하지 않고 잘못된 데이터를 DB에 저장하면 어떤 문제가 생길 수 있나요?",
        answer: "나중에 조회나 계산 로직에서 오류가 나거나, 데이터 정합성이 깨져 원인을 찾기 어려워질 수 있습니다."
      }
    ]
  },
  {
    id: "js15_db_jdbc",
    course: "javaSpring",
    part: "Spring Part 5. DB 접근",
    title: "15. JDBC, DataSource, JdbcTemplate",
    tags: ["spring", "db", "backend"],
    type: "info",
    summary: "Spring DB 로드맵의 출발점인 JDBC와 커넥션, JdbcTemplate의 필요성을 이해합니다.",
    goal: "DB 연결과 SQL 실행 과정이 어떻게 편해지는지 단계적으로 이해합니다.",
    analogy: "JDBC는 DB와 대화하는 가장 기본 전화기이고, DataSource는 전화 회선을 빌려주는 창구, JdbcTemplate은 반복 통화를 대신 정리해주는 비서입니다.",
    studyHint: "JPA를 쓰더라도 JDBC와 트랜잭션 기본을 알면 문제가 생겼을 때 훨씬 잘 디버깅할 수 있습니다.",
    sections: [
      {
        title: "왜 JDBC부터 배우나",
        body: [
          p("JPA나 Spring Data JPA는 편리하지만 내부적으로는 결국 DB와 연결하고 SQL을 실행합니다. JDBC 흐름을 알면 추상화 뒤에서 어떤 일이 일어나는지 이해할 수 있습니다."),
          ul([
            "Connection을 얻습니다.",
            "SQL을 준비합니다.",
            "파라미터를 넣고 실행합니다.",
            "결과를 객체로 바꿉니다.",
            "자원을 정리합니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "JdbcTemplate 조회",
        desc: "반복되는 JDBC 코드를 줄여줍니다.",
        sql: `
public List<Member> findAll() {
    return jdbcTemplate.query(
            "select id, name from member",
            (rs, rowNum) -> new Member(rs.getLong("id"), rs.getString("name"))
    );
}
        `
      }
    ],
    drills: [
      {
        prompt: "JdbcTemplate이 줄여주는 반복 작업은 무엇인가요?",
        answer: "커넥션 획득, SQL 실행, 예외 처리, 자원 정리 같은 반복 작업을 줄여줍니다."
      }
    ]
  },
  {
    id: "js16_transaction",
    course: "javaSpring",
    part: "Spring Part 5. DB 접근",
    title: "16. 트랜잭션: 모두 성공하거나 모두 실패하기",
    tags: ["spring", "db", "backend"],
    type: "info",
    summary: "트랜잭션의 ACID, @Transactional, 커밋과 롤백을 주문 예제로 이해합니다.",
    goal: "여러 DB 작업을 하나의 작업 단위로 묶어야 하는 이유를 설명할 수 있습니다.",
    analogy: "트랜잭션은 은행 송금의 안전장치입니다. 내 계좌에서 돈은 빠졌는데 상대 계좌에 입금되지 않으면 안 되므로 둘 다 성공하거나 둘 다 취소되어야 합니다.",
    studyHint: "DB 공부에서 트랜잭션은 정말 중요합니다. Spring에서 @Transactional 하나로 편해 보이지만, 그 뒤에는 커밋/롤백과 커넥션 관리가 숨어 있습니다.",
    sections: [
      {
        title: "주문 생성 예시",
        body: [
          p("주문을 생성할 때 주문 저장, 결제 저장, 재고 감소가 함께 일어납니다. 중간에 결제 저장이 실패했는데 주문만 저장되면 데이터가 꼬입니다. 그래서 이 작업들을 하나의 트랜잭션으로 묶습니다.")
        ]
      },
      {
        title: "@Transactional",
        body: [
          p("<code>@Transactional</code>을 Service 메서드에 붙이면 메서드 시작 전에 트랜잭션을 열고, 정상 종료되면 커밋, 예외가 발생하면 롤백합니다.")
        ]
      }
    ],
    examples: [
      {
        title: "주문 생성 트랜잭션",
        desc: "중간에 실패하면 전체 작업이 롤백됩니다.",
        sql: `
@Transactional
public Long createOrder(OrderCreateRequest request) {
    Order order = orderRepository.save(new Order(request.memberId()));
    paymentRepository.save(new Payment(order.getId(), request.price()));
    stockService.decrease(request.productId(), request.quantity());
    return order.getId();
}
        `
      }
    ],
    drills: [
      {
        prompt: "주문 저장은 성공했는데 결제 저장이 실패하면 어떻게 되어야 하나요?",
        answer: "주문 저장도 함께 롤백되어야 데이터가 일관되게 유지됩니다."
      }
    ]
  },
  {
    id: "js17_jpa_basic",
    course: "javaSpring",
    part: "Spring Part 6. JPA 입문",
    title: "17. JPA와 엔티티: 객체와 테이블 연결하기",
    tags: ["spring", "jpa", "db"],
    type: "info",
    summary: "JPA가 왜 필요한지, Entity, EntityManager, 영속성 컨텍스트의 큰 그림을 배웁니다.",
    goal: "객체를 저장하면 DB 테이블에 반영되는 ORM의 기본 감각을 익힙니다.",
    analogy: "JPA는 객체 세계와 관계형 DB 세계 사이의 통역사입니다. Java 객체 말투를 DB 테이블 말투로 바꿔 줍니다.",
    studyHint: "JPA는 편리하지만 SQL을 몰라도 된다는 뜻은 아닙니다. 객체와 테이블 사이의 차이를 이해할수록 JPA를 더 안전하게 쓸 수 있습니다.",
    sections: [
      {
        title: "JPA가 해결하려는 문제",
        body: [
          p("객체는 참조로 연결되고, DB는 외래키로 연결됩니다. 객체는 상속과 메서드를 갖지만 테이블은 행과 열로 표현됩니다. JPA는 이 차이를 줄여주기 위해 등장했습니다."),
          p("Entity는 DB 테이블과 연결되는 객체입니다. Repository를 통해 Entity를 저장하고 조회하면 JPA가 SQL을 만들어 실행합니다.")
        ]
      }
    ],
    examples: [
      {
        title: "Member 엔티티",
        desc: "DB member 테이블과 연결되는 객체입니다.",
        sql: `
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    protected Member() {
    }

    public Member(String name) {
        this.name = name;
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "JPA를 써도 SQL 지식이 필요한 이유는 무엇인가요?",
        answer: "JPA가 결국 SQL을 만들어 DB에 실행하므로 성능 문제나 쿼리 동작을 이해하려면 SQL 지식이 필요합니다."
      }
    ]
  },
  {
    id: "js18_spring_data_jpa",
    course: "javaSpring",
    part: "Spring Part 6. JPA 입문",
    title: "18. Spring Data JPA와 Repository",
    tags: ["spring", "jpa", "db"],
    type: "info",
    summary: "반복적인 CRUD Repository 코드를 줄여주는 Spring Data JPA를 배웁니다.",
    goal: "JpaRepository를 상속하면 기본 저장/조회/삭제 기능이 제공되는 이유와 사용법을 이해합니다.",
    analogy: "Spring Data JPA는 기본 사무 업무를 자동으로 처리하는 직원입니다. 단순 저장, 조회, 삭제 같은 반복 업무를 대신 맡아줍니다.",
    studyHint: "편리함에만 기대지 말고 메서드 이름으로 만들어지는 쿼리가 어떤 SQL로 이어질지 상상하는 습관을 들이세요.",
    sections: [
      {
        title: "Repository 인터페이스",
        body: [
          p("Spring Data JPA에서는 인터페이스만 만들어도 기본 구현체를 Spring이 자동으로 만들어 줍니다. 그래서 단순 CRUD 코드를 직접 작성하지 않아도 됩니다."),
          p("메서드 이름을 규칙에 맞게 만들면 조건 조회도 가능합니다. 예를 들어 <code>findByName</code>은 name 조건으로 조회하는 쿼리를 만듭니다.")
        ]
      }
    ],
    examples: [
      {
        title: "JpaRepository",
        desc: "Member 저장소를 인터페이스만으로 만듭니다.",
        sql: `
public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByName(String name);
}
        `
      }
    ],
    drills: [
      {
        prompt: "JpaRepository<Member, Long>에서 Long은 무엇을 뜻하나요?",
        answer: "Member 엔티티의 id 타입을 뜻합니다."
      }
    ]
  },
  {
    id: "js19_aop_advanced",
    course: "javaSpring",
    part: "Spring Part 7. 고급 원리",
    title: "19. 프록시, AOP, ThreadLocal 큰 그림",
    tags: ["spring", "advanced", "backend"],
    type: "info",
    summary: "Spring 고급편의 핵심인 프록시, AOP, ThreadLocal을 입문자가 이해할 수 있는 수준으로 정리합니다.",
    goal: "공통 관심사와 핵심 관심사를 분리하는 이유를 이해합니다.",
    analogy: "AOP는 공연장 입구의 안내 직원입니다. 배우가 연기에 집중하도록 티켓 확인, 입장 안내 같은 공통 작업을 무대 밖에서 처리합니다.",
    studyHint: "고급 원리는 처음부터 구현 세부를 다 외우지 않아도 됩니다. '왜 필요한가'를 먼저 잡고, 로그 추적이나 트랜잭션 같은 실제 사례와 연결하세요.",
    sections: [
      {
        title: "공통 관심사",
        body: [
          p("모든 Service 메서드마다 실행 시간을 측정하거나 로그를 남기고 싶다면 매번 코드를 복사하게 됩니다. AOP는 이런 공통 관심사를 한 곳에 모아 적용할 수 있게 합니다."),
          p("Spring의 @Transactional도 프록시와 AOP 원리를 활용합니다. 그래서 고급 원리를 알면 Spring이 왜 특정 상황에서 동작하지 않는지 이해할 수 있습니다.")
        ]
      },
      {
        title: "ThreadLocal 주의",
        body: [
          p("ThreadLocal은 같은 스레드 안에서 값을 보관하는 도구입니다. 로그 추적 같은 곳에 쓰일 수 있지만, 사용 후 정리하지 않으면 다른 요청에 값이 섞일 수 있어 주의해야 합니다.")
        ]
      }
    ],
    examples: [
      {
        title: "실행 시간 측정 AOP",
        desc: "여러 메서드에 공통으로 시간을 측정합니다.",
        sql: `
@Aspect
@Component
public class TimeTraceAspect {
    @Around("execution(* hello..*(..))")
    public Object trace(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return joinPoint.proceed();
        } finally {
            long time = System.currentTimeMillis() - start;
            System.out.println(joinPoint.getSignature() + " " + time + "ms");
        }
    }
}
        `
      }
    ],
    drills: [
      {
        prompt: "AOP가 어울리는 작업 예시를 3개 적어보세요.",
        answer: "로그 기록, 실행 시간 측정, 트랜잭션 처리, 권한 검사 같은 공통 관심사가 어울립니다."
      }
    ]
  },
  {
    id: "js20_boot_ops",
    course: "javaSpring",
    part: "Spring Part 8. Spring Boot 활용",
    title: "20. Spring Boot 핵심 기능과 운영 감각",
    tags: ["spring", "boot", "backend"],
    type: "info",
    summary: "자동 설정, 외부 설정, Actuator, 로깅, 프로필처럼 Spring Boot를 실무에서 쓰기 위한 기능을 정리합니다.",
    goal: "Spring Boot가 단순히 서버를 빨리 띄우는 도구가 아니라 운영까지 돕는 프레임워크임을 이해합니다.",
    analogy: "Spring Boot는 기본 전기, 수도, 환기, 보안 장치가 미리 갖춰진 건물입니다. 개발자는 모든 배관을 직접 설치하지 않고 비즈니스 기능에 집중할 수 있습니다.",
    studyHint: "Boot의 자동 설정은 편리하지만, 문제가 생겼을 때 '누가 이 Bean을 만들었는지'를 추적할 수 있어야 합니다. 자동 설정과 외부 설정은 실무에서 자주 마주칩니다.",
    sections: [
      {
        title: "자동 설정",
        body: [
          p("Spring Boot는 클래스패스에 있는 라이브러리와 설정을 보고 필요한 Bean을 자동으로 등록합니다. 예를 들어 spring-boot-starter-web을 추가하면 웹 서버와 MVC 관련 설정이 준비됩니다."),
          p("자동 설정 덕분에 시작은 빠르지만, 어떤 설정이 적용되었는지 이해하는 능력도 중요합니다.")
        ]
      },
      {
        title: "운영에 필요한 기능",
        body: [
          ul([
            "<strong>Profile</strong>: local, dev, prod 환경별 설정을 나눕니다.",
            "<strong>외부 설정</strong>: DB 주소, 비밀번호 같은 값을 코드 밖에서 주입합니다.",
            "<strong>Actuator</strong>: 애플리케이션 상태, 헬스 체크, 메트릭을 확인합니다.",
            "<strong>Logging</strong>: 장애 원인을 추적할 수 있게 기록을 남깁니다."
          ])
        ]
      }
    ],
    examples: [
      {
        title: "프로필별 설정",
        desc: "환경마다 다른 DB 주소를 사용할 수 있습니다.",
        sql: `
# application-local.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb

# application-prod.yml
spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/app
        `
      }
    ],
    drills: [
      {
        prompt: "local과 prod 설정을 나누는 이유는 무엇인가요?",
        answer: "개발 PC와 운영 서버는 DB 주소, 비밀번호, 로그 수준 등이 다르므로 환경별 설정을 분리해야 안전합니다."
      }
    ]
  },
  {
    id: "js21_project",
    course: "javaSpring",
    part: "Spring Part 9. 미니 프로젝트",
    title: "21. 미니 프로젝트: Todo API에서 주문 API까지",
    tags: ["java", "spring", "backend", "practice"],
    type: "info",
    summary: "지금까지 배운 Java와 Spring Boot 지식을 작은 프로젝트 흐름으로 연결합니다.",
    goal: "Todo API로 CRUD를 익히고, 주문 API로 계층 구조, 검증, 트랜잭션, JPA를 종합합니다.",
    analogy: "미니 프로젝트는 지금까지 배운 재료로 처음 직접 요리를 해보는 시간입니다. 문법 하나하나가 따로 놀지 않고 하나의 서비스 흐름으로 이어집니다.",
    studyHint: "처음 프로젝트는 화려할 필요가 없습니다. 작게 만들고, 동작을 확인하고, 한 기능씩 개선하는 경험이 가장 중요합니다.",
    sections: [
      {
        title: "1단계 Todo API",
        body: [
          ul([
            "Todo 생성: POST /todos",
            "Todo 목록 조회: GET /todos",
            "Todo 완료 처리: PATCH /todos/{id}/complete",
            "Todo 삭제: DELETE /todos/{id}"
          ]),
          p("처음에는 메모리 저장소로 시작하고, 그 다음 H2 DB와 JPA로 바꿔보세요. 저장소 구현이 바뀌어도 Service 코드가 크게 흔들리지 않게 만드는 것이 목표입니다.")
        ]
      },
      {
        title: "2단계 주문 API",
        body: [
          ul([
            "상품 등록과 조회",
            "회원 등록과 조회",
            "주문 생성",
            "주문 취소",
            "재고 감소와 트랜잭션 처리"
          ]),
          p("주문 API부터는 검증과 예외 처리, 트랜잭션이 중요해집니다. 재고가 부족한데 주문이 성공하면 안 되고, 결제 저장이 실패했는데 주문만 남아도 안 됩니다.")
        ]
      }
    ],
    examples: [
      {
        title: "Todo 생성 요청 DTO",
        desc: "API 입력값을 DTO로 분리합니다.",
        sql: `
public record TodoCreateRequest(
        @NotBlank String title
) {
}
        `
      },
      {
        title: "주문 생성 Service 뼈대",
        desc: "비즈니스 로직은 Service에 둡니다.",
        sql: `
@Transactional
public Long order(Long memberId, Long productId, int quantity) {
    Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("회원 없음"));
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new IllegalArgumentException("상품 없음"));

    product.decreaseStock(quantity);
    Order order = orderRepository.save(new Order(member, product, quantity));
    return order.getId();
}
        `
      }
    ],
    drills: [
      {
        prompt: "Todo API를 만들 때 Controller, Service, Repository에 각각 어떤 코드를 둘지 적어보세요.",
        answer: "Controller는 요청과 응답, Service는 Todo 생성/완료/삭제 규칙, Repository는 Todo 저장과 조회를 담당합니다."
      },
      {
        prompt: "주문 생성 기능에 트랜잭션이 필요한 이유를 설명해보세요.",
        answer: "주문 저장, 재고 감소, 결제 저장 같은 여러 작업이 함께 성공하거나 함께 실패해야 데이터가 일관되게 유지되기 때문입니다."
      }
    ],
    practiceGuide: "Todo API를 먼저 메모리 저장소로 만들고, 그 다음 JPA 저장소로 바꿔보세요. 이후 상품/회원/주문 API를 추가하면 Spring Boot 백엔드의 기본 흐름을 한 번에 복습할 수 있습니다."
  }
];

function makeJavaSpringChapter(item) {
  const isSpring = item.kind === "spring";
  const title = `${item.no}. ${item.title}`;
  const defaultJavaCode = `
public class Practice${String(item.no).padStart(2, "0")} {
    public static void main(String[] args) {
        System.out.println("${item.title}");
    }
}
  `;
  const defaultSpringCode = `
@RestController
@RequestMapping("/practice")
public class PracticeController {

    @GetMapping("/${item.id.replaceAll("_", "-")}")
    public String practice() {
        return "${item.title}";
    }
}
  `;

  return {
    id: item.id,
    course: "javaSpring",
    part: item.part,
    title,
    tags: item.tags,
    type: "info",
    summary: item.summary,
    goal: item.goal,
    analogy: item.analogy,
    studyHint: item.studyHint || "처음에는 모든 용어를 외우려 하지 말고, 예제를 실행한 뒤 왜 그런 결과가 나오는지 말로 설명해보세요. 설명할 수 있는 만큼이 진짜 이해한 범위입니다.",
    sections: [
      {
        title: "왜 배우나요?",
        body: [
          p(item.why),
          callout("tip", "처음 보는 사람용 비유", item.analogy)
        ]
      },
      {
        title: "핵심 개념을 천천히 풀어보기",
        body: [
          ul(item.concepts.map(concept => `<strong>${concept[0]}</strong>: ${concept[1]}`)),
          p(item.detail || "이 장은 단어를 암기하는 장이 아니라, 코드가 실행될 때 어떤 값이 어디서 만들어지고 어디로 이동하는지 추적하는 장입니다. 예제를 실행한 뒤 각 줄 옆에 '이 줄은 무엇을 준비하는가', '이 줄은 무엇을 바꾸는가'를 적어보세요.")
        ]
      },
      {
        title: "처음 하는 사람용 실습 흐름",
        body: [
          ol(item.steps),
          p(isSpring
            ? "Spring 장에서는 항상 요청이 들어오는 입구인 Controller부터 보고, 그 다음 Service, Repository, DB로 내려가는 흐름을 그려보세요. 파일이 많아도 흐름을 그리면 길을 잃지 않습니다."
            : "Java 장에서는 실행 시작점인 main 메서드부터 한 줄씩 따라가세요. 값이 바뀌는 순간마다 종이에 변수 이름과 현재 값을 적으면 디버깅 감각이 빨리 붙습니다.")
        ]
      },
      {
        title: "흔한 실수와 점검 기준",
        body: [
          ul(item.pitfalls),
          callout("warning", "막혔을 때 보는 순서", "코드 전체를 다시 쓰기 전에 1. 파일 위치, 2. 클래스 이름, 3. 괄호와 세미콜론, 4. import, 5. 실행한 URL 또는 main 메서드를 차례대로 확인하세요.")
        ]
      }
    ],
    examples: [
      {
        title: item.exampleTitle || `${item.title} 최소 예제`,
        desc: item.exampleDesc || "개념을 가장 작은 코드로 확인합니다. 먼저 그대로 실행하고, 그 다음 값 하나만 바꿔보세요.",
        sql: item.exampleCode || (isSpring ? defaultSpringCode : defaultJavaCode)
      }
    ],
    drills: item.drills || [
      {
        prompt: `${item.title}을 왜 배우는지 한 문장으로 설명해보세요.`,
        answer: item.goal
      },
      {
        prompt: "예제에서 가장 중요한 한 줄을 고르고 그 이유를 적어보세요.",
        answer: "정답은 하나가 아닙니다. 중요한 것은 해당 줄이 입력, 처리, 출력 중 어느 역할인지 설명하는 것입니다."
      }
    ]
  };
}

const expandedJavaTopics = [
  {
    no: 1,
    id: "java01_roadmap",
    kind: "java",
    part: "Java Part 1. 학습 준비와 큰 그림",
    title: "Java 백엔드 로드맵 큰 그림",
    tags: ["java", "backend"],
    summary: "Java 입문부터 Spring Boot 백엔드까지 어떤 순서로 공부해야 하는지 전체 지도를 잡습니다.",
    goal: "Java 문법, 객체지향, 컬렉션, 예외, 동시성, Spring Boot가 서로 어떻게 이어지는지 설명할 수 있습니다.",
    why: "처음부터 Spring Boot를 켜면 어노테이션, 객체, HTTP, DB가 한꺼번에 나와서 쉽게 지칩니다. 먼저 지도를 보면 지금 배우는 개념이 어디에 쓰이는지 알 수 있습니다.",
    analogy: "로드맵은 여행 지도입니다. 지금 당장 모든 길을 외우는 것이 아니라, 내가 어느 도시에서 출발해 어느 도시로 가는지 아는 것이 먼저입니다.",
    concepts: [["Java", "서버 로직을 작성하는 언어입니다."], ["객체지향", "큰 프로그램을 역할별 객체로 나누는 사고방식입니다."], ["Spring Boot", "Java 객체들을 웹 서버, DB, API와 연결해주는 프레임워크입니다."]],
    steps: ["Java로 작은 콘솔 프로그램을 실행합니다.", "클래스와 객체로 데이터를 묶어봅니다.", "컬렉션으로 여러 데이터를 다룹니다.", "Spring Boot로 HTTP 요청을 받는 API를 만듭니다."],
    pitfalls: ["처음부터 모든 로드맵을 암기하려고 하지 마세요.", "Spring 오류를 Java 문법 오류와 섞어서 보지 마세요."]
  },
  {
    no: 2,
    id: "java02_environment",
    kind: "java",
    part: "Java Part 1. 학습 준비와 큰 그림",
    title: "JDK, IntelliJ, Gradle 환경 세팅",
    tags: ["java", "backend"],
    summary: "Java 개발을 위한 JDK, IntelliJ, Gradle의 역할과 설치 후 확인 방법을 배웁니다.",
    goal: "java -version을 확인하고 IntelliJ에서 Gradle 프로젝트를 열 수 있습니다.",
    why: "환경 세팅이 흔들리면 코드가 맞아도 실행되지 않습니다. 초보자에게 환경 확인 루틴은 코딩만큼 중요합니다.",
    analogy: "JDK는 공구함, IntelliJ는 작업대, Gradle은 조립 설명서와 자동 포장 기계입니다.",
    concepts: [["JDK", "Java 코드를 컴파일하고 실행합니다."], ["IntelliJ", "코드를 작성하고 실행하는 개발 도구입니다."], ["Gradle", "라이브러리 설치, 빌드, 테스트 실행을 관리합니다."]],
    steps: ["JDK 21 또는 17을 설치합니다.", "터미널에서 java -version을 확인합니다.", "IntelliJ에서 새 Gradle 프로젝트를 만듭니다.", "main 메서드를 실행해 콘솔 출력을 확인합니다."],
    pitfalls: ["JRE와 JDK를 헷갈리지 마세요.", "프로젝트 폴더 밖에서 Gradle 명령을 실행하면 실패할 수 있습니다."],
    exampleCode: `
public class HelloEnvironment {
    public static void main(String[] args) {
        System.out.println(System.getProperty("java.version"));
    }
}
    `
  },
  {
    no: 3,
    id: "java03_execution",
    kind: "java",
    part: "Java Part 1. 학습 준비와 큰 그림",
    title: "Java 프로그램 실행 원리와 main 메서드",
    tags: ["java", "basic"],
    summary: "소스 코드가 컴파일되어 JVM에서 실행되는 흐름과 main 메서드의 의미를 배웁니다.",
    goal: "컴파일, 바이트코드, JVM, main 메서드의 역할을 구분합니다.",
    why: "실행 원리를 모르면 오류가 났을 때 어디가 문제인지 알기 어렵습니다. 최소한의 실행 흐름은 초반에 잡아야 합니다.",
    analogy: "소스 코드는 한국어 원고, 바이트코드는 공통 악보, JVM은 각 운영체제에서 악보를 연주하는 연주자입니다.",
    concepts: [["컴파일", ".java 파일을 .class 바이트코드로 바꾸는 과정입니다."], ["JVM", "바이트코드를 실제 컴퓨터에서 실행합니다."], ["main", "Java 프로그램이 시작되는 입구입니다."]],
    steps: ["Hello 클래스를 작성합니다.", "main 메서드 안에 출력문을 넣습니다.", "클래스 이름과 파일 이름이 같은지 확인합니다.", "출력 순서를 바꿔 실행 흐름을 확인합니다."],
    pitfalls: ["main 오타가 나면 실행 시작점을 찾지 못합니다.", "파일 이름과 public class 이름이 다르면 컴파일 오류가 납니다."]
  },
  {
    no: 4,
    id: "java04_variables_types",
    kind: "java",
    part: "Java Part 2. 기본 문법",
    title: "변수와 기본 타입",
    tags: ["java", "basic"],
    summary: "int, long, double, boolean, char, String을 쓰는 이유와 값 저장 방식을 익힙니다.",
    goal: "상황에 맞는 타입을 고르고 변수에 값을 저장할 수 있습니다.",
    why: "변수는 모든 프로그램의 출발점입니다. 서버에서도 회원 id, 주문 금액, 로그인 여부 같은 값이 변수로 이동합니다.",
    analogy: "변수는 이름표가 붙은 상자이고 타입은 상자 모양입니다. 숫자 상자에 문장을 넣을 수 없듯 타입이 맞아야 합니다.",
    concepts: [["int/long", "정수를 저장합니다."], ["double", "소수 계산에 사용합니다."], ["boolean", "참과 거짓을 표현합니다."], ["String", "문자열을 표현합니다."]],
    steps: ["회원 이름, 나이, 가입 여부 변수를 만듭니다.", "각 값을 출력합니다.", "나이를 1 증가시켜 다시 출력합니다.", "타입을 일부러 틀려 오류 메시지를 읽습니다."],
    pitfalls: ["long 값에는 큰 숫자 뒤에 L을 붙이는 습관을 들이세요.", "문자열 비교는 나중에 == 대신 equals를 사용한다는 점을 기억해두세요."],
    exampleCode: `
public class VariablePractice {
    public static void main(String[] args) {
        String name = "kim";
        int age = 20;
        boolean active = true;

        System.out.println(name + " / " + age + " / " + active);
    }
}
    `
  },
  {
    no: 5,
    id: "java05_operators_string",
    kind: "java",
    part: "Java Part 2. 기본 문법",
    title: "연산자와 문자열 다루기",
    tags: ["java", "basic"],
    summary: "산술, 비교, 논리 연산자와 문자열 연결, equals 비교를 배웁니다.",
    goal: "계산식과 조건식을 만들고 문자열 값을 안전하게 비교합니다.",
    why: "조건문과 반복문은 결국 연산자로 만든 조건 위에서 움직입니다. 연산자를 알아야 프로그램에게 판단 기준을 줄 수 있습니다.",
    analogy: "연산자는 계산기 버튼이고 비교 연산자는 판정 심판입니다.",
    concepts: [["산술 연산", "+, -, *, /, %로 계산합니다."], ["비교 연산", ">, >=, == 같은 식으로 참/거짓을 만듭니다."], ["논리 연산", "&&, ||로 여러 조건을 합칩니다."]],
    steps: ["상품 가격과 수량으로 총액을 계산합니다.", "총액이 5만원 이상인지 비교합니다.", "회원 등급 문자열을 equals로 비교합니다.", "&&와 || 조건을 각각 만들어봅니다."],
    pitfalls: ["문자열 비교에 ==를 습관적으로 쓰지 마세요.", "정수 나눗셈은 소수점이 사라질 수 있습니다."]
  },
  {
    no: 6,
    id: "java06_conditions",
    kind: "java",
    part: "Java Part 2. 기본 문법",
    title: "조건문 if, else, switch",
    tags: ["java", "basic"],
    summary: "상황에 따라 다른 코드를 실행하는 if/else와 switch를 익힙니다.",
    goal: "점수, 권한, 주문 상태에 따라 다른 결과를 만들 수 있습니다.",
    why: "백엔드 로직은 조건 판단의 연속입니다. 로그인했는지, 재고가 있는지, 결제가 가능한지 모두 조건문으로 표현합니다.",
    analogy: "조건문은 갈림길입니다. 표지판을 보고 어느 길로 갈지 정합니다.",
    concepts: [["if", "조건이 참이면 실행합니다."], ["else if", "앞 조건이 아니면 다음 조건을 검사합니다."], ["switch", "하나의 값이 여러 경우 중 어디에 해당하는지 나눕니다."]],
    steps: ["score 변수로 A/B/C 등급을 나눕니다.", "role 값으로 ADMIN/USER/GUEST 처리를 나눕니다.", "조건 순서를 바꿔 결과가 어떻게 달라지는지 확인합니다.", "조건식을 말로 풀어 씁니다."],
    pitfalls: ["넓은 조건을 먼저 쓰면 뒤 조건이 실행되지 않을 수 있습니다.", "중괄호를 생략하는 습관은 초반에 피하세요."],
    exampleCode: `
int score = 85;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}
    `
  },
  {
    no: 7,
    id: "java07_loops",
    kind: "java",
    part: "Java Part 2. 기본 문법",
    title: "반복문 for, while",
    tags: ["java", "basic"],
    summary: "같은 작업을 여러 번 실행하는 for, while, break, continue를 배웁니다.",
    goal: "목록을 순회하고 조건이 만족될 때 반복을 멈출 수 있습니다.",
    why: "상품 목록, 주문 목록, 댓글 목록처럼 서버는 많은 데이터를 반복해서 처리합니다.",
    analogy: "반복문은 컨베이어 벨트입니다. 벨트 위 물건을 하나씩 검사하고 필요한 작업을 합니다.",
    concepts: [["for", "반복 횟수나 범위가 분명할 때 씁니다."], ["while", "조건이 참인 동안 반복합니다."], ["break/continue", "반복을 멈추거나 이번 차례를 건너뜁니다."]],
    steps: ["1부터 10까지 출력합니다.", "배열의 모든 값을 더합니다.", "특정 값이 나오면 break로 멈춥니다.", "짝수만 출력하도록 continue를 써봅니다."],
    pitfalls: ["while 조건을 잘못 쓰면 무한 반복이 됩니다.", "반복 변수 시작값과 종료 조건을 함께 확인하세요."]
  },
  {
    no: 8,
    id: "java08_arrays",
    kind: "java",
    part: "Java Part 2. 기본 문법",
    title: "배열과 다차원 배열",
    tags: ["java", "basic"],
    summary: "같은 타입의 값을 순서대로 저장하는 배열과 인덱스를 이해합니다.",
    goal: "배열을 만들고 반복문으로 값을 읽고 수정할 수 있습니다.",
    why: "컬렉션을 배우기 전 배열로 여러 값을 다루는 기본 감각을 잡아야 합니다.",
    analogy: "배열은 번호가 붙은 사물함입니다. 첫 번째 칸 번호가 0이라는 점이 중요합니다.",
    concepts: [["인덱스", "배열 위치 번호이며 0부터 시작합니다."], ["length", "배열 길이를 알려줍니다."], ["다차원 배열", "표처럼 행과 열을 가진 배열입니다."]],
    steps: ["int 배열을 만들고 값을 넣습니다.", "for문으로 모든 값을 출력합니다.", "가장 큰 값을 찾습니다.", "2차원 배열로 좌석표를 표현합니다."],
    pitfalls: ["마지막 인덱스는 length가 아니라 length - 1입니다.", "배열 크기는 만든 뒤 쉽게 늘릴 수 없습니다."]
  },
  {
    no: 9,
    id: "java09_methods",
    kind: "java",
    part: "Java Part 2. 기본 문법",
    title: "메서드, 매개변수, 반환값",
    tags: ["java", "basic"],
    summary: "반복되는 코드를 이름 있는 기능으로 묶는 메서드를 배웁니다.",
    goal: "입력값을 받아 처리하고 결과를 반환하는 메서드를 작성합니다.",
    why: "메서드는 코드를 작게 나누는 첫 단계입니다. Spring Service 메서드도 결국 이 기본 위에서 만들어집니다.",
    analogy: "메서드는 자주 쓰는 작업을 버튼 하나로 묶어둔 리모컨 버튼입니다.",
    concepts: [["매개변수", "메서드가 받는 입력입니다."], ["반환값", "메서드가 돌려주는 결과입니다."], ["void", "반환값이 없다는 뜻입니다."]],
    steps: ["두 수를 더하는 add 메서드를 만듭니다.", "가격과 할인율을 받아 최종 가격을 반환합니다.", "반환값을 변수에 담아 출력합니다.", "void 메서드와 반환 메서드의 차이를 비교합니다."],
    pitfalls: ["return 뒤 코드는 실행되지 않습니다.", "메서드 이름은 행동이 드러나게 짓는 습관을 들이세요."]
  },
  {
    no: 10,
    id: "java10_scope_static",
    kind: "java",
    part: "Java Part 2. 기본 문법",
    title: "스코프, static, 메모리 감각",
    tags: ["java", "basic", "advanced"],
    summary: "변수의 생존 범위와 static의 의미를 초보자 관점에서 정리합니다.",
    goal: "지역 변수, 인스턴스 변수, static 변수의 차이를 구분합니다.",
    why: "값이 어디에 살아 있는지 모르면 예상과 다른 값이 출력될 때 원인을 찾기 어렵습니다.",
    analogy: "지역 변수는 회의 중 쓰는 포스트잇, 인스턴스 변수는 개인 사물함, static 변수는 모두가 보는 공용 게시판입니다.",
    concepts: [["스코프", "변수를 사용할 수 있는 범위입니다."], ["static", "객체마다가 아니라 클래스 차원에 속합니다."], ["인스턴스", "new로 만들어진 실제 객체입니다."]],
    steps: ["메서드 안 지역 변수를 출력합니다.", "클래스 필드와 지역 변수 이름을 비교합니다.", "static count를 증가시켜 공유되는지 확인합니다.", "static 남용이 왜 위험한지 적어봅니다."],
    pitfalls: ["모든 것을 static으로 만들면 객체지향 감각이 흐려집니다.", "지역 변수는 메서드가 끝나면 사라집니다."]
  },
  {
    no: 11,
    id: "java11_class_object",
    kind: "java",
    part: "Java Part 3. 객체지향 기본",
    title: "클래스와 객체",
    tags: ["java", "oop"],
    summary: "클래스, 객체, 필드, 메서드의 관계를 회원과 상품 예제로 배웁니다.",
    goal: "데이터와 기능을 하나의 객체로 묶어 표현할 수 있습니다.",
    why: "큰 프로그램을 변수와 함수만으로 만들면 금방 흩어집니다. 객체는 관련된 데이터와 행동을 한곳에 모아줍니다.",
    analogy: "클래스는 설계도, 객체는 설계도로 만든 실제 물건입니다.",
    concepts: [["클래스", "객체를 만들기 위한 설계도입니다."], ["필드", "객체가 기억하는 값입니다."], ["메서드", "객체가 수행하는 행동입니다."]],
    steps: ["Product 클래스를 만듭니다.", "name과 price 필드를 넣습니다.", "printInfo 메서드를 만듭니다.", "두 개의 Product 객체를 만들어 값이 서로 다른지 확인합니다."],
    pitfalls: ["클래스와 객체를 같은 것으로 생각하지 마세요.", "필드만 있고 행동이 없는 객체는 나중에 절차지향 코드로 흐르기 쉽습니다."]
  },
  {
    no: 12,
    id: "java12_constructor_this",
    kind: "java",
    part: "Java Part 3. 객체지향 기본",
    title: "생성자와 this",
    tags: ["java", "oop"],
    summary: "객체가 만들어질 때 필요한 값을 안전하게 넣는 생성자와 this를 배웁니다.",
    goal: "생성자로 필수값을 받고 객체를 올바른 상태로 시작하게 만듭니다.",
    why: "객체가 만들어진 뒤 필수값이 비어 있으면 나중에 오류가 납니다. 생성자는 처음부터 필요한 값을 강제합니다.",
    analogy: "생성자는 입주 계약서입니다. 집에 들어오기 전에 이름과 보증금처럼 필수 정보를 먼저 적습니다.",
    concepts: [["생성자", "new 할 때 실행되는 초기화 코드입니다."], ["this", "현재 객체 자신을 가리킵니다."], ["오버로딩", "이름은 같지만 매개변수가 다른 생성자나 메서드입니다."]],
    steps: ["Member 생성자에 name을 받습니다.", "this.name = name을 작성합니다.", "기본 생성자와 필수값 생성자의 차이를 확인합니다.", "생성자에서 검증을 추가합니다."],
    pitfalls: ["필수값을 setter로 나중에 넣게 만들면 객체가 불완전한 상태로 존재할 수 있습니다.", "매개변수와 필드 이름이 같을 때 this를 빼면 헷갈릴 수 있습니다."]
  },
  {
    no: 13,
    id: "java13_encapsulation",
    kind: "java",
    part: "Java Part 3. 객체지향 기본",
    title: "접근 제어자와 캡슐화",
    tags: ["java", "oop"],
    summary: "private, public, protected, default와 안전한 객체 설계를 배웁니다.",
    goal: "필드를 숨기고 필요한 기능만 메서드로 공개합니다.",
    why: "아무 곳에서나 객체 내부 값을 바꿀 수 있으면 데이터가 쉽게 망가집니다. 캡슐화는 변경 가능 지점을 통제합니다.",
    analogy: "캡슐화는 리모컨입니다. 내부 회로를 직접 만지지 않고 버튼으로만 조작하게 합니다.",
    concepts: [["private", "클래스 내부에서만 접근합니다."], ["public", "어디서든 접근할 수 있습니다."], ["캡슐화", "데이터를 숨기고 의미 있는 기능만 공개합니다."]],
    steps: ["필드를 private으로 바꿉니다.", "getter로 읽기 기능을 제공합니다.", "setter 대신 changeName 같은 의미 있는 메서드를 만듭니다.", "잘못된 값은 메서드에서 거부합니다."],
    pitfalls: ["무조건 getter/setter를 모두 만드는 습관은 피하세요.", "public 필드는 객체 내부를 너무 쉽게 망가뜨립니다."]
  },
  {
    no: 14,
    id: "java14_package_import",
    kind: "java",
    part: "Java Part 3. 객체지향 기본",
    title: "패키지와 import",
    tags: ["java", "oop"],
    summary: "클래스를 폴더와 이름공간으로 정리하는 패키지와 import를 배웁니다.",
    goal: "도메인, 서비스, 저장소 클래스를 패키지로 나누는 기본 감각을 익힙니다.",
    why: "프로젝트가 커지면 파일이 많아집니다. 패키지는 파일을 역할별 서랍에 정리하는 도구입니다.",
    analogy: "패키지는 도서관의 분류 번호입니다. 책이 많아도 분류가 있으면 찾을 수 있습니다.",
    concepts: [["package", "클래스가 속한 이름공간입니다."], ["import", "다른 패키지의 클래스를 짧은 이름으로 쓰게 합니다."], ["도메인 패키지", "비즈니스 개념 객체를 모아둡니다."]],
    steps: ["member 패키지를 만듭니다.", "Member 클래스를 이동합니다.", "다른 클래스에서 import로 사용합니다.", "패키지 이름과 폴더 구조가 맞는지 확인합니다."],
    pitfalls: ["패키지 선언과 실제 폴더 위치가 다르면 IDE에서 오류가 납니다.", "처음부터 너무 세세하게 패키지를 나누면 오히려 복잡해집니다."]
  },
  {
    no: 15,
    id: "java15_inheritance",
    kind: "java",
    part: "Java Part 3. 객체지향 기본",
    title: "상속과 메서드 오버라이딩",
    tags: ["java", "oop"],
    summary: "공통 기능을 부모 클래스로 올리고 자식 클래스에서 재정의하는 방법을 배웁니다.",
    goal: "상속의 장점과 남용 위험을 함께 이해합니다.",
    why: "상속은 중복을 줄일 수 있지만 잘못 쓰면 클래스 관계가 딱딱하게 굳습니다. 그래서 언제 쓰고 언제 피할지 아는 것이 중요합니다.",
    analogy: "상속은 기본 자동차 설계도를 바탕으로 택시와 트럭을 만드는 것과 비슷합니다.",
    concepts: [["extends", "부모 클래스를 상속합니다."], ["override", "부모 메서드를 자식 방식으로 다시 정의합니다."], ["super", "부모의 생성자나 메서드를 호출합니다."]],
    steps: ["Animal 부모 클래스를 만듭니다.", "Dog와 Cat이 상속하게 합니다.", "sound 메서드를 오버라이딩합니다.", "상속 대신 조합이 나은 상황을 적어봅니다."],
    pitfalls: ["상속은 is-a 관계가 아닐 때 쓰면 어색해집니다.", "부모 변경이 자식에게 영향을 줄 수 있습니다."]
  },
  {
    no: 16,
    id: "java16_polymorphism_interface",
    kind: "java",
    part: "Java Part 3. 객체지향 기본",
    title: "다형성과 인터페이스",
    tags: ["java", "oop"],
    summary: "역할과 구현을 분리하는 다형성과 인터페이스를 결제 예제로 익힙니다.",
    goal: "인터페이스 타입으로 여러 구현체를 갈아끼울 수 있습니다.",
    why: "Spring DI를 이해하려면 다형성이 필수입니다. 서비스는 역할에 의존하고 실제 구현은 바꿀 수 있어야 합니다.",
    analogy: "콘센트 규격은 인터페이스이고, 충전기 제조사는 구현체입니다. 규격만 맞으면 다른 충전기를 꽂을 수 있습니다.",
    concepts: [["interface", "구현체가 지켜야 할 역할 계약입니다."], ["다형성", "같은 타입으로 여러 구현체를 다룹니다."], ["역할/구현 분리", "변경에 강한 구조를 만듭니다."]],
    steps: ["Payment 인터페이스를 만듭니다.", "CardPayment와 PointPayment를 구현합니다.", "Payment 타입 변수에 구현체를 넣습니다.", "구현체를 바꿔도 호출 코드는 그대로인지 확인합니다."],
    pitfalls: ["인터페이스가 너무 많으면 초반에는 복잡도만 늘 수 있습니다.", "구현체에 직접 의존하면 다형성 장점이 줄어듭니다."]
  },
  {
    no: 17,
    id: "java17_object_equals_hashcode",
    kind: "java",
    part: "Java Part 4. 중급 문법",
    title: "Object, equals, hashCode",
    tags: ["java", "advanced"],
    summary: "모든 클래스의 부모인 Object와 동등성 비교를 배웁니다.",
    goal: "==와 equals의 차이를 알고 컬렉션에서 hashCode가 필요한 이유를 이해합니다.",
    why: "회원 id가 같은 두 객체를 같은 회원으로 볼지, 서로 다른 객체로 볼지 결정하는 일은 실무에서 매우 중요합니다.",
    analogy: "==는 두 사람이 같은 의자에 앉아 있는지 보는 것이고, equals는 주민등록번호가 같은 사람인지 확인하는 것입니다.",
    concepts: [["==", "참조가 같은지 비교합니다."], ["equals", "내용상 같은지 비교하도록 재정의할 수 있습니다."], ["hashCode", "HashSet, HashMap에서 빠르게 찾기 위한 값입니다."]],
    steps: ["같은 값을 가진 객체 두 개를 만듭니다.", "== 결과를 확인합니다.", "equals를 재정의합니다.", "HashSet에 넣어 중복 제거를 확인합니다."],
    pitfalls: ["equals만 재정의하고 hashCode를 빼먹지 마세요.", "엔티티 동등성은 나중에 JPA에서 더 신중하게 다뤄야 합니다."]
  },
  {
    no: 18,
    id: "java18_string_immutable",
    kind: "java",
    part: "Java Part 4. 중급 문법",
    title: "String과 불변 객체",
    tags: ["java", "advanced"],
    summary: "String이 불변인 이유와 불변 객체의 장점을 배웁니다.",
    goal: "불변 객체가 안전한 공유와 예측 가능한 코드를 만드는 이유를 이해합니다.",
    why: "서버에서는 여러 코드가 같은 값을 공유합니다. 불변 객체는 값이 몰래 바뀌지 않아 안전합니다.",
    analogy: "불변 객체는 인쇄된 영수증입니다. 누군가 마음대로 금액을 고칠 수 없습니다.",
    concepts: [["불변", "객체가 만들어진 뒤 내부 상태가 바뀌지 않습니다."], ["String pool", "같은 문자열을 효율적으로 재사용합니다."], ["StringBuilder", "문자열을 많이 이어붙일 때 사용합니다."]],
    steps: ["String을 이어붙여 새 객체가 생기는 감각을 봅니다.", "StringBuilder로 반복 연결을 해봅니다.", "불변 Money 클래스를 만듭니다.", "setter가 없는 객체의 장점을 적습니다."],
    pitfalls: ["반복문에서 String + 를 과도하게 쓰면 비효율적일 수 있습니다.", "불변 객체는 값을 바꾸는 대신 새 객체를 반환합니다."]
  },
  {
    no: 19,
    id: "java19_wrapper_enum",
    kind: "java",
    part: "Java Part 4. 중급 문법",
    title: "래퍼 클래스와 enum",
    tags: ["java", "advanced"],
    summary: "int와 Integer의 차이, enum으로 정해진 값을 안전하게 표현하는 법을 배웁니다.",
    goal: "null 가능성과 정해진 상태값을 안전하게 다룹니다.",
    why: "주문 상태, 회원 등급처럼 정해진 값은 문자열보다 enum으로 표현하는 것이 안전합니다.",
    analogy: "enum은 정해진 메뉴판입니다. 손님이 메뉴판에 없는 이름을 마음대로 주문하지 못하게 합니다.",
    concepts: [["Wrapper", "기본 타입을 객체처럼 다룹니다."], ["Boxing", "기본 타입과 래퍼 타입 사이 변환입니다."], ["enum", "허용된 상수 목록을 타입으로 만듭니다."]],
    steps: ["Integer와 int를 비교합니다.", "null을 다룰 때 주의점을 확인합니다.", "OrderStatus enum을 만듭니다.", "문자열 상태값과 enum 상태값을 비교합니다."],
    pitfalls: ["Integer는 null일 수 있어 언박싱 때 NullPointerException이 날 수 있습니다.", "상태값을 문자열로 흩뿌리면 오타를 컴파일러가 잡지 못합니다."]
  },
  {
    no: 20,
    id: "java20_exception",
    kind: "java",
    part: "Java Part 4. 중급 문법",
    title: "예외 처리와 사용자 정의 예외",
    tags: ["java", "backend"],
    summary: "try-catch, checked/unchecked exception, 직접 예외 만들기를 배웁니다.",
    goal: "실패 상황을 숨기지 않고 의미 있는 예외로 표현합니다.",
    why: "실무 프로그램은 늘 실패할 수 있습니다. 없는 회원, 부족한 재고, 잘못된 입력을 정상 흐름과 분리해야 합니다.",
    analogy: "예외는 화재 경보기입니다. 경보를 꺼버리는 것이 아니라 어디서 문제가 났는지 알려주는 장치입니다.",
    concepts: [["try-catch", "예외가 발생할 수 있는 코드를 감싸고 처리합니다."], ["unchecked", "런타임 예외이며 실무 비즈니스 예외에 자주 씁니다."], ["custom exception", "도메인에 맞는 실패를 이름 붙입니다."]],
    steps: ["숫자 변환 예외를 처리합니다.", "재고 부족 예외 클래스를 만듭니다.", "조건이 맞지 않으면 예외를 던집니다.", "catch에서 메시지를 출력합니다."],
    pitfalls: ["catch를 비워두면 문제가 숨어버립니다.", "모든 예외를 Exception 하나로 뭉뚱그리면 원인 파악이 어렵습니다."]
  },
  {
    no: 21,
    id: "java21_collections",
    kind: "java",
    part: "Java Part 4. 중급 문법",
    title: "컬렉션 프레임워크: List, Set, Map",
    tags: ["java", "advanced"],
    summary: "여러 데이터를 다루는 대표 컬렉션 List, Set, Map을 상황별로 선택합니다.",
    goal: "순서, 중복, key 조회 기준으로 적절한 컬렉션을 고릅니다.",
    why: "서버는 대부분 목록과 집합을 다룹니다. 회원 목록, 상품 목록, id별 캐시 같은 구조를 모르면 로직이 복잡해집니다.",
    analogy: "List는 줄, Set은 출입 명단, Map은 사전입니다.",
    concepts: [["List", "순서가 있고 중복을 허용합니다."], ["Set", "중복을 허용하지 않습니다."], ["Map", "key로 value를 찾습니다."]],
    steps: ["ArrayList에 상품을 넣습니다.", "HashSet으로 중복 회원 id를 제거합니다.", "HashMap에 상품 id와 가격을 저장합니다.", "각 컬렉션을 언제 쓸지 표로 정리합니다."],
    pitfalls: ["순서가 필요하면 Set보다 List가 자연스럽습니다.", "Map key의 equals/hashCode가 중요합니다."]
  },
  {
    no: 22,
    id: "java22_generics",
    kind: "java",
    part: "Java Part 4. 중급 문법",
    title: "제네릭과 타입 안정성",
    tags: ["java", "advanced"],
    summary: "List<String>처럼 타입을 미리 정해 안전한 코드를 만드는 제네릭을 배웁니다.",
    goal: "제네릭 클래스와 메서드의 기본 모양을 이해합니다.",
    why: "제네릭은 잘못된 타입이 들어오는 실수를 컴파일 단계에서 막아줍니다.",
    analogy: "제네릭은 상자에 붙이는 전용 라벨입니다. '문자열 전용 상자'에 숫자를 넣지 못하게 합니다.",
    concepts: [["타입 파라미터", "T 같은 이름으로 나중에 정해질 타입을 표시합니다."], ["제네릭 클래스", "타입을 외부에서 받아 사용하는 클래스입니다."], ["제네릭 메서드", "메서드 단위로 타입을 받습니다."]],
    steps: ["Box<T> 클래스를 만듭니다.", "String Box와 Integer Box를 만듭니다.", "잘못된 타입을 넣어 컴파일 오류를 확인합니다.", "컬렉션과 제네릭이 함께 쓰이는 이유를 적습니다."],
    pitfalls: ["처음부터 와일드카드까지 깊게 파면 어렵습니다.", "raw type은 가능하면 사용하지 마세요."]
  },
  {
    no: 23,
    id: "java23_nested_anonymous",
    kind: "java",
    part: "Java Part 5. 고급 기본기",
    title: "중첩 클래스와 익명 클래스",
    tags: ["java", "advanced"],
    summary: "클래스 안에 클래스를 두는 경우와 한 번만 쓸 구현체를 익명 클래스로 만드는 방법을 배웁니다.",
    goal: "중첩 클래스가 필요한 상황과 람다로 이어지는 흐름을 이해합니다.",
    why: "람다를 이해하려면 익명 클래스가 어떤 불편함을 줄였는지 알면 좋습니다.",
    analogy: "익명 클래스는 이름 없는 임시 직원입니다. 한 번만 필요한 일을 그 자리에서 맡깁니다.",
    concepts: [["static nested", "바깥 객체 없이 사용할 수 있는 중첩 클래스입니다."], ["inner class", "바깥 객체와 연결된 내부 클래스입니다."], ["anonymous class", "이름 없이 즉석에서 구현합니다."]],
    steps: ["간단한 인터페이스를 만듭니다.", "익명 클래스로 구현합니다.", "코드가 길어지는 불편함을 확인합니다.", "다음 장의 람다와 비교합니다."],
    pitfalls: ["중첩 클래스를 남용하면 구조가 읽기 어려워집니다.", "익명 클래스의 this는 람다와 다르게 동작할 수 있습니다."]
  },
  {
    no: 24,
    id: "java24_lambda",
    kind: "java",
    part: "Java Part 5. 고급 기본기",
    title: "람다와 함수형 인터페이스",
    tags: ["java", "advanced"],
    summary: "함수를 값처럼 전달하는 람다와 함수형 인터페이스를 배웁니다.",
    goal: "람다식을 읽고 간단한 Predicate, Function, Consumer를 사용할 수 있습니다.",
    why: "스트림, 이벤트 처리, 콜백 스타일 코드에서 람다는 매우 자주 등장합니다.",
    analogy: "람다는 작은 작업 지시서를 변수처럼 전달하는 것입니다.",
    concepts: [["람다", "익명 함수를 짧게 표현합니다."], ["함수형 인터페이스", "추상 메서드가 하나인 인터페이스입니다."], ["Predicate", "조건 판단 함수를 표현합니다."]],
    steps: ["익명 클래스를 람다로 바꿉니다.", "숫자가 짝수인지 판단하는 Predicate를 만듭니다.", "문자열을 길이로 바꾸는 Function을 만듭니다.", "람다의 입력과 출력을 표시합니다."],
    pitfalls: ["람다는 마법 문법이 아니라 인터페이스 구현입니다.", "람다 안에서 너무 많은 일을 하면 읽기 어려워집니다."]
  },
  {
    no: 25,
    id: "java25_stream",
    kind: "java",
    part: "Java Part 5. 고급 기본기",
    title: "Stream API",
    tags: ["java", "advanced"],
    summary: "컬렉션 데이터를 filter, map, collect로 가공하는 스트림을 배웁니다.",
    goal: "목록에서 조건 필터링, 변환, 집계를 스트림으로 표현할 수 있습니다.",
    why: "실무 코드에서는 회원 목록에서 활성 회원만 고르거나 주문 금액 합계를 구하는 일이 많습니다.",
    analogy: "스트림은 컨베이어 벨트입니다. 물건이 지나가며 필터를 통과하고 모양이 바뀌고 마지막에 상자에 담깁니다.",
    concepts: [["filter", "조건에 맞는 값만 남깁니다."], ["map", "값을 다른 모양으로 바꿉니다."], ["terminal operation", "toList, count처럼 스트림을 끝냅니다."]],
    steps: ["숫자 목록에서 5만원 이상만 고릅니다.", "상품 목록을 상품명 목록으로 바꿉니다.", "총합을 구합니다.", "반복문 코드와 스트림 코드를 비교합니다."],
    pitfalls: ["스트림은 한 번 사용하면 다시 사용할 수 없습니다.", "너무 복잡한 스트림은 반복문보다 읽기 어려울 수 있습니다."]
  },
  {
    no: 26,
    id: "java26_optional_time",
    kind: "java",
    part: "Java Part 5. 고급 기본기",
    title: "Optional과 날짜/시간 API",
    tags: ["java", "advanced"],
    summary: "null 가능성을 표현하는 Optional과 LocalDateTime 등 시간 API를 배웁니다.",
    goal: "값이 없을 수 있음을 명확히 표현하고 날짜 계산을 안전하게 합니다.",
    why: "백엔드에서는 가입일, 주문일, 만료일을 자주 다룹니다. null과 시간 처리를 대충 하면 장애가 생기기 쉽습니다.",
    analogy: "Optional은 내용물이 있을 수도 없을 수도 있는 택배 상자입니다. 열기 전에 비었는지 확인하게 만듭니다.",
    concepts: [["Optional", "값이 없을 가능성을 표현합니다."], ["LocalDate", "날짜만 표현합니다."], ["LocalDateTime", "날짜와 시간을 표현합니다."]],
    steps: ["Optional.ofNullable을 만들어봅니다.", "orElse와 orElseThrow를 비교합니다.", "현재 시간을 출력합니다.", "주문일에 7일을 더해 배송 예정일을 계산합니다."],
    pitfalls: ["Optional을 필드에 무분별하게 넣는 것은 권장되지 않습니다.", "시간대가 필요한 경우 ZonedDateTime을 고려해야 합니다."]
  },
  {
    no: 27,
    id: "java27_io_file",
    kind: "java",
    part: "Java Part 5. 고급 기본기",
    title: "I/O와 파일 처리",
    tags: ["java", "advanced"],
    summary: "파일을 읽고 쓰는 기본 입출력 흐름과 자원 정리를 배웁니다.",
    goal: "텍스트 파일을 읽고 쓰며 try-with-resources의 필요성을 이해합니다.",
    why: "로그, 업로드 파일, 설정 파일처럼 서버는 외부 데이터와 자주 입출력합니다.",
    analogy: "I/O는 창구입니다. 프로그램 안과 밖이 데이터를 주고받는 통로입니다.",
    concepts: [["InputStream", "바깥에서 안으로 읽습니다."], ["OutputStream", "안에서 밖으로 씁니다."], ["try-with-resources", "자원을 자동으로 닫습니다."]],
    steps: ["작은 텍스트 파일을 만듭니다.", "파일 내용을 읽어 출력합니다.", "새 파일에 문자열을 씁니다.", "자원을 닫지 않으면 어떤 문제가 생길지 적습니다."],
    pitfalls: ["파일 경로는 실행 위치에 따라 달라질 수 있습니다.", "입출력은 실패할 수 있으므로 예외 처리가 필요합니다."]
  },
  {
    no: 28,
    id: "java28_network_http_client",
    kind: "java",
    part: "Java Part 5. 고급 기본기",
    title: "네트워크와 HTTP Client 기초",
    tags: ["java", "http", "backend"],
    summary: "Java에서 외부 서버와 통신하는 기본 개념과 HTTP 요청 흐름을 배웁니다.",
    goal: "클라이언트와 서버, 요청과 응답의 기본 구조를 Java 관점에서 이해합니다.",
    why: "Spring Boot 서버도 결국 HTTP 요청을 받고 응답합니다. Java 네트워크 감각이 있으면 웹 동작이 덜 추상적으로 보입니다.",
    analogy: "HTTP 통신은 편지를 보내고 답장을 받는 과정입니다. 주소, 본문, 상태가 모두 중요합니다.",
    concepts: [["Client", "요청을 보내는 쪽입니다."], ["Server", "요청을 받아 응답하는 쪽입니다."], ["HTTP", "웹에서 요청과 응답을 주고받는 규칙입니다."]],
    steps: ["브라우저에서 URL을 열어 요청/응답을 봅니다.", "HTTP 메서드와 상태코드를 적습니다.", "Java HTTP Client 예제를 읽습니다.", "Spring Controller와 연결해 생각합니다."],
    pitfalls: ["네트워크 요청은 항상 실패 가능성이 있습니다.", "외부 API 호출은 시간 초과와 예외 처리를 고려해야 합니다."]
  },
  {
    no: 29,
    id: "java29_thread_basic",
    kind: "java",
    part: "Java Part 6. 동시성",
    title: "스레드 기본과 실행 흐름",
    tags: ["java", "advanced"],
    summary: "하나의 프로그램 안에서 여러 실행 흐름을 만드는 스레드를 배웁니다.",
    goal: "Thread와 Runnable의 기본 사용법과 동시 실행의 의미를 이해합니다.",
    why: "웹 서버는 여러 사용자의 요청을 동시에 처리합니다. 동시성 감각은 백엔드 개발에서 중요합니다.",
    analogy: "스레드는 한 식당 안에서 동시에 일하는 직원들입니다.",
    concepts: [["Thread", "실행 흐름 하나를 의미합니다."], ["Runnable", "스레드가 실행할 작업입니다."], ["sleep", "현재 스레드를 잠시 멈춥니다."]],
    steps: ["main 스레드 이름을 출력합니다.", "새 Thread를 만들어 실행합니다.", "출력 순서가 매번 달라질 수 있음을 확인합니다.", "동시 실행의 장점과 위험을 적습니다."],
    pitfalls: ["start가 아니라 run을 직접 호출하면 새 스레드가 시작되지 않습니다.", "출력 순서에 의존하는 코드는 위험합니다."]
  },
  {
    no: 30,
    id: "java30_concurrency_safety",
    kind: "java",
    part: "Java Part 6. 동시성",
    title: "동시성 문제와 synchronized",
    tags: ["java", "advanced", "backend"],
    summary: "여러 스레드가 같은 데이터를 바꿀 때 생기는 문제와 기본 해결책을 배웁니다.",
    goal: "공유 자원, race condition, synchronized의 의미를 설명할 수 있습니다.",
    why: "동시에 재고를 차감하거나 포인트를 변경하는 서버 로직에서는 잘못된 동시성 처리가 실제 장애로 이어질 수 있습니다.",
    analogy: "공유 자원은 하나뿐인 계산대입니다. 여러 직원이 동시에 계산대를 만지면 장부가 꼬일 수 있습니다.",
    concepts: [["공유 자원", "여러 스레드가 함께 접근하는 데이터입니다."], ["race condition", "실행 순서에 따라 결과가 달라지는 문제입니다."], ["synchronized", "한 번에 하나의 스레드만 접근하게 막습니다."]],
    steps: ["여러 스레드가 count를 증가시키게 합니다.", "예상값과 실제값이 다른지 확인합니다.", "synchronized를 붙여봅니다.", "성능과 안전성의 균형을 적어봅니다."],
    pitfalls: ["동시성 문제는 항상 재현되지 않아 더 어렵습니다.", "무조건 synchronized를 붙이면 병목이 생길 수 있습니다."]
  },
  {
    no: 31,
    id: "java31_reflection_annotation",
    kind: "java",
    part: "Java Part 7. Spring으로 이어지는 Java",
    title: "애노테이션과 리플렉션 큰 그림",
    tags: ["java", "advanced", "spring"],
    summary: "@Override, @Deprecated 같은 애노테이션과 Spring이 객체 정보를 읽는 리플렉션 감각을 잡습니다.",
    goal: "Spring의 @Controller, @Service가 단순 주석이 아니라 메타데이터라는 점을 이해합니다.",
    why: "Spring은 애노테이션을 읽어 어떤 클래스를 Bean으로 만들지 판단합니다. 이 원리를 알면 Spring이 덜 마법처럼 보입니다.",
    analogy: "애노테이션은 택배 상자에 붙은 스티커입니다. 상자 내용물은 그대로지만 처리 방식이 달라집니다.",
    concepts: [["Annotation", "코드에 붙이는 메타데이터입니다."], ["Reflection", "실행 중 클래스 정보를 읽는 기능입니다."], ["Metadata", "코드를 설명하는 데이터입니다."]],
    steps: ["@Override가 붙은 메서드를 봅니다.", "커스텀 애노테이션 모양을 읽습니다.", "Spring 애노테이션과 연결해 생각합니다.", "@Service가 붙으면 어떤 일이 생길지 예상합니다."],
    pitfalls: ["애노테이션은 주석과 다릅니다.", "리플렉션은 강력하지만 남용하면 복잡하고 느려질 수 있습니다."]
  },
  {
    no: 32,
    id: "java32_junit_testing",
    kind: "java",
    part: "Java Part 7. Spring으로 이어지는 Java",
    title: "JUnit 테스트 기초",
    tags: ["java", "practice", "backend"],
    summary: "기능이 원하는 대로 동작하는지 자동으로 확인하는 JUnit 테스트를 배웁니다.",
    goal: "given-when-then 구조로 작은 단위 테스트를 작성합니다.",
    why: "테스트는 코드가 깨졌는지 알려주는 안전망입니다. Spring 프로젝트가 커질수록 테스트 없이는 수정이 무서워집니다.",
    analogy: "테스트는 요리 후 맛보는 작은 숟가락입니다. 손님에게 내기 전에 문제가 있는지 확인합니다.",
    concepts: [["JUnit", "Java 테스트 프레임워크입니다."], ["assertThat", "기대한 값과 실제 값을 비교합니다."], ["given-when-then", "준비, 실행, 검증 순서입니다."]],
    steps: ["계산 메서드를 하나 만듭니다.", "테스트 클래스에서 입력값을 준비합니다.", "메서드를 실행합니다.", "결과가 예상과 같은지 검증합니다."],
    pitfalls: ["테스트 이름은 무엇을 검증하는지 드러나야 합니다.", "한 테스트에 너무 많은 검증을 넣지 마세요."]
  },
  {
    no: 33,
    id: "java33_cli_project",
    kind: "java",
    part: "Java Part 8. Java 미니 프로젝트",
    title: "콘솔 Todo 프로젝트로 Java 종합",
    tags: ["java", "practice", "oop"],
    summary: "Java 기본 문법, 객체지향, 컬렉션, 예외, 테스트를 콘솔 Todo 프로젝트로 연결합니다.",
    goal: "Todo 등록, 조회, 완료, 삭제 기능을 Java만으로 구현합니다.",
    why: "Spring으로 가기 전에 Java만으로 작은 프로그램을 완성해보면 객체와 컬렉션이 실제로 어떻게 연결되는지 보입니다.",
    analogy: "미니 프로젝트는 배운 부품을 처음 조립해보는 시간입니다. 부품 이름을 아는 것과 움직이는 물건을 만드는 것은 다릅니다.",
    concepts: [["Todo", "id, title, completed 상태를 가진 객체입니다."], ["Repository", "Todo 목록을 저장하고 찾습니다."], ["Service", "등록, 완료, 삭제 규칙을 처리합니다."]],
    steps: ["Todo 클래스를 만듭니다.", "List<Todo> 저장소를 만듭니다.", "add, complete, delete 메서드를 만듭니다.", "JUnit으로 등록 기능을 테스트합니다."],
    pitfalls: ["처음부터 파일 저장까지 넣지 말고 메모리 List로 시작하세요.", "출력 코드와 비즈니스 로직을 한 메서드에 모두 넣지 마세요."]
  }
];

const expandedSpringTopics = [
  {
    no: 1,
    id: "spring01_overview",
    kind: "spring",
    part: "Spring Part 1. 입문과 웹 기본",
    title: "Spring Boot와 백엔드 웹 애플리케이션 큰 그림",
    tags: ["spring", "boot", "backend"],
    summary: "Spring Boot가 Java 백엔드에서 어떤 문제를 해결하는지 전체 그림을 봅니다.",
    goal: "Spring, Spring Boot, WAS, HTTP API의 관계를 설명할 수 있습니다.",
    why: "Spring은 객체를 만들고 연결하며 웹 요청, DB, 트랜잭션 같은 반복 작업을 도와줍니다. 큰 그림이 없으면 어노테이션만 외우게 됩니다.",
    analogy: "Spring Boot는 기본 설비가 갖춰진 식당입니다. 개발자는 전기와 수도 공사보다 메뉴 개발에 집중할 수 있습니다.",
    concepts: [["Spring", "Java 객체를 관리하고 연결하는 프레임워크입니다."], ["Boot", "설정과 서버 실행을 쉽게 시작하게 합니다."], ["API", "클라이언트와 서버가 약속된 형식으로 대화하는 창구입니다."]],
    steps: ["Spring Initializr에서 프로젝트를 만듭니다.", "Web 의존성을 추가합니다.", "서버를 실행합니다.", "브라우저에서 localhost:8080을 확인합니다."],
    pitfalls: ["Spring과 Spring Boot를 완전히 같은 말로 생각하지 마세요.", "처음부터 모든 설정 파일을 이해하려고 하지 않아도 됩니다."]
  },
  {
    no: 2,
    id: "spring02_project_structure",
    kind: "spring",
    part: "Spring Part 1. 입문과 웹 기본",
    title: "Spring Initializr와 프로젝트 구조",
    tags: ["spring", "boot", "backend"],
    summary: "build.gradle, main 클래스, resources, test 폴더의 역할을 배웁니다.",
    goal: "Spring Boot 프로젝트에서 자주 만지는 파일과 폴더를 구분합니다.",
    why: "구조를 모르면 어디에 코드를 넣어야 하는지 매번 막힙니다.",
    analogy: "프로젝트 구조는 건물 평면도입니다. 주방, 창고, 사무실 위치를 알아야 일을 시작할 수 있습니다.",
    concepts: [["build.gradle", "라이브러리와 빌드 설정을 관리합니다."], ["Application class", "Spring Boot 앱의 시작점입니다."], ["resources", "설정 파일과 정적 자원이 들어갑니다."]],
    steps: ["새 프로젝트를 생성합니다.", "build.gradle 의존성을 읽습니다.", "Application main을 실행합니다.", "test 폴더에 첫 테스트를 만듭니다."],
    pitfalls: ["main 클래스는 기본 패키지 최상단에 두는 것이 안전합니다.", "패키지 밖 클래스는 컴포넌트 스캔에서 빠질 수 있습니다."]
  },
  {
    no: 3,
    id: "spring03_controller",
    kind: "spring",
    part: "Spring Part 1. 입문과 웹 기본",
    title: "Controller와 첫 HTTP 응답",
    tags: ["spring", "mvc", "http"],
    summary: "@RestController와 @GetMapping으로 첫 API를 만듭니다.",
    goal: "URL 요청이 Controller 메서드로 연결되는 흐름을 이해합니다.",
    why: "Controller는 외부 요청이 애플리케이션으로 들어오는 입구입니다.",
    analogy: "Controller는 주문 카운터입니다. 손님의 주문을 받고 주방에 넘기거나 바로 응답합니다.",
    concepts: [["@RestController", "문자열이나 JSON을 응답 본문으로 반환합니다."], ["@GetMapping", "GET 요청 주소와 메서드를 연결합니다."], ["Response body", "클라이언트에게 보내는 응답 내용입니다."]],
    steps: ["HelloController를 만듭니다.", "/hello GET API를 작성합니다.", "브라우저로 호출합니다.", "응답 문자열을 바꿔 다시 확인합니다."],
    pitfalls: ["@Controller와 @RestController 차이를 헷갈리지 마세요.", "주소 앞의 /를 빠뜨리지 마세요."]
  },
  {
    no: 4,
    id: "spring04_ioc_di",
    kind: "spring",
    part: "Spring Part 2. 핵심 원리",
    title: "IoC와 DI",
    tags: ["spring", "oop", "backend"],
    summary: "객체 생성과 의존관계 연결을 Spring에게 맡기는 이유를 배웁니다.",
    goal: "new로 직접 생성하는 코드와 생성자 주입의 차이를 이해합니다.",
    why: "DI는 변경에 강한 객체지향 설계를 Spring에서 실현하는 핵심입니다.",
    analogy: "DI는 조립 공장입니다. 부품이 서로를 직접 만들지 않고 공장이 조립해줍니다.",
    concepts: [["IoC", "제어권이 개발자 코드에서 프레임워크로 넘어갑니다."], ["DI", "필요한 객체를 외부에서 넣어줍니다."], ["생성자 주입", "필수 의존성을 안전하게 전달합니다."]],
    steps: ["Service가 Repository를 직접 new 하는 코드를 봅니다.", "생성자로 Repository를 받게 바꿉니다.", "인터페이스를 도입합니다.", "구현체를 바꿔도 Service가 그대로인지 확인합니다."],
    pitfalls: ["필드 주입은 테스트와 불변성 측면에서 불리합니다.", "DI를 이해하려면 Java 다형성을 먼저 복습하세요."]
  },
  {
    no: 5,
    id: "spring05_bean_scan",
    kind: "spring",
    part: "Spring Part 2. 핵심 원리",
    title: "Spring Bean과 컴포넌트 스캔",
    tags: ["spring", "backend"],
    summary: "@Component, @Service, @Repository, @Controller가 Bean으로 등록되는 흐름을 배웁니다.",
    goal: "어떤 객체가 Spring 컨테이너에 등록되는지 설명합니다.",
    why: "Bean 등록 원리를 알아야 의존성 주입 실패 오류를 해결할 수 있습니다.",
    analogy: "Spring 컨테이너는 객체 보관 창고입니다. Bean은 창고에 등록된 공식 부품입니다.",
    concepts: [["Bean", "Spring이 관리하는 객체입니다."], ["Component scan", "애노테이션이 붙은 클래스를 찾아 등록합니다."], ["Stereotype", "Service, Repository처럼 역할을 드러내는 애노테이션입니다."]],
    steps: ["@Service 클래스를 만듭니다.", "Controller에서 생성자 주입으로 받습니다.", "패키지 위치를 바꿔 주입 실패를 만들어봅니다.", "컴포넌트 스캔 범위를 정리합니다."],
    pitfalls: ["Bean이 아닌 객체에는 자동 주입이 되지 않습니다.", "패키지 구조가 main 클래스 아래에 있는지 확인하세요."]
  },
  {
    no: 6,
    id: "spring06_configuration_bean",
    kind: "spring",
    part: "Spring Part 2. 핵심 원리",
    title: "@Configuration과 @Bean",
    tags: ["spring", "backend"],
    summary: "자동 스캔이 아닌 수동 Bean 등록 방식과 설정 클래스의 역할을 배웁니다.",
    goal: "외부 라이브러리 객체나 직접 조립이 필요한 객체를 Bean으로 등록합니다.",
    why: "모든 객체에 @Component를 붙일 수는 없습니다. 상황에 따라 설정 클래스로 명시 등록해야 합니다.",
    analogy: "@Bean은 창고 관리자에게 '이 부품도 공식 부품으로 등록해줘'라고 직접 말하는 것입니다.",
    concepts: [["@Configuration", "Bean 설정 클래스임을 나타냅니다."], ["@Bean", "메서드 반환 객체를 Bean으로 등록합니다."], ["수동 등록", "조립 과정을 코드로 명확히 표현합니다."]],
    steps: ["AppConfig 클래스를 만듭니다.", "@Bean 메서드를 작성합니다.", "생성자 주입으로 사용합니다.", "컴포넌트 스캔 방식과 비교합니다."],
    pitfalls: ["설정 클래스도 컴포넌트 스캔 범위 안에 있어야 합니다.", "같은 타입 Bean이 여러 개면 충돌이 날 수 있습니다."]
  },
  {
    no: 7,
    id: "spring07_http_rest",
    kind: "spring",
    part: "Spring Part 3. HTTP와 REST",
    title: "HTTP 메서드와 REST API 설계",
    tags: ["spring", "http", "backend"],
    summary: "GET, POST, PUT, PATCH, DELETE를 자원 중심 URL과 연결합니다.",
    goal: "상품 API 주소와 HTTP 메서드를 자연스럽게 설계합니다.",
    why: "API 설계가 흔들리면 프론트엔드와 백엔드가 대화하기 어려워집니다.",
    analogy: "HTTP 메서드는 택배 요청 종류입니다. 조회, 등록, 수정, 삭제가 각각 다른 요청서입니다.",
    concepts: [["GET", "조회합니다."], ["POST", "등록하거나 처리 요청을 보냅니다."], ["PATCH", "일부 수정합니다."], ["DELETE", "삭제합니다."]],
    steps: ["상품 목록 조회 URL을 설계합니다.", "상품 등록 URL을 설계합니다.", "상품 수정/삭제 URL을 설계합니다.", "동사 URL을 명사 URL로 바꿔봅니다."],
    pitfalls: ["/getProducts 같은 동사형 URL을 남발하지 마세요.", "조회 요청에 중요한 변경 작업을 넣지 마세요."]
  },
  {
    no: 8,
    id: "spring08_request_mapping",
    kind: "spring",
    part: "Spring Part 3. HTTP와 REST",
    title: "요청 매핑, PathVariable, RequestParam",
    tags: ["spring", "http", "mvc"],
    summary: "URL 경로 변수와 쿼리 파라미터를 Controller에서 받는 법을 배웁니다.",
    goal: "/products/{id}?sort=price 같은 요청을 처리합니다.",
    why: "클라이언트가 보낸 조건을 서버 코드로 받아야 실제 API가 됩니다.",
    analogy: "PathVariable은 주소에 적힌 호수이고, RequestParam은 요청서에 추가로 적은 조건입니다.",
    concepts: [["PathVariable", "URL 경로 일부를 변수로 받습니다."], ["RequestParam", "쿼리 문자열 값을 받습니다."], ["RequestMapping", "공통 URL 경로를 묶습니다."]],
    steps: ["/products/{id} API를 만듭니다.", "id를 Long으로 받습니다.", "sort 파라미터를 추가합니다.", "없는 파라미터의 기본값을 설정합니다."],
    pitfalls: ["PathVariable 이름과 URL 변수 이름이 다르면 매핑이 실패할 수 있습니다.", "필수 파라미터가 없을 때의 응답을 생각하세요."]
  },
  {
    no: 9,
    id: "spring09_json_dto",
    kind: "spring",
    part: "Spring Part 3. HTTP와 REST",
    title: "JSON 요청/응답과 DTO",
    tags: ["spring", "http", "mvc"],
    summary: "@RequestBody와 응답 DTO로 JSON API를 만듭니다.",
    goal: "Entity를 그대로 노출하지 않고 요청/응답 전용 객체를 사용합니다.",
    why: "API 형식과 내부 도메인 모델은 바뀌는 이유가 다릅니다. DTO로 분리하면 변경에 강해집니다.",
    analogy: "DTO는 택배 포장 상자입니다. 내부 창고 물건을 그대로 내보내지 않고 배송용 포장으로 바꿉니다.",
    concepts: [["JSON", "클라이언트와 서버가 자주 쓰는 데이터 형식입니다."], ["@RequestBody", "요청 본문 JSON을 객체로 바꿉니다."], ["DTO", "API 입출력 전용 객체입니다."]],
    steps: ["ProductCreateRequest record를 만듭니다.", "@RequestBody로 받습니다.", "ProductResponse를 반환합니다.", "요청 DTO와 응답 DTO를 분리합니다."],
    pitfalls: ["Entity를 그대로 API 응답으로 내보내지 마세요.", "요청 필드 이름과 JSON 필드 이름이 맞는지 확인하세요."]
  },
  {
    no: 10,
    id: "spring10_validation",
    kind: "spring",
    part: "Spring Part 4. MVC 실전 기본",
    title: "Bean Validation",
    tags: ["spring", "mvc", "backend"],
    summary: "@Valid, @NotBlank, @Positive로 잘못된 입력을 막습니다.",
    goal: "요청 DTO에 검증 규칙을 붙이고 실패 응답을 처리합니다.",
    why: "잘못된 데이터는 DB에 들어가기 전에 막아야 합니다. 검증은 서비스 안정성의 첫 방어선입니다.",
    analogy: "검증은 입구 보안 검색대입니다. 위험한 물건은 건물 안으로 들이지 않습니다.",
    concepts: [["@Valid", "검증을 실행합니다."], ["@NotBlank", "빈 문자열을 막습니다."], ["@Positive", "양수만 허용합니다."]],
    steps: ["요청 DTO에 검증 애노테이션을 붙입니다.", "Controller 파라미터에 @Valid를 붙입니다.", "빈 값을 보내 오류를 확인합니다.", "오류 메시지를 사용자 친화적으로 바꿉니다."],
    pitfalls: ["검증을 Entity에만 몰아넣으면 API별 요구사항 차이를 표현하기 어렵습니다.", "@Valid를 빼먹으면 애노테이션이 있어도 검증되지 않습니다."]
  },
  {
    no: 11,
    id: "spring11_exception_advice",
    kind: "spring",
    part: "Spring Part 4. MVC 실전 기본",
    title: "전역 예외 처리와 Error Response",
    tags: ["spring", "mvc", "backend"],
    summary: "@ControllerAdvice로 예외를 일관된 JSON 응답으로 바꿉니다.",
    goal: "비즈니스 예외를 HTTP 상태코드와 에러 메시지로 변환합니다.",
    why: "API 실패 응답이 제각각이면 프론트엔드가 처리하기 어렵습니다.",
    analogy: "전역 예외 처리는 고객센터입니다. 어느 지점에서 문제가 생겨도 같은 양식으로 안내합니다.",
    concepts: [["@ControllerAdvice", "여러 Controller 예외를 한곳에서 처리합니다."], ["@ExceptionHandler", "특정 예외 처리 메서드를 지정합니다."], ["ErrorResponse", "에러 응답 형식을 통일합니다."]],
    steps: ["BusinessException을 만듭니다.", "ErrorResponse record를 만듭니다.", "@ExceptionHandler를 작성합니다.", "없는 상품 조회 시 404를 반환합니다."],
    pitfalls: ["모든 예외를 500으로 보내면 클라이언트가 원인을 알기 어렵습니다.", "예외 메시지에 민감한 내부 정보를 담지 마세요."]
  },
  {
    no: 12,
    id: "spring12_layers",
    kind: "spring",
    part: "Spring Part 4. MVC 실전 기본",
    title: "Controller, Service, Repository 계층 구조",
    tags: ["spring", "mvc", "backend"],
    summary: "웹 요청 처리, 비즈니스 로직, 데이터 접근 책임을 나누는 방법을 배웁니다.",
    goal: "각 계층에 어떤 코드를 둬야 하는지 판단합니다.",
    why: "Controller가 모든 일을 하면 테스트와 유지보수가 어려워집니다. 계층 분리는 코드의 책임을 선명하게 합니다.",
    analogy: "Controller는 카운터, Service는 주방장, Repository는 창고 담당자입니다.",
    concepts: [["Controller", "HTTP 요청/응답을 담당합니다."], ["Service", "비즈니스 규칙을 담당합니다."], ["Repository", "데이터 저장과 조회를 담당합니다."]],
    steps: ["TodoController를 만듭니다.", "TodoService로 등록 로직을 옮깁니다.", "TodoRepository로 저장 로직을 옮깁니다.", "각 계층의 역할을 주석으로 적습니다."],
    pitfalls: ["Service가 단순 전달만 한다면 책임이 제대로 분리되었는지 점검하세요.", "Repository에서 웹 요청 객체를 알게 만들지 마세요."]
  },
  {
    no: 13,
    id: "spring13_testing",
    kind: "spring",
    part: "Spring Part 4. MVC 실전 기본",
    title: "Spring 테스트: 단위 테스트와 통합 테스트",
    tags: ["spring", "practice", "backend"],
    summary: "Service 단위 테스트, Controller 테스트, SpringBootTest의 차이를 배웁니다.",
    goal: "작은 테스트와 전체 통합 테스트를 상황에 맞게 작성합니다.",
    why: "Spring 앱은 객체 연결이 많습니다. 테스트가 없으면 리팩토링할 때 기능이 깨졌는지 알기 어렵습니다.",
    analogy: "단위 테스트는 부품 검사, 통합 테스트는 완성차 시운전입니다.",
    concepts: [["Unit Test", "작은 단위만 빠르게 검증합니다."], ["Integration Test", "Spring 컨테이너와 함께 검증합니다."], ["MockMvc", "HTTP 요청 없이 MVC를 테스트합니다."]],
    steps: ["Service 메서드를 순수 Java 테스트로 검증합니다.", "MockMvc로 Controller 응답을 확인합니다.", "@SpringBootTest로 전체 흐름을 확인합니다.", "테스트 속도 차이를 비교합니다."],
    pitfalls: ["모든 테스트를 통합 테스트로 만들면 느려집니다.", "테스트 데이터 정리를 잊으면 다음 테스트에 영향을 줄 수 있습니다."]
  },
  {
    no: 14,
    id: "spring14_jdbc_datasource",
    kind: "spring",
    part: "Spring Part 5. DB 접근 핵심",
    title: "JDBC와 DataSource",
    tags: ["spring", "db", "backend"],
    summary: "Spring DB 접근의 가장 아래 흐름인 JDBC와 커넥션 획득 방식을 배웁니다.",
    goal: "DB 연결, SQL 실행, 자원 정리의 기본 흐름을 이해합니다.",
    why: "JPA를 쓰더라도 아래에서는 결국 DB 연결과 SQL 실행이 일어납니다.",
    analogy: "DataSource는 DB와 통화하기 위한 전화 회선을 빌려주는 창구입니다.",
    concepts: [["JDBC", "Java에서 DB와 통신하는 표준 API입니다."], ["Connection", "DB와 연결된 통로입니다."], ["DataSource", "Connection을 제공하는 객체입니다."]],
    steps: ["H2 DB를 연결합니다.", "DataSource Bean을 확인합니다.", "Connection을 얻어봅니다.", "SQL 실행 후 자원 정리 과정을 적습니다."],
    pitfalls: ["Connection을 닫지 않으면 자원이 고갈될 수 있습니다.", "DB URL, username, password 설정을 먼저 확인하세요."]
  },
  {
    no: 15,
    id: "spring15_jdbctemplate",
    kind: "spring",
    part: "Spring Part 5. DB 접근 핵심",
    title: "JdbcTemplate",
    tags: ["spring", "db", "backend"],
    summary: "반복 JDBC 코드를 줄여주는 JdbcTemplate을 사용합니다.",
    goal: "query, update, RowMapper를 사용해 CRUD를 구현합니다.",
    why: "순수 JDBC는 반복 코드가 많습니다. JdbcTemplate은 핵심 SQL과 매핑에 집중하게 해줍니다.",
    analogy: "JdbcTemplate은 DB 통화 내용을 대신 정리해주는 비서입니다.",
    concepts: [["query", "조회 SQL을 실행합니다."], ["update", "등록, 수정, 삭제 SQL을 실행합니다."], ["RowMapper", "ResultSet 한 줄을 객체로 바꿉니다."]],
    steps: ["Member 테이블을 만듭니다.", "insert SQL을 작성합니다.", "select SQL과 RowMapper를 작성합니다.", "없는 id 조회 상황을 처리합니다."],
    pitfalls: ["SQL 문자열 오타는 컴파일러가 잡아주지 않습니다.", "컬럼명과 객체 필드 매핑을 확인하세요."]
  },
  {
    no: 16,
    id: "spring16_transaction",
    kind: "spring",
    part: "Spring Part 5. DB 접근 핵심",
    title: "트랜잭션과 @Transactional",
    tags: ["spring", "db", "backend"],
    summary: "여러 DB 작업을 하나의 작업 단위로 묶는 트랜잭션을 배웁니다.",
    goal: "커밋과 롤백, 트랜잭션 경계, @Transactional 위치를 이해합니다.",
    why: "주문 저장과 재고 감소 중 하나만 성공하면 데이터가 망가집니다.",
    analogy: "트랜잭션은 은행 송금 안전장치입니다. 출금과 입금은 함께 성공하거나 함께 취소되어야 합니다.",
    concepts: [["Commit", "변경을 확정합니다."], ["Rollback", "변경을 취소합니다."], ["@Transactional", "메서드 실행을 트랜잭션으로 감쌉니다."]],
    steps: ["주문 저장과 재고 감소 코드를 작성합니다.", "@Transactional을 붙입니다.", "중간에 예외를 던져 롤백을 확인합니다.", "읽기 전용 트랜잭션을 적용해봅니다."],
    pitfalls: ["private 메서드에 @Transactional을 붙여도 기대대로 동작하지 않을 수 있습니다.", "같은 클래스 내부 호출은 프록시를 거치지 않습니다."]
  },
  {
    no: 17,
    id: "spring17_jpa_entity",
    kind: "spring",
    part: "Spring Part 6. JPA 기본",
    title: "JPA Entity와 기본 매핑",
    tags: ["spring", "jpa", "db"],
    summary: "@Entity, @Id, @GeneratedValue, @Column으로 객체와 테이블을 연결합니다.",
    goal: "엔티티 클래스를 만들고 DB 테이블과 매핑합니다.",
    why: "JPA는 객체를 저장하면 SQL을 만들어 DB에 반영합니다. 그 출발점이 엔티티 매핑입니다.",
    analogy: "Entity는 Java 객체 세계와 DB 테이블 세계를 잇는 여권입니다.",
    concepts: [["@Entity", "JPA가 관리하는 객체입니다."], ["@Id", "기본키를 표시합니다."], ["@GeneratedValue", "id 생성 전략을 지정합니다."]],
    steps: ["Member 엔티티를 만듭니다.", "id와 name 필드를 매핑합니다.", "기본 생성자를 protected로 둡니다.", "Repository로 저장해봅니다."],
    pitfalls: ["엔티티에는 기본 생성자가 필요합니다.", "setter를 무분별하게 열면 엔티티 상태가 쉽게 망가집니다."]
  },
  {
    no: 18,
    id: "spring18_persistence_context",
    kind: "spring",
    part: "Spring Part 6. JPA 기본",
    title: "영속성 컨텍스트와 변경 감지",
    tags: ["spring", "jpa", "db"],
    summary: "JPA가 엔티티를 관리하는 1차 캐시, 동일성, 변경 감지를 배웁니다.",
    goal: "조회한 엔티티 값을 바꾸면 트랜잭션 커밋 때 UPDATE가 나가는 이유를 이해합니다.",
    why: "JPA는 단순 SQL 생성기가 아니라 엔티티 상태를 추적합니다. 이 원리를 모르면 UPDATE 동작이 이상해 보입니다.",
    analogy: "영속성 컨텍스트는 작업대입니다. 작업대 위 물건의 변경 사항을 JPA가 기억합니다.",
    concepts: [["1차 캐시", "트랜잭션 안에서 엔티티를 보관합니다."], ["동일성", "같은 id 조회 결과가 같은 객체일 수 있습니다."], ["변경 감지", "엔티티 변경을 감지해 UPDATE합니다."]],
    steps: ["엔티티를 저장합니다.", "같은 id를 두 번 조회합니다.", "객체 참조가 같은지 확인합니다.", "필드 변경 후 커밋 시 SQL을 봅니다."],
    pitfalls: ["준영속 상태 엔티티는 변경 감지가 되지 않습니다.", "트랜잭션 밖에서는 영속성 컨텍스트가 기대와 다르게 동작할 수 있습니다."]
  },
  {
    no: 19,
    id: "spring19_relation_mapping",
    kind: "spring",
    part: "Spring Part 6. JPA 기본",
    title: "연관관계 매핑",
    tags: ["spring", "jpa", "db"],
    summary: "Member와 Order 같은 객체 관계를 @ManyToOne, @OneToMany로 매핑합니다.",
    goal: "외래키의 주인과 객체 참조 방향을 이해합니다.",
    why: "실제 도메인은 객체 하나로 끝나지 않습니다. 주문은 회원과 상품을 참조하고, 이 관계를 올바르게 매핑해야 합니다.",
    analogy: "연관관계는 사람 사이의 연락처입니다. 누가 누구를 알고 있는지와 실제 주소록 주인이 누구인지 구분해야 합니다.",
    concepts: [["ManyToOne", "여러 주문이 한 회원을 참조합니다."], ["mappedBy", "연관관계의 주인이 아님을 표시합니다."], ["외래키", "DB에서 다른 테이블 행을 가리킵니다."]],
    steps: ["Member와 Order 엔티티를 만듭니다.", "Order에 Member 참조를 둡니다.", "DB 외래키를 확인합니다.", "양방향 관계가 꼭 필요한지 검토합니다."],
    pitfalls: ["양방향 관계는 편하지만 복잡합니다. 초반에는 단방향부터 시작하세요.", "연관관계 주인을 잘못 잡으면 FK 업데이트가 예상과 다릅니다."]
  },
  {
    no: 20,
    id: "spring20_spring_data_jpa",
    kind: "spring",
    part: "Spring Part 7. JPA 활용",
    title: "Spring Data JPA Repository",
    tags: ["spring", "jpa", "db"],
    summary: "JpaRepository로 반복 CRUD 코드를 줄입니다.",
    goal: "save, findById, findAll, delete를 사용할 수 있습니다.",
    why: "단순 저장소 코드는 대부분 반복됩니다. Spring Data JPA는 반복 구현을 줄여 비즈니스 로직에 집중하게 합니다.",
    analogy: "Spring Data JPA는 기본 사무 업무를 대신 처리하는 직원입니다.",
    concepts: [["JpaRepository", "기본 CRUD 기능을 제공합니다."], ["Repository interface", "인터페이스만 작성해도 구현체가 생성됩니다."], ["ID type", "엔티티 식별자 타입을 지정합니다."]],
    steps: ["MemberRepository 인터페이스를 만듭니다.", "JpaRepository를 상속합니다.", "save와 findById를 사용합니다.", "없는 id 처리 방식을 정합니다."],
    pitfalls: ["Optional 반환을 무시하지 마세요.", "Repository에 비즈니스 규칙을 과도하게 넣지 마세요."]
  },
  {
    no: 21,
    id: "spring21_query_method",
    kind: "spring",
    part: "Spring Part 7. JPA 활용",
    title: "쿼리 메서드와 @Query",
    tags: ["spring", "jpa", "db"],
    summary: "메서드 이름 기반 쿼리와 JPQL @Query를 배웁니다.",
    goal: "findByName, findByStatusOrderByCreatedAtDesc 같은 조회를 작성합니다.",
    why: "기본 CRUD만으로는 실제 화면 요구사항을 처리하기 어렵습니다.",
    analogy: "쿼리 메서드는 정해진 문법으로 작성하는 주문서입니다. 복잡하면 @Query로 직접 설명합니다.",
    concepts: [["Query method", "메서드 이름을 분석해 쿼리를 만듭니다."], ["JPQL", "엔티티 객체를 대상으로 하는 쿼리 언어입니다."], ["@Query", "직접 쿼리를 작성합니다."]],
    steps: ["findByName 메서드를 만듭니다.", "상태별 조회 메서드를 만듭니다.", "@Query로 조건 조회를 작성합니다.", "실행 SQL을 로그로 확인합니다."],
    pitfalls: ["메서드 이름이 너무 길어지면 @Query나 Querydsl을 고려하세요.", "JPQL은 테이블이 아니라 엔티티 이름을 기준으로 작성합니다."]
  },
  {
    no: 22,
    id: "spring22_paging_sorting",
    kind: "spring",
    part: "Spring Part 7. JPA 활용",
    title: "페이징과 정렬",
    tags: ["spring", "jpa", "db"],
    summary: "Pageable과 Sort로 목록 API를 나누어 조회합니다.",
    goal: "page, size, sort 조건을 받아 목록을 반환합니다.",
    why: "전체 데이터를 한 번에 내려주면 서버와 클라이언트 모두 부담이 커집니다.",
    analogy: "페이징은 책을 한 장씩 넘기는 것입니다. 서점 전체 책을 한 번에 들고 오지 않습니다.",
    concepts: [["Pageable", "페이지 번호, 크기, 정렬 정보를 담습니다."], ["Page", "내용과 전체 개수 정보를 함께 가집니다."], ["Slice", "다음 페이지 존재 여부 중심으로 가볍게 조회합니다."]],
    steps: ["상품 목록 Repository에 Pageable을 추가합니다.", "Controller에서 page와 size를 받습니다.", "응답에 totalElements를 포함합니다.", "정렬 조건을 추가합니다."],
    pitfalls: ["페이지 번호가 0부터 시작하는지 1부터 시작하는지 API에서 명확히 하세요.", "큰 offset 페이징은 성능 문제가 생길 수 있습니다."]
  },
  {
    no: 23,
    id: "spring23_n_plus_one",
    kind: "spring",
    part: "Spring Part 7. JPA 활용",
    title: "지연 로딩, Fetch Join, N+1 문제",
    tags: ["spring", "jpa", "db"],
    summary: "JPA 성능 문제의 대표 사례인 N+1과 fetch join을 배웁니다.",
    goal: "연관 객체 조회 시 SQL이 몇 번 나가는지 확인하고 줄일 수 있습니다.",
    why: "JPA를 편하게 쓰다 보면 작은 코드가 수십 개 SQL을 만들 수 있습니다.",
    analogy: "N+1은 택배를 한 번에 받을 수 있는데 물건마다 따로 배송시키는 상황입니다.",
    concepts: [["Lazy loading", "필요할 때 연관 객체를 조회합니다."], ["N+1", "목록 1번 조회 후 각 행마다 추가 조회가 나갑니다."], ["fetch join", "연관 데이터를 한 번에 가져옵니다."]],
    steps: ["주문 목록을 조회합니다.", "주문별 회원 이름을 출력합니다.", "SQL 개수를 확인합니다.", "fetch join으로 줄입니다."],
    pitfalls: ["모든 연관관계를 즉시 로딩으로 바꾸는 것은 해결책이 아닙니다.", "fetch join과 페이징 조합은 주의가 필요합니다."]
  },
  {
    no: 24,
    id: "spring24_domain_design",
    kind: "spring",
    part: "Spring Part 7. JPA 활용",
    title: "도메인 모델 설계",
    tags: ["spring", "jpa", "backend"],
    summary: "회원, 상품, 주문, 주문상품 도메인을 객체로 설계합니다.",
    goal: "엔티티가 단순 데이터 상자가 아니라 비즈니스 규칙을 갖게 설계합니다.",
    why: "실무 프로젝트는 테이블을 그대로 코드로 옮기는 것보다 도메인 행동을 잘 배치하는 것이 중요합니다.",
    analogy: "도메인 모델은 회사 조직도입니다. 누가 어떤 책임을 갖는지 정해야 일이 흘러갑니다.",
    concepts: [["Entity behavior", "상태 변경 메서드를 엔티티 안에 둡니다."], ["Aggregate", "함께 일관성을 지켜야 하는 객체 묶음입니다."], ["Invariant", "항상 지켜야 하는 규칙입니다."]],
    steps: ["Order 엔티티에 cancel 메서드를 만듭니다.", "Product에 decreaseStock을 둡니다.", "Service에서 객체 행동을 호출합니다.", "규칙이 어디에 있는지 정리합니다."],
    pitfalls: ["엔티티를 getter/setter만 있는 구조로 만들지 마세요.", "모든 규칙을 Service에 몰아넣으면 도메인이 빈약해질 수 있습니다."]
  },
  {
    no: 25,
    id: "spring25_mvc_view",
    kind: "spring",
    part: "Spring Part 8. MVC 2와 웹 기능",
    title: "서버 사이드 렌더링과 Thymeleaf",
    tags: ["spring", "mvc", "backend"],
    summary: "API뿐 아니라 서버에서 HTML을 만들어 반환하는 MVC 화면 흐름을 배웁니다.",
    goal: "Controller가 Model에 데이터를 담고 View가 HTML로 출력하는 흐름을 이해합니다.",
    why: "REST API만 만드는 경우도 많지만, Spring MVC의 원리를 이해하려면 View 렌더링 흐름도 도움이 됩니다.",
    analogy: "Controller는 재료를 준비하고 View는 접시에 담아 손님에게 보여줍니다.",
    concepts: [["Model", "화면에 전달할 데이터를 담습니다."], ["View", "HTML 결과를 만듭니다."], ["Template", "데이터가 들어갈 자리가 있는 HTML입니다."]],
    steps: ["templates 폴더에 HTML을 만듭니다.", "Controller에서 model.addAttribute를 호출합니다.", "Thymeleaf 문법으로 값을 출력합니다.", "API 방식과 차이를 비교합니다."],
    pitfalls: ["REST Controller와 일반 Controller를 구분하세요.", "템플릿 경로와 파일 이름을 정확히 맞추세요."]
  },
  {
    no: 26,
    id: "spring26_cookie_session",
    kind: "spring",
    part: "Spring Part 8. MVC 2와 웹 기능",
    title: "쿠키, 세션, 로그인 기본",
    tags: ["spring", "http", "mvc"],
    summary: "HTTP가 상태를 기억하지 못한다는 점과 쿠키/세션으로 로그인 상태를 유지하는 법을 배웁니다.",
    goal: "쿠키와 세션의 차이, 로그인 상태 유지 원리를 설명합니다.",
    why: "로그인 기능은 거의 모든 웹 서비스의 기본입니다. 상태 유지 원리를 알아야 보안도 이해할 수 있습니다.",
    analogy: "쿠키는 손님이 들고 다니는 번호표이고, 세션은 가게 안 보관함에 저장된 손님 정보입니다.",
    concepts: [["Stateless", "HTTP는 기본적으로 이전 요청을 기억하지 않습니다."], ["Cookie", "브라우저에 저장되는 작은 값입니다."], ["Session", "서버가 사용자 상태를 보관합니다."]],
    steps: ["로그인 성공 시 세션에 memberId를 저장합니다.", "다음 요청에서 세션 값을 읽습니다.", "로그아웃 시 세션을 제거합니다.", "쿠키와 세션 저장 위치를 비교합니다."],
    pitfalls: ["민감한 정보를 쿠키에 그대로 넣지 마세요.", "세션 만료와 로그아웃 처리를 고려하세요."]
  },
  {
    no: 27,
    id: "spring27_filter_interceptor",
    kind: "spring",
    part: "Spring Part 8. MVC 2와 웹 기능",
    title: "필터와 인터셉터",
    tags: ["spring", "mvc", "backend"],
    summary: "공통 웹 요청 처리를 위한 Filter와 HandlerInterceptor를 배웁니다.",
    goal: "로그인 체크나 요청 로그를 공통 처리로 분리합니다.",
    why: "모든 Controller에 로그인 체크 코드를 복사하면 유지보수가 어렵습니다.",
    analogy: "필터와 인터셉터는 건물 입구 보안요원입니다. 방마다 보안요원을 둘 필요가 없습니다.",
    concepts: [["Filter", "Servlet 앞단에서 요청을 가로챕니다."], ["Interceptor", "Spring MVC Handler 실행 전후에 동작합니다."], ["공통 관심사", "여러 요청에 반복 적용되는 작업입니다."]],
    steps: ["요청 로그 필터를 만듭니다.", "로그인 체크 인터셉터를 만듭니다.", "특정 경로는 제외합니다.", "Controller 코드가 단순해지는지 확인합니다."],
    pitfalls: ["필터와 인터셉터 실행 위치가 다릅니다.", "정적 리소스나 로그인 페이지 제외 처리를 잊지 마세요."]
  },
  {
    no: 28,
    id: "spring28_file_upload",
    kind: "spring",
    part: "Spring Part 8. MVC 2와 웹 기능",
    title: "파일 업로드와 다운로드",
    tags: ["spring", "mvc", "backend"],
    summary: "MultipartFile로 파일을 받고 서버에 저장하는 흐름을 배웁니다.",
    goal: "파일 메타데이터와 실제 파일 저장 위치를 분리해서 생각합니다.",
    why: "프로필 이미지, 첨부파일, 상품 이미지 업로드는 웹 서비스에서 자주 필요합니다.",
    analogy: "파일 업로드는 택배 물건과 송장을 함께 받는 일입니다. 물건과 기록을 모두 관리해야 합니다.",
    concepts: [["MultipartFile", "업로드된 파일을 표현합니다."], ["Storage path", "실제 파일이 저장될 위치입니다."], ["Metadata", "원본 파일명, 저장 파일명, 크기 같은 정보입니다."]],
    steps: ["업로드 폼이나 API를 만듭니다.", "MultipartFile을 Controller에서 받습니다.", "UUID 파일명으로 저장합니다.", "DB에는 파일 메타데이터만 저장합니다."],
    pitfalls: ["사용자가 보낸 파일명을 그대로 저장하지 마세요.", "파일 크기 제한과 확장자 검증을 고려하세요."]
  },
  {
    no: 29,
    id: "spring29_mybatis",
    kind: "spring",
    part: "Spring Part 9. 다양한 DB 접근 기술",
    title: "MyBatis와 SQL Mapper",
    tags: ["spring", "db", "backend"],
    summary: "SQL을 직접 작성하면서 객체 매핑을 도와주는 MyBatis를 배웁니다.",
    goal: "JPA와 MyBatis의 장단점을 비교합니다.",
    why: "회사마다 JPA만 쓰지 않습니다. 복잡한 SQL 중심 프로젝트에서는 MyBatis도 많이 사용됩니다.",
    analogy: "MyBatis는 SQL을 직접 쓰되 결과 포장을 도와주는 도구입니다.",
    concepts: [["Mapper", "SQL과 Java 메서드를 연결합니다."], ["XML/Annotation SQL", "SQL을 명시적으로 작성합니다."], ["Result mapping", "조회 결과를 객체로 바꿉니다."]],
    steps: ["Mapper 인터페이스를 만듭니다.", "select SQL을 작성합니다.", "파라미터 바인딩을 사용합니다.", "JPA Repository와 비교합니다."],
    pitfalls: ["SQL 오타는 런타임에 발견될 수 있습니다.", "동적 SQL이 복잡해지면 읽기 어려워질 수 있습니다."]
  },
  {
    no: 30,
    id: "spring30_querydsl",
    kind: "spring",
    part: "Spring Part 9. 다양한 DB 접근 기술",
    title: "Querydsl 입문",
    tags: ["spring", "jpa", "db"],
    summary: "동적 쿼리를 타입 안전하게 작성하는 Querydsl의 필요성을 배웁니다.",
    goal: "검색 조건이 많아질 때 Querydsl이 왜 편한지 이해합니다.",
    why: "실무 검색 화면은 조건이 많습니다. 이름, 가격, 상태, 기간이 선택적으로 들어오면 단순 쿼리 메서드가 길어집니다.",
    analogy: "Querydsl은 조립식 쿼리 블록입니다. 필요한 조건 블록만 붙여 쿼리를 만듭니다.",
    concepts: [["Q Type", "엔티티 기반으로 생성되는 쿼리 타입입니다."], ["BooleanExpression", "조건식을 조립합니다."], ["동적 쿼리", "입력 조건에 따라 WHERE가 달라집니다."]],
    steps: ["상품 검색 조건 DTO를 만듭니다.", "조건이 있을 때만 where에 추가합니다.", "결과 DTO로 조회합니다.", "메서드 이름 쿼리와 비교합니다."],
    pitfalls: ["초반 설정이 어렵다면 먼저 JPQL을 익히세요.", "동적 조건 메서드를 작게 나누면 읽기 쉬워집니다."]
  },
  {
    no: 31,
    id: "spring31_aop_proxy",
    kind: "spring",
    part: "Spring Part 10. 고급 원리",
    title: "프록시와 AOP",
    tags: ["spring", "advanced", "backend"],
    summary: "공통 관심사를 핵심 로직 밖으로 분리하는 프록시와 AOP를 배웁니다.",
    goal: "로그, 시간 측정, 트랜잭션이 AOP와 어떻게 연결되는지 이해합니다.",
    why: "모든 메서드에 로그나 트랜잭션 코드를 복사하면 핵심 로직이 흐려집니다.",
    analogy: "프록시는 대리인입니다. 실제 대상 앞에서 부가 업무를 처리하고 넘깁니다.",
    concepts: [["Proxy", "대상 객체 대신 호출을 받는 객체입니다."], ["Advice", "부가 기능입니다."], ["Pointcut", "부가 기능을 적용할 위치를 고릅니다."]],
    steps: ["실행 시간 측정 AOP를 만듭니다.", "Service 메서드에 적용합니다.", "로그 출력 위치를 확인합니다.", "@Transactional도 프록시 기반임을 연결합니다."],
    pitfalls: ["내부 호출은 프록시를 거치지 않아 AOP가 적용되지 않을 수 있습니다.", "포인트컷 범위를 너무 넓게 잡지 마세요."]
  },
  {
    no: 32,
    id: "spring32_threadlocal",
    kind: "spring",
    part: "Spring Part 10. 고급 원리",
    title: "ThreadLocal과 로그 추적",
    tags: ["spring", "advanced", "backend"],
    summary: "요청별 trace id를 보관하는 ThreadLocal과 사용 후 정리의 중요성을 배웁니다.",
    goal: "동시 요청에서 각 요청의 로그 문맥을 분리하는 원리를 이해합니다.",
    why: "서버는 여러 요청을 동시에 처리합니다. 요청별 로그를 섞이지 않게 관리해야 장애 분석이 쉬워집니다.",
    analogy: "ThreadLocal은 직원별 개인 수첩입니다. 공용 칠판에 쓰지 않고 자기 수첩에 적습니다.",
    concepts: [["ThreadLocal", "스레드별 값을 저장합니다."], ["TraceId", "요청 흐름을 추적하는 id입니다."], ["remove", "사용 후 값을 정리합니다."]],
    steps: ["ThreadLocal에 trace id를 저장합니다.", "여러 메서드에서 같은 값을 읽습니다.", "요청 종료 후 remove를 호출합니다.", "remove를 빼면 어떤 위험이 있는지 정리합니다."],
    pitfalls: ["ThreadPool 환경에서 remove를 빼먹으면 다른 요청에 값이 섞일 수 있습니다.", "ThreadLocal은 편하지만 남용하지 마세요."]
  },
  {
    no: 33,
    id: "spring33_auto_config",
    kind: "spring",
    part: "Spring Part 11. Spring Boot 핵심 기능",
    title: "자동 설정과 Starter",
    tags: ["spring", "boot", "backend"],
    summary: "Spring Boot가 의존성을 보고 필요한 설정을 자동으로 구성하는 원리를 배웁니다.",
    goal: "starter-web을 추가하면 왜 내장 서버와 MVC가 준비되는지 이해합니다.",
    why: "자동 설정 덕분에 빠르게 시작하지만, 문제가 생기면 어떤 설정이 적용됐는지 알아야 합니다.",
    analogy: "Starter는 밀키트입니다. 필요한 재료와 기본 조리법이 함께 들어 있습니다.",
    concepts: [["Starter", "관련 의존성을 묶은 패키지입니다."], ["Auto Configuration", "조건에 따라 Bean을 자동 등록합니다."], ["Condition", "특정 클래스나 설정이 있을 때만 적용됩니다."]],
    steps: ["starter-web 의존성을 확인합니다.", "내장 Tomcat이 실행되는지 봅니다.", "자동 설정 보고서를 켜봅니다.", "직접 Bean을 등록해 자동 설정과 비교합니다."],
    pitfalls: ["자동 설정은 마법이 아니라 조건부 Bean 등록입니다.", "의존성 하나가 많은 설정을 끌고 올 수 있습니다."]
  },
  {
    no: 34,
    id: "spring34_external_config",
    kind: "spring",
    part: "Spring Part 11. Spring Boot 핵심 기능",
    title: "외부 설정, Profile, 설정 우선순위",
    tags: ["spring", "boot", "backend"],
    summary: "application.yml, profile, 환경변수로 환경별 설정을 나눕니다.",
    goal: "local, dev, prod 환경에서 다른 DB 주소와 로그 레벨을 적용합니다.",
    why: "개발 PC와 운영 서버는 설정이 다릅니다. 설정을 코드에 박아두면 배포와 보안이 위험해집니다.",
    analogy: "Profile은 계절별 옷장입니다. 여름과 겨울에 같은 옷을 입지 않습니다.",
    concepts: [["application.yml", "기본 설정 파일입니다."], ["Profile", "환경별 설정 그룹입니다."], ["환경변수", "서버 밖에서 주입하는 설정입니다."]],
    steps: ["application-local.yml을 만듭니다.", "spring.profiles.active를 지정합니다.", "환경변수로 값을 덮어씁니다.", "설정 우선순위를 표로 정리합니다."],
    pitfalls: ["운영 비밀번호를 Git에 올리지 마세요.", "현재 활성 Profile을 로그에서 확인하세요."]
  },
  {
    no: 35,
    id: "spring35_actuator_observability",
    kind: "spring",
    part: "Spring Part 11. Spring Boot 핵심 기능",
    title: "Actuator, Health Check, Metrics",
    tags: ["spring", "boot", "backend"],
    summary: "애플리케이션 상태와 지표를 확인하는 Actuator를 배웁니다.",
    goal: "헬스 체크와 메트릭이 운영에서 왜 중요한지 이해합니다.",
    why: "서비스는 만드는 것보다 운영하는 시간이 훨씬 깁니다. 상태를 볼 수 없으면 장애 대응이 어렵습니다.",
    analogy: "Actuator는 자동차 계기판입니다. 속도, 연료, 경고등을 보며 운전합니다.",
    concepts: [["Health", "애플리케이션 생존 상태를 확인합니다."], ["Metrics", "요청 수, 메모리, JVM 상태 같은 지표입니다."], ["Endpoint", "상태 정보를 제공하는 URL입니다."]],
    steps: ["actuator 의존성을 추가합니다.", "/actuator/health를 호출합니다.", "노출할 endpoint를 설정합니다.", "운영에서 공개 범위를 제한하는 이유를 적습니다."],
    pitfalls: ["Actuator endpoint를 무분별하게 외부 공개하지 마세요.", "헬스 체크가 항상 비즈니스 정상 상태를 의미하지는 않습니다."]
  },
  {
    no: 36,
    id: "spring36_todo_order_project",
    kind: "spring",
    part: "Spring Part 12. 종합 프로젝트",
    title: "Todo API에서 주문 API까지",
    tags: ["spring", "practice", "jpa", "backend"],
    summary: "Todo API로 CRUD를 익히고 주문 API로 검증, 예외, 트랜잭션, JPA를 종합합니다.",
    goal: "작은 기능을 계층 구조로 만들고 점진적으로 실무형 API로 확장합니다.",
    why: "개념을 많이 알아도 프로젝트로 연결하지 못하면 실력이 붙지 않습니다. 작은 완성 경험이 중요합니다.",
    analogy: "종합 프로젝트는 배운 재료로 처음 코스 요리를 만드는 시간입니다.",
    concepts: [["CRUD", "생성, 조회, 수정, 삭제입니다."], ["Order domain", "회원, 상품, 주문, 재고가 함께 움직입니다."], ["Transaction", "주문 저장과 재고 감소를 하나로 묶습니다."]],
    steps: ["Todo 생성/조회/완료/삭제 API를 만듭니다.", "메모리 저장소를 JPA 저장소로 바꿉니다.", "상품/회원/주문 엔티티를 추가합니다.", "주문 생성에 검증과 트랜잭션을 적용합니다."],
    pitfalls: ["처음부터 모든 기능을 넣지 마세요.", "작동하는 작은 단위마다 테스트를 추가하세요."]
  },
  {
    no: 37,
    id: "spring37_deploy_review",
    kind: "spring",
    part: "Spring Part 12. 종합 프로젝트",
    title: "배포 전 점검과 다음 학습 순서",
    tags: ["spring", "boot", "practice"],
    summary: "빌드, 테스트, 설정, 로그, DB 마이그레이션, 다음 학습 주제를 정리합니다.",
    goal: "로컬에서 만든 Spring Boot 프로젝트를 배포 가능한 상태로 점검합니다.",
    why: "실무에서는 내 PC에서만 되는 코드가 아니라 서버에서 안정적으로 실행되는 코드가 필요합니다.",
    analogy: "배포 전 점검은 여행 전 짐 검사입니다. 여권, 충전기, 숙소 주소를 확인하지 않으면 길에서 고생합니다.",
    concepts: [["Build", "실행 가능한 산출물을 만듭니다."], ["Test", "기능이 깨지지 않았는지 확인합니다."], ["Migration", "DB 구조 변경을 관리합니다."]],
    steps: ["./gradlew test를 실행합니다.", "./gradlew build를 실행합니다.", "운영 Profile 설정을 분리합니다.", "로그와 헬스 체크를 확인합니다."],
    pitfalls: ["운영 DB 설정을 로컬 설정과 섞지 마세요.", "테스트를 건너뛰고 배포하는 습관은 위험합니다."]
  }
];

const expandedJavaSpringChapters = [
  ...expandedJavaTopics.map(makeJavaSpringChapter),
  ...expandedSpringTopics.map(topic => makeJavaSpringChapter({
    ...topic,
    no: expandedJavaTopics.length + topic.no
  }))
];

function buildJavaSpringPracticeSteps(chapter) {
  const steps = [];
  const firstExample = chapter.examples?.[0];
  const isSpring = chapter.tags?.includes("spring") || chapter.tags?.includes("boot");
  const isDb = chapter.tags?.includes("db") || chapter.tags?.includes("jpa");

  steps.push(`
    <strong>먼저 이 장의 핵심 질문을 적습니다.</strong>
    예를 들어 "${chapter.title}은 왜 필요한가?"라고 쓰고, 답을 한 문장으로 예상해 보세요.
    초보자는 정답을 맞히는 것보다 공부하기 전에 머릿속에 빈칸을 만드는 과정이 더 중요합니다.
  `);

  steps.push(`
    <strong>예제 코드는 손으로 직접 입력합니다.</strong>
    복사해서 붙여넣기보다 직접 입력하면 괄호, 세미콜론, 어노테이션 위치가 눈에 익습니다.
    빨간 줄이 나오면 바로 지우지 말고 오류 메시지의 첫 줄을 읽어보세요.
  `);

  if (firstExample?.sql) {
    steps.push(`
      <strong>첫 번째 예제를 가장 작은 단위로 실행합니다.</strong>
      Java 장이라면 <code>main</code> 메서드에서 실행하고, Spring 장이라면 서버를 켠 뒤 브라우저나 HTTP 도구로 요청을 보내세요.
      ${code(firstExample.sql)}
    `);
  }

  if (isSpring) {
    steps.push(`
      <strong>Spring 장에서는 요청 흐름을 화살표로 그립니다.</strong>
      브라우저 또는 HTTP 클라이언트 → Controller → Service → Repository → DB 순서로 적고,
      지금 작성한 코드가 어느 칸에 속하는지 표시하세요. 이 습관이 생기면 파일이 많아져도 길을 잃지 않습니다.
    `);
  }

  if (isDb) {
    steps.push(`
      <strong>DB/JPA 장에서는 실제 SQL을 상상합니다.</strong>
      Repository 메서드 하나를 실행했을 때 SELECT, INSERT, UPDATE, DELETE 중 무엇이 나갈지 먼저 예상하세요.
      JPA는 편리하지만 DB에서 무슨 일이 일어나는지 모르면 성능 문제를 만나기 쉽습니다.
    `);
  }

  steps.push(`
    <strong>한 가지만 바꿔 다시 실행합니다.</strong>
    변수값 하나, URL 하나, 조건 하나만 바꾸세요. 한 번에 여러 곳을 바꾸면 결과가 왜 달라졌는지 알기 어렵습니다.
  `);

  steps.push(`
    <strong>마지막에는 나만의 말로 3줄 요약을 남깁니다.</strong>
    1줄째는 "왜 쓰는가", 2줄째는 "코드에서 어떻게 쓰는가", 3줄째는 "주의할 점"을 적습니다.
    이 3줄 요약이 쌓이면 나중에 Spring Boot 프로젝트를 만들 때 훨씬 빨리 복습할 수 있습니다.
  `);

  return steps;
}

function buildBeginnerPracticeSteps(chapter) {
  if (chapter.practiceSteps?.length) {
    return chapter.practiceSteps;
  }

  if (chapter.course === "vue") {
    return vuePracticeSteps[chapter.id] || [];
  }

  if (chapter.course === "javaSpring") {
    return buildJavaSpringPracticeSteps(chapter);
  }

  const steps = [];
  const firstExample = chapter.examples?.[0];
  const isSqlChapter = chapter.tags?.some(tag => ["basic", "mysql", "sqld", "gisa", "advanced", "postgres"].includes(tag));
  const isToolChapter = chapter.tags?.some(tag => ["redis", "elasticsearch", "search"].includes(tag));

  steps.push(`
    <strong>실습 전에 이 장의 목표를 한 문장으로 적습니다.</strong>
    예를 들어 "JOIN은 흩어진 표를 연결해서 한 번에 보는 기술이다"처럼 적어 보세요.
    처음 공부할 때는 명령어를 외우는 것보다 "왜 이 기능이 필요한가"를 먼저 잡아야 다음 예제가 덜 낯설게 보입니다.
  `);

  if (isSqlChapter) {
    steps.push(`
      <strong>실습창의 기본 데이터를 먼저 눈으로 확인합니다.</strong>
      바로 문제를 풀지 말고 <code>SELECT * FROM customers;</code>, <code>SELECT * FROM orders;</code>처럼
      관련 테이블을 한 번 조회해 보세요. SQL은 지도 없이 주소를 찾는 공부가 아니라, 먼저 테이블 모양을 본 뒤 질문을 만드는 공부입니다.
    `);
  }

  if (isToolChapter) {
    steps.push(`
      <strong>도구 이름과 역할을 분리해서 적습니다.</strong>
      MySQL은 원본 장부, Redis는 자주 보는 메모지, Elasticsearch는 빠른 검색 색인처럼 생각하세요.
      이 장의 명령을 실행하기 전에 "어떤 값을 어디에 넣고, 어떤 방식으로 다시 찾는가"를 먼저 표시해 두면 헷갈림이 줄어듭니다.
    `);
  }

  if (firstExample?.sql) {
    steps.push(`
      <strong>첫 번째 예제는 수정하지 말고 그대로 실행합니다.</strong>
      처음부터 응용하려고 하면 오타와 개념 오류가 섞여서 어디가 문제인지 찾기 어렵습니다.
      아래 예제를 먼저 그대로 실행하고, 결과 행 수와 컬럼 이름을 확인하세요.
      ${code(firstExample.sql)}
    `);
  }

  steps.push(`
    <strong>그 다음 한 가지만 바꿔 다시 실행합니다.</strong>
    컬럼 하나를 빼거나, 조건값을 바꾸거나, 정렬 방향을 <code>ASC</code>에서 <code>DESC</code>로 바꾸는 식이면 충분합니다.
    한 번에 여러 군데를 바꾸면 결과가 왜 바뀌었는지 추적하기 어렵습니다.
  `);

  steps.push(`
    <strong>일부러 작은 에러를 내고 에러 문장을 읽습니다.</strong>
    쉼표 하나를 빼거나 테이블 이름을 틀리게 적어 보세요.
    에러를 피하는 공부만 하면 실제 개발에서 멈추기 쉽습니다. 에러 메시지는 "어디부터 다시 봐야 하는지 알려주는 안내판"이라고 생각하면 됩니다.
  `);

  if (chapter.drills?.length) {
    steps.push(`
      <strong>연습문제는 바로 정답을 보지 말고 3단계로 풉니다.</strong>
      먼저 문제에서 원하는 결과를 말로 풀어 쓰고, 그 다음 필요한 테이블과 컬럼을 적고, 마지막에 SQL이나 명령을 작성하세요.
      5분 이상 막히면 힌트를 보고, 그래도 어렵다면 정답을 따라 친 뒤 한 줄씩 뜻을 설명해 보세요.
    `);
  }

  steps.push(`
    <strong>마지막에는 오늘 배운 것을 "언제 쓰는지"로 정리합니다.</strong>
    예를 들어 "인덱스는 검색을 빠르게 하지만 쓰기 비용이 생긴다", "정규화는 중복을 줄여 데이터가 꼬이는 일을 막는다"처럼
    장점과 주의점을 함께 적으면 실무 감각이 훨씬 빨리 붙습니다.
  `);

  return steps;
}

const allChapters = [...chapters, ...vueChapters, ...expandedJavaSpringChapters];

export const curriculum = allChapters.map(chapter => {
  const course = chapter.course || "sql";
  const baseChapter = {
    course,
    ...chapter,
    ...learningGuides[chapter.id]
  };
  const lessonExtras = {
    ...learningGuides[chapter.id],
    practiceSteps: buildBeginnerPracticeSteps(baseChapter)
  };

  return {
    course,
    ...chapter,
    ...lessonExtras,
    content: renderLesson({ ...chapter, course, ...lessonExtras })
  };
});
