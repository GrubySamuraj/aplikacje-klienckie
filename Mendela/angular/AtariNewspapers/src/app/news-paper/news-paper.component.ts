import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-paper',
  templateUrl: './news-paper.component.html',
  styleUrls: ['./news-paper.component.css']
})
export class NewsPaperComponent {
  @Input('newsPaper') public newsPaper = {
    img: "",
    name: ""
  };
  constructor(private router: Router) {

  }
  clickHandler() {
    this.router.navigate(['/', this.newsPaper.name]);
  }
}
