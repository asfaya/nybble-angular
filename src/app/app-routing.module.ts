import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceInputComponent } from './invoice-input/invoice-input.component';
import { InvoiceCompleteComponent } from './invoice-complete/invoice-complete.component';


const routes: Routes = [
  { path: '', component: InvoiceInputComponent },
  { path: 'complete', component: InvoiceCompleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
