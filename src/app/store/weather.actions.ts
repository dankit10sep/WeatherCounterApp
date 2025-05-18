import { createAction, props } from '@ngrx/store';

export const addCity = createAction('[Weather] Add City', props<{ city: any }>());
export const deleteCity = createAction('[Weather] Delete City', props<{ index: number }>());
export const clearCities = createAction('[Weather] Clear Cities');
export const refreshCity = createAction('[Weather] Refresh City', props<{ city: any }>());
export const showDetails = createAction('[Weather] Show Details', props<{ city: any }>());
export const setSelectedCity = createAction('[Weather] Set Selected City', props<{ city: any }>());
export const updateForecast = createAction('[Weather] Update Forecast', props<{ forecast: any[] }>());

export const loadWeatherDetails = createAction(
    '[Weather] Load Weather Details',
    props<{ city: string, forecast: any[] }>()
);