import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Villain } from '../core';
import { VillainService } from './villain.service';

@Component({
  selector: 'app-Villains',
  template: `
    <div class="content-container">
      <app-list-header
        title="Villains"
        (add)="enableAddMode()"
        (refresh)="getVillains()"
      ></app-list-header>
      <div class="columns is-multiline is-variable">
        <div class="column is-8" *ngIf="villains$ | async as villains">
          <app-villain-list
            *ngIf="!selected"
            [villains]="villains"
            [errorMessage]="errorMessage"
            (selected)="select($event)"
            (deleted)="askToDelete($event)"
          ></app-villain-list>
          <app-villain-detail
            *ngIf="selected"
            [villain]="selected"
            (unselect)="clear()"
            (save)="save($event)"
          ></app-villain-detail>
        </div>
      </div>

      <app-modal
        class="modal-villain"
        [message]="message"
        [isOpen]="showModal"
        (handleNo)="closeModal()"
        (handleYes)="deleteVillain()"
      ></app-modal>
    </div>
  `,
})
export class VillainsComponent implements OnInit {
  errorMessage: string;
  selected: Villain;
  villains$: Observable<Villain[]>;
  message = '?';
  villainToDelete: Villain;
  showModal = false;

  constructor(private villainService: VillainService) {
    this.villains$ = villainService.entities$;
  }

  ngOnInit() {
    this.getVillains();
  }

  add(villain: Villain) {
    this.villainService.add(villain);
  }

  askToDelete(villain: Villain) {
    this.villainToDelete = villain;
    this.showModal = true;
    if (this.villainToDelete.name) {
      this.message = `Would you like to delete ${this.villainToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteVillain() {
    this.closeModal();
    if (this.villainToDelete) {
      this.villainService
        .delete(this.villainToDelete.id)
        .subscribe(() => (this.villainToDelete = null));
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  async getVillains() {
    this.errorMessage = undefined;
    this.villainService.getAll().subscribe(
      (_) => {
        /*.. do nothing for success.. */
      },
      (error: any) =>
        (this.errorMessage = error?.error?.message || 'Error occurred'),
    );
    this.clear();
  }

  save(villain: Villain) {
    if (this.selected && this.selected.name) {
      this.update(villain);
    } else {
      this.add(villain);
    }
  }

  select(villain: Villain) {
    this.selected = villain;
  }

  update(villain: Villain) {
    this.villainService.update(villain);
  }
}
