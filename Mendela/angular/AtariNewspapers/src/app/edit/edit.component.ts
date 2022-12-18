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
    lata: "",
    newName: ""
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
      for (let x = 0; x < this.dataSource.length; x++) {
        if (this.dataSource[x].id === id) {
          let min = document.getElementById(`inputMin${id}`) as HTMLInputElement;
          let val = document.getElementById(`inputVal${id}`) as HTMLInputElement;
          this.dataSource[x].miniaturka = min.value;
          this.dataSource[x].newName = val.value;
          this.dataSource[x].clicked = false;
        }
      }
    }
    else {
      this.dataSource = this.dataSource.filter(el => {
        return el.id != id
      })
      this.myTable.renderRows();
      console.log(this.dataSource);
    }
  }
  changeValue(val: number[], id: number) {
    let str = '';
    val.map((item) => {
      str += item.toString() + ','
    })
    for (let data of this.dataSource) {
      if (data.id === id) {
        data.lata = str;
      }
    }
  }
  sendData() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: this.selectValue.value,
        data: this.dataSource
      })
    }
    fetch('http://localhost:3000/edit', options)
      .then((response) => response.json())
      .then((data) => { console.log(data) });
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
        newName: "",
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
