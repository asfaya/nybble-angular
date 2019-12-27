import { Observable, Observer } from 'rxjs';

export class WeatherServiceMock {
    mockObject = {
        forecasts: {
            forecastLocation: {
                city: 'city',
                state: 'state',
                country: 'country',
                forecast: [
                    { utcTime: '2019-12-31T00:00:00.000Z', iconLink: 'https://weather.ls.hereapi.com/static/weather/icon/10.png' },
                    { utcTime: '2020-01-01T00:00:00.000Z', iconLink: 'https://weather.ls.hereapi.com/static/weather/icon/10.png' },
                    { utcTime: '2020-01-02T00:00:00.000Z', iconLink: 'https://weather.ls.hereapi.com/static/weather/icon/10.png' }
                ]
            }
        }
    };

    getWeather(lat: string, long: string){
        const serviceObservables = Observable.create(
            (observer: Observer<any>) => {
              setTimeout(() => {
                observer.next(this.mockObject);
              }, 2000);
            }
          );
          return serviceObservables;
    }
  }