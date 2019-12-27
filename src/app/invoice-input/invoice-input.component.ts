import { Component, ViewChild, ElementRef, ChangeDetectorRef }  from '@angular/core';
import { FormBuilder, Validators, FormGroup }        from '@angular/forms';
import { IInvoice }           from '../interfaces/IInvoice';
import { BehaviorSubject } from 'rxjs';
import { formatCurrency } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage-service.service';
import { BaseComponent } from '../Common/BaseComponent';

@Component({
  selector: 'app-invoice-input',
  templateUrl: './invoice-input.component.html',
  styleUrls: ['./invoice-input.component.css']
})
export class InvoiceInputComponent extends BaseComponent {

  invoiceForm: FormGroup;
  loading: boolean = true;
  
  myFormValueChanges$;

  displayedColumns: string[] = [ 'invoiceNumber', 'invoiceNet', 'invoiceTax', 'invoiceTaxTotal', 'invoiceTotal', 'actions' ];
  dataSource = new BehaviorSubject<IInvoice[]>([]);

  invoices = [];
  
  @ViewChild("invoiceNum",  { read: ElementRef, static: false }) invoiceNumField: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private ls: LocalStorageService) {
    
    super();
  }

  ngOnInit() {
    this.invoiceForm = this.getNewInvoiceForm({
      invoiceNumber: '',
      invoiceNet: 0,
      invoiceTax: 0,
      invoiceTotal: this.customFormatCurrency(0),
    });

    // initialize stream on invoice
    this.myFormValueChanges$ = this.invoiceForm.valueChanges;
    // subscribe to the stream so listen to changes on invoice
    this.myFormValueChanges$.subscribe(invoice => this.updateTotalPrice(invoice));

    let invs = this.ls.getInvoices();
    if (invs && invs.length > 0) {
      this.invoices = invs;
      this.dataSource.next(this.invoices);
    }

    this.loading = false;
  }

  /**
   * unsubscribe listener
   */
  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.invoiceNumField.nativeElement.focus();
    this.cd.detectChanges();
  }

  getNewInvoiceForm(data: IInvoice) {
    return this.fb.group({
      invoiceNumber: [data.invoiceNumber, [Validators.required]],
      invoiceNet: [data.invoiceNet, [Validators.required, Validators.min(0.01)]],
      invoiceTax: [data.invoiceTax, [Validators.required]],
      invoiceTotal: [ {value: data.invoiceTotal, disabled: true}, [Validators.required]],
    });
  }

  add() {
    if (this.invoiceForm.valid)
    {
      let invoice = this.invoiceForm.value;
      const foundInvoiceNumber = this.invoices.find(i => i.invoiceNumber == invoice.invoiceNumber);
      if (!foundInvoiceNumber) {
        this.invoices.push(invoice);
        this.dataSource.next(this.invoices);
        this.ls.saveInvoices(this.invoices);
      }
      this.clear();
    }
  }

  clear() {
    const newInvoice: IInvoice = {
      invoiceNumber: '',
      invoiceNet: 0,
      invoiceTax: 0,
      invoiceTotal: this.customFormatCurrency(0),
    };

    this.invoiceForm.reset(newInvoice);

    this.invoiceNumField.nativeElement.focus();
  }
  
  remove(index: number) {
    const deletedItem = this.invoices[index];
    if (deletedItem) {
      this.invoices.splice(index, 1);

      this.dataSource.next(this.invoices);
      this.ls.saveInvoices(this.invoices);
    }
  }

  process() {
    this.router.navigateByUrl('complete');
  }
  
  private updateTotalPrice(invoice: any) {
    let total = this.getRounded(invoice.invoiceNet * (1 + invoice.invoiceTax / 100));
    this.invoiceForm.get('invoiceTotal').setValue(formatCurrency(total, 'en-US', '$'), { onlySelf: true, emitEvent: false });
  }
}
