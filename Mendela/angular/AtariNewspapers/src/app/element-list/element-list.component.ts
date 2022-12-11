import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})
export class ElementListComponent {
  @Input("data") public data: elements = {
    name: "",
    numer: "",
    wydawca: "",
    format: "",
    strony: "",
    miniatura: "",
    plik: "",
    skan: "",
    przetworzenie: "",
    podeslal: ""
  };
  @Input("album") public album: string = "";
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
