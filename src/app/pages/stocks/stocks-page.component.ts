import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.scss']
})
export class StocksPageComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(`${environment.backendUrl}${environment.backendEndpoints[0]}`).subscribe(console.log);
    this.httpClient.get(`${environment.backendUrl}${environment.backendEndpoints[1]}`).subscribe(console.log);
    this.httpClient.get(`${environment.backendUrl}hello-world`).subscribe(console.log);
    this.httpClient.get(`${environment.backendUrl}fake-url`).subscribe(console.log);
    this.httpClient.get(`${environment.backendUrl}stockPriceGenerator`).subscribe(console.log);
  }

}
