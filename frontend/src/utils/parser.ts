import { APIResponse } from "../api/api"
import { Totals } from "../pages/Dashboard";

export const parseTotals = (response: APIResponse): Totals => {
  return {
    total: response.total,
    negativeTotal: response.negativeMentions.reduce((acc, value) => value += acc),
    positiveTotal: response.positiveMentions.reduce((acc, value) => value += acc)
  }
}

export const parseFrequecyChart = (response: APIResponse) => {
  return {
    labels: response.dates,
    datasets: [
      {
        label: 'Frequency of mentions by time',
        data: response.mentions,
        fill: false,
        backgroundColor: 'rgb(86, 192, 162)',
        borderColor: 'rgb(62, 130, 110)',
      }
    ]
  };
}

export const parseNegPosChart = (response: APIResponse) => {
  return {
    labels: response.dates,
    datasets: [
      {
        label: 'Frequency of positive mentions by time',
        data: response.positiveMentions,
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 245, 0.2)',
      },
      {
        label: 'Frequency of negative mentions by time',
        data: response.negativeMentions,
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
    labels: ['Positive Mentions', 'Negative Mentions'],
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