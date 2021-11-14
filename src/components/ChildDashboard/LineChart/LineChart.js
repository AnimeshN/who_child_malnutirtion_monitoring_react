import React,{} from 'react'
import {Line} from 'react-chartjs-2';
import './LineChart.css';

export const LineChart = ({type,heading,xaxis,yaxis,childData,whoZScore}) => {
  let labels;  
  let stepSize;
  let height = [];
  const {minus_three_sd,median,minus_two_sd,plus_three_sd,plus_two_sd}  = whoZScore;
  if(type === 'Stunting'){
    labels = whoZScore.month
    stepSize=10
    }else if(type === 'Underweight'){
    labels = whoZScore.month
    stepSize=2
    }else{
      labels = whoZScore.xaxis;
      stepSize=2
    }
    const data= {
        labels: labels,
        datasets: [
          {
            label: 'child',
            fill: false,

            data: childData,
            borderColor: 'red',
            borderWidth: 1
        },
        {
            label: '-3SD',
            fill: false,

            data: minus_three_sd,
            borderColor: 'pink',
            borderWidth: 1
        },
        {
          label: '-2SD',
          fill: false,

          data: minus_two_sd,
          borderColor: 'yellow',
          borderWidth: 1
        },
        {
          label: 'median',
          fill: false,

          data: median,
          borderColor: 'lightgreen',
          borderWidth: 1
        },
        
        {
          label: '+2SD',
          fill: false,

          data: plus_two_sd,
          borderColor: 'yellow',
          borderWidth: 1
        },
        {
          label: '+3SD',
            fill: false,
  
            data: plus_three_sd,
            borderColor: 'pink',
            borderWidth: 1
          },]
    }
      const options={
          title:{
            display:true,
            text:heading,
            fontSize:20,
            // fontWeight: 1,
            lineHeight: 1.5,
            fontColor: "rgba(0, 0, 0)",
            fontStyle:'normal',
            padding:20
          },
          legend:{
            display:true
            // position:
          },
          scales:{
            yAxes:[
              {
                ticks:{
                  beginAtZero: true,
                  stepSize:stepSize
                },
                
                  scaleLabel: {
                    display: true,
                    labelString: yaxis
                  },
  
                  gridLines: {
                    // display:false,
                    // drawOnChartArea: false
                }
                
              }
            ],
            xAxes:[{
            scaleLabel: {
                display: true,
                labelString: xaxis
                },

              gridLines:{
                // display:false
                drawOnChartArea: true
              }
            }
            ]
          }
  
        }

    return (
        <div className="linechart">
        <Line
          data={data}
          options={options}
        />
        </div>
    )
}
