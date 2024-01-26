import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();
    const delay = parseInt(this.elements.delay.value);

    const state = this.elements.state.value;

    const promise = new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        setTimeout(() => resolve(delay), delay);
      } else if (state === 'rejected') {
        setTimeout(() => reject(delay), delay);
      }
    });

    promise.then((delay) => {
      iziToast.show({
        title: 'Fulfilled',
        message: `Fulfilled promise in ${delay}ms`,
        color: 'green',
      });
    }).catch((delay) => {
      iziToast.show({
        title: 'Rejected',
        message: `Rejected promise in ${delay}ms`,
        color: 'red',
      });
    });
  });



