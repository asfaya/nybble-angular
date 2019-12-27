import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import * as moment from 'moment';

@Component({
  selector: 'weather-component',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  loadingWeather: boolean = true;
  forecasts = [];
  currentLocation: string;
  constructor(private service: WeatherService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(resp => {
      this.service.getWeather(resp.coords.latitude.toFixed(6), resp.coords.longitude.toFixed(6))
        .subscribe((data: any) => {
          if (data.forecasts && data.forecasts.forecastLocation) {
            var momentDate = moment.utc();

            for (let i = 0; i < 3; i++) {
              // Get first forecast for date
              let forecast = data.forecasts.forecastLocation.forecast.find(f => f.utcTime.startsWith(momentDate.format('YYYY-MM-DD')));
              if (forecast)
                this.forecasts.push(forecast);
              momentDate.add(1, 'days');
            }
            
            this.currentLocation = `${ data.forecasts.forecastLocation.city ? data.forecasts.forecastLocation.city : '' }, ${ data.forecasts.forecastLocation.state ? data.forecasts.forecastLocation.state : '' }, ${ data.forecasts.forecastLocation.country ? data.forecasts.forecastLocation.country : ''}`
          }
          this.loadingWeather = false;
          console.log(data);
        });
    });
  }

  getFormattedDate(forecast) {
    return moment(forecast.utcTime).format('DD');
  }

  getWeatherIconUrl(forecast) {
    return forecast.iconLink.replace('weather.ls.hereapi.com', 'weather.api.here.com');
  }
}
