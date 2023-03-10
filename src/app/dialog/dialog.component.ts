import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FilterService } from '../filter.service';

/*export interface DialogData {
  instances: string,
  services: string
}*/
export interface DialogData {
  instances: string[];
  services: string[]
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component-dialog.css']
})
export class DialogComponent {
  instances: string[] = []
  services: string[] = []

  constructor(
    public dialog: MatDialog,
    private filterService: FilterService,
    ) {}
  public openDialog(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      data: {
        instances: this.filterService.reachableInstances(),
        services: this.filterService.reachableService()
      }
    });
  }  
}
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog.component-dialog.html',
})
export class DialogAnimationsExampleDialog {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }
}
