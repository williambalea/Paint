
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GridService } from 'src/app/services/grid/grid.service';
import { InputService } from 'src/app/services/input.service';
import { KEY, SVGinnerWidth } from 'src/constants';
import { ColorService } from '../../services/color/color.service';
import { FileParametersServiceService } from '../../services/file-parameters-service.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-new-file-modalwindow',
  styleUrls: ['./new-file-modalwindow.component.scss'],
  templateUrl: './new-file-modalwindow.component.html',
})
export class NewFileModalwindowComponent implements OnInit, OnDestroy {
  form: FormGroup;
  canvasWidth: number;
  canvasHeight: number;

  constructor(private fileParameters: FileParametersServiceService,
              private dialog: MatDialog,
              private inputService: InputService,
              private formBuilder: FormBuilder,
              private colorService: ColorService,
              private gridService: GridService,
              private dialogRef: MatDialogRef<NewFileModalwindowComponent>) {
  this.inputService.gridShortcutsActive = false;
 }

  ngOnDestroy() {
    this.inputService.gridShortcutsActive = true;
  }

  assignForm(): void {
    this.form = this.formBuilder.group({
      canvasheight: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      canvaswidth: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
    });
  }

  assignCanvas(): void {
    this.canvasWidth = window.innerWidth - SVGinnerWidth;
    this.canvasHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.assignCanvas();
    this.assignForm();
    this.colorService.setShowBackgroundButton(false);
  }

  closeColorService(): void {
    this.colorService.setMakingColorChanges(false);
    this.colorService.setShowInAttributeBar(true);
    this.colorService.setShowBackgroundButton(true);
  }

  closeModalWindow(): void {
    this.closeColorService();
    this.dialogRef.close();
  }

  deleteConfirmation(canvaswidth: number, canvasheight: number): void {
    this.dialog.open(DeleteConfirmationComponent);
    this.fileParameters.setParameters(canvaswidth, canvasheight);
  }

  modifyCanvasDisplay(): void {
    this.colorService.changeBackgroundColor();
    this.colorService.setMakingColorChanges(false);
    this.colorService.setShowInAttributeBar(true);
    this.colorService.setShowBackgroundButton(true);
  }

  createNewDrawing(canvaswidth: number, canvasheight: number): void {
    this.fileParameters.changeParameters(canvaswidth, canvasheight);
    this.modifyCanvasDisplay();
  }

  validForm(): boolean {
    return (this.form.valid);
  }

  submitParameters(canvaswidth: number, canvasheight: number): void {
    if (this.validForm()) {
      this.fileParameters.tempresize = true;
      this.inputService.isDrawed ? this.deleteConfirmation(canvaswidth, canvasheight) : this.createNewDrawing(canvaswidth, canvasheight);
      this.gridService.width = this.fileParameters.canvasWidth.getValue();
      this.gridService.height = this.fileParameters.canvasHeight.getValue();
      if (this.gridService.isUsingGrid) {
        this.gridService.hideGrid();
        this.gridService.showGrid();
      }
      this.dialogRef.close();
    } else {
      this.assignForm();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === KEY.o) {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    }
  }

}
