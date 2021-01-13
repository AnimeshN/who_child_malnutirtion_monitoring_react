import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, Charts, GammelTheme);


export default class DashBoard extends React.Component {

  constructor(props){
    super();
    this.state = {
      childId: props.childId,
      childLineChartData: props.childLineChartData
    };
  }

  render () {

    const ChildGrowthChartdataSource = {
      chart: {
        caption: "Child Growth Chart",
        yaxisname: "Weight (in kgs)",
        theme: "gammel"
      },
      data: this.state.childLineChartData
    };

    const LinechartConfigs = {
      type: 'line',
      width: "65%",
      height: 400,
      dataFormat: 'json',
      dataSource: ChildGrowthChartdataSource
    };

    return (
      <center>
        <br />
        <h2>
          Child Health Monitoring DashBoard
        </h2>
        <br />
        <ReactFC {...LinechartConfigs} />
      </center>
    );
  }
}