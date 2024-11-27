export interface Temperature {
    Value: number;
    Unit: string;
  }
  
  export interface HourlyForecast {
    DateTime: string;
    WeatherIcon: number;
    Temperature: Temperature;
  }