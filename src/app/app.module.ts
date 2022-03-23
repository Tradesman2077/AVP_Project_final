import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthComponent } from './synth/synth.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SpinnersAngularModule } from 'spinners-angular';
import { KickdrumComponent } from './kickdrum/kickdrum.component';
import { ClapsnareComponent } from './clapsnare/clapsnare.component';
import { ChatComponent } from './chat/chat.component';
import { PluckComponent } from './pluck/pluck.component';
import { ChordComponent } from './chord/chord.component';

@NgModule({
  declarations: [
    AppComponent,
    SynthComponent,
    KickdrumComponent,
    ClapsnareComponent,
    ChatComponent,
    PluckComponent,
    ChordComponent
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
