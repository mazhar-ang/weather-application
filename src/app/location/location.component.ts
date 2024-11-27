import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../service/weather/weather.service';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { HourlyForecast } from '../../utils/types/type';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-location',
  imports: [MatCardModule,MatListModule,CommonModule,MatFormFieldModule,MatIconModule,MatButtonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locationKey: string = '';
  locationName: string = '';
  currentConditions: any;
  dailyForecast: any;
  hourlyForecast: HourlyForecast[] = [];
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation?.extras.state) {
      this.locationName = navigation.extras.state['name'];
    }
  }

  ngOnInit() {
    this.locationKey = this.route.snapshot.paramMap.get('id') || '';
    if (!this.locationName) {
      this.locationName = 'Unknown Location';
    }
    this.getCurrentConditions();
    this.getDailyForecast();
    this.getHourlyForecast();
    this.checkIfFavorite();
  }

  getCurrentConditions() {
    this.weatherService.getCurrentConditions(this.locationKey).subscribe(
      data => this.currentConditions = data[0]
    );
  }

  getDailyForecast() {
    this.weatherService.getFiveDayForecast(this.locationKey).subscribe(
      data => this.dailyForecast = data.DailyForecasts
    );
  }

  getHourlyForecast() {
    this.weatherService.getHourlyForecast(this.locationKey).subscribe(
      data => this.hourlyForecast = data
    );
  }

  checkIfFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorite = favorites.some((fav: any) => fav.key === this.locationKey);
  }

  toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.isFavorite) {
      const index = favorites.findIndex((fav: any) => fav.key === this.locationKey);
      favorites.splice(index, 1);
    } else {
      favorites.push({ key: this.locationKey, name: this.locationName });
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.isFavorite = !this.isFavorite;
  }

  onBack() {
    this.router.navigate(['/home']);
  }
}
