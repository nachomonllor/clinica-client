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
  @Input() barChartLabels: Label[] = [];
  // @Input('chartLabels') barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
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

  @Input('barChartData') barChartData: ChartDataSets[] = [];

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
}
