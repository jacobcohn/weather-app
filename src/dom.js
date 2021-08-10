export default (() => {
  const celciusOption = document.getElementById('celciusOption');
  const fahrenheitOption = document.getElementById('fahrenheitOption');

  const mainInfoDiv = document.getElementById('mainInfoDiv');
  const allSentencesDiv = document.getElementById('allSentencesDiv');

  const hideMainDivs = () => {
    [mainInfoDiv, allSentencesDiv].forEach((div) => {
      if (div.classList.contains('visible')) div.classList.toggle('visible');
      if (!div.classList.contains('notVisible')) div.classList.toggle('notVisible');
    });
  };

  const celciusOrFahrenheit = (celciusData, fahrenheitData) =>
    celciusOption.classList.contains('visible') ? celciusData : fahrenheitData;

  const changeTempDisplays = (data) => {
    const temp = `${Math.round(celciusOrFahrenheit(data.tempC, data.tempF))}°`;
    document.getElementById('tempContent').textContent = temp;

    const feelsLike = `Feels Like ${Math.round(celciusOrFahrenheit(data.feelsLikeC, data.feelsLikeF))}°`;
    document.getElementById('feelsLikeContent').textContent = feelsLike;

    const shortsOrPants = celciusOrFahrenheit(data.sentences.shortsOrPants.c, data.sentences.shortsOrPants.f);
    document.getElementById('shortsOrPantsAnswerContent').textContent = shortsOrPants;

    const shirtSweatshirtOrCoat = celciusOrFahrenheit(
      data.sentences.shirtSweatshirtOrCoat.c,
      data.sentences.shirtSweatshirtOrCoat.f,
    );
    document.getElementById('shirtSweatshirtOrCoatAnswerContent').textContent = shirtSweatshirtOrCoat;
  };

  const changeOtherDisplays = (data) => {
    document.getElementById('cityContent').textContent = data.city;
    document.getElementById('descriptionContent').textContent = data.description;
    document.getElementById('whatElseAnswerContent').textContent = data.sentences.whatElse;
  };

  const showMainDivs = () => {
    [mainInfoDiv, allSentencesDiv].forEach((div) => {
      if (!div.classList.contains('visible')) div.classList.toggle('visible');
      if (div.classList.contains('notVisible')) div.classList.toggle('notVisible');
    });
  };

  const displayWeather = (data) => {
    changeTempDisplays(data);
    changeOtherDisplays(data);
    showMainDivs();
  };

  const showOtherTemp = () => {
    [celciusOption, fahrenheitOption].forEach((option) => {
      option.classList.toggle('visible');
      option.classList.toggle('notVisible');
    });
  };

  const tempSwitch = (data) => {
    showOtherTemp();
    changeTempDisplays(data);
  };

  const switchModalOnOrOff = () => {
    const errorModalBG = document.getElementById('errorModalBG');
    errorModalBG.classList.toggle('visible');
    errorModalBG.classList.toggle('notVisible');
  };

  const changeErrorMessage = (message) => {
    document.getElementById('errorModalContent').textContent = message;
  };

  const displayError = (message) => {
    changeErrorMessage(message);
    switchModalOnOrOff();
  };

  return { hideMainDivs, displayWeather, tempSwitch, switchModalOnOrOff, displayError };
})();
