import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss']
})
export class EntryPointComponent {
  public isHidden: boolean = false;

  public constructor( public dialogRef: MatDialogRef<EntryPointComponent> ) {}

  public closeDialog(): void {
    this.dialogRef.close(this.isHidden);
  }

  public toggleHideDialog(): void {
    this.isHidden = !this.isHidden;
  }

}
