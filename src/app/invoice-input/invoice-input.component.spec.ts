import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInputComponent } from './invoice-input.component';
import { InvoiceCompleteComponent } from '../invoice-complete/invoice-complete.component';
import { WeatherComponent } from '../weather/weather.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LocalStorageService } from '../services/local-storage-service.service';
import { LocalStorageServiceMock } from '../mocks/LocalStorageServiceMock';
import { HttpClientModule } from '@angular/common/http';
import { WeatherServiceMock } from '../mocks/WeatherServiceMock';
import { WeatherService } from '../weather/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';

describe('InvoiceInputComponent', () => {
  let component: InvoiceInputComponent;
  let fixture: ComponentFixture<InvoiceInputComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceInputComponent, InvoiceCompleteComponent, WeatherComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxMaskModule.forRoot(options)
      ],
      providers: [
        { provide: LocalStorageService, useClass: LocalStorageServiceMock },
        { provide: WeatherService, useClass: WeatherServiceMock }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(InvoiceInputComponent);
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

  it('should not remove any invoice', async(() => {
    component.remove(100);
    expect(component.invoices.length).toEqual(1);
  }));

  it('should remove the invoice', async(() => {
    let count = component.invoices.length;
    component.remove(0);
    expect(component.invoices.length == (count - 1)).toBeTruthy();
  }));

  it('should call the add method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'add');
    el = fixture.debugElement.query(By.css('button[name=btnAdd]')).nativeElement;
    el.click();
    expect(component.add).toHaveBeenCalledTimes(1);
  }));

  it('form should be invalid', async(() => {
    component.invoiceForm.controls['invoiceNumber'].setValue('');
    component.invoiceForm.controls['invoiceNet'].setValue(-100);
    component.invoiceForm.controls['invoiceTax'].setValue(0);
    component.invoiceForm.controls['invoiceTotal'].setValue('');
    expect(component.invoiceForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.invoiceForm.controls['invoiceNumber'].setValue('2');
    component.invoiceForm.controls['invoiceNet'].setValue(100);
    component.invoiceForm.controls['invoiceTax'].setValue(0);
    component.invoiceForm.controls['invoiceTotal'].setValue('$100');
    expect(component.invoiceForm.valid).toBeTruthy();
  }));

  it('should call the add method and add an invoice', async(() => {
    component.invoiceForm.controls['invoiceNumber'].setValue('10');
    component.invoiceForm.controls['invoiceNet'].setValue(100);
    component.invoiceForm.controls['invoiceTax'].setValue(0);
    component.invoiceForm.controls['invoiceTotal'].setValue('$100');
    el = fixture.debugElement.query(By.css('button[name=btnAdd]')).nativeElement;
    el.click();
    const foundInvoiceNumber = component.invoices.find(i => i.invoiceNumber == '10')
    let found = false;
    if (foundInvoiceNumber) {
      found = true;
    }
    expect(found).toBeTruthy();
  }));

  it('should call the add method and not add an invoice', async(() => {
    component.invoiceForm.controls['invoiceNumber'].setValue('30');
    component.invoiceForm.controls['invoiceNet'].setValue(0);
    component.invoiceForm.controls['invoiceTax'].setValue(0);
    component.invoiceForm.controls['invoiceTotal'].setValue('');
    el = fixture.debugElement.query(By.css('button[name=btnAdd]')).nativeElement;
    el.click();
    const foundInvoiceNumber = component.invoices.find(i => i.invoiceNumber == '30')
    let found = false;
    if (foundInvoiceNumber) {
      found = true;
    }
    expect(found).toBeFalsy();
  }));

  it('should clear the form', async(() => {
    el = fixture.debugElement.query(By.css('button[name=btnClear]')).nativeElement;
    el.click();
    let values = component.invoiceForm.value;
    expect(values.invoiceNumber).toEqual('') && expect(values.invoiceNet).toEqual(0) && expect(values.invoiceTax).toEqual(0);
  }))
});
