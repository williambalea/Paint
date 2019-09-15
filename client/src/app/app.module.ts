import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule,
MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
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
import { ColorPickerModule } from './color-picker/color-picker.module';

@NgModule({
  declarations: [
    AppComponent,
    EntryPointComponent,
    SideBarComponent,
    AttributeBarComponent,
    BackgroundComponent,
    DrawingSpaceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ColorPickerModule,
    MatButtonModule,
    MatIconModule,
    AngularSvgIconModule,
    MatMenuModule,
    ColorPickerModule
  ],
  entryComponents: [
    EntryPointComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
}
