import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', onFormSubmit);

let position = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notify.success(`Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notify.failure(`Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  form[evt.target.name] = evt.target.value;
  let delay = Number(form.delay.value);
  const amount = Number(form.amount.value);
  const step = Number(form.step.value);

  for (let i = 0; i < amount; i += 1) {
    position += 1;
    createPromise(position, delay)
      .then(resolve => {
        return resolve;
      })
      .catch(reject => {
        return reject;
      });
    delay += step;
  }
  evt.currentTarget.reset();
  position = 0;
}
