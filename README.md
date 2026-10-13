Name: Thandolwethu Mahlangu 
Student Number: ST10527885

# Weather Dashboard

A React Native (TypeScript) app that displays weather information for a small set of cities. The user picks a city and the screen updates to show current conditions, a 24-hour forecast, a 5-day forecast, and sun and moon details. All data is hardcoded demonstration data; no weather API is used.

## Features

- **City selector** – pill-style buttons at the top; the selected city is highlighted. Johannesburg is selected by default.
- **Hero card** – city, country, weather icon, temperature and condition over a background image, with a dark overlay so the white text stays readable.
- **Current details** – feels like, humidity, wind (speed and direction), visibility, pressure and UV index in a two-column grid.
- **24 Hour Forecast** – horizontally scrolling cards showing time, icon and temperature.
- **5 Day Forecast** – one row per day with icon, high, low and condition.
- **Sun & Moon** – sunrise, sunset, moonrise, moonset and moon phase.
- **Fallback screen** – shows "Weather information unavailable." if the selected city cannot be found in the data.

## Tech Stack

- React Native with Expo (SDK 54)
- TypeScript
- Core React Native components only: `ScrollView`, `ImageBackground`, `TouchableOpacity`, `View`, `Text`, `StyleSheet`


## Data Structure

The app reads from a `weatherData` array, with one object per city. `weatherData` is referenced in `App.tsx` but must be declared (above `App`, or in its own file and imported) for the app to run. Each object has this shape:

```ts
type WeatherData = {
  city: string;
  country: string;
  backgroundImage: string;   // web image URL
  icon: string;              // emoji
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  hourly: { time: string; icon: string; temperature: number }[];
  daily: { day: string; icon: string; high: number; low: number; condition: string }[];
};
```

Because the background image is loaded from a URL, the device needs an internet connection for the hero image to appear.

## How It Works

| Concept | Where it is used |
| --- | --- |
| `useState` | `selectedCity` stores the currently chosen city (default `'Johannesburg'`). |
| `Array.find()` | Looks up the selected city's data object from `weatherData`. |
| `Array.map()` | Renders the city buttons, hourly cards and daily rows from arrays. |
| Conditional styling | A style array applies the highlighted style only when `selectedCity === weather.city`. |
| Guard clause | An early `return` shows the error screen if no matching city is found. |
| Reusable component | `WeatherDetail` (label and value) is used for the details grid and the Sun & Moon card. |
| Nested scrolling | A vertical `ScrollView` for the page, with a horizontal one for the hourly forecast. |
| Local vs web images | `ImageBackground` uses `source={{ uri: ... }}` because the image is a URL. |

### Component Overview

```
App
├── Title
├── City selector (TouchableOpacity per city)
├── ImageBackground hero (city, icon, temperature, condition)
├── Current details (6 × WeatherDetail)
├── 24 Hour Forecast (horizontal ScrollView of hour cards)
├── 5 Day Forecast (daily rows)
├── Sun & Moon (5 × WeatherDetail)
└── Footer
```

## Bug Fixes Included

The code contains numbered `FIX` comments marking corrections made to an earlier version:

| Fix | Issue | Correction |
| --- | --- | --- |
| 1 | `ImageBackground` used but not imported | Added to the `react-native` import |
| 2 | City button highlight compared against `country` | Compare against `city` |
| 3 | Image `source` given a plain string | Use `{ uri: ... }` |
| 4 | Humidity displayed `feelsLike` | Uses `humidity` |
| 5 | Hourly `ScrollView` had `horizontal={false}` | Set to `true` |
| 6 | Hour cards showed the current temperature | Use `hour.temperature` |
| 7 | Daily `map` used `{}` with no `return` | Changed to `()` so the JSX is returned |
| 8 | High and low temperatures swapped | Corrected order |
| 9 | Sunrise showed the sunset time | Uses `sunrise` |
| 10 | `WeatherDetail` displayed `label` twice | Second text shows `value` |
| 11 | Daily card `flexDirection` was `column` | Changed to `row` |
| 12 | Detail items were `100%` wide; Sun & Moon card was not a grid | Items `48%` wide; card uses `row` and `wrap` |
| 13 | Hero overlay too light (`0.05`) | Increased to `0.35` |

## Possible Improvements

- Fetch live data from a weather API instead of hardcoded values.
- Move `weatherData` and its types into a separate `data/` file.
- Replace emoji icons with an icon library or images.
- Add a loading state and error handling for failed image loads.
- Add more cities or a search box.

## Notes

- Weather values are demonstration data only and are not real forecasts.
