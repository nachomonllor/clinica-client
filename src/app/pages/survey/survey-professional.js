const survey = {
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'rating',
          name: 'question1',
          title: 'Estado físico',
          rateMax: 10,
          isRequired: true,
        },
        {
          type: 'dropdown',
          name: 'question2',
          title: '¿Es una Persona de riesgo?',
          isRequired: true,
          choices: [
            {
              value: '1',
              text: 'Sí',
            },
            {
              value: '2',
              text: 'No',
            },
          ],
        },
        {
          type: 'text',
          name: 'question3',
          title: 'Temperatura Corporal',
          isRequired: true,
        },
        {
          type: 'text',
          name: 'question4',
          title: 'Presión Arterial',
          isRequired: true,
        },
        {
          type: 'comment',
          name: 'question5',
          title: 'Comentarios',
          isRequired: true,
        },
      ],
      title: 'Encuesta del Profesional',
      description: 'Clinica Monllor',
    },
  ],
}
export class ProfessionalSurveyService {
  async getSurvey() {
    return Promise.resolve(survey);
  }
}