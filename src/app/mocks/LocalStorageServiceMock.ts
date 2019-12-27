import { IInvoice } from '../interfaces/IInvoice';

export class LocalStorageServiceMock {

    constructor() { }

    saveInvoices(invoices: IInvoice[]) : void {
    }

    getInvoices() : IInvoice[] {
        return [{ 
            invoiceNumber: "100", 
            invoiceNet: 100,
            invoiceTax: 0,
            invoiceTotal: "$100"
        }];
    }

    clearInvoices() : void {
        
    }
}