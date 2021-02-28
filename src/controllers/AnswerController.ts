/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surverysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surverysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError('Survey user does not exists!');
    }
    surveyUser.value = Number(value);

    await surverysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
