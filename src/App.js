import React,{useState,useEffect} from 'react';
import './App.css';
import {ChildDashboard} from './components/ChildDashboard/ChildDashboard';
import {DashBoard} from './components/dashboard'
import axios from 'axios';
import { Typography } from '@material-ui/core';


const App = () => {

  const [childData, setChildData] = useState(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('child_id');
  const awc_id = urlParams.get('awc_id');
  
  const [allWHOZScore,setAllWHOZScore] = useState(null);

  useEffect(() => {
    const URL = `https://tracker.communitygis.net/api/child/id/${id}`;

    axios.get(URL,{}).then((response) => {
        setChildData(response.data);
          }).catch(function getDataError(e){
            console.log('Failed to load Anganwadi Data', e);
          });
         

  }, [id])




  const domain = 'http://localhost:3000';
  // const domain = 'https://tracker.communitygis.net'

  useEffect(() => {
    // length for age
    const request1 = axios.get(`${domain}/api/indicators/lfa/girl/0`);
    const request2 = axios.get(`${domain}/api/indicators/lfa/girl/1`);
    const request3 = axios.get(`${domain}/api/indicators/lfa/boy/0`);
    const request4 = axios.get(`${domain}/api/indicators/lfa/boy/1`);
    


    // weight for age
    const request5 = axios.get(`${domain}/api/indicators/wfa/girl`);
    const request6 = axios.get(`${domain}/api/indicators/wfa/boy`);


    const request7 = axios.get(`${domain}/api/child/status/${id}`);

    // weight for length

    const request8 = axios.get(`${domain}/api/indicators/wfh/girl/0`);
    const request9 = axios.get(`${domain}/api/indicators/wfh/girl/1`);
    


    axios.all([request1, request2,request3,request4,request5,request6,request7,request8,request9]).then(axios.spread((...resp) => {

      setAllWHOZScore({'lfaG0':resp[0].data,
                    'lfaG1':resp[1].data,
                    'lfaB0':resp[2].data,
                    'lfaB1':resp[3].data,
                    'wfaG':resp[4].data,
                    'wfaB':resp[5].data,
                    'status':resp[6].data,
                    'wfhG0':resp[7].data,
                    'wfhG1':resp[8].data})

      // use/access the results 
    })).catch(errors => {
      // react on errors.
    })

  }, [])

  
 
  if(awc_id){
    return (
      <>
      <div id='heading'>
            <Typography variant="h3" component="h2">
            CHILD HEALTH MONITORING DASHBOARD
            </Typography>
        </div>
    <DashBoard awc_id={awc_id} />
    </>)
  }
  if(!childData || !allWHOZScore)
    return <pre></pre>
  else
    return (
      <>
      <div id='heading'>
            <Typography variant="h3" component="h2">
            CHILD HEALTH MONITORING DASHBOARD
            </Typography>
        </div>
    <ChildDashboard data={childData} whoZScore={allWHOZScore}/>
    </>)
  
}
// class App extends React.Component {
  // const anganWadiData = {
  //   childId1: [
  //     {
  //       "age": 11,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "cc815622-4e81-4d91-b96b-312e33a6983e",
  //       "gender": "Girl",
  //       "height": 73,
  //       "date": "01/01/2017",
  //       "weight": 7
  //     },
  //     {
  //       "age": 12,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/02/2017",
  //       "weight": 9
  //     },
  //     {
  //       "age": 13,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/03/2017",
  //       "weight": 10.8
  //     },
  //     {
  //       "age": 14,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/04/2017",
  //       "weight": 11.2
  //     },
  //     {
  //       "age": 15,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/05/2017",
  //       "weight": 11.6
  //     },
  //     {
  //       "age":  15,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/06/2017",
  //       "weight": 11.9
  //     },
  //     {
  //       "age": 16,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/07/2017",
  //       "weight": 12.5
  //     },
  //     {
  //       "age": 17,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/08/2017",
  //       "weight": 12.7
  //     },
  //     {
  //       "age": 18,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/09/2017",
  //       "weight": 13
  //     },
  //     {
  //       "age": 19,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/10/2017",
  //       "weight": 14.7
  //     },
  //     {
  //       "age": 20,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/11/2017",
  //       "weight": 15
  //     },
  //     {
  //       "age": 21,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/12/2017",
  //       "weight": 16.2
  //     }
  //   ],
  //   childId2: [
  //     {
  //       "age": 11,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "cc815622-4e81-4d91-b96b-312e33a6983e",
  //       "gender": "Girl",
  //       "height": 73,
  //       "date": "01/01/2017",
  //       "weight": 4
  //     },
  //     {
  //       "age": 12,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/02/2017",
  //       "weight": 5
  //     },
  //     {
  //       "age": 13,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/03/2017",
  //       "weight": 6
  //     },
  //     {
  //       "age": 14,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/04/2017",
  //       "weight": 7.5
  //     },
  //     {
  //       "age": 15,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/05/2017",
  //       "weight": 8
  //     },
  //     {
  //       "age":  15,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/06/2017",
  //       "weight": 8.9
  //     },
  //     {
  //       "age": 16,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/07/2017",
  //       "weight": 9.5
  //     },
  //     {
  //       "age": 17,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/08/2017",
  //       "weight": 11.7
  //     },
  //     {
  //       "age": 18,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/09/2017",
  //       "weight": 11.3
  //     },
  //     {
  //       "age": 19,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/10/2017",
  //       "weight": 12.7
  //     },
  //     {
  //       "age": 20,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/11/2017",
  //       "weight": 13
  //     },
  //     {
  //       "age": 21,
  //       "awc_id": "4c051f983ece4078a666c6f0127acbc3",
  //       "child_id": "33e35ecb-9303-4c8b-9190-26e274782843",
  //       "gender": "Girl",
  //       "height": 86,
  //       "date": "01/12/2017",
  //       "weight": 13.6
  //     }
  //   ]
  // };

//   constructor(props){
//     super();
//     this.state = {
//       anganWadiId: '4c051f983ece4078a666c6f0127acbc3',
//       anganWadiData: {}};
//   }

//   componentDidMount () {
//     const URL = `https://tracker.communitygis.net/api/awc/${this.state.anganWadiId}`;
//     axios.get(URL,{

//     }).then((response) => {
//       this.setState({"anganWadiData":response.data});
//     }).catch(function getDataError(e){
//       console.log('Failed to load Anganwadi Data', e);
//     });
//   }  

//   render () {
//     let childId = " ";
//     if(this.state.anganWadiData){
//       childId = Object.keys(this.state.anganWadiData)[0];
//     }
    
//     return (
//       <div className="App">
//          <DashBoard anganWadiData={this.state.anganWadiData} childId={childId}/>
//       </div>
//     );
//   }
// }

export default App;
