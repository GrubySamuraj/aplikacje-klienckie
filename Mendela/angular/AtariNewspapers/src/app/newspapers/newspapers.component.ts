import { Component } from '@angular/core';
import { NewsPaperDataService } from '../news-paper-data.service';

@Component({
  selector: 'app-newspapers',
  templateUrl: './newspapers.component.html',
  styleUrls: ['./newspapers.component.css']
})
export class NewspapersComponent {
  public xml: Document = new Document;
  public newsPapers: newsPaper[] = [];
  constructor(private _newsPaperDataService: NewsPaperDataService) {

  }
  async ngOnInit() {
    this.xml = await this._newsPaperDataService.getXml();
    let data = this._newsPaperDataService.getZmienne(this.xml);
    this.newsPapers = data;
  }
}
interface newsPaper {
  img: string,
  name: string
}
