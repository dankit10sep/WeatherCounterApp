import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { counterReducer } from './store/counter.reducer';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CounterComponent } from './components/counter/counter.component';
import { WeatherComponent } from './components/weather/weather.component';
import { RouterModule } from '@angular/router';
import { weatherReducer } from './store/weather.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CounterComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'counter', component: CounterComponent },
      { path: 'vatavaran', component: WeatherComponent },
      { path: '', redirectTo: 'counter', pathMatch: 'full' }
    ]),
    StoreModule.forRoot({
      counter: counterReducer,
      weather: weatherReducer
    }),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
