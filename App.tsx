import { useState } from 'react';
import {
  ImageBackground, // FIX 1: was missing, but <ImageBackground> is used below
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
export default function App() {
  const [selectedCity, setSelectedCity] = useState<string>('Johannesburg');

  const selectedWeather = weatherData.find(
    (weather) => weather.city === selectedCity
  );

  if (!selectedWeather) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Weather information unavailable.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather Dashboard</Text>

      <View style={styles.citySelector}>
        {weatherData.map((weather) => (
          <TouchableOpacity
            key={weather.city}
            style={[
              styles.cityButton,
              // FIX 2: compared against weather.country (the same for all
              // three cities); it must be weather.city
              selectedCity === weather.city && styles.selectedCityButton,
            ]}
            onPress={() => setSelectedCity(weather.city)} // FIX 2
          >
            <Text
              style={[
                styles.cityButtonText,
                selectedCity === weather.city && // FIX 2
                  styles.selectedCityButtonText,
              ]}
            >
              {weather.city}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ImageBackground
        // FIX 3: a web image needs an object with a uri, not a bare string
        source={{ uri: selectedWeather.backgroundImage }}
        style={styles.weatherHero}
        imageStyle={styles.weatherHeroImage}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.cityName}>{selectedWeather.city}</Text>
          <Text style={styles.countryName}>{selectedWeather.country}</Text>
          <Text style={styles.currentIcon}>{selectedWeather.icon}</Text>
          <Text style={styles.currentTemperature}>
            {selectedWeather.temperature}°
          </Text>
          <Text style={styles.currentCondition}>
            {selectedWeather.condition}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.currentDetails}>
        <WeatherDetail
          label="Feels Like"
          value={`${selectedWeather.feelsLike}°`}
        />
        <WeatherDetail
          label="Humidity"
          value={`${selectedWeather.humidity}%`} // FIX 4: was feelsLike
        />
        <WeatherDetail
          label="Wind"
          value={`${selectedWeather.windSpeed} km/h ${selectedWeather.windDirection}`}
        />
        <WeatherDetail
          label="Visibility"
          value={`${selectedWeather.visibility} km`}
        />
        <WeatherDetail
          label="Pressure"
          value={`${selectedWeather.pressure} hPa`}
        />
        <WeatherDetail
          label="UV Index"
          value={`${selectedWeather.uvIndex}`}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>24 Hour Forecast</Text>

        <ScrollView
          horizontal={true} // FIX 5: was false, so the hours stacked vertically
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalContent}
        >
          {selectedWeather.hourly.map((hour) => (
            <View key={hour.time} style={styles.hourCard}>
              <Text style={styles.hourTime}>{hour.time}</Text>
              <Text style={styles.forecastIcon}>{hour.icon}</Text>
              <Text style={styles.hourTemperature}>
                {hour.temperature}° {/* FIX 6: was selectedWeather.temperature */}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5 Day Forecast</Text>

        <View style={styles.dailyContainer}>
          {/* FIX 7: curly braces with no return gave back undefined, so
              nothing rendered. Parentheses return the JSX. */}
          {selectedWeather.daily.map((day) => (
            <View key={day.day} style={styles.dailyCard}>
              <Text style={styles.dayName}>{day.day}</Text>
              <Text style={styles.dailyIcon}>{day.icon}</Text>

              <View style={styles.dailyTemperatures}>
                {/* FIX 8: high and low were swapped */}
                <Text style={styles.highTemperature}>{day.high}°</Text>
                <Text style={styles.lowTemperature}>{day.low}°</Text>
              </View>

              <Text style={styles.conditionText}>{day.condition}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sun & Moon</Text>

        <View style={styles.sunMoonCard}>
          <WeatherDetail
            label="Sunrise"
            value={selectedWeather.sunrise} // FIX 9: was selectedWeather.sunset
          />
          <WeatherDetail label="Sunset" value={selectedWeather.sunset} />
          <WeatherDetail label="Moonrise" value={selectedWeather.moonrise} />
          <WeatherDetail label="Moonset" value={selectedWeather.moonset} />
          <WeatherDetail
            label="Moon Phase"
            value={selectedWeather.moonPhase}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Weather information is provided as hardcoded demonstration data.
        </Text>
      </View>
    </ScrollView>
  );
}

type WeatherDetailProps = {
  label: string;
  value: string;
};

function WeatherDetail({ label, value }: WeatherDetailProps) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      {/* FIX 10: was {label}, so every value showed its own label text */}
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf2f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16324f',
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 15,
  },
  citySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 15,
  },
  cityButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#b8c9d9',
  },
  selectedCityButton: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  cityButtonText: {
    color: '#234',
    fontWeight: '600',
  },
  selectedCityButtonText: {
    color: '#ffffff',
  },
  weatherHero: {
    height: 170,
    marginHorizontal: 12,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  weatherHeroImage: {
    borderRadius: 18,
  },
  heroOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // FIX 13: was 0.05, white text hard to read
  },
  cityName: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  countryName: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 5,
  },
  currentIcon: {
    fontSize: 52,
    marginVertical: 5,
  },
  currentTemperature: {
    color: '#ffffff',
    fontSize: 56,
    fontWeight: 'bold',
  },
  currentCondition: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  currentDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 15,
    padding: 15,
  },
  detailItem: {
    width: '48%', // FIX 12: was '100%', so the 6 details stacked in one long column
    paddingVertical: 10,
  },
  detailLabel: {
    color: '#687887',
    fontSize: 13,
    marginBottom: 3,
  },
  detailValue: {
    color: '#172b4d',
    fontSize: 17,
    fontWeight: '600',
  },
  section: {
    marginTop: 15,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#16324f',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  horizontalContent: {
    paddingHorizontal: 12,
  },
  hourCard: {
    width: 78,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  hourTime: {
    color: '#607080',
    fontSize: 13,
    fontWeight: '600',
  },
  forecastIcon: {
    fontSize: 27,
    marginVertical: 8,
  },
  hourTemperature: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#16324f',
  },
  dailyContainer: {
    marginHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 10,
  },
  dailyCard: {
    flexDirection: 'row', // FIX 11: was 'column', so each day stacked its fields
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e9ed',
  },
  dayName: {
    width: 45,
    fontWeight: 'bold',
    color: '#16324f',
  },
  dailyIcon: {
    width: 45,
    fontSize: 25,
  },
  dailyTemperatures: {
    flexDirection: 'row',
    width: 90,
  },
  highTemperature: {
    fontWeight: 'bold',
    color: '#16324f',
    marginRight: 10,
  },
  lowTemperature: {
    color: '#81909e',
  },
  conditionText: {
    flex: 1,
    color: '#526575',
    fontSize: 13,
  },
  sunMoonCard: {
    flexDirection: 'row', // FIX 12: same two-column layout as the details card
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    borderRadius: 15,
    padding: 15,
  },
  footer: {
    padding: 25,
    alignItems: 'center',
  },
  footerText: {
    color: '#758493',
    fontSize: 12,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#c62828',
  },
});
