# Development Learning Book

SQL과 Vue.js를 처음 배우는 사람을 위한 단계별 학습서입니다. SQL은 MySQL, PostgreSQL, Redis, Elasticsearch까지 확장하고, Vue.js는 Todo 앱과 쇼핑몰 예제로 Composition API, Router, API 통신, Pinia, TypeScript를 익히도록 구성했습니다.

## Live Demo

https://sql-learning-book.vercel.app

## 학습 범위

### SQL

- RDBMS와 NoSQL의 차이
- MySQL 설치와 학습 환경 세팅
- SELECT, WHERE, JOIN, GROUP BY, 서브쿼리, CTE
- 테이블 설계, 제약 조건, 정규화, ERD
- 인덱스와 EXPLAIN 실행 계획
- 트랜잭션과 동시성
- PostgreSQL 고급 타입, 고급 SQL, 인덱스, MVCC
- Redis 입문, 자료구조, 캐시 패턴, 운영 심화
- Elasticsearch 입문과 로컬 실습 환경

### Vue.js

- Vue 3와 Composition API 큰 그림
- Vite 기반 개발 환경과 프로젝트 구조
- 템플릿 문법, 반응형 상태, 이벤트, v-model
- Todo 앱으로 배우는 컴포넌트, Props, Emit, computed, watch, lifecycle
- Composables와 React Custom Hook 비교
- 쇼핑몰 예제로 배우는 Vue Router, API 통신, Pinia, Slots, Teleport, Transition
- TypeScript 점진 적용과 프로젝트 구조 리팩토링
- React에서는 어떤 기능에 해당하는지 비교 설명

## 로컬 실행

Node.js가 설치되어 있다면 아래 명령으로 실행할 수 있습니다.

```bash
npm install
npm run dev
```

브라우저에서 아래 주소를 열면 됩니다.

```text
http://127.0.0.1:3000/
```

윈도우에서는 `start-localhost.bat` 파일을 더블클릭해도 로컬 서버를 실행할 수 있습니다.

## 빌드

```bash
npm run build
```
