import React from 'react';
import './ChildDashboard.css';

import {Infobox} from './InfoBox/InfoBox';
import {LineChart} from './LineChart/LineChart';
import {Status} from './Status/Status';

export const ChildDashboard = ({data,whoZScore}) =>{

    const child_age = data[0].age;
    const child_gender = data[0].gender;
    let whoStuntingScores;
    let whoUnderweightScores;
    let whoWastingScores;

    console.log(whoZScore)


    if(child_gender === "Girl"){
        whoUnderweightScores = whoZScore.wfaG;
        if(child_age < 24){
            whoStuntingScores = whoZScore.lfaG0;
            whoWastingScores = whoZScore.wfhG0;
        }else{
            whoStuntingScores = whoZScore.lfaG1;
            whoWastingScores = whoZScore.wfhG1;
        }
    }else{
        whoUnderweightScores = whoZScore.wfaB;
        if(child_age < 24){
            whoStuntingScores = whoZScore.lfaB0;
            whoWastingScores = whoZScore.wfhG0; // convert it to boy

        }else{
            whoStuntingScores = whoZScore.lfaB1;
            whoWastingScores = whoZScore.wfhG0; // convert it to boy

        }
    }

    let heightData=[];
    whoStuntingScores.month.map(d=>{
      let flag = false;
      let height;
      data.map(d1 => {
        if(parseInt(d) === d1.age){
          flag = true;
          height = d1.height;
        }
      })
      if(flag) heightData.push(height);
      else heightData.push(null)
    })

    let weightData=[];
    whoUnderweightScores.month.map(d=>{
      let flag = false;
      let weight;
      data.map(d1 => {
        if(parseInt(d) === d1.age){
          flag = true;
          weight = d1.weight;
        }
      })
      if(flag) weightData.push(weight);
      else weightData.push(null)
    })

    let stuntingData=[];

    let stuntingXLabel = []
    let tempHeight = []
    let max,min;
    data.map(d=>{
      tempHeight.push(d.height);
      
    })
    max = Math.max(...tempHeight);
    min = Math.min(...tempHeight);
    whoWastingScores.length.map(d=>{
      if(parseInt(d)<min || parseInt(d) > max)
        stuntingXLabel.push(parseInt(d))
    })

    data.map(d=>{
      stuntingXLabel.push(d.height);
      tempHeight.push(d.height);
    })
    // console.log(tempHeight)
    stuntingXLabel = ([...new Set(stuntingXLabel)])
    stuntingXLabel = stuntingXLabel.sort()
    stuntingXLabel.shift()

    whoWastingScores['xaxis'] = stuntingXLabel;
    stuntingXLabel.map(d=>{
      let flag = false;
      let weight;
      data.map(d1 => {
        if(d === d1.height){
          flag = true;
          weight = d1.weight;
        }
      })
      if(flag) stuntingData.push(weight);
      else stuntingData.push(null)
    })



    return (
    <div id= 'child-tracking'>
      
        <div id='info'>
            <Infobox type="Child ID" value={data[0].child_id} />
            <Infobox type="AWC ID" value={data[0].awc_id} />
            <Infobox type="Gender" value={data[0].gender} />
            <Infobox type="Age(in month)" value={data[data.length - 1].age}/>
        </div>
        <div id='chart'>
            <LineChart heading="Stunting" xaxis='Age(month)' yaxis='height/length(cm)' childData={heightData} whoZScore={whoStuntingScores}/>
            <Status status={whoZScore.status.isStunted}/>

            <LineChart heading="Underweight" xaxis='Age(month)' yaxis='Weight(Kg)' childData={weightData} whoZScore={whoUnderweightScores}/>
            <Status status={'Moderate'}/>

            <LineChart heading="Wasting" xaxis='Height(cm)' yaxis='Weight(in Kg)' childData={stuntingData} whoZScore={whoWastingScores}/>
            <Status status={'SAM'}/>

        </div>
        <div id='status'>
        </div>
        
    </div>)
}