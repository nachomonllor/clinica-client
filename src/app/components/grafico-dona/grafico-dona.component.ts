import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
})
export class GraficoDonaComponent implements OnInit, OnChanges {
  colors: any = [{ backgroundColor: ['rgba(76,175,80,1)'] }];
 
  downloadLink: string;
  export_graph: HTMLCanvasElement;
  options: Chart.ChartOptions = {
    responsive: true,
    legend: {
      display: true,
    },
    cutoutPercentage: 0,
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipLabel = data.labels[tooltipItem.index];
          const tooltipData = allData[tooltipItem.index];
          return `${tooltipLabel}: ${tooltipData}%`;
        },
      },
    },
    plugins: {
      labels: {
        render: 'percentage',
        fontStyle: 'bold',
        fontColor: '#fff',
      },
    },
  };
  countLabels: number;
  // tslint:disable-next-line:no-input-rename
  @Input('chartLabels') doughnutChartLabels: string[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('chartData') doughnutChartData: number[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('chartType') doughnutChartType: string = '';
  constructor() {}

  ngOnInit() {
    debugger
    this.export_graph = <HTMLCanvasElement>document.getElementById("myChart");
  }

  ngOnChanges(changes) {
    if (changes.doughnutChartLabels && changes.doughnutChartLabels.currentValue) {
      this.countLabels = changes.doughnutChartLabels.currentValue.length;

      if (this.countLabels > 0) {
        this.colors = [];
        const backgroundColor = [];
        // tslint:disable-next-line:no-increment-decrement
        for (let i = 0; i < this.countLabels; i++) {
          backgroundColor.push(this.randomRGBA());
        }
        this.colors = [{ backgroundColor }];
      }
    }
  }

  randomRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    if (r === 255 && g === 255 && b === 255) {
      return this.randomRGBA;
    }
    return `rgba(${r},${g},${b},1)`;
  }
  
  // exportGraph(){
  //   this.downloadLink = this.export_graph.toDataURL("image/png");
  // }

}
