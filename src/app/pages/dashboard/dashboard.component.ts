import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  url = `${environment.apiUrl}/api/statistics`;
  graficos: any = {
    grafico1: {
      labels: [],
      data:  [],
      type: 'doughnut',
    },
    grafico2: {
      labels: [],
      data:  [],
      type: 'bar',
    },
  
  };
  constructor(private httpService: HttpService) { }
  ngOnInit(): void {
    this.httpService.get(this.url).subscribe(resp => {
      const opByCategory = resp.opByCategory;
      const appointmentByDayOfWeek = resp.appointmentByDayOfWeek;
      this.graficos.grafico1.labels = opByCategory.map(i => i.Category.name);
      this.graficos.grafico1.data = opByCategory.map(i => i.cnt);

    });
  }
  createPdf() {
    const grafico1 = document.getElementsByTagName('canvas')[0].toDataURL();
    const pdf = new jsPDF();
    pdf.text(20, 20, 'Operaciones x Especialidad');
    pdf.addImage(grafico1, 'JPEG', 20, 30);


    const grafico2 = document.getElementsByTagName('canvas')[1].toDataURL();
    pdf.text(20, 140, 'Turnos x Dia de la semana');
    pdf.addImage(grafico2, 'JPEG', 20,150);


    pdf.save('reporte.pdf');
  }
  downloadGraph1(event) {
    const anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = 'grafico1.png';
  }
  downloadGraph2(event) {
    const anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[1].toDataURL();
    anchor.download = 'grafico2.png';
  }

}
