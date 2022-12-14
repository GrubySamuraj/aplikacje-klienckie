import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { NewsPaperDataService } from "../news-paper-data.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

let data = [
  {
    id: 0,
    clicked: false,
    nazwa: "",
    miniaturka: "",
    lata: ""
  }
]
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  yearsList: number[] = [];
  displayedColumns: string[] = ['button', 'nazwa', 'miniatura', 'rok', 'buttonRemove'];
  dataSource = data;
  public selectValue = new FormControl('');
  public zmienne: string[] = [];

  @ViewChild(MatTable) myTable!: MatTable<any>;
  constructor(private _newsPaperDataService: NewsPaperDataService) {

  }
  ngOnInit() {
    this.GetDataForSelect();
    for (let x = 1960; x < 2000; x++) {
      this.yearsList.push(x);
    }
    console.log(this.yearsList);
  }
  Accept(isClicked: boolean, id: number) {
    if (isClicked) {
      console.log("accept");
    }
    else {
      this.dataSource = this.dataSource.filter(el => {
        return el.id != id
      })
      this.myTable.renderRows();
      console.log(this.dataSource);
    }
  }
  async selectHandler(e: Event) {
    console.log(e);
    let xml = await this._newsPaperDataService.getXml();
    let data = this._newsPaperDataService.showNewsPaper(xml, `/czasopisma/${e}`);
    console.log(data);
    let src = []
    for (let x = 0; x < data.length; x++) {
      let obj = {
        id: x,
        clicked: false,
        nazwa: data[x].name,
        miniaturka: data[x].miniatura,
        lata: data[x].numer.split("/")[0]
      }
      src.push(obj);
    }
    this.dataSource = src;
    console.log(src);
  }
  async GetDataForSelect() {
    let xml = await this._newsPaperDataService.getXml();
    let zmienne = this._newsPaperDataService.getZmienne(xml);
    zmienne.map((item) => {
      this.zmienne.push(item.name);
    });
  }
}
