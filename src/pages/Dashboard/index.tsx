import React from 'react';
import Header from '../../components/Header';
import { Line, Doughnut } from 'react-chartjs-2';
import LineContainer from '../../components/LineContainer';
import Card from '../../components/Card';
import Content from '../../components/Content';
import SearchForm, { SearchParams } from '../../components/SearchForm';
import { useState } from 'react';
import { useEffect } from 'react';
import { getData } from '../../api/api';
import { parseFrequecyChart, parseNegPosChart, parsePieChart, parseTotals } from '../../utils/parser';

interface Dataset {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number
}
export interface DataChart {
  labels: string[];
  datasets: Dataset[];
}

export interface Totals {
  total: number;
  positiveTotal: number;
  negativeTotal: number;
}

// const data = {
//   labels: ['1', '2', '3', '4', '5', '6'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       fill: false,
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgba(255, 99, 132, 0.2)',
//     },
//   ],
// };

// const dataPie = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 245, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

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
  const [dataFrequency, setDataFrequence] = useState<DataChart>();
  const [dataNegPos, setDataNegPos] = useState<DataChart>();
  const [dataPieChart, setDataPieChart] = useState<DataChart>();
  const [totals, setTotals] = useState<Totals>();
  const [fetchState, setFetchState] = useState<'idle'|'loading'|'resolved'>('idle');


  const searchData = async (dataParams: SearchParams) => {
    setFetchState('loading')
    const data = await getData(dataParams);
    setDataFrequence(parseFrequecyChart(data));
    setDataNegPos(parseNegPosChart(data));
    setDataPieChart(parsePieChart(data));
    setTotals(parseTotals(data));
    setFetchState('resolved')
  }

  return (
    <>
      <Header />
      {/* Search Options */}
      <Content>
        <Card>
          <SearchForm searchFunction={searchData} />
        </Card>
        {fetchState === 'loading' && 
        (<div>Buscando dados... (Isso pode levar alguns minutos)</div>)}
        {fetchState === 'resolved' && !dataFrequency &&
        (<div>não foi encontrado dados para esse termo</div>)}
        {totals && fetchState === 'resolved' &&  (
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
        {dataFrequency && fetchState === 'resolved' && (
          <LineContainer>
            <Card width="100%">
              <Line type data={dataFrequency} options={options} height={100} />
            </Card>
          </LineContainer>
        )}
        {dataNegPos && dataPieChart && fetchState === 'resolved' && (
          <LineContainer>
            <Card width="49%" >
              <Doughnut type data={dataPieChart} width={100} height={400} options={{
                responsive: true,
                maintainAspectRatio: false,
              }} />
            </Card>
            <Card width="49%" >
              <Line type data={dataNegPos} options={options} height={100} width={150} />
            </Card>
          </LineContainer>
        )}
      </Content>
    </>
  );
}

export default Dashboard;