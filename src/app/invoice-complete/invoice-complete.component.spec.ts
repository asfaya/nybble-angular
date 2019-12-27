import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCompleteComponent } from './invoice-complete.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LocalStorageService } from '../services/local-storage-service.service';
import { LocalStorageServiceMock } from '../mocks/LocalStorageServiceMock';
import { AppRoutingModule } from '../app-routing.module';
import { InvoiceInputComponent } from '../invoice-input/invoice-input.component';
import { WeatherComponent } from '../weather/weather.component';
import { DebugElement } from '@angular/core';

describe('InvoiceCompleteComponent', () => {
  let component: InvoiceCompleteComponent;
  let fixture: ComponentFixture<InvoiceCompleteComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  
  const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCompleteComponent, InvoiceInputComponent, WeatherComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(options)
      ],
      providers: [
        { provide: LocalStorageService, useClass: LocalStorageServiceMock }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(InvoiceCompleteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invoice', async(() => {
    expect(component.invoices.length).toEqual(1);
  }));

  it('total net should be 100', async(() => {
    expect(component.calculateTotalNet()).toEqual(100);
  }));

  it('total tax should be 0', async(() => {
    expect(component.calculateTotalTax()).toEqual(0);
  }));

  it('total should be 100', async(() => {
    expect(component.calculateTotal()).toEqual(100);
  }));

  it('it should call clear work', async(() => {
    fixture.detectChanges();
    spyOn(component, 'deleteWork');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.deleteWork).toHaveBeenCalledTimes(1);
  }));

  it('should return a rounded number', async(() => {
    expect(component.getRounded(12.123)).toEqual(12.12);
  }));

  it('should return a number in currency format', async(() => {
    expect(component.customFormatCurrency(1212.12)).toEqual('$1,212.12');
  }));

  it('should not be mobile', async(() => {
    expect(component.isMobileResolution).toBeFalsy();
  }));
});
