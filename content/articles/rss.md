---
title: "RSS 사용법 메모"
date: 2022-12-25T18:59:17+09:00
thumbnail: /content/articles/thumbnail/rss.jpg
draft: false
---
주기적으로 웹사이트를 방문하여 정보를 확인하는 것은 너무 비효율적인 것 같아 RSS를 사용하여 정보를 받아보기로 했다.

### RSS용 앱 (Mac용 / ios용)
- [🌐 NetNewsWire](https://github.com/Ranchero-Software/NetNewsWire) \
오픈소스 RSS 앱으로 Mac과 ios를 지원하며 설치형이다. 기본적으로는 로컬에 데이터를 저장하고 원한다면 iCloud를 이용하여 동기화 할 수도 있다.

### RSS 주소 찾기

- **일반 블로그** \
주로 RSS를 지원하므로, RSS 주소를 직접 찾아주면 된다. 주로 `/rss.xml`, `/index.xml`

- **트위터** \
트위터 같은 경우는 공식적으로 지원하지 않기 때문에 rsshub를 사용하여 RSS를 가져온다. [https://rsshub.app/twitter/user/username](https://rsshub.app/twitter/user/username)의 주소 형식이다.

- **Github** \
Github의 경우에는 밑에 코드와 같은 방식으로 rss 피드 주소들을 불러올 수 있다. `<YOUR-TOKEN>`에는 Personal Access Token을 넣어주면 된다. \
여기서 `current_user` 항목의 경우에는 유저의 대시보드 피드를 보여주는 rss 주소(https://github.com/user.private.atom?token=) 를 가지고 있는데, 토큰과 함께 제공된다. 근데 이 토큰이 얼마나 지속되는지는 모르겠다. 아마 Personal Access Token이 제거될 때가 아닌가 싶다.

```sh
  curl \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer <YOUR-TOKEN>" \
    https://api.github.com/feeds

  # https://stackoverflow.com/questions/
  # 74244555/revoke-generate-github-personal-news-rss-feed-token
```

- **그 외** \
[rsshub 참고](https://docs.rsshub.app/en/)

### 구독 목록
- https://rsshub.app/twitter/user/simnalamburt
- https://kdy1.github.io/index.xml
- https://github.com/cjaewon.private.atom?token=
- http://feeds.feedburner.com/geeknews-feed
- https://milkclouds.work/rss/






