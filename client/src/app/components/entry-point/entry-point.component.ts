import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent {
  isHidden: boolean = false;

  constructor( public dialogRef: MatDialogRef<EntryPointComponent> ) {}

  closeDialog(): void {
    this.dialogRef.close(this.isHidden);
  }

  toggleHideDialog(): void {
    this.isHidden = !this.isHidden;
  }

}
