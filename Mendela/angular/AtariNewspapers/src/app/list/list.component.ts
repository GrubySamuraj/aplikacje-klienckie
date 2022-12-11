import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsPaperDataService } from '../news-paper-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public years: string[] = [];
  public album = "";
  public all: elements[] = [];
  constructor(private router: ActivatedRoute, private _newsPaperDataService: NewsPaperDataService) {

  }
  async ngOnInit() {
    this.checker();
  }
  async checker() {
    if (this.router.snapshot.paramMap.get('album')) {
      this.album = this.router.snapshot.paramMap.get('album') as string;
      let path = `//lata/${this.album}`;
      let data = await this._newsPaperDataService.getXml();
      this.years = this._newsPaperDataService.getYear(path, data);
      if (this.router.snapshot.paramMap.get('year') && this.router.snapshot.paramMap.get('year') != "all") {
        let year = this.router.snapshot.paramMap.get('year') as string;
        let xml = await this._newsPaperDataService.getXml();
        let path = `/czasopisma/${this.album}/*`;
        let aaa = this._newsPaperDataService.showNewsPapersYear(path, xml, year);
        this.all = aaa;
      }
      else {
        this.showAllItems();
      }
    }
  }
  async showAllItems() {
    let xml = await this._newsPaperDataService.getXml();
    let path = `/czasopisma/${this.album}`;
    this.all = this._newsPaperDataService.showAll(path, xml);
  }
  getElement(e: elements[]) {
    this.all = e;
    console.log(e);
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
