import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SafeHtmlPipe} from '../app/safe-html.pipe';
import { SafeUrlPipe} from '../app/safe-url.pipe';
import { AppComponent } from './app.component';
import { AttributeBarComponent } from './components/attribute-bar/attribute-bar.component';
import { ColorPickerModule } from './components/color-picker/color-picker.module';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { DisplayConfirmationComponent } from './components/display-confirmation/display-confirmation.component';
import { DrawingSpaceComponent } from './components/drawing-space/drawing-space.component';
import { EntryPointComponent } from './components/entry-point/entry-point.component';
import { GetFileModalwindowComponent } from './components/get-file-modalwindow/get-file-modalwindow.component';
import { NewFileModalwindowComponent } from './components/new-file-modalwindow/new-file-modalwindow.component';
import { SaveFileModalwindowComponent } from './components/save-file-modalwindow/save-file-modalwindow.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MaterialModule } from './material/material.module';
import { EventEmitterService } from './services/event-emitter.service';
import { ExportModalComponent } from './export-modal/export-modal.component';
import { DownloadModalComponent } from './download-modal/download-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryPointComponent,
    SideBarComponent,
    AttributeBarComponent,
    DrawingSpaceComponent,
    DeleteConfirmationComponent,
    NewFileModalwindowComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    SaveFileModalwindowComponent,
    GetFileModalwindowComponent,
    DisplayConfirmationComponent,
    ExportModalComponent,
    DownloadModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    AngularSvgIconModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MaterialModule,
    MatTooltipModule,
  ],
  entryComponents: [
    EntryPointComponent,
    DeleteConfirmationComponent,
    NewFileModalwindowComponent,
    SaveFileModalwindowComponent,
    GetFileModalwindowComponent,
    DisplayConfirmationComponent,
    ExportModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [EventEmitterService],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {
}
