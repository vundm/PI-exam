import { Component, OnInit } from '@angular/core';
import { App } from '../app';

import { WebsocketService } from '../websocket.service';
import { Observable, Subscription } from 'rxjs';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  STATUS_COLORS = {
    '1': 'info',
    '2': 'warning',
    '3': 'danger',
  };
  STATUS_TEXTS = {
    '1': 'Ok',
    '2': 'Major',
    '3': 'Critical',
  };
  STATUSES = [
      {key: 'Ok', value: '1'},
      {key: 'Major', value: '2'},
      {key: 'Critical', value: '3'},
  ];

  updatedApps = null;

  apps: any;

  selected_name = '';
  selected_status = 1;

  constructor(private webSocketService: WebsocketService, private modalService: NgbModal) { }

  ngOnInit() {
    this.webSocketService.getApps().subscribe(data => {
      this.apps = data;
    });

    this.webSocketService.updateStatus().subscribe(data => {
      this.updateAppStatus(data);
    });
  }

  updateAppStatus = function(data) {
    for (let i = 0; i < this.apps.length; i++) {
      if (this.apps[i].id === data.id) {
        this.apps[i].status = data.status;
      }
    }
  };

  removeApp = function(id) {
    this.webSocketService.removeApp(id);
  };

  newApp = function(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const newApp = {
        name: this.selected_name,
        status: this.selected_status
      };
      this.webSocketService.addApp(newApp);
    }, (reason) => {});
  };

}
