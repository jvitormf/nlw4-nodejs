import { Request, Response } from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveysUsers.filter(
      ({ value }) => value >= 0 && value <= 6,
    ).length;

    const passives = surveysUsers.filter(
      ({ value }) => value >= 7 && value <= 8,
    ).length;

    const promoters = surveysUsers.filter(
      ({ value }) => value >= 9 && value <= 10,
    ).length;

    const totalAnswers = surveysUsers.length;

    const nps = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2),
    );

    return response.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps,
    });
  }
}

export { NpsController };
