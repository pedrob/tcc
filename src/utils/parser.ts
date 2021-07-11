import { APIResponse } from "../api/api"
import { Totals } from "../pages/Dashboard";

export const parseTotals = (response: APIResponse): Totals => {
  return {
    total: response.total,
    negativeTotal: response.mencoesNegativas.reduce((acc, value) => value += acc),
    positiveTotal: response.mencoesPositivas.reduce((acc, value) => value += acc)
  }
}

export const parseFrequecyChart = (response: APIResponse) => {
  return {
    labels: response.datas,
    datasets: [
      {
        label: 'Frequencia de menções por tempo',
        data: response.mencoes,
        fill: false,
        backgroundColor: 'rgb(86, 192, 162)',
        borderColor: 'rgb(62, 130, 110)',
      }
    ]
  };
}

export const parseNegPosChart = (response: APIResponse) => {
  return {
    labels: response.datas,
    datasets: [
      {
        label: 'Frequencia de menções positivas por tempo',
        data: response.mencoesPositivas,
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 245, 0.2)',
      },
      {
        label: 'Frequencia de menções negativas por tempo',
        data: response.mencoesNegativas,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  };
}

export const parsePieChart = (response: APIResponse) => {
  const totals = parseTotals(response);
  return {
    labels: ['Menções Positivas', 'Menções negativas'],
    datasets: [
      {
        label: '# of Votes',
        data: [totals.positiveTotal, totals.negativeTotal],
        backgroundColor: [
          'rgba(54, 162, 245, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
}