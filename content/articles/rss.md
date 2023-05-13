---
title: "RSS 사용법 메모"
date: 2022-12-25T18:59:17+09:00
thumbnail: /content/articles/thumbnail/rss.jpg
tags: [메모]
draft: false
---
주기적으로 웹사이트를 방문하여 정보를 확인하는 것이 시간을 너무 많이 낭비하게 하는 것 같기도 하고, 피로감도 어느 정도 느껴지는 것 같아 RSS를 사용해보기로 했다.

### RSS 앱 선택
- [🌐 NetNewsWire](https://github.com/Ranchero-Software/NetNewsWire) \
Mac과 ios를 타겟으로 하는 오픈소스 RSS 앱이다. 기본적으로는 로컬에 데이터를 저장하고, iCloud를 이용하여 동기화 할 수도 있는 등 어느정도 필요한 기능을 모두 갖추고 있다.
개인적으로 따로 계정을 만들 필요가 없고 가볍다는 점이 마음에 들었다.

### RSS 주소 찾기

- **일반 블로그** \
블로그 같은 경우는 주로 RSS를 지원하므로, RSS 주소를 직접 찾아주면 된다. 주로 `/rss.xml`, `/index.xml` 혹은 `/rss` 를 띈다.

- **트위터** \
트위터 같은 경우는 RSS를 공식적으로 지원하지 않기 때문에 [rsshub](https://docs.rsshub.app/en/social-media.html#twitter)를 사용하여 RSS를 가져온다. https://rsshub.app/twitter/user/username의 주소 형식으로 사용하면 된다.

- **Github** \
Github의 경우에는 https://api.github.com/feeds 에 token과 함께 요청하면 RSS 관련 주소들을 확인 할 수 있다. 
여기서 `current_user` 항목의 경우에는 유저의 대시보드 피드를 보여주는데 특정 토큰과 함께 다음과 같은 주소 [user.private.atom?token=](https://github.com/user.private.atom?token=) 로 제공된다. 
이 특정 토큰의 경우에 어떻게 재발급 및 삭제 하는지에 대해서는 더 찾아봐야겠다. \
[stackoverflow.com - 참고](https://stackoverflow.com/questions/74244555/revoke-generate-github-personal-news-rss-feed-token)

- **그 외** \
[rsshub 참고](https://docs.rsshub.app/en/)

### 구독 목록
- https://rsshub.app/twitter/user/simnalamburt
- https://kdy1.github.io/index.xml
- https://github.com/cjaewon.private.atom?token=
- http://feeds.feedburner.com/geeknews-feed
- https://milkclouds.work/rss/
- 외 네이버 블로그 ...





