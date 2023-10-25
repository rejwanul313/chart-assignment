import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  chartName: string = '';
  chartType: string = '';
  chartIndex = 0;
  charts: any[] = [];
  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2) {}

addChart() {
  const newDiv = this.renderer.createElement('div');
  this.renderer.setAttribute(newDiv, 'id', `chart${this.chartIndex}`);
  this.renderer.addClass(newDiv, 'col-6');
  this.renderer.addClass(newDiv, 'chart');
  this.renderer.appendChild(this.el.nativeElement.querySelector('#area'), newDiv);

  // Add a new chart object to the charts array
  this.charts.push({ type: this.chartType, index: this.chartIndex, name: this.chartName });

  switch (this.chartType) {
      case '1':
          this.createChartColumn(this.chartName);
          break;
      case '2':
          this.createChartLine(this.chartName);
          break;
      case '3':
          this.createChartPie(this.chartName);
          break;
      case '4':
          this.createChartGauge(this.chartName);
          break;
  }

  this.addDelete();

  this.chartName = '';
  this.chartIndex++;
}

addDelete(){
  const deleteButton = this.renderer.createElement('button');
  this.renderer.setProperty(deleteButton, 'innerText', 'Delete');
  this.renderer.addClass(deleteButton, 'delete-button');
  const index = this.chartIndex;
  this.renderer.listen(deleteButton, 'click', () => this.deleteChart(index));
  const chatId = `#chart${this.chartIndex}`
  this.renderer.appendChild(this.el.nativeElement.querySelector(chatId), deleteButton);
}

deleteChart(index: number) {
  const areaDiv = this.el.nativeElement.querySelector(`#chart${index}`);
  this.renderer.removeChild(this.el.nativeElement, areaDiv);
}




  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private createChartGauge(name: string): void {
    const chatId = `chart${this.chartIndex}`
    const chart = Highcharts.chart(chatId as any, {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: name,
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '85%'],
        size: '160%',
        background: {
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
        border: '1px solid lightblue'
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [this.getRandomNumber(0, 100)],
        dataLabels: {
          format: '<div style="text-align: center;"><span style="font-size: 1.25rem">{y}</span></div>',
        },
      }],
    } as any);

    chart.series[0].points[0].update(this.getRandomNumber(0, 100));
  }

  private createChartPie(name: string): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 5; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      });
    }

    const chatId = `chart${this.chartIndex}`
    const chart = Highcharts.chart(chatId as any, {
      chart: {
        type: 'pie',
      },
      title: {
        text: name,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
        pointFormat: '<span>Amount: {point.y}</span>',
        useHTML: true,
      },
      series: [{
        name: null,
        innerSize: '50%',
        data,
      }],
    } as any);

    date.setDate(date.getDate() + 1);
    chart.series[0].addPoint({
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      y: this.getRandomNumber(0, 1000),
    }, true, true);
  }

  private createChartColumn(name: string): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 10; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      });
    }

    const chatId = `chart${this.chartIndex}`
    const chart = Highcharts.chart(chatId as any, {
      chart: {
        type: 'column',
      },
      title: {
        text: name,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Amount',
        data,
      }],
    } as any);

    date.setDate(date.getDate() + 1);
    chart.series[0].addPoint({
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      y: this.getRandomNumber(0, 1000),
    }, true, true);
  }

  private createChartLine(name: string): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 10; i++) {
      date.setDate(new Date().getDate() + i);
      data.push([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)]);
    }

    const chatId = `chart${this.chartIndex}`
    const chart = Highcharts.chart(chatId as any, {
      chart: {
        type: 'line',
      },
      title: {
        text: name,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        }
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      series: [{
        name: 'Amount',
        data,
      }],
    } as any);

    date.setDate(date.getDate() + 1);
    chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)], true, true);
  }

  logout(){
    localStorage.removeItem('acessToken');
    this.router.navigate(['/login']); 
  }
}
