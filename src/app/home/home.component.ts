import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { WeatherService } from '../service/weather/weather.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardModule, MatListModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  philadelphiaWeather: any;
  fiveDayForecast: any;
  favorites: any[] = [];
  searchForm: FormGroup;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  ngOnInit() {
    this.getPhiladelphiaWeather();
    this.getFiveDayForecast();
    this.loadFavorites();
  }

  getPhiladelphiaWeather(): void {
    this.weatherService.getCurrentConditions('349727').subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.philadelphiaWeather = data[0];
        } else {
          console.warn('No weather data received for Philadelphia.');
        }
      },
      error: (err) => {
        console.error('Failed to fetch Philadelphia weather:', err);
      }
    });
  }
  

  getFiveDayForecast() {
    this.weatherService.getFiveDayForecast('349727').subscribe((data: any) => {
      this.fiveDayForecast = data.DailyForecasts;
    });
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  onSearch() {
    const searchQuery = this.searchForm.get('searchQuery')?.value;
    if (searchQuery && searchQuery.trim()) {
      this.weatherService.searchLocation(searchQuery).subscribe(
        data => {
          if (data && data.length > 0) {
            const location = data[0];
            this.router.navigate(['/location', location.Key], { state: { name: location.LocalizedName } });
          }
        }
      );
    }
  }

}
