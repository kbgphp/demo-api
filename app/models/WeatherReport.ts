import mongoose, { Document, model, Schema } from 'mongoose';

interface IWeatherReport extends Document {
    Key: string;
    EnglishName: string;
    GeoPosition: {
        Latitude: string,
        Longitude: string
    };
    Temperature: {
        Metric: {
            Value: number,
            Unit: string
        },
        Imperial: {
            Value: number,
            Unit: string
        }
    };
}

const weatherReportSchema = new Schema({
    Key: { type: String, required: true },
    EnglishName: { type: String, required: true },
    GeoPosition: {
        Latitude: { type: mongoose.Types.Decimal128, required: true },
        Longitude: { type: mongoose.Types.Decimal128, required: true },
    },
    Temperature: {
        Metric: {
            Value: { type: Number, required: true },
            Unit: { type: String, required: true }
        },
        Imperial: {
            Value: { type: Number, required: true },
            Unit: { type: String, required: true }
        }
    }
}, {
    timestamps: true
});

const WeatherReport = model<IWeatherReport>('WeatherReport', weatherReportSchema, 'weatherReport');

export { WeatherReport, IWeatherReport };
