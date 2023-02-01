const refs = {
  body: document.body,
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
const { btnStart, btnStop, body } = refs;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStoptClick);

function onBtnStartClick() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
}

function onBtnStoptClick() {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
