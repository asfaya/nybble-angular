import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { WeatherServiceMock } from '../mocks/WeatherServiceMock';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherComponent ],
      imports: [
        BrowserModule,
        MaterialModule,
      ],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceMock }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(WeatherComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return proper icon url', async(() => {
    expect(component.getWeatherIconUrl({ utcTime: '2019-12-27T12:00:00.000-03:00', iconLink: 'https://weather.ls.hereapi.com/static/weather/icon/10.png' })).toEqual('https://weather.api.here.com/static/weather/icon/10.png');
  }));

  it('should return proper formatted date', async(() => {
    expect(component.getFormattedDate({ utcTime: '2019-12-27T12:00:00.000-03:00', iconLink: 'https://weather.ls.hereapi.com/static/weather/icon/10.png' })).toEqual('27');
  }));
});
