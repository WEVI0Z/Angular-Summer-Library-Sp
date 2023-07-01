import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-sniper',
  templateUrl: './sniper.component.html',
  styleUrls: ['./sniper.component.scss']
})
export class SniperComponent implements OnInit{
  field: Element = document.querySelector(".sniper__field")!;

  constructor(private element: ElementRef) {
    console.log(this.field);
  }

  ngOnInit() {
    this.createBaloon();
  }

  createBaloon() {
    console.log(this.field)
    const xSize = this.field.getAttribute("width");
    const ySize = this.field.getAttribute("height");

    console.log(xSize, ySize)
  }
}
