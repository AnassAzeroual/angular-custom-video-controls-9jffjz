import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SecondsToHoursPipe } from './seconds-to-hours.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MatSliderModule ],
  declarations: [ AppComponent, HelloComponent, SecondsToHoursPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
