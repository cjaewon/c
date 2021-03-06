---
title: "Yarn과 함께 모노레포 흟어보기"
date: 2021-03-06T20:39:51+09:00
description: 자바스크립트 생태계의 발전으로 프론트, 백엔드 및 다양한 환경들을 지원 할 수 있게 되었다. 이런 상황에서부터 여러 프로젝트에서 중복되는 코드들을 여러번 작성해야하는 문제가 발생했다. 이 문제를 해결하기 위해서 등장한 것이 바로 모노레포 개념이다.
thumbnail: /content/articles/thumbnail/monorepo-with-yarn.jpg
tags: [Nodejs]

draft: false
---
자바스크립트 생태계의 발전으로 프론트, 백엔드 및 다양한 환경들을 지원 할 수 있게 되었다. 이런 상황에서부터 여러 프로젝트에서 중복되는 코드들을 여러번 작성해야하는 문제가 발생했다.
이 문제를 해결하기 위해서 등장한 것이 바로 **모노레포(monorepo)** 개념이다.

그중 가장 쉽게 접할 수 있는 yarn의 workspace를 이용하면 간단하게 모노레포를 사용 할 수 있다.
<!-- 먼저 모노레포 중복된 코드를 재활용하는 방법은 프로젝트가 각각 모듈로써 동작하게 하는 것이다. -->

## Yarn's Workspace
먼저 다음과 같이 package.json 파일에 workspaces 라는 필드를 추가해준다. (`private: true` 은 필수로 모노레포가 외부로 패키지처럼 배포될 수 없음을 알려준다.)
```json
{
  "name": "monorepo-test",
  "private": true, 
  "workspaces": [
    "server",
    "admin-server",
    "common"
  ]
}
```
이로써 Yarn에게 workspaces에 명시된 프로젝트들을 모노레포로 사용한다는 것을 알려줄 수 있다. server, admin-server, common 이라는 하위 폴더들을 생성한 후에 package.json을 각각 생성해준다. (workspaces의 이름은 하위 폴더의 package.json의 name을 명시한다, 폴더 이름이 아님)

명시된 하위 폴더들은 모듈처럼 작동하게 된다. 따라서 서로서로 참조 할 수 있다. 이러한 방법으로 모노레포는 중복된 코드들을 재활용한다.

## 모노레포의 다른 프로젝트 코드 재활용하기
Yarn Workspace를 사용하는 모노레포에서는 코드를 재사용하기가 매우 쉽다. 먼저 `yarn install` 을 입력하면 최상위 노드모듈에 [링크 파일](https://jhnyang.tistory.com/269)로 각각의 workspaces들을 생성한다. 그 후 코드를 사용하고자 하는 프로젝트의 package.json에 다음과 같이 디펜더시를 추가해준다.

```json
{
  "name": "server",
  "license": "MIT",
  "dependencies": {
    "common": "*"
  }
}
```
그럼 다음과 같이 server 프로젝트에서 common 프로젝트의 코드를 사용 할 수 있다.

```js
// server/index.js
const database = require('common/database');

// common/database.js
const mysql2 = require('mysql2');
module.require = mysql2.createConnection('mysql://username:passwo..');
```

위에서 최상위 노드모듈에 링크 파일로써 생성한다고 말했었다. 사실 workspaces들의 모든 모듈(mysql2, express)들 또한 최상위 노드모듈에 설치된다. 따라서 각각의 프로젝트들이 중복해서 설치한 모듈들은 하나만 설치되는 장점이 있다.

## 깊게 들어가기
### TypeScript와 함께 쓰기
위 예제에서는 자바스크립트로 작성하였기 때문에 바로 `require` 해서 사용 할 수 있었다.

하지만 모노레포에서의 각각 패키지는 모듈처럼 동작하기 때문에 따로 타입스크립트가 함께 컴파일하지 않는다.
따라서 NodeJS가 이해 할 수 있도록 변환하는 과정이 필요한데, 가장 쉬운 방법은 컴파일 된 자바스크립트 코드와 타입들이 포함된 dist 자체를 `import` 하여 사용 하는 것이다.

```ts
// server/index.ts
import database from 'common/dist/database';
database.ping();

// common/database.ts
// tsc -d 를 통하여 타입과 자바스크립트를 생성 <중요>
import mysql2 from 'mysql2';

const connection = mysql2.createConnection('mysql://username:passwo..');
export default connection;
```

### Docker로 배포하기
일반적으로 도커와 함께 사용한다면 server와 admin-server와 같이 프로젝트 별로 다른 컨테이너로 사용하는 경우가 많을 것 이다. 이를 위해서는 다음과 같이 Dockerfile에 사용하고자하는 workspace 만 COPY 한 후 `yarn install --production` 해준다.

(이 경우에는 common, server의 의존성만 설치되고 admin-server의 의존성은 설치되지 않는다.)
```Dockerfile
FROM node:14
WORKDIR /app

COPY ./package.json .
COPY ./server/package.json ./server/package.json
COPY ./common/package.json ./common/package.json

RUN yarn install --production

COPY ./server/dist ./server/dist
COPY ./common/dist ./common/dist

WORKDIR /app/server

ENV NODE_ENV production

EXPOSE 8000
CMD [ "node", "dist/server.js" ]
```

## 마치면서
이 글을 통해 모노레포에 대해서 간단하게 흟어봤다. 요약하자면 모노레포를 사용하면 코드 재사용부터 중복 모듈 한번만 설치 등 편리한 기능들을 사용 할 수 있다. yarn 외에도 [lerna](https://github.com/lerna/lerna) 라고 불리는 도구가 있는데 모노레포에 더 관심이 있으시면 참고하시면 좋을 것 같다.