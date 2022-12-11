import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AtariNewspapers';
  date = new Date();
  getDate() {
    let data = new Date();
    this.date = data;
  }
  ngOnInit() {
    window.setInterval(() => {
      this.getDate();
    }, 1000);
  }
}

