import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
    ) { }

  getWeather(lat: string, long: string){
    return this.http.jsonp(
      `https://weather.ls.hereapi.com/weather/1.0/report.json?product=forecast_7days&latitude=${ encodeURI(lat) }&longitude=${ encodeURI(long)}&oneobservation=true&apiKey=${ environment.weatherKey }`,
      'jsonpcallback')
      .pipe();
  }
}
