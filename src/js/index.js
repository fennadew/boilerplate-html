import style from '../../src/scss/style.scss';

(() => {
  document.addEventListener(`DOMContentLoaded`, () => {
    document.querySelectorAll(`[data-component]`).forEach((element) => {
      import(/* webpackChunkName: "chunk-[request]" */ `./modules/${element.getAttribute(`data-component`)}`).then(console.log(`done`));
    });
  });
})();

console.log(`joe`)