import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const inputPicker = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');
buttonStart.setAttribute('disabled', '');
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();
        buttonStart.removeAttribute('disabled');
      if (userSelectedDate<Date.now()) {
          buttonStart.setAttribute('disabled', '');
          iziToast.error({
              messageColor:'#FFF',
              color:'#EF4040',
              iconUrl: 'img/close.svg',
              position: 'topRight',
              message: 'Please choose a date in the future',
});          
}   
}
};

flatpickr(inputPicker, options);


buttonStart.addEventListener('click', onClickStart)

function onClickStart() {
    const intervalId=setInterval(() => {
    let timeToLeft = userSelectedDate-Date.now();
        
      if (timeToLeft<=0) {
          clearInterval(intervalId);
          buttonStart.setAttribute('disabled','');
          iziToast.info({
              position: 'center',
              message: 'It is your time!',
          });
          return;
        };
        
    const { days, hours, minutes, seconds } = convertMs(timeToLeft);
    daysTimer.textContent = `${addLeadingZero(days)}`;
    hoursTimer.textContent = `${addLeadingZero(hours)}`;
    minutesTimer.textContent = `${addLeadingZero(minutes)}`;
    secondsTimer.textContent = `${addLeadingZero(seconds)}`;
    }, 1000);
}
  

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return {days,hours,seconds,minutes};
};

function addLeadingZero(value){
return value.toString().padStart(2, '0'); 
}

