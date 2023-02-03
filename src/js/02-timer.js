import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  textPicker: document.querySelector('[id="datetime-picker"]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

const { btnStart, textPicker, dataDays, dataHours, dataMinutes, dataSeconds } =
  refs;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(textPicker, options);
const date = new Date();

if (options.defaultDate) {
  btnStart.setAttribute('disabled', true);
}

textPicker.addEventListener('input', onTextPickerInput);

function onTextPickerInput() {
  let newDates = fp.selectedDates[0];
  const selectedDate = newDates.getTime();
  if (selectedDate < date.getTime()) {
    Notify.failure('Please choose a date in the future');
    btnStart.setAttribute('disabled', true);
  } else {
    btnStart.removeAttribute('disabled');
  }
}

class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = fp.selectedDates[0].getTime();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      btnStart.setAttribute('disabled', true);
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.convertMs(deltaTime);
      this.onTick(time);
     
      if (deltaTime < 1000) {
        clearInterval(this.intervalId);
        btnStart.removeAttribute('disabled');
      }
    }, 1000);
  }
    
  convertMs(ms) {
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
}

const timer = new Timer({ onTick: updateTimerInterface });

function updateTimerInterface({days, hours, minutes, seconds}) {
    dataDays.textContent = `${days.toString().padStart(2, 0)}`;
    dataHours.textContent = `${hours.toString().padStart(2, 0)}`;
    dataMinutes.textContent = `${minutes.toString().padStart(2, 0)}`;
    dataSeconds.textContent = `${seconds.toString().padStart(2, 0)}`;
}

btnStart.addEventListener('click', timer.start.bind(timer));
