import React from 'react';
import Header from '../../components/Header';
import { Line, Doughnut } from 'react-chartjs-2';
import LineContainer from '../../components/LineContainer';
import Card from '../../components/Card';
import Content from '../../components/Content';
import SearchForm, { SearchParams } from '../../components/SearchForm';
import { useState } from 'react';
import { getData } from '../../api/api';
import { parseFrequecyChart, parseNegPosChart, parsePieChart, parseTotals } from '../../utils/parser';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CSSProperties } from 'styled-components';

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
  const [positiveTweets, setPositiveTweets] = useState<{[key: string]: string[]}>();
  const [negativeTweets, setNegativeTweets] = useState<{[key: string]: string[]}>();
  const [totals, setTotals] = useState<Totals>();
  const [fetchState, setFetchState] = useState<'idle'|'loading'|'resolved'>('idle');
  const [modal, setModal] = useState(false);
  const [selectedTweets, setSelectedTweets] = useState<string[]>([]);
  const [datePeriodStart, setDatePeriodStart] = useState<Date>();
  const [datePeriodEnd, setDatePeriodEnd] = useState<Date>();


  const toggle = () => {
    if(modal) {
      setSelectedTweets([])
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const searchData = async (dataParams: SearchParams) => {
    setFetchState('loading')
    const data = await getData(dataParams);
    setDatePeriodStart(new Date(dataParams.startDate.replace(/-/g, '\/')));
    setDatePeriodEnd(new Date(dataParams.endDate.replace(/-/g, '\/')));
    setDataFrequence(parseFrequecyChart(data));
    setDataNegPos(parseNegPosChart(data));
    setDataPieChart(parsePieChart(data));
    setTotals(parseTotals(data));
    setPositiveTweets(data.positiveTweets);
    setNegativeTweets(data.negativeTweets);
    setFetchState('resolved')
  }

  const cardStyle: CSSProperties = {
    width: '100%', 
    height: '100%', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const totalsStyle: CSSProperties = {
    fontSize: 30,
    fontWeight: 'bold'
  }
  const periodStyle: CSSProperties = {
    fontSize: 16,
    fontWeight: 'bold'
  }

  return (
    <>
      <Header />
      <Content>
        <Card>
          <SearchForm searchFunction={searchData} />
        </Card>
        {fetchState === 'loading' && 
        (<div>Fetching data... (This could take some minutes)</div>)}
        {fetchState === 'resolved' && !dataFrequency &&
        (<div>No results matched your search.</div>)}
        {totals && fetchState === 'resolved' &&  (
          <LineContainer>
            <Card
              width="24%"
              height="100px"
            >
              <div style={cardStyle}>
                <div style={periodStyle}>
                  {datePeriodStart?.toLocaleDateString()}
                </div>
                <div>
                  à
                </div>
                <div style={periodStyle}>
                  {datePeriodEnd?.toLocaleDateString()}
                </div>
              </div>
            </Card>
            <Card
              width="24%"
            >
              <div style={cardStyle}>
                <div style={totalsStyle}>
                  {totals.total}
                </div>
                <div>
                  Collected tweets
                </div>
              </div>
            </Card>
            <Card
              width="24%"
            >
              <div style={cardStyle}>
                <div style={totalsStyle}>
                  {totals.positiveTotal}
                </div>
                <div>
                  Positive tweets
                </div>
              </div>
            </Card>
            <Card
              width="24%"
            >
              <div style={cardStyle}>
                <div style={totalsStyle}>
                  {totals.negativeTotal}
                </div>
                <div>
                  Negative tweets
                </div>
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
                onClick: (e:any, element:any) => {
                  if (element.length > 0) {
                    if (positiveTweets && negativeTweets) {
                      const index = element[0].index;
                      console.log(element)
                      if (index === 0) {                        
                        setSelectedTweets([...Object.keys(positiveTweets).map(key => positiveTweets[key])].flat())
                        toggle();
                      } else {
                        setSelectedTweets([...Object.keys(negativeTweets).map(key => negativeTweets[key])].flat())
                        toggle();
                      }
                    }
                  }
                },
              }} />
            </Card>
            <Card width="49%" >
              <Line type 
                data={dataNegPos} 
                options={{
                  ...options, 
                  onClick: (e:any, element:any) => {
                    if (element.length > 0) {
                      if (positiveTweets && negativeTweets) {
                        const datasetIndex = element[0].datasetIndex;
                        const index = element[0].index;
                        const label = dataNegPos.labels[index]
                        if (datasetIndex === 0) {
                          setSelectedTweets(positiveTweets[label]);
                          toggle();
                        } else {
                          setSelectedTweets(negativeTweets[label]);
                          toggle();
                        }
                      }
                    }
                  },
                }} 
                height={100} 
                width={150}
              />
            </Card>
          </LineContainer>
        )}
      </Content>
      <Modal isOpen={modal} toggle={toggle} style={{borderRadius: 4}}>
        <ModalHeader>
            Selected tweets
        </ModalHeader>
        <ModalBody style={{background: '#f1f1f1', }}>
          <div style={{
            overflowY: 'auto',
            height: 310,
          }}>
            {selectedTweets.length > 0 && selectedTweets.map(tweet => (
              <p
                style={{
                  // borderStyle: 'solid',
                  border: "1px solid #3e826e",
                  padding: "2px 4px",
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 4,
                  background: '#fff'
                }}
              >{tweet}</p>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Dashboard;