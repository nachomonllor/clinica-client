import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.scss'],
})
export class GraficoBarraComponent {
  public barChartLegend = true;
  barChartType: ChartType = 'bar';
  @Input('maxValue') maxValue: number = 0;
  @Input('chartLabels') barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {},
      ],
      yAxes: [
        {
          beforeFit: (scale) => {
            scale.options.ticks.min = 0;
            scale.options.ticks.max = this.maxValue + 1;
          },
        },
      ],
    },
    plugins: {
      labels: {
        render: 'value',
        fontStyle: 'bold',
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
  };
  // @Input('barChartLabels') barChartLabels: Label[] = [];
  // @Input('barChartData') barChartData: ChartDataSets[] = [];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
}
