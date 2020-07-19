const survey = {
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'rating',
          name: 'question1',
          title: '¿Como Calificarías al Profesional que te atendó?',
          rateMax: 10,
          isRequired: true,
        },
        {
          type: 'dropdown',
          name: 'question2',
          title: '¿El profesional resolvió satisfactoriamente tu problema?',
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
          type: 'comment',
          name: 'question3',
          title: '¿Tienes algún comentario que quieras dejar asentado?',
        },
      ],
      title: 'Encuesta de Satisfacción al Cliente',
      description: 'Clinica Monllor',
    },
  ],
}
export class PatientSurveyService {
  async getSurvey() {
    return Promise.resolve(survey)
  }
}
