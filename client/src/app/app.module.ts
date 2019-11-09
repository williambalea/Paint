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
import { BrushAttributesComponent } from './components/attribute-bar/brush-attributes/brush-attributes.component';
// tslint:disable-next-line: max-line-length
import { ColorApplicatorAttributeComponent } from './components/attribute-bar/color-applicator-attribute/color-applicator-attribute.component';
import { EllipseAttributesComponent } from './components/attribute-bar/ellipse-attributes/ellipse-attributes.component';
import { EraserAttributesComponent } from './components/attribute-bar/eraser-attributes/eraser-attributes.component';
import { LineAttributesComponent } from './components/attribute-bar/line-attributes/line-attributes.component';
import { PenAttributesComponent } from './components/attribute-bar/pen-attributes/pen-attributes.component';
import { PencilAttributesComponent } from './components/attribute-bar/pencil-attributes/pencil-attributes.component';
import { PolygonAttributesComponent } from './components/attribute-bar/polygon-attributes/polygon-attributes.component';
import { RectangleAttributesComponent } from './components/attribute-bar/rectangle-attributes/rectangle-attributes.component';
import { SelectorAttributesComponent } from './components/attribute-bar/selector-attributes/selector-attributes.component';
import { StampAttributesComponent } from './components/attribute-bar/stamp-attributes/stamp-attributes.component';
import { TextAttributesComponent } from './components/attribute-bar/text-attributes/text-attributes.component';
import { ColorPickerModule } from './components/color-picker/color-picker.module';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { DisplayConfirmationComponent } from './components/display-confirmation/display-confirmation.component';
import { DrawingSpaceComponent } from './components/drawing-space/drawing-space.component';
import { EntryPointComponent } from './components/entry-point/entry-point.component';
import { GetFileModalwindowComponent } from './components/get-file-modalwindow/get-file-modalwindow.component';
import { NewFileModalwindowComponent } from './components/new-file-modalwindow/new-file-modalwindow.component';
import { SaveFileModalwindowComponent } from './components/save-file-modalwindow/save-file-modalwindow.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DownloadModalComponent } from './download-modal/download-modal.component';
import { ExportModalComponent } from './export-modal/export-modal.component';
import { MaterialModule } from './material/material.module';
import { SafeStylePipe } from './safe-style.pipe';
import { EventEmitterService } from './services/event-emitter.service';
import { UploadModalComponent } from './upload-modal/upload-modal.component';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
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
    UploadModalComponent,
    DownloadModalComponent,
    SafeStylePipe,
    BrushAttributesComponent,
    PenAttributesComponent,
    PencilAttributesComponent,
    StampAttributesComponent,
    LineAttributesComponent,
    TextAttributesComponent,
    RectangleAttributesComponent,
    PolygonAttributesComponent,
    EllipseAttributesComponent,
    EraserAttributesComponent,
    SelectorAttributesComponent,
    ColorApplicatorAttributeComponent,
  ],
  entryComponents: [
    EntryPointComponent,
    DeleteConfirmationComponent,
    NewFileModalwindowComponent,
    SaveFileModalwindowComponent,
    GetFileModalwindowComponent,
    DisplayConfirmationComponent,
    ExportModalComponent,
    UploadModalComponent,
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
  providers: [EventEmitterService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})

export class AppModule {
}
