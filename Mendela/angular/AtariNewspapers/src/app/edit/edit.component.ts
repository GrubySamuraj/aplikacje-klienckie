import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';

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
    nazwa: "Ściana_na_maxa",
    miniaturka: "Ściana_na_maxa.jpg",
    lata: [1960, 1961]
  },
  {
    id: 1,
    clicked: false,
    nazwa: "fsdjhj",
    miniaturka: "Ściana_na_maxa",
    lata: [1960, 1961, 1962]
  },
  {
    id: 2,
    clicked: false,
    nazwa: "new",
    miniaturka: "pisemko.jpg",
    lata: [1960, 1961, 1963]
  }
]
interface newsPaper {
  id: number,
  clicked: boolean,
  nazwa: string,
  miniaturka: string,
  lata: number[]
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  yearsList: number[] = [];
  displayedColumns: string[] = ['button', 'nazwa', 'miniatura', 'rok', 'buttonRemove'];
  dataSource = data;
  public name = new FormControl('');
  public mini = new FormControl('');
  public year = new FormControl('');

  @ViewChild(MatTable) myTable!: MatTable<any>;

  ngOnInit() {
    for (let x = 1960; x < 2000; x++) {
      this.yearsList.push(x);
    }
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
  // public getData() {

  // }
}
