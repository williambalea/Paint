import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AttributeBarComponent } from './components/attribute-bar/attribute-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    AttributeBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
