import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const days = timer.querySelector('[data-days]');
const hours = timer.querySelector('[data-hours]');
const minutes = timer.querySelector('[data-minutes]');
const seconds = timer.querySelector('[data-seconds]');

function makeDisableButton() {
  startBtn.setAttribute('disabled', 'disabled');
}

flatpickr(inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose({ selectedDates }) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      makeDisableButton();
      return;
    }
    startBtn.disabled = false;
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', startTimer);

function startTimer() {
  const selectedDate = flatpickr.parseDate(inputDate.value);
  const currentDate = Date.now();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  startBtn.disabled = true;

  const countdownInterval = setInterval(() => {
    const msRemaining = selectedDate - new Date();

    if (msRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      startBtn.disabled = false;
    } else {
      updateTimer(msRemaining);
    }
  });
}

function updateTimer(ms) {
  const {
    days: daysValue,
    hours: hoursValue,
    minutes: minutesValue,
    seconds: secondsValue,
  } = convertMs(ms);

  days.textContent = addLeadingZero(daysValue);
  hours.textContent = addLeadingZero(hoursValue);
  minutes.textContent = addLeadingZero(minutesValue);
  seconds.textContent = addLeadingZero(secondsValue);
}
