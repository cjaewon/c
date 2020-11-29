import turbolinks from 'turbolinks';

turbolinks.start();

document.addEventListener("turbolinks:load", e => {
  if (typeof window.ga === 'function') {
    window.ga('set', 'page', e.data.url);
    window.ga('send', 'pageview');
  }
});