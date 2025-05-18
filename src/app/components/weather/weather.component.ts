import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import * as WeatherActions from 'src/app/store/weather.actions';
import { WeatherState } from 'src/app/store/weather.reducer';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  apiKey: string = 'd4594364698122bfd1c4b3eb5f2ff19f';
  cityName: string = '';
  cities$ = this.store.select((state: any) => state.weather.cities);
  selectedCity$ = this.store.select((state: any) => state.weather.selectedCity);

  constructor(private http: HttpClient, private store: Store<WeatherState>) { }

  addCity() {
    if (this.cityName.trim() === '') return;

    this.http
      .get<any>(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=metric`
      )
      .subscribe(
        (data) => {
          const city = {
            name: data.name,
            temperature: `${data.main.temp}°C`,
            status: data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            windSpeed: `${data.wind.speed} m/s`,
            pressure: `${data.main.pressure} hPa`,
            forecast: [],
          };
          this.store.dispatch(WeatherActions.addCity({ city }));
          this.cityName = '';
        },
        (error) => {
          alert('City not found');
        }
      );
  }

  deleteCity(index: number) {
    this.store.dispatch(WeatherActions.deleteCity({ index }));
  }

  clearAll() {
    this.store.dispatch(WeatherActions.clearCities());
  }

  refreshCity(city: any) {
    this.http
      .get<any>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${this.apiKey}&units=metric`
      )
      .subscribe((data) => {
        const updatedCity = {
          ...city,
          temperature: `${data.main.temp}°C`,
          status: data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        };

        this.store.dispatch(WeatherActions.refreshCity({ city: updatedCity }));
      });
  }

  showDetails(city: any) {
    this.store.dispatch(WeatherActions.setSelectedCity({ city }));

    this.http
      .get<any>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${this.apiKey}&units=metric`
      )
      .subscribe((data) => {
        const forecast = data.list.slice(0, 5).map((d: any) => ({
          date: d.dt_txt,
          minTemp: d.main.temp_min,
          maxTemp: d.main.temp_max,
          description: d.weather[0].description,
        }));

        this.store.dispatch(
          WeatherActions.loadWeatherDetails({ city: city.name, forecast })
        );
      });
  }
}
