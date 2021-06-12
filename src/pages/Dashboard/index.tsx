import React from 'react';
import Header from '../../components/Header';
import { Line, Pie } from 'react-chartjs-2';
import LineContainer from '../../components/LineContainer';
import Card from '../../components/Card';
import Content from '../../components/Content';

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

const dataPie = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 245, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
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
      <Content>
        <Card>
          <div>
            Search
          </div>
        </Card>
        <LineContainer>
          <Card
            width="24%"
            height="100px"
          >
            <div>
              20/01/2019 á 20/05/2021
            </div>
          </Card>
          <Card
            width="24%"
          >
            <div>
              10 mil tweets coletados
            </div>
          </Card>
          <Card
            width="24%"
          >
            <div>
              1 mil tweets positivos
            </div>
          </Card>
          <Card
            width="24%"
          >
            <div>
              5 mil tweets negativos
            </div>
          </Card>
        </LineContainer>
        <LineContainer>
          <Card width="100%">
            <Line type data={data} options={options} height={100} />
          </Card>
        </LineContainer>
        <LineContainer>
          <Card width="100%">
            <Line type data={data} options={options} height={100} />
          </Card>
        </LineContainer>
        <LineContainer>
          <Pie type data={dataPie} width={100} height={400} options={{
            responsive: true,
            maintainAspectRatio: false,
          }} />
        </LineContainer>
      </Content>
    </>
  );
}

export default Dashboard;