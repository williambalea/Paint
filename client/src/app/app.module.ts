import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule,
MatMenuModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatToolbarModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { AttributeBarComponent } from './components/attribute-bar/attribute-bar.component';
import { BackgroundComponent } from './components/background/background.component';
import { ColorPickerModule } from './components/color-picker/color-picker.module';
import { DrawingSpaceComponent } from './components/drawing-space/drawing-space.component';
import { EntryPointComponent } from './components/entry-point/entry-point.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
// import { AngularResizedEventModule } from 'angular-resize-event';
import { AlertsModule } from 'angular-alert-module';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { NewFileModalwindowComponent } from './components/new-file-modalwindow/new-file-modalwindow.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';

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

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ColorPickerModule,
    MatButtonModule,
    MatIconModule,
    AngularSvgIconModule,
    MatMenuModule,
    ColorPickerModule,
    // AngularResizedEventModule,
    AlertsModule.forRoot(),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  entryComponents: [
    EntryPointComponent,
    DeleteConfirmationComponent,
    NewFileModalwindowComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
}
