import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EntryPointComponent } from './components/entry-point/entry-point.component';
import { MatDialogModule } from '@angular/material';

import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AttributeBarComponent } from './components/attribute-bar/attribute-bar.component';
import { BackgroundComponent } from './components/background/background.component';
import { DrawingSpaceComponent } from './components/drawing-space/drawing-space.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,MatMenuModule } from  '@angular/material';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RectangleComponent } from './components/rectangle/rectangle.component';



@NgModule({
  declarations: [
    AppComponent,
    EntryPointComponent,
    SideBarComponent,
    AttributeBarComponent,
    BackgroundComponent,
    DrawingSpaceComponent,
    RectangleComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    AngularSvgIconModule,
    MatMenuModule
  ],
  entryComponents: [
    EntryPointComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
