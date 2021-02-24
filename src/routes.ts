import { Router } from 'express';

import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();

routes.post('/users', userController.create);

routes.get('/surveys', surveyController.index);
routes.post('/surveys', surveyController.create);

export { routes };
