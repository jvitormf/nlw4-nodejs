import { Router } from 'express';

import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';
import { SendMailController } from './controllers/SendMailController';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

routes.post('/users', userController.create);

routes.get('/surveys', surveyController.index);
routes.post('/surveys', surveyController.create);

routes.post('/sendMail', sendMailController.execute);

export { routes };
