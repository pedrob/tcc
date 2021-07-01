import React from 'react';
import Header from '../../components/Header';
import { Line, Doughnut } from 'react-chartjs-2';
import LineContainer from '../../components/LineContainer';
import Card from '../../components/Card';
import Content from '../../components/Content';
import SearchForm from '../../components/SearchForm';
import { useState } from 'react';
import { useEffect } from 'react';
import { getData } from '../../api/api';

interface Dataset {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string | string[];
  borderWidth?: number
}
interface DataChart {
  labels: string[];
  datasets: Dataset[];
}

interface Totals {
  total: number;
  positiveTotal: number;
  negativeTotal: number;
}

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
  const [dataFrequency, setDataFrequence] = useState<DataChart>()
  const [totals, setTotals] = useState<Totals>();

  useEffect(() => {
    const getChartsData = async () => {
      const data = await getData();
      setDataFrequence({
        labels: data.datas,
        datasets: [
          {
            label: 'Frequencia de menções por tempo',
            data: data.mencoes,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          }
        ]
      })
      setTotals({
        total: data.total,
        negativeTotal: data.mencoesNegativas.reduce((acc, value) => value += acc),
        positiveTotal: data.mencoesPositivas.reduce((acc, value) => value += acc)
      })
    } 
    getChartsData();
  }, [])

  console.log('dataFrequency', dataFrequency);
  return (
    <>
      <Header />
      {/* Search Options */}
      <Content>
        <Card>
          <SearchForm />
        </Card>
        {totals && (
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
                {totals.total} tweets coletados
              </div>
            </Card>
            <Card
              width="24%"
            >
              <div>
                {totals.positiveTotal} tweets positivos
              </div>
            </Card>
            <Card
              width="24%"
            >
              <div>
                {totals.negativeTotal} tweets negativos
              </div>
            </Card>
          </LineContainer>
        )}
        {dataFrequency && (
          <LineContainer>
            <Card width="100%">
              <Line type data={dataFrequency} options={options} height={100} />
            </Card>
          </LineContainer>
        )}
        <LineContainer>
          <Card width="49%" >
            <Doughnut type data={dataPie} width={100} height={400} options={{
              responsive: true,
              maintainAspectRatio: false,
            }} />
          </Card>
          <Card width="49%" >
            <Line type data={data} options={options} height={100} width={150} />
          </Card>
        </LineContainer>
      </Content>
    </>
  );
}

export default Dashboard;