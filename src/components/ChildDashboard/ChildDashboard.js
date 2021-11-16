import React from 'react';
import './ChildDashboard.css';

import {Infobox} from './InfoBox/InfoBox';
import {LineChart} from './LineChart/LineChart';
import {Status} from './Status/Status';

export const ChildDashboard = ({data,whoZScore,status}) =>{
    console.log(whoZScore)

    const child_age = data[0].age;
    const child_gender = data[0].gender;
    let whoStuntingScores;
    let whoUnderweightScores;
    let whoWastingScores;

    let headingUnderweight;
    let headingStunting;
    let headingWasting;

    if(child_gender === "Girl"){
        whoUnderweightScores = whoZScore.wfaG;
        headingUnderweight = "Weight for Age(Girl) 0-59 Month";
        if(child_age < 24){
            whoStuntingScores = whoZScore.lfaG0;
            headingStunting = "Length for Age(Girl): 0-23 Month";

            whoWastingScores = whoZScore.wfhG0;
            headingWasting = "Weight for Length(Girl): 0-23 Month ";

        }else{
            whoStuntingScores = whoZScore.lfaG1;
            headingStunting = "Height for Age(Girl): 24-59 Month";

            whoWastingScores = whoZScore.wfhG1;
            headingWasting = "Weigth for Height(Girl): 24-59 Month";

        }
    }else{
        whoUnderweightScores = whoZScore.wfaB;
        headingUnderweight = "Weight for Age(Boy) 0-59 Month";

        if(child_age < 24){

            whoStuntingScores = whoZScore.lfaB0;
            headingStunting = "Length for Age(Boy): 0-23 Month";

            whoWastingScores = whoZScore.wfhB0; 
            headingWasting = "Weight for Length(Boy): 0-23 Month ";


        }else{
            whoStuntingScores = whoZScore.lfaB1;
            headingStunting = "Height for Age(Boy): 24-59 Month";

            whoWastingScores = whoZScore.wfhB1; 
            headingWasting = "Weight for Height(Boy): 24-59 Month ";


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
            <Infobox type="District" value={data[0].district}/>
            <Infobox type="Project" value={data[0].taluka}/>
            <Infobox type="Sector Name" value={data[0].sector_name} />
            {/* <Infobox type="Beneficiary ID" value={data[0].child_id} /> */}
            <Infobox type="Gender" value={data[0].gender} />
            <Infobox type="Age(in month)" value={data[data.length - 1].age}/>
        </div>
        <div id='chart'>
            {/* <LineChart type="Stunting" heading={headingStunting} xaxis='Age(month)' yaxis='height/length(cm)' childData={heightData} whoZScore={whoStuntingScores}/> */}
            {/* <Status status={status.isStunted}/> */}

            {/* <LineChart type="Underweight" heading={headingUnderweight} xaxis='Age(month)' yaxis='Weight(Kg)' childData={weightData} whoZScore={whoUnderweightScores}/> */}
            {/* <Status status={'Moderate'}/> */}

            <LineChart type="Wasting" heading={headingWasting} xaxis='Height(cm)' yaxis='Weight(in Kg)' childData={stuntingData} whoZScore={whoWastingScores}/>
            {/* <Status status={'SAM'}/> */}

        </div>
        <div id='status'>
        </div>
        
    </div>)
}