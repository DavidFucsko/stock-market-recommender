import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { SearchStockParamters } from 'src/app/models/search-stock-parameters.model';
import { SocialPlatforms } from 'src/app/models/social-platforms.model';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.scss']
}

) export class StockSelectorComponent implements OnInit {

  @Output()
  selectedStock: EventEmitter<SearchStockParamters> = new EventEmitter();

  @Output()
  socialSelectorChanged: EventEmitter<SearchStockParamters> = new EventEmitter();

  stockSelectorForm: FormGroup;

  private searchParameters: SearchStockParamters;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const currentDate = new Date();
    const defaultDate = new Date();
    defaultDate.setDate(currentDate.getDate() - 10);

    this.stockSelectorForm = this.formBuilder.group({
      stockSymbol: [''],
      fromDate: [defaultDate.toISOString().substring(0, 10)],
      toDate: [currentDate.toISOString().substring(0, 10)],
      facebook: [true],
      twitter: [true],
      instagram: [true]
    }

    );
  }

  searchStocks(): void {
    this.searchParameters = { ...this.searchParameters, ...this.stockSelectorForm.value };
    this.selectedStock.emit(this.searchParameters);
  }

  socialMediaFilterChanged(): void {
    const changes = {
      facebook: this.stockSelectorForm.get('facebook').value,
      twitter: this.stockSelectorForm.get('twitter').value,
      instagram: this.stockSelectorForm.get('instagram').value,
    };

    this.searchParameters = { ...this.searchParameters, ...changes }

    this.socialSelectorChanged.emit(this.searchParameters);
  }

  algorithmChanged(changes: { algorithm: string, additionalParams: string[] }): void {
    this.searchParameters = {
      ...this.searchParameters,
      ...{
        algorithmToUse: changes.algorithm, additionalParams: changes.additionalParams
      }
    };
  }
}
