import { Component, OnInit } from '@angular/core';
import { WageHoursPrice } from '../models/WageHoursPrice';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-wage-hours-price',
  templateUrl: './wage-hours-price.component.html',
  styleUrls: ['./wage-hours-price.component.css'],
})
export class WageHoursPriceComponent implements OnInit {
  apiSuccessResponse = '';
  apiErrorResponse: string = '';
  processingNetworkRequest = false;
  showErrorAlert = false;
  showSuccessAlert = false;
  loading = false;
  resetForm = false;
  officerHours!: number;
  assistantHours!: number;
  errorMessage!: string;
  wageHoursPrice!: WageHoursPrice;
  newWageHoursPrice: WageHoursPrice = {
    id: 1,
    assistantHours: 0,
    officerHours: 0,
  };
  constructor(private WageHoursPriceService: HttpService) {}

  ngOnInit(): void {
    this.loading = true;
    this.WageHoursPriceService.getWageHoursPrice().subscribe({
      next: (response: any) => {
        if (response.data && response.status === 200) {
          console.log(response);
          this.wageHoursPrice = response.data;
          this.newWageHoursPrice = response.data;
        } else {
          this.showApiErrorResponse(response.message);
        }
        this.loading = false;
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
    });
  }

  onSave(wages: WageHoursPrice) {
    this.processingNetworkRequest = true;
    this.WageHoursPriceService.addWageHoursPrice(wages).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.wageHoursPrice = response.data;
          console.log(response, this.wageHoursPrice);
          this.showApiSuccessResponse(response.message);
        } else {
          this.showApiErrorResponse(response.message);
        }
      },
      error: (error: any) => {
        this.showApiErrorResponse();
      },
    });
  }

  showApiErrorResponse(message?: any) {
    if (message) {
      this.apiErrorResponse = message;
    } else {
      this.apiErrorResponse =
        'Error! please check your internet connection and try again';
    }
    this.showErrorAlert = true;
    this.processingNetworkRequest = false;
    this.loading = false;
    setTimeout(() => {
      this.showErrorAlert = false;
      this.loading = false;
    }, 3500);
  }

  showApiSuccessResponse(message?: string) {
    if (message) this.apiSuccessResponse = message;
    else this.apiSuccessResponse = 'Success';
    this.showSuccessAlert = true;
    this.processingNetworkRequest = false;
    this.loading = false;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3500);
  }

  fixDigitsAfterDecimal(value: number) {
    return parseFloat(value.toFixed(2));
  }
}
