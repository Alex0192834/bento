const iconElement = document.querySelector('.weatherIcon');
const tempElement = document.querySelector('.weatherValue p');
const descElement = document.querySelector('.weatherDescription p');

const weather = { temperature: { unit: 'celsius' } };
const tempUnit = CONFIG.weatherUnit === 'F' ? 'F' : 'C';

setPosition();

document.querySelector('#themeButton').addEventListener('click', () => {
  if (weather.iconId) displayWeather();
});

function setPosition() {
  if (!CONFIG.trackLocation || !navigator.geolocation) {
    if (CONFIG.trackLocation) console.error('Geolocation not available');
    getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      getWeather(pos.coords.latitude.toFixed(3), pos.coords.longitude.toFixed(3));
    },
    err => {
      console.error(err);
      getWeather(CONFIG.defaultLatitude, CONFIG.defaultLongitude);
    }
  );
}

// --- wttr.in fetch + parse ---
function getWeather(latitude, longitude) {
  const location = `${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
  const lang = CONFIG.language ? `&lang=${encodeURIComponent(CONFIG.language)}` : '';
  const api = `https://wttr.in/${location}?format=j1${lang}`;

  fetch(api)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      const current = parseWttrJson(data);

      weather.temperature.value = tempUnit === 'C' ? current.celsius : current.fahrenheit;
      weather.description = current.description;
      weather.iconId = mapDescToOwmIcon(current.description, isNightNow());
    })
    .then(() => displayWeather())
    .catch(err => {
      console.error('wttr.in error:', err);
      // graceful fallback: show N/A
      weather.temperature.value = 0;
      weather.description = 'N/A';
      weather.iconId = '50d'; // mist as neutral fallback
      displayWeather();
    });
}

function parseWttrJson(data) {
  const current = data && data.current_condition && data.current_condition[0];
  if (!current) throw new Error('Missing current weather data');

  const celsius = Number.parseInt(current.temp_C, 10);
  const fahrenheit = Number.parseInt(current.temp_F, 10);
  if (!Number.isFinite(celsius) || !Number.isFinite(fahrenheit)) {
    throw new Error('Missing current temperature data');
  }

  const description = current.weatherDesc && current.weatherDesc[0]
    ? current.weatherDesc[0].value
    : 'N/A';

  return {
    description,
    celsius,
    fahrenheit,
  };
}

// crude day/night based on local time; adjust if you track sunrise/sunset
function isNightNow() {
  const h = new Date().getHours();
  return h < 6 || h >= 20;
}

// Map human description → OpenWeather-like icon code to reuse your icon pack
function mapDescToOwmIcon(desc, night) {
  const d = (desc || '').toLowerCase();

  // order matters: more specific first
  const table = [
    { re: /(thunder|storm)/, code: '11' },
    { re: /(snow|sleet|blizzard|flurr)/, code: '13' },
    { re: /(freezing|ice pellets)/, code: '13' },
    { re: /(shower|drizzle)/, code: '09' },
    { re: /(rain)/, code: '10' },
    { re: /(overcast)/, code: '04' },
    { re: /(broken|partly|scattered)/, code: '03' },
    { re: /(cloud)/, code: '02' },
    { re: /(mist|fog|haze|smoke|dust)/, code: '50' },
    { re: /(clear|sunny)/, code: '01' },
  ];

  const hit = table.find(t => t.re.test(d));
  const base = hit ? hit.code : '50';
  return base + (night ? 'n' : 'd');
}

function displayWeather() {
  const weatherIcons = document.body.classList.contains('darktheme') ? 'white' : 'dark';
  iconElement.innerHTML = `<img src="assets/icons/${weatherIcons}/${weather.iconId}.webp" alt="">`;
  tempElement.innerHTML = `${weather.temperature.value.toFixed(0)}°<span class="darkfg">${tempUnit}</span>`;
  descElement.textContent = weather.description;
}
