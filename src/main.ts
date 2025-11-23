import "./assets/scss/style.scss";
import { fetchWeather } from './services/OWMAPI';
const forecastEl = document.querySelector<HTMLDivElement>("#forecast")!;
const spinnerEl = document.querySelector<HTMLDivElement>("#spinner");
const alertEl = document.querySelector<HTMLDivElement>("#alert");


const renderCurrentWeather = (data: any) => {
  const weatherConditions = data.weather.map((condition: any) => {
    return `<li><img src="https://openweathermap.org/img/wn/${condition.icon}@2x.png" alt="${condition.main}" title="${condition.description}"></li>`;
  });

  const banner = (data.dt > data.sys.sunrise && data.dt < data.sys.sunset)
		? "src/assets/imgs/day.svg"
		: "src/assets/imgs/night.svg";
  
  forecastEl.innerHTML = `
		<img src="${banner}" class="card-img-top">
		<div class="card-body text-center">
      <ul class="conditions list-unstyled text-center">
        ${weatherConditions.join("")}
      </ul>
			<h5 class="card-title" id="location">
				<span id="city">${data.name}</span>,
				<span id="country">${data.sys.country}</span>
			</h5>
			<p class="temp">
				<span id="temperature">${data.main.temp}</span>
				&deg;C
			</p>
      <p class="feelslike">
        <span id="feels_like">${data.main.feels_like}</span>
        &deg;C
      </p>
			<p class="humidity">
				<span id="humidity">${data.main.humidity}</span>
				&percnt; humidity
			</p>
			<p class="wind">
				<span id="windspeed">${data.wind.speed}</span>
				m/s
			</p>
		</div>
	`;
};

document.querySelector<HTMLFormElement>("#search-form")!.addEventListener("submit", async (e) => {
  e.preventDefault();

	const city = document.querySelector<HTMLInputElement>("#query")?.value.trim();

	if (!city) {
		alert('Please enter a city name');
		return;
	}

	if (alertEl) {
		alertEl.classList.add('d-none');
		alertEl.textContent = '';
	}

	if (spinnerEl) spinnerEl.classList.remove('d-none');

	try {
		const currentWeather = await fetchWeather(city);

		renderCurrentWeather(currentWeather);
		forecastEl.classList.remove("d-none");
	} catch (err: any) {
		console.error('fetchWeather error:', err);

		const message = err?.message ?? String(err) ?? "Couldn't get weather";

		if (alertEl) {
			alertEl.textContent = `Error: ${message} not found`;
			alertEl.classList.remove('d-none');
		} else {
			alert(`Error: ${message}`);
		}
	} 
		if (spinnerEl) spinnerEl.classList.add('d-none');
});
