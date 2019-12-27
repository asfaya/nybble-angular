import { OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';

export class BaseComponent implements OnInit {

    public isMobileResolution: boolean = false;

    constructor() {
        if (window.innerWidth < 768) {
            this.isMobileResolution = true;
        } else {
            this.isMobileResolution = false;
        }
    }

    ngOnInit() : void {

    }

    public getRounded(numberToRound: number) : number {
        return Math.round(numberToRound * 100) / 100;
    }
      
    public customFormatCurrency(value: number): string {
        return formatCurrency(value, 'en-US', '$')
    }
}