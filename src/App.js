import React,{useState,useEffect} from 'react';
import './App.css';
import {ChildDashboard} from './components/ChildDashboard/ChildDashboard';
import {DashBoard} from './components/dashboard'
import axios from 'axios';
import { Divider, Typography } from '@material-ui/core';


const App = () => {

  const [childData, setChildData] = useState(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('child_id');
  const sector = urlParams.get('sector');
  const category = urlParams.get('category');
  
  const [allWHOZScore,setAllWHOZScore] = useState(null);

  useEffect(() => {
    const URL = `https://tracker.communitygis.net/api/child/id/${id}`;

    axios.get(URL,{}).then((response) => {
        setChildData(response.data);
          }).catch(function getDataError(e){
            console.log('Failed to load Anganwadi Data', e);
          });
         

  }, [id])




  const domain = 'https://tracker.communitygis.net';
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
    
    const request10 = axios.get(`${domain}/api/indicators/wfh/boy/0`);
    const request11 = axios.get(`${domain}/api/indicators/wfh/boy/1`);
    

    axios.all([request1, request2,request3,request4,request5,request6,request7,request8,request9,request10,request11]).then(axios.spread((...resp) => {

      setAllWHOZScore({'lfaG0':resp[0].data,
                    'lfaG1':resp[1].data,
                    'lfaB0':resp[2].data,
                    'lfaB1':resp[3].data,
                    'wfaG':resp[4].data,
                    'wfaB':resp[5].data,
                    'status':resp[6].data,
                    'wfhG0':resp[7].data,
                    'wfhG1':resp[8].data,
                    'wfhB0':resp[9].data,
                    'wfhB1':resp[10].data
                  })

      // use/access the results 
    })).catch(errors => {
      // react on errors.
    })

  }, [])

  
 
  if(sector){
    return (
      <>
      <div id='heading'>
            <Typography variant="h3" component="h2" style={{color:"black"}}>
            CHILD HEALTH MONITORING DASHBOARD
            </Typography>

            <Typography variant="h6" component="h2" style={{color:"black"}}>
                Using WHO child growth standards
            </Typography>
        </div>
    <DashBoard sector={sector} category={category}/>
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
            <Divider/>
            <Typography variant="h6" component="h2">
                Using WHO child growth standards
            </Typography>
        </div>
        
    <ChildDashboard data={childData} whoZScore={allWHOZScore}/>
    </>)
  
}


export default App;
