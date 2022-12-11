import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewsPaperDataService } from '../news-paper-data.service';

@Component({
  selector: 'app-year-button',
  templateUrl: './year-button.component.html',
  styleUrls: ['./year-button.component.css']
})
export class YearButtonComponent {
  @Input('value') public value = "";
  @Input('album') public album = "";
  @Output() public czasopisma = new EventEmitter();
  public items: elements[] = [];
  constructor(private _newsPaperDataService: NewsPaperDataService) {

  }
  async onClick() {
    let xml = await this._newsPaperDataService.getXml();
    let path = `/czasopisma/${this.album}/*`;
    this.items = this._newsPaperDataService.showNewsPapersYear(path, xml, this.value);
    this.czasopisma.emit(this.items);
  }
}
interface elements {
  name: string,
  numer: string,
  wydawca: string,
  format: string,
  strony: string,
  miniatura: string,
  plik: string,
  skan: string,
  przetworzenie: string,
  podeslal: string
}