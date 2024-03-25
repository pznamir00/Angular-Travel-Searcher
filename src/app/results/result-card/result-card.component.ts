import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Flight } from '../types/flights-result.type';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultCardComponent {
  @Input() flight!: Flight;
}
