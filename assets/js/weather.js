// ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
// │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
// └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─
// Weather widget via wttr.in

const iconElement = document.querySelector('.weatherIcon');
const tempElement = document.querySelector('.weatherValue p');
const descElement = document.querySelector('.weatherDescription p');

const weather = { temperature: { unit: 'celsius' } };
var tempUnit = CONFIG.weatherUnit; // 'C' or 'F'

//setPosition();

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
  // wttr.in allows coords as /lat,lon; add language if you want localized descriptions
  const lang = CONFIG.language ? `&lang=${encodeURIComponent(CONFIG.language)}` : '';
  const api = `https://wttr.in/?0&T&Q${lang}`;

  fetch(api)
    .then(r => r.text())
    .then(txt => {
      const { description, celsius } = parseWttrText(txt);

      const valueC = Math.round(celsius);
      weather.temperature.value = (tempUnit === 'C') ? valueC : Math.round((valueC * 9) / 5 + 32);
      weather.description = description;
      weather.iconId = mapDescToOwmIcon(description, isNightNow());
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

// Extract first line as description and first "NN °C" as temperature
function parseWttrText(txt) {
  const lines = txt.split('\n').map(l => l.trim()).filter(Boolean);

  // description: usually the very first non-empty line
  const description = lines[0] || '...';

  // temperature: search anywhere for "-?\d+ °[CF]"
  const tempMatch = txt.match(/(-?\d+)\s*°\s*[CF]/);
  let celsius = 0;
  if (tempMatch) {
    const val = parseInt(tempMatch[1], 10);
    // wttr.in default is metric (°C) unless asked otherwise
    celsius = val;
  }
  return { description, celsius };
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
  iconElement.innerHTML = `<img src="assets/icons/${CONFIG.weatherIcons}/${weather.iconId}.png" alt="">`;
  tempElement.innerHTML = `${weather.temperature.value.toFixed(0)}°<span class="darkfg">${tempUnit}</span>`;
  descElement.innerHTML = weather.description;
}
