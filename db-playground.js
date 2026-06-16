// db-playground.js - Browser SQL playground powered by SQL.js
// The study text focuses on MySQL and PostgreSQL. The embedded playground uses
// SQLite-compatible SQL so it can run fully in the browser without a server.

let SQL = null;
let db = null;

export async function initDatabase() {
  if (!SQL) {
    if (typeof window.initSqlJs !== "function") {
      throw new Error("SQL.js 라이브러리가 아직 로드되지 않았습니다. 네트워크 연결을 확인하세요.");
    }

    SQL = await window.initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });
  }

  db = new SQL.Database();
  db.run("PRAGMA foreign_keys = ON;");

  createEmpSchema();
  createShopSchema();

  return true;
}

function createEmpSchema() {
  db.run(`
    CREATE TABLE DEPT (
      DEPTNO INT PRIMARY KEY,
      DNAME VARCHAR(14),
      LOC VARCHAR(13)
    );

    CREATE TABLE EMP (
      EMPNO INT PRIMARY KEY,
      ENAME VARCHAR(10),
      JOB VARCHAR(9),
      MGR INT,
      HIREDATE DATE,
      SAL DECIMAL(7,2),
      COMM DECIMAL(7,2),
      DEPTNO INT,
      FOREIGN KEY (DEPTNO) REFERENCES DEPT(DEPTNO)
    );

    CREATE TABLE SALGRADE (
      GRADE INT,
      LOSAL INT,
      HISAL INT
    );

    CREATE TABLE TEMP_DATA (
      ID INT
    );
  `);

  db.run(`
    INSERT INTO DEPT VALUES
      (10, 'ACCOUNTING', 'NEW YORK'),
      (20, 'RESEARCH', 'DALLAS'),
      (30, 'SALES', 'CHICAGO'),
      (40, 'OPERATIONS', 'BOSTON');

    INSERT INTO EMP VALUES
      (7369, 'SMITH', 'CLERK', 7902, '1980-12-17', 800, NULL, 20),
      (7499, 'ALLEN', 'SALESMAN', 7698, '1981-02-20', 1600, 300, 30),
      (7521, 'WARD', 'SALESMAN', 7698, '1981-02-22', 1250, 500, 30),
      (7566, 'JONES', 'MANAGER', 7839, '1981-04-02', 2975, NULL, 20),
      (7654, 'MARTIN', 'SALESMAN', 7698, '1981-09-28', 1250, 1400, 30),
      (7698, 'BLAKE', 'MANAGER', 7839, '1981-05-01', 2850, NULL, 30),
      (7782, 'CLARK', 'MANAGER', 7839, '1981-06-09', 2450, NULL, 10),
      (7788, 'SCOTT', 'ANALYST', 7566, '1987-04-19', 3000, NULL, 20),
      (7839, 'KING', 'PRESIDENT', NULL, '1981-11-17', 5000, NULL, 10),
      (7844, 'TURNER', 'SALESMAN', 7698, '1981-09-08', 1500, 0, 30),
      (7876, 'ADAMS', 'CLERK', 7788, '1987-05-23', 1100, NULL, 20),
      (7900, 'JAMES', 'CLERK', 7698, '1981-12-03', 950, NULL, 30),
      (7902, 'FORD', 'ANALYST', 7566, '1981-12-03', 3000, NULL, 20),
      (7934, 'MILLER', 'CLERK', 7782, '1982-01-23', 1300, NULL, 10);

    INSERT INTO SALGRADE VALUES
      (1, 700, 1200),
      (2, 1201, 1400),
      (3, 1401, 2000),
      (4, 2001, 3000),
      (5, 3001, 9999);

    INSERT INTO TEMP_DATA VALUES (1), (2), (3);
  `);
}

function createShopSchema() {
  db.run(`
    CREATE TABLE CUSTOMERS (
      CUSTOMER_ID INT PRIMARY KEY,
      NAME VARCHAR(50) NOT NULL,
      EMAIL VARCHAR(80) NOT NULL,
      JOIN_DATE DATE NOT NULL
    );

    CREATE TABLE PRODUCTS (
      PRODUCT_ID INT PRIMARY KEY,
      NAME VARCHAR(100) NOT NULL,
      CATEGORY VARCHAR(50) NOT NULL,
      PRICE DECIMAL(10,2) NOT NULL,
      STOCK INT NOT NULL
    );

    CREATE TABLE ORDERS (
      ORDER_ID INT PRIMARY KEY,
      CUSTOMER_ID INT NOT NULL,
      ORDER_DATE DATE NOT NULL,
      TOTAL_AMOUNT DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMERS(CUSTOMER_ID)
    );

    CREATE TABLE ORDER_DETAILS (
      DETAIL_ID INT PRIMARY KEY,
      ORDER_ID INT NOT NULL,
      PRODUCT_ID INT NOT NULL,
      QUANTITY INT NOT NULL,
      UNIT_PRICE DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ORDER_ID),
      FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(PRODUCT_ID)
    );
  `);

  db.run(`
    INSERT INTO CUSTOMERS VALUES
      (1, 'Kim Chulsoo', 'chulsoo@example.com', '2026-01-15'),
      (2, 'Lee Younghee', 'younghee@example.com', '2026-02-10'),
      (3, 'Park Minsu', 'minsu@example.com', '2026-03-01'),
      (4, 'Choi Suji', 'suji@example.com', '2026-04-12'),
      (5, 'Jung Woosung', 'woosung@example.com', '2026-05-05');

    INSERT INTO PRODUCTS VALUES
      (101, 'iPhone 15 Pro', 'Electronics', 1500000.00, 50),
      (102, 'Galaxy S24', 'Electronics', 1300000.00, 60),
      (103, 'MacBook Air M3', 'Electronics', 1800000.00, 30),
      (201, 'Wind Jacket', 'Clothing', 89000.00, 100),
      (202, 'Denim Pants', 'Clothing', 59000.00, 150),
      (301, 'Premium Bagel', 'Food', 4500.00, 500),
      (302, 'Colombia Coffee Beans 1kg', 'Food', 32000.00, 120);

    INSERT INTO ORDERS VALUES
      (1001, 1, '2026-05-10', 1589000.00),
      (1002, 2, '2026-05-12', 1359000.00),
      (1003, 1, '2026-05-15', 9000.00),
      (1004, 3, '2026-05-18', 1800000.00),
      (1005, 4, '2026-05-20', 148000.00),
      (1006, 2, '2026-05-22', 32000.00);

    INSERT INTO ORDER_DETAILS VALUES
      (5001, 1001, 101, 1, 1500000.00),
      (5002, 1001, 201, 1, 89000.00),
      (5003, 1002, 102, 1, 1300000.00),
      (5004, 1002, 202, 1, 59000.00),
      (5005, 1003, 301, 2, 4500.00),
      (5006, 1004, 103, 1, 1800000.00),
      (5007, 1005, 201, 1, 89000.00),
      (5008, 1005, 202, 1, 59000.00),
      (5009, 1006, 302, 1, 32000.00);
  `);
}

export function runQuery(sql) {
  if (!db) {
    return { columns: [], values: [], error: "데이터베이스가 아직 초기화되지 않았습니다." };
  }

  const startTime = performance.now();

  try {
    const result = db.exec(sql.trim());
    const executionTime = (performance.now() - startTime).toFixed(2);

    if (result.length === 0) {
      const rowsChanged = db.getRowsModified();
      return {
        columns: ["status"],
        values: [[`Query OK. affected rows: ${rowsChanged}`]],
        error: null,
        executionTime,
        rowCount: rowsChanged
      };
    }

    return {
      columns: result[0].columns,
      values: result[0].values,
      error: null,
      executionTime,
      rowCount: result[0].values.length
    };
  } catch (err) {
    return {
      columns: [],
      values: [],
      error: err.message,
      executionTime: (performance.now() - startTime).toFixed(2),
      rowCount: 0
    };
  }
}

export function getDatabaseSchema() {
  if (!db) return [];

  try {
    const tablesResult = db.exec(`
      SELECT name
      FROM sqlite_master
      WHERE type IN ('table', 'view')
        AND name NOT LIKE 'sqlite_%'
      ORDER BY type, name;
    `);

    if (tablesResult.length === 0) return [];

    return tablesResult[0].values.map(([table]) => {
      const columnsResult = db.exec(`PRAGMA table_info(${table});`);
      const columns = columnsResult[0]?.values.map(col => ({
        cid: col[0],
        name: col[1],
        type: col[2],
        notnull: col[3] === 1,
        dflt_value: col[4],
        pk: col[5] === 1
      })) || [];

      return { table, columns };
    });
  } catch (err) {
    console.error("Error fetching schema:", err);
    return [];
  }
}
