import { Document, model, Schema } from 'mongoose';

interface IWeatherForecast extends Document {
    Headline: {
        Severity: number,
        Text: string,
        Category: string,
    },
    DailyForecasts: [
        {
            Date: Date,
            Temperature: {
                Minimum: {
                    Value: number,
                    Unit: string,
                },
                Maximum: {
                    Value: number,
                    Unit: string,
                }
            },

            Sources: string[],
        }
    ]
}


const weatherForecastSchema = new Schema({
    Headline: {
        Severity: { type: Number, required: true },
        Text: { type: String, required: true },
        Category: { type: String, required: true }
    },
    DailyForecasts: [
        {
            Date: { type: Date, index: true },
            Temperature: {
                Minimum: {
                    Value: { type: Number, required: true },
                    Unit: { type: String, required: true }
                },
                Maximum: {
                    Value: { type: Number, required: true },
                    Unit: { type: String, required: true }
                }
            },
            Sources: [{
                type: String
            }]
        }
    ],

}, {
    timestamps: true
});

const WeatherForecast = model<IWeatherForecast>('WeatherForecast', weatherForecastSchema, 'weatherForecast');

export { WeatherForecast, IWeatherForecast };
