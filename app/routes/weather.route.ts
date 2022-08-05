import UserAuthenticator from '@common/middlewares/UserAuthenticator';
import WeatherController from '@controllers/WeatherController ';
import { Router } from 'express';

const path = '/weather';
const WeatherRouter = Router({ mergeParams: true });



WeatherRouter.get(`${path}`, UserAuthenticator.isAdminAuthenticated(), WeatherController.getTopCitiesReport);
WeatherRouter.get(`${path}/:locationKey`, UserAuthenticator.isAdminAuthenticated(), WeatherController.getOneDayWeatherPrediction);




export default WeatherRouter;
