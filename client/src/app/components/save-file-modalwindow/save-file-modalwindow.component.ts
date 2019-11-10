import {COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatChipInputEvent } from '@angular/material/chips';
import { CommunicationsService } from 'src/app/services/communications.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { EMPTY_STRING, KEY } from 'src/constants';
import { InputService } from '../../services/input.service';

@Component({
  selector: 'app-save-file-modalwindow',
  styleUrls: ['./save-file-modalwindow.component.scss'],
  templateUrl: './save-file-modalwindow.component.html',
})

export class SaveFileModalwindowComponent implements OnInit, OnDestroy {

  form: FormGroup;
  currentTag: string;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<SaveFileModalwindowComponent>,
              private eventEmitterService: EventEmitterService,
              public inputService: InputService,
              public communicationService: CommunicationsService) {
    this.currentTag = EMPTY_STRING;
    this.inputService.gridShortcutsActive = false;
  }

  ngOnDestroy() {
    this.inputService.gridShortcutsActive = true;
  }

  ngOnInit(): void {
    this.inputService.drawingName = EMPTY_STRING;
    this.inputService.drawingTags = [];
    this.form = new FormGroup({
      name: new FormControl(),
    });
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      tag: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  closeModalWindow(): void {
    this.dialogRef.close();
  }

  removeTag(tag: string): void {
    const index = this.inputService.drawingTags.indexOf(tag);
    if (index >= 0) {
      this.inputService.drawingTags.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || EMPTY_STRING).trim()) {
      this.inputService.drawingTags.push(value.trim());
    }

    if (input) {
      input.value = EMPTY_STRING;
    }
  }

  submitDrawing(): void {
    this.communicationService.enableSubmit = false;
    this.eventEmitterService.sendSVGToServer();

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
