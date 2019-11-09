import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationsService } from 'src/app/services/communications.service';
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

  deleteTag(tag: string): void {
    this.inputService.drawingTags.splice(this.inputService.drawingTags.indexOf(tag), 1);
  }

  addTag(): void {
    if (this.currentTag) {
      if (this.inputService.drawingTags.indexOf(this.currentTag) === -1) {
        this.inputService.drawingTags.push(this.currentTag);
      }
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
