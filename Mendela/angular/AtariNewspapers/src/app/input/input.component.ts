import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  public value = "";
  @Input('newsPapersVisible') public newsPapersVisible = false;
  @Output() public newsPapersVisible2 = new EventEmitter();
  onInputHandler(e: Event) {
    let target = e.target as HTMLInputElement;
    if (!target.value.match(/^[0-9]+(?:\.[0-9]*)?$/g)) {
      this.value = this.value.slice(0, -1);
      target.value = this.value;
    }
    else {
      if (target.value === "666.666") {
        this.newsPapersVisible2.emit(!this.newsPapersVisible);
      }
    }
  }
  ngOnInit() {

  }
}
