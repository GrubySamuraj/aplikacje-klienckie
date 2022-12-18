import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsPaperDataService {
  constructor(private httpClient: HttpClient) { }
  async getXml() {
    return new Promise<Document>((resolve) => {
      this.httpClient.get("app/assets/newsPapers.xml", { responseType: 'text' })
        .subscribe((str) => {
          let data = new window.DOMParser().parseFromString(str, "text/xml");
          resolve(data);
        },
          error => {
            console.log("Error", error);
          });
    })
  }
  getZmienne(xml: Document) {
    let path = "//zmienne/*";
    let imgs = [];
    let newsPapers: newsPaper[] = [];
    if (xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)) {
      let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
      let result = nodes.iterateNext();
      while (result) {
        let img = result.childNodes[1] as HTMLElement;
        let dupa = result.childNodes[3] as HTMLElement;
        newsPapers.push({ img: img.innerHTML, name: dupa.innerHTML });
        result = nodes.iterateNext();
      }
      return newsPapers;
    }
    return []
  }
  getYear(path: string, xml: Document) {
    if (xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)) {
      let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
      let result = nodes.iterateNext();
      console.log(result);
      while (result) {
        let year = result as HTMLElement;
        console.log(year.innerHTML.split(","));
        let years = year.innerHTML.split(",");
        result = nodes.iterateNext();
        return years;
      }
    }
    return [];
  }
  showAll(path: string, xml: Document) {
    let elements = [];
    if (xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)) {
      let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
      let result = nodes.iterateNext();
      while (result) {
        let all = result as HTMLElement;
        console.log(all.innerHTML);
        let names = all.getElementsByTagName("nazwa");
        let numer = all.getElementsByTagName("numer");
        let wydawca = all.getElementsByTagName("wydawca");
        let format = all.getElementsByTagName("format");
        let strony = all.getElementsByTagName("stron");
        let miniatura = all.getElementsByTagName("miniaturka");
        let plik = all.getElementsByTagName("plik");
        let skan = all.getElementsByTagName("skan");
        let przetworzenie = all.getElementsByTagName("przetworzenie");
        let podeslal = all.getElementsByTagName("podeslal");
        for (let x = 0; x < names.length; x++) {
          let obj = {
            name: names[x].innerHTML,
            numer: numer[x].innerHTML,
            wydawca: wydawca[x].innerHTML,
            format: format[x].innerHTML,
            strony: strony[x].innerHTML,
            miniatura: miniatura[x].innerHTML,
            plik: plik[x].innerHTML,
            skan: skan[x].innerHTML,
            przetworzenie: przetworzenie[x].innerHTML,
            podeslal: podeslal[x].innerHTML
          }
          elements.push(obj);
        }
        result = nodes.iterateNext();
      }
      return elements;
    }
    return [];
  }
  showNewsPaper(xml: Document, path: string) {
    let elements = [];
    if (xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)) {
      let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
      let result = nodes.iterateNext();
      while (result) {
        let all = result as HTMLElement;
        let names = all.getElementsByTagName("nazwa");
        let numer = all.getElementsByTagName("numer");
        let miniatura = all.getElementsByTagName("miniaturka");
        for (let x = 0; x < names.length; x++) {
          console.log(all.children[x].nodeName);
          let obj = {
            name: all.children[x].nodeName,
            numer: numer[x].innerHTML,
            miniatura: miniatura[x].innerHTML,
          }
          elements.push(obj);
        }
        result = nodes.iterateNext();
      }
      console.log(elements);
      return elements;
    }
    return [];
  }
  showNewsPapersYear(path: string, xml: Document, year: string) {
    let elements = [];
    if (xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)) {
      let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
      let result = nodes.iterateNext();
      while (result) {
        let all = result as HTMLElement;
        if (all.getAttribute("rok") === year) {
          console.log(year);
          let names = all.getElementsByTagName("nazwa");
          let numer = all.getElementsByTagName("numer");
          let wydawca = all.getElementsByTagName("wydawca");
          let format = all.getElementsByTagName("format");
          let strony = all.getElementsByTagName("stron");
          let miniatura = all.getElementsByTagName("miniaturka");
          let plik = all.getElementsByTagName("plik");
          let skan = all.getElementsByTagName("skan");
          let przetworzenie = all.getElementsByTagName("przetworzenie");
          let podeslal = all.getElementsByTagName("podeslal");
          for (let x = 0; x < names.length; x++) {
            let obj = {
              name: names[x].innerHTML,
              numer: numer[x].innerHTML,
              wydawca: wydawca[x].innerHTML,
              format: format[x].innerHTML,
              strony: strony[x].innerHTML,
              miniatura: miniatura[x].innerHTML,
              plik: plik[x].innerHTML,
              skan: skan[x].innerHTML,
              przetworzenie: przetworzenie[x].innerHTML,
              podeslal: podeslal[x].innerHTML
            }
            elements.push(obj);
          }
        }
        result = nodes.iterateNext();
      }
      return elements;
    }
    return [];
  }
}
interface newsPaper {
  img: string,
  name: string
}
