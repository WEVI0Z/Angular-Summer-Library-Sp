import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() bookName!: string;
  @Input() cost!: number;
  @Input() description!: string;
  @Input() category!: string;
  @Input() link!: string;
}
