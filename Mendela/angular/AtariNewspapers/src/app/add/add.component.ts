import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  public yearsList: number[] = []
  public years = new FormControl('');
  public file = new FormControl('');
  public name = new FormControl('');
  constructor() {

  }
  ngOnInit() {
    for (let x = 1960; x < 2000; x++) {
      this.yearsList.push(x);
    }
  }
  addData() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        years: this.years.value,
        file: this.file.value,
        name: this.name.value
      })
    }
    fetch('http://localhost:3000/add', options)
      .then((response) => response.json())
      .then((data) => { console.log(data) });
  }
}
