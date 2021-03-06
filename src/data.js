import config from './config';

export default (() => {
  const getRawData = async (zipCode) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${config.API_KEY}`,
      { mode: 'cors' },
    );
    if (!response.ok) throw Error;
    const rawData = await response.json();
    return rawData;
  };

  const firstLettersToUpperCase = (string) =>
    string
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(' ');

  const fahrenheitToCelcius = (fahrenheit) => {
    const celciusNotRounded = ((fahrenheit - 32) * 5) / 9;
    const celciusRounded = Math.floor(celciusNotRounded * 100) / 100;
    return celciusRounded;
  };

  const unixTo12Hour = (unix, shift) => {
    const unixWithShift = unix + shift;
    const time24Hours = unixWithShift % 86400;
    const numberOfHours = Math.floor(time24Hours / 3600);
    const numberOfMinutes = Math.floor((time24Hours - numberOfHours * 3600) / 60);

    const hoursInFormat = () => {
      if (numberOfHours === 0) return 0;
      if (numberOfHours <= 12) return numberOfHours;
      return numberOfHours - 12;
    };
    const minutesInFormat = () => {
      if (numberOfMinutes === 0) return '00';
      if (numberOfMinutes < 10) return `0${numberOfMinutes}`;
      return numberOfMinutes;
    };
    const amOrPm = () => {
      if (numberOfHours < 12) return 'am';
      return 'pm';
    };

    return `${hoursInFormat()}:${minutesInFormat()}${amOrPm()}`;
  };

  const getSentences = (fahrenheit, celcius, sky) => {
    const Sentences = {
      shortsOrPants: {},
      shirtSweatshirtOrCoat: {},
    };

    const fahrenheitInFormat = `${Math.round(fahrenheit)}°`;
    const celciusInFormat = `${Math.round(celcius)}°`;

    if (fahrenheit > 59) {
      Sentences.shortsOrPants.f = `It is currently ${fahrenheitInFormat} outside. Shorts are recommended.`;
      Sentences.shortsOrPants.c = `It is currently ${celciusInFormat} outside. Shorts are recommended.`;
      Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheitInFormat} outside. A shirt is recommended.`;
      Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celciusInFormat} outside. A shirt is recommended.`;
    } else {
      Sentences.shortsOrPants.f = `It is currently ${fahrenheitInFormat} outside. Pants are recommended.`;
      Sentences.shortsOrPants.c = `It is currently ${celciusInFormat} outside. Pants are recommended.`;
      if (fahrenheit > 32) {
        Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheitInFormat} outside. A sweatshirt is recommended.`;
        Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celciusInFormat} outside. A sweatshirt is recommended.`;
      } else {
        Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheitInFormat} outside. A coat is recommended.`;
        Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celciusInFormat} outside. A coat is recommended.`;
      }
    }

    if (sky === 'Clear') {
      Sentences.whatElse = 'The sky is clear. There is no need to bring anything else.';
    } else if (sky === 'Clouds') {
      Sentences.whatElse = 'The sky is cloudy, but there is no rain. There is no need to bring anything else.';
    } else if (sky === 'Drizzle') {
      Sentences.whatElse = 'It is drizzling outside. An umbrella may be necessary.';
    } else if (sky === 'Rain') {
      Sentences.whatElse = 'It is raining outside. An umbrella is recommended.';
    } else if (sky === 'Thunderstorm') {
      Sentences.whatElse = 'There is a thunderstorm outside. Beware of lightning.';
    } else if (sky === 'Snow') {
      Sentences.whatElse = 'It is snowing outside. It might be time to shovel the driveway.';
    } else {
      Sentences.whatElse = 'The weather is weird right now. Be safe.';
    }

    return Sentences;
  };

  const filterRawData = (rawData) => {
    const filteredData = {};

    filteredData.city = rawData.name;
    filteredData.sky = rawData.weather[0].main;
    filteredData.description = firstLettersToUpperCase(rawData.weather[0].description);
    filteredData.tempF = rawData.main.temp;
    filteredData.tempC = fahrenheitToCelcius(filteredData.tempF);
    filteredData.feelsLikeF = rawData.main.feels_like;
    filteredData.feelsLikeC = fahrenheitToCelcius(filteredData.feelsLikeF);
    filteredData.sunrise = unixTo12Hour(rawData.sys.sunrise, rawData.timezone);
    filteredData.sunset = unixTo12Hour(rawData.sys.sunset, rawData.timezone);
    filteredData.sentences = getSentences(filteredData.tempF, filteredData.tempC, filteredData.sky);

    return filteredData;
  };

  const getWeather = async (zipCode) => {
    const rawData = await getRawData(zipCode);
    const filteredData = filterRawData(rawData);
    return filteredData;
  };

  return { getWeather };
})();
