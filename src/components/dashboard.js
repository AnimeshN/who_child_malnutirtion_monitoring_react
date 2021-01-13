import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { ChildDashboard } from './ChildDashboard/ChildDashboard'
import { FormControl, InputLabel,Select,MenuItem ,Typography} from '@material-ui/core';

// ReactFC.fcRoot(FusionCharts, Charts, GammelTheme);
// function goodEmptyCheck(value) {
//     return Object.keys(value).length === 0
//       && value.constructor === Object; // 👈 constructor check
//   }

    

  export const DashBoard = ({awc_id}) =>{

    const [awcData, setAWCData] = useState(null);

    const [childID, setChildID] = useState('e9ae937d-39d3-4b91-b53d-895b0bfb6dde');

    const [childData, setChildData] = useState(null);


    const [dropdownOpt, setDropdownOpt] = useState(null);

    const [allWHOZScore,setAllWHOZScore] = useState(null);

    const handleChange = (event) => {
      setChildID(event.target.value);
    };

    console.log(childID)

    useEffect(() => {
      if(awcData)
      setDropdownOpt(Object.keys(awcData));
    }, [awcData])

    useEffect(() => {
      const URL = `https://tracker.communitygis.net/api/child/id/${childID}`;
  
      axios.get(URL,{}).then((response) => {
          setChildData(response.data);
            }).catch(function getDataError(e){
              console.log('Failed to load Anganwadi Data', e);
            });

    

      axios.get(`${domain}/api/child/status/${childID}`,{}).then((response) => {
          setAllWHOZScore({...allWHOZScore,'status':response.data});
            }).catch(function getDataError(e){
              console.log('Failed to load Anganwadi Data', e);
            });
                 
           
  
    }, [childID])
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


    const request7 = axios.get(`${domain}/api/child/status/${childID}`);

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


    useEffect(() => {
      const URL = `https://tracker.communitygis.net/api/awc/${awc_id}`;
  
      axios.get(URL,{}).then((response) => {
          setAWCData(response.data);
            }).catch(function getDataError(e){
              console.log('Failed to load Anganwadi Data', e);
            });
           
  
    }, [awc_id])
    
  
    
    if(!awcData || !dropdownOpt || !allWHOZScore)
    return <pre></pre>
    return (<div style={{width:'100%',height:'100%'}}>
      
      <div style={{display:'flex', gap:50,justifyContent:'center',marginTop:50, marginLeft:200,alignItem:"center"}}>

      {/* <Typography variant="subtitle1" component="h2">
                Aganwadi Center ID: {awc_id}
      </Typography> */}


          <FormControl style={{width:500}}>
            <InputLabel id="demo-simple-select-label">Select Child ID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={childID}
              onChange={handleChange}
            >

             
              { dropdownOpt.map(opt => (<MenuItem  key={opt} value={opt}>{opt}</MenuItem>))}
            </Select>
          </FormControl>
      </div>
      
      <ChildDashboard data={childData} whoZScore={allWHOZScore}/>
    </div>)
  }
// export const  DashBoard extends React.Component {

//   constructor(props){
//     super();
//     this.state = {
//       childId: props.childId
//     };
//   }

//   handleChildIdChange = (e) => {
//     this.setState({childId: e.target.value });
//   }

//   render () {
//       let childId = this.state.childId || this.props.childId, anganWadiData = this.props.anganWadiData || {}, childData = {}, childLineChartData = {}, ChildGrowthChartdataSource = {}, childrenIdOptions = [];
//     if (!goodEmptyCheck(anganWadiData)) {
//         childData = anganWadiData[childId];
//         childLineChartData = childData.map((Obj) => {
//             return {
//               label: Obj.month,
//               value: Obj.weight
//             };
//           });
//           childrenIdOptions = Object.keys(anganWadiData);
//     }


//     return (
//       <center>
//         <br />
//         <h1>Child Health Monitoring DashBoard</h1>
//         <br />
//         <div className="dashboard-container">
//           <div className="dashboard-operator">
//             <select className="child-id-selector" onChange={this.handleChildIdChange}>
//               {
//                 childrenIdOptions.map((val)=> <option value={val}>{val}</option>)
//               }
//             </select>
//           </div>
//           <div className="childGrowth-chart-container">
//           </div>
//         </div>
//       </center>
//     );
//   }
// }