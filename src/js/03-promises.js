import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayForm = form.querySelector('input[name=delay]');
const stepForm = form.querySelector('input[name=step]');
const amountForm = form.querySelector('input[name=amount]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delay = Number(delayForm.value);
  const step = Number(stepForm.value);
  const amount = Number(amountForm.value);

  for (let i = 0; i < amount; i += 1) {
    const currentDelay = delay + i * step;

    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
