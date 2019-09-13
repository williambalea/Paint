import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { EntryPointComponent } from './components/app/entry-point/entry-point.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AttributeBarComponent } from './components/attribute-bar/attribute-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryPointComponent,
    SideBarComponent,
    AttributeBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [
    EntryPointComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
