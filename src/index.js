import data from './data';
import dom from './dom';

(() => {
  const events = () => {
    const zipCodeForm = document.getElementById('zipCodeForm');
    const zipCodeInput = document.getElementById('zipCodeInput');

    zipCodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      dom.displayWeather(data.getWeather(zipCodeInput.value));
      zipCodeInput.value = '';
    });
  };

  const init = () => {
    dom.displayWeather(data.getWeather('10001'));
    events();
  };

  init();
})();
