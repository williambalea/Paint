import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  styleUrls: ['./entry-point.component.scss'],
  templateUrl: './entry-point.component.html',
})
export class EntryPointComponent {
  isHidden: boolean;

  constructor(public dialogRef: MatDialogRef<EntryPointComponent>) {
    this.isHidden = false;
  }

  closeDialog(): void {
    this.dialogRef.close(this.isHidden);
  }

  toggleHideDialog(): void {
    this.isHidden = !this.isHidden;
  }

}
