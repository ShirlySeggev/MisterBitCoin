import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveListComponent implements OnInit {
  @Input() movesToDisplay: Move[];
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {

  }
}
