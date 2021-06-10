import React from 'react';
import Header from '../../components/Header';
import { Line } from 'react-chartjs-2';
import LineContainer from '../../components/LineContainer';
import Card from '../../components/Card';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


const Dashboard = () => {
  return (
    <>
      <Header />
      {/* Search Options */}
      <Card>
        <div>
          Search
        </div>
      </Card>
      <LineContainer>
        <Card>
          <div>
            20/01/2019 á 20/05/2021
          </div>
        </Card>
        <Card>
          <div>
            10 mil tweets coletados
          </div>
        </Card>
      </LineContainer>
      <Line type data={data} options={options} />
    </>
  );
}

export default Dashboard;