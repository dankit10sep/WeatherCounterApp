import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from 'src/app/store/weather.reducer';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent {
  weatherDetails$ = this.store.select((state: any) => state.weather.weatherDetails);

  constructor(private store: Store<WeatherState>) { }
}
