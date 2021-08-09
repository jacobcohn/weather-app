import data from './data';
import dom from './dom';

(() => {
  let submittedOnce = false;

  const events = () => {
    const zipCodeForm = document.getElementById('zipCodeForm');
    const zipCodeInput = document.getElementById('zipCodeInput');

    zipCodeForm.addEventListener('submit', async (event) => {
      submittedOnce = true;
      event.preventDefault();

      const newZipCode = zipCodeInput.value;
      zipCodeInput.value = '';

      try {
        dom.displayWeather(await data.getWeather(newZipCode));
      } catch (error) {
        dom.displayError();
      }
    });
  };

  const getAndDisplayInitialWeather = async () => {
    const initialWeatherData = await data.getWeather('10001');
    if (!submittedOnce) dom.displayWeather(initialWeatherData);
  };

  const init = () => {
    events();
    getAndDisplayInitialWeather();
  };

  init();
})();
