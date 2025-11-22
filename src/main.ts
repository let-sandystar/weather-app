import "./assets/style.scss";
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
		<div class="card-body">
			<h5 class="card-title" id="location">
				<span id="city">${data.name}</span>,
				<span id="country">${data.sys.country}</span>
			</h5>
			<p class="temp">
				<span id="temperature">${data.main.temp}</span>
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

		<ul class="conditions">
			${weatherConditions.join("")}
		</ul>
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
		alertEl.classList.add('hide');
		alertEl.textContent = '';
	}

	if (spinnerEl) spinnerEl.classList.remove('hide');

	try {
		const currentWeather = await fetchWeather(city);

		renderCurrentWeather(currentWeather);
		forecastEl.classList.remove("hide");
	} catch (err: any) {
		console.error('fetchWeather error:', err);

		const message = err?.message ?? String(err) ?? "Couldn't get weather";

		if (alertEl) {
			alertEl.textContent = `Error: ${message}`;
			alertEl.classList.remove('hide');
		} else {
			alert(`Error: ${message}`);
		}
	} 
		if (spinnerEl) spinnerEl.classList.add('hide');
});
