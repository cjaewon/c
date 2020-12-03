---
title: "🌟 블로그를 시작하며"
date: 2020-10-31T19:29:53+09:00
tags: [블로그]
draft: false
---

> **한줄 요약** 블로그를 시작합니다. 많은 관심 부탁드립니다. 🙇

## 블로그 유목생활
여러 개발자 분들이 블로그에 글을 쓰시는 것을 보고는 블로그를 시작하자고 마음을 먹었다.
먼저 글을 쓰기 앞서서는 플랫폼을 결정해야 했었다.

고려한 플랫폼 은 총 3개가 있었다.

- **Velog** 트랜딩 시스템을 통해 글 노출이 싶다는 점, 한국인 개발자분들이 대부분이셔서 피드백이 활발한 점
- **Medium** 페이지 커스텀이 가능한 점, 정말 환상적인 에디터
- **Static Site(플랫폼 X)** 매우 높은 자유도, 도메인 연결 가능 

사실상 나는 Velog 에 주로 글을 썻다. 하지만 그때까지도 위 세개 플랫폼 중에 결정을 못 한 상태였다.
또한 이는 블로깅 하는 것을 망설이게 하는 경향도 있었다. 몇 달간 블로깅을 멈춘 상태에서 **깃허브 트랜딩** 에서 정적 사이트로 만들어진 멋진 블로그들을 보게되었다.
결국 정적 사이트에 매료되고 정착하자고 마음을 먹었다.

## 기술적 이야기
### 정적 사이트
블로그의 노선을 정적 사이트로 정하고 나서 기술 스택을 선택해야 했었다. 관심있게 봤었던 정적 사이트 생성기 중에는 [Gastby](https://www.gatsbyjs.com/), [Hugo](https://gohugo.io/) 가 있었다.

- ⚛️ **Gatsby**  
React 와 Graphql 를 사용하는 정적 사이트 생성기로 리액트와 정적 사이트의 장점을 다 포함한다는게 인상깊었다.

- 🚀 **Hugo**  
빠른 빌드 속도와 Go 언어의 Template 를 지원하고 무엇보다 단일 바이너리라는 점이 맘에 들었다.

---

그렇게 2개 다 사용해본 결과 **Hugo** 를 선택하게 되었다. **Gatsby** 같은 경우는 기능을 사용할때마다 필요한 plugin 들, sharp 리사이징 오류 등 있다는 점이 부담스러웠다.

지금 글을 쓰는 시점에서 느낀 점은 **Hugo** 를 선택한 것은 좋은 선택이였던 것 같다.
 **Hugo**(확장 기능)에서 자체적으로 제공하는 자바스크립트 번들러(esbuild), scss 번들러도 너무 도움이 됐다.

### SPA 흉내내기
Gatsby (React) 를 쓸 때 앱처럼 이동되는 spa 특성이 부러웠다. 어느 날 Github 대시보드에서 팔로잉 하는 분이 [turbolinks](https://github.com/turbolinks/turbolinks) 라이브러리 스타를 누르신 것을 보고 처음 알게되었다.
```js
import turbolinks from 'turbolinks';

turbolinks.start();
```
간단한 코드를 통해 정적 사이트에서 보다 높은 사용자 경험을 제공할 수 있게 되었다.

### 자동빌드
블로그 글을 업데이트와 코드를 수정을 할때 마다 매번 빌드, 배포를 하는 일은 자주 발생할 것 같아 자동화가 필요했었다.
github page 에서 호스팅 되는 겸 **Github Action** 을 사용하여 자동빌드를 구현했다.

```yml
- name: Setup Hugo
  uses: peaceiris/actions-hugo@v2
  with:
    hugo-version: '0.78.0'
    extended: true
      
- name: Setup Nodejs
  uses: actions/setup-node@v1
  with:
      node-version: '14'
      
- name: Build
  run: |
    npm install --prefix ./assets/scripts
    hugo --gc --minify
    echo "c.cjaewon.com" > ./public/CNAME
    touch ./public/.nojekyll
    
- name: Deploy to GitHub Pages
  uses: JamesIves/github-pages-deploy-action@3.7.1
  with: 
    GIT_CONFIG_NAME: github-actions[bot]
    GIT_CONFIG_EMAIL: github-actions[bot]@users.noreply.github.com
    BRANCH: gh-pages # The branch the action should deploy to.
    FOLDER: public # The folder the action should deploy.
    CLEAN: true # Automatically remove deleted files from the deploy branch
```

## 앞으로
🙏 다른 개발자분들이 그랬던 것 처럼 기술 관련 글, 강좌 등 나만의 이야기를 써보는 계기가 되면 좋을 것 같다.
( 전에와 다르게 블로그 글을 성실하게 썻으면 좋겠다. )

[RSS 구독하기](/index.xml)  
[메인으로](/)