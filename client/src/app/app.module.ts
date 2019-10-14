import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { AttributeBarComponent } from './components/attribute-bar/attribute-bar.component';
import { BackgroundComponent } from './components/background/background.component';
import { ColorPickerModule } from './components/color-picker/color-picker.module';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { DrawingSpaceComponent } from './components/drawing-space/drawing-space.component';
import { EntryPointComponent } from './components/entry-point/entry-point.component';
import { GridComponent } from './components/grid/grid.component';
import { NewFileModalwindowComponent } from './components/new-file-modalwindow/new-file-modalwindow.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    EntryPointComponent,
    SideBarComponent,
    AttributeBarComponent,
    BackgroundComponent,
    DrawingSpaceComponent,
    DeleteConfirmationComponent,
    NewFileModalwindowComponent,
    GridComponent,

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
  ],
  entryComponents: [
    EntryPointComponent,
    DeleteConfirmationComponent,
    NewFileModalwindowComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {
}
