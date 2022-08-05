import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import WeatherService from '@/services/WeatherService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';

class WeatherController {

    static getTopCitiesReport = async (req: Request, res: Response) => {
        try {
            const topCitiesCount = 50;  //[50,100,150 only]
            const report = await WeatherService.getTopCitiesWeatherReport(topCitiesCount);
            return sendResponse(res, report, locale('WEATHER_REPORT_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('WeatherController.getTopCitiesReport() Error: ', error);
            return sendResponse(res, error, locale('WEATHER_API_ERROR'), RESPONSE_FAILURE, RESPONSE_CODE.UNAUTHORISED);
        }
    };
    static getOneDayWeatherPrediction = async (req: Request, res: Response,) => {
        try {
            const locationKey: string = req.params.locationKey;
            const forecast = await WeatherService.getOneDayWeatherPrediction(locationKey);
            return sendResponse(res, forecast, locale('WEATHER_REPORT_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('WeatherController.getTopCitiesReport() Error: ', error);
            return sendResponse(res, error, locale('WEATHER_API_ERROR'), RESPONSE_FAILURE, RESPONSE_CODE.UNAUTHORISED);
        }
    };
}

export default WeatherController;
