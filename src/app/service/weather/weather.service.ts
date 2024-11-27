import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = '92z94D2LzShtAqgmYEAVAV9R2Z4eAvQe';
  private baseUrl: string = 'https://dataservice.accuweather.com';

  constructor(private _http: HttpClient) { }

  getCurrentConditions(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`;
    return this._http.get(url);
  }

  getFiveDayForecast(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}&metric=true`;
    return this._http.get(url);
  }

  getHourlyForecast(locationKey: string): Observable<any> {
    const url = `${this.baseUrl}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${this.apiKey}&metric=true`;
    return this._http.get(url);
  }

  searchLocation(query: string): Observable<any> {
    const url = `${this.baseUrl}/locations/v1/cities/search?apikey=${this.apiKey}&q=${query}`;
    return this._http.get(url);
  }
}
