---
title: "atan와 atan2"
date: 2023-05-13T21:07:34+09:00
mathjax: true
draft: true
---
검토 필요함..

> 기하(3학년) 수행평가로 제출한 보고서를 재구성한 것입니다.

자바스크립트에서는 `Math.atan` 와 `Math.atan2` 라는 함수가 정의되어 있다.  
이들은 특정 지점으로부터 마우스 포인터와의 각도를 구하는데 주로 사용되는 함수로, 두 함수에 대해 알아보자.
- - -

아크탄젠트는 역삼각함수 중 하나로 탄젠트의 역함수이다. 삼각함수는 본래 일대일대응이 아니지만 치역을 수정해 주면 일대일대응으로 만들어줄 수 있다. 
따라서 탄젠트의 경우에는 점근선, 즉 $(-\frac{\pi}{2}, \frac{\pi}{2})$ 로 치역으로 설정하면 공역이 $(-\infty, \infty)$ 가 되는 동시에 일대일대응이 된다. 

![atan graph](/content/articles/atan2/atan.png)

이를 그래프로 그려보면 다음과 같은 그래프 개형이 된다. 밑에 사진처럼 애초에 삼각함수 자체가 단위원에 기반을 두는 것이 때문에 $arctan(\frac{y}{x}) = \theta $  가 된다. 

![atan graph](/content/articles/atan2/1-circle.png)

그럼 화살이 마우스 커서를 향하는 간단한 게임을 만든다고 할 때 
마우스 좌표의 탄젠트 값인 $(\frac{y}{x})$ 를 $arctan(x)$ 에 대입해 주면 화살로부터 마우스가 위치한 점까지의 각도를 알 수 있게 된다. 이 각도를 이용하여 마우스가 가리키는 방향으로 화살을 바라보도록 만들 수 있다. 

하지만 아크탄젠트를 이용해서 화살이 마우스를 응시하는 것을 바로 구현하면 안 되는데, 그 이유는 $x = 0$ 이 정의되지 않는 점, 그리고 1사분면, 3사분면 / 2사분면 4사분면의 부호 같기 때문에 구분이 불가능하기 때문이다. 

이러한 경우 때문에 프로그래밍 언어에서는 `arctan2(y, x)` 라는 함수를 제공하는데 이 함수는 인자를 두 개를 받음으로써 이 문제를 해결한다. 또한 $x = 0$ 이 되는 문제는 아주 작은 값인 엡실론을 분수에 더해주거나  $-\frac{\pi}{2}, \frac{\pi}{2}$ 를 연산하지 않고 반환함으로써 해결한다.

대부분의 프로그래밍 언어에서는 `atan`, `atan2` 라는 함수의 이름으로 이에 대한 기능을 제공한다. 

이를 `p5.js` 를 통해 구현해 보면 다음과 같다.

#### atan로 구현

```js
// … 
function draw(){
  background("#fafafa");

  const angle = Math.atan(-(mouseY - centerY) / (mouseX - centerX));

  translate(centerX, centerY);
  rotate(-angle  + (Math.PI / 4));
  // p5.js의 rotate는 시초선을 기준으로 시계방향으로 회전하게 설정되어 있음
  // Math.PI / 4를 더하는 이유는 화살의 이미지 각도가 45도이기 때문
  image(img, 0, 0, sizeX, sizeY);
}
// … 
```

#### atan2로 구현
```js
// ...
function draw(){
  background("#fafafa");

  const angle = Math.atan2(-(mouseY - centerY), (mouseX - centerX));
  
  translate(centerX, centerY);
  rotate(-angle + (Math.PI / 4)); 
  // p5.js의 rotate는 시초선을 기준으로 시계방향으로 회전하게 설정되어 있음
  // Math.PI / 4를 더하는 이유는 화살의 이미지 각도가 45도이기 때문
  image(img, 0, 0, sizeX, sizeY);
}
// ...
```

#### 구현 화면
![구현 화면](/content/articles/atan2/example.png)
