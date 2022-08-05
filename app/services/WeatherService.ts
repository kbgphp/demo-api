import { IWeatherReport } from '@/models/WeatherReport';
import { ACCU_WEATHER_API_KEY, ACCU_WEATHER_URL } from '@config/config';
import axios from 'axios';

export default class WeatherService {
    // get top 50 cities weather record
    static async getTopCitiesWeatherReport(count: Number): Promise<IWeatherReport[]> {
        const weather_report = await axios.get(`${ACCU_WEATHER_URL}/currentconditions/v1/topcities/${count}?apikey=${ACCU_WEATHER_API_KEY}`);
        return weather_report.data;
    }


    static async getOneDayWeatherPrediction(location_key: string): Promise<IWeatherReport[]> {
        const weather_forecast = await axios.get(`${ACCU_WEATHER_URL}/forecasts/v1/daily/1day/${location_key}?apikey=${ACCU_WEATHER_API_KEY}`);
        return weather_forecast.data;
    }

}
