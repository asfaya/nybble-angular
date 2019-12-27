import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage-service.service';
import { BehaviorSubject } from 'rxjs';
import { IInvoice } from '../interfaces/IInvoice';
import { BaseComponent } from '../Common/BaseComponent';

@Component({
  selector: 'app-invoice-complete',
  templateUrl: './invoice-complete.component.html',
  styleUrls: ['./invoice-complete.component.css'],
})
export class InvoiceCompleteComponent extends BaseComponent {

  loading: boolean = true;
  
  displayedColumns: string[] = [ 'invoiceNumber', 'invoiceNet', 'invoiceTax', 'invoiceTaxTotal', 'invoiceTotal'];
  dataSource = new BehaviorSubject<IInvoice[]>([]);

  invoices = [];

  constructor(
    private router: Router,
    private ls: LocalStorageService) { 

    super();
  }

  ngOnInit() {
    let invs = this.ls.getInvoices();
    if (invs && invs.length > 0) {
      this.invoices = invs;
      this.dataSource.next(this.invoices);
      this.loading = false;
    } else {
      // Nothing on local storage, go to invoice input
      this.router.navigateByUrl('');
    }
  }

  calculateTotalNet() {
    return this.invoices.reduce((accum, curr) => accum + this.getRounded(curr.invoiceNet) , 0);
  }

  calculateTotal() {
    return this.invoices.reduce((accum, curr) => accum + this.getRounded(curr.invoiceNet * (1 + curr.invoiceTax / 100)) , 0);
  }

  calculateTotalTax() {
    return this.invoices.reduce((accum, curr) => accum + this.getRounded(curr.invoiceNet * (curr.invoiceTax / 100)) , 0);
  }

  deleteWork() {
    this.ls.clearInvoices();
    this.router.navigateByUrl('');
  }
}
