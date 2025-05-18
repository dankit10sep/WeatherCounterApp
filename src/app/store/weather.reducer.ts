import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';

export interface WeatherState {
  cities: any[];
  selectedCity: any | null;
  weatherDetails: {
    city: string;
    forecast: any[];
  } | null;
}

export const initialState: WeatherState = {
  cities: [],
  selectedCity: null,
  weatherDetails: null,
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.addCity, (state, { city }) => ({
    ...state,
    cities: [city, ...state.cities.slice(0, 7)]
  })),
  on(WeatherActions.deleteCity, (state, { index }) => ({
    ...state,
    cities: state.cities.filter((_, i) => i !== index),
  })),
  on(WeatherActions.clearCities, (state) => ({
    ...state,
    cities: [],
    selectedCity: null,
  })),
  on(WeatherActions.refreshCity, (state, { city }) => {
    const updatedCities = state.cities.map((c) =>
      c.name === city.name ? city : c
    );
    return {
      ...state,
      cities: updatedCities
    };
  }),
  on(WeatherActions.setSelectedCity, (state, { city }) => ({
    ...state,
    selectedCity: city
  })),
  on(WeatherActions.loadWeatherDetails, (state, { city, forecast }) => ({
    ...state,
    weatherDetails: { city, forecast }
  }))
);
