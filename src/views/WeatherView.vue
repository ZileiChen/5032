<template>
  <div class="header">
    <h1>Weather App</h1>
    <div class="search-bar">
      <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
      <button @click="searchByCity" class="search-button">Search</button>
    </div>
  </div>
  <main>
    <div v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    useHttps() {
      try {
        return (
          import.meta.env.VITE_ENVIRONMENT === 'production' ||
          (typeof location !== 'undefined' && location.protocol === 'https:')
        )
      } catch {
        return import.meta.env.VITE_ENVIRONMENT === 'production'
      }
    },
    iconUrl() {
      if (!this.weatherData) return null
      const protocol = this.useHttps ? 'https' : 'http'
      // Use the newer icon path and include @2x for better resolution
      return `${protocol}://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const protocol = this.useHttps ? 'https' : 'http'
          const url = `${protocol}://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`
          await this.fetchWeatherData(url)
        })
      }
    },
    async searchByCity() {
      if (!this.city || !this.city.trim()) return
      const protocol = this.useHttps ? 'https' : 'http'
      const q = encodeURIComponent(this.city.trim())
      const url = `${protocol}://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${import.meta.env.VITE_API_KEY}`
      await this.fetchWeatherData(url)
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    },
  },
}
</script>
