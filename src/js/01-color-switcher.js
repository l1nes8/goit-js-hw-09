const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onSwitchColor);
btnStop.addEventListener('click', onStopSwitchColor);

let intervalId = null;

function onSwitchColor() {
  btnStart.disabled = true;
  btnStop.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopSwitchColor() {
  btnStart.disabled = false;
  btnStop.disabled = true;

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
