import { Injectable } from '@angular/core';
import { IInvoice } from '../interfaces/IInvoice';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveInvoices(invoices: IInvoice[]) : void {
    localStorage.setItem('nybble_invoices', JSON.stringify(invoices));
  }

  getInvoices() : IInvoice[] {
    return <IInvoice[]>JSON.parse(localStorage.getItem('nybble_invoices'));
  }

  clearInvoices() : void {
    localStorage.removeItem('nybble_invoices');
  }
}
