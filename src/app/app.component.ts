import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-market-recommender';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(`${environment.backendUrl}${environment.backendEndpoints[0]}`).subscribe(console.log);
    this.httpClient.get(`${environment.backendUrl}${environment.backendEndpoints[1]}`).subscribe(console.log);
    this.httpClient.get(`${environment.backendUrl}${environment.backendEndpoints[2]}`).subscribe(console.log);
    this.httpClient.get('localhost:4200/execute').subscribe(console.log);
  }
}
