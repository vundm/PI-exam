import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WebsocketService } from '../websocket.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {
  app = null;
  options = null;
  data = null;
  currentTime = 1025409600000;
  chartData = [];

  constructor(private webSocketService: WebsocketService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.webSocketService.getApp(id);

      this.webSocketService.returnApp().subscribe(data => {
        this.app = data;
        this.generateData();
        setInterval(() => {
          this.updateData();
        }, 1000);

        this.options = {
          chart: {
              type: 'lineChart',
              height: 450,
              margin : {
                  top: 50,
                  right: 30,
                  bottom: 60,
                  left: 35
              },
              x: function(d) {
                return d.x;
              },
              y: function(d) {
                return d.y;
              },
              showLegend: false,
              transitionDuration: 350,
              useInteractiveGuideline: true,
              elements: { 
                point: { 
                  radius: 5,
                  hitRadius: 10, 
                  hoverRadius: 5,
                } 
              },

              yAxis: {
                tickFormat: function(d) {
                  return d3.format('d')(d);
                }
              },
              xAxis: {
                axisLabelDistance: 50,
                showMaxMin: false,
                staggerLabels: true,
                tickFormat: function(d) {
                // The "+ 28800000" is a hack-fix for out lack of time-zone in
                // the report resource.  We need to fix this bug.
                return d3.time.format('%M:%S')(new Date(d));
              }
            }
          }
        };
        this.data = [
          {
            values: this.chartData, //values - represents the array of {x,y} data points
            key: 'Sine Wave', //key  - the name of the series.
            color: '#ff7f0e'  //color - optional: choose your own line color.
          }
        ];
      });
    });
  }

  generateData = function() {
    let interval = 0;

    for (let i = 0; i < 300; i++) {
      interval = Math.random() * 1000;
      this.currentTime += interval;
      let value = Math.random(); // value from 0..1
      this.chartData.push({x: this.currentTime, y: value});
    }
  };

  updateData = function() {
    //remove first element of data array
    this.chartData.shift();

    //add new element into last item
    let interval = Math.random() * 1000;
    this.currentTime += interval;
    let value = Math.random(); // value from 0..1
    this.chartData.push({x: this.currentTime, y: value});

    this.data = [
      {
        values: this.chartData, //values - represents the array of {x,y} data points
        key: 'Sine Wave', //key  - the name of the series.
        color: '#ff7f0e'  //color - optional: choose your own line color.
      }
    ];
  };

}
