import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthComponent } from './synth/synth.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SpinnersAngularModule } from 'spinners-angular';
import { MixerComponent } from './synth/mixer/mixer.component';



@NgModule({
  declarations: [
    AppComponent,
    SynthComponent,
    MixerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SpinnersAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
