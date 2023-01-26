import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-client';

  constructor(private modalService: NgbModal) {
    console.log('env: ' + process.env['NODE_ENV']);
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
