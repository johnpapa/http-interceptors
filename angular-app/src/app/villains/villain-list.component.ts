import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Villain } from '../core';

@Component({
  selector: 'app-villain-list',
  template: `
    <div *ngIf="errorMessage">
      {{ errorMessage }}
    </div>
    <div *ngIf="!villains?.length && !errorMessage">Loading data ...</div>
    <ul class="list" *ngIf="!errorMessage && villains?.length">
      <li
        role="presentation"
        *ngFor="let villain of villains; trackBy: trackByVillain; let i = index"
      >
        <div class="card">
          <app-card-content
            [name]="villain.name"
            [description]="villain.description"
          ></app-card-content>
          <footer class="card-footer">
            <app-button-footer
              class="card-footer-item"
              [className]="'delete-item'"
              [iconClasses]="'fas fa-trash'"
              (clicked)="deleteVillain($event)"
              label="Delete"
              [item]="villain"
            ></app-button-footer>
            <app-button-footer
              class="card-footer-item"
              [className]="'edit-item'"
              [iconClasses]="'fas fa-edit'"
              (clicked)="selectVillain($event)"
              label="Edit"
              [item]="villain"
            ></app-button-footer>
          </footer>
        </div>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VillainListComponent {
  @Input() errorMessage = undefined;
  @Input() villains: Villain[];
  @Output() deleted = new EventEmitter<Villain>();
  @Output() selected = new EventEmitter<Villain>();

  trackByVillain(index: number, villain: Villain): number {
    return villain.id;
  }

  selectVillain(villain: Villain) {
    this.selected.emit(villain);
  }

  deleteVillain(villain: Villain) {
    this.deleted.emit(villain);
  }
}
