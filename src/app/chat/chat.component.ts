import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  selectedHats:any;
  inst:any;
  chatSong:any;
  chatLoop:any;
  mute:boolean;
  chatVolWhenMuted:any;
  hatEcho:any;
  feedBackDelay:any;
  unmuteButton:any;
  synthChecks = [1,2,3,4,5,6,7,8];

  constructor() { 
      //feedbackDelay
      this.feedBackDelay = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
      this.feedBackDelay.wet.value = 0;

      this.inst = new Tone.Player("assets/hat.mp3").toDestination();
      this.inst.connect(this.feedBackDelay);
        
      this.mute = false;
      this.chatVolWhenMuted = 0;

      this.selectedHats = [null, null, null, null, null, null, null, null];
      this.chatSong = (time:any, trigger:any) =>{
          if(trigger!=null){
            this.inst.playbackRate = trigger;
            this.inst.start(time);
          }
      }
      this.chatLoop = new Tone.Pattern(this.chatSong, this.selectedHats).start(0);
      this.unmuteButton = <HTMLButtonElement>document.getElementById('unmuteButton');
      this.unmuteButton.addEventListener("click", ()=>{
      this.unMute();
    })
  }

  ngOnInit(): void {
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("chat"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.selectedHats[i] != null){
          this.selectedHats[i] = null;
          }
        else{
          let playBackSlider = <HTMLInputElement>document.getElementById("chat"+this.synthChecks[i].toString()+"Pitch");
          this.selectedHats[i] = playBackSlider.value;
        }
        });
      }
  }
  muteHat(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.chatVolWhenMuted;
    }
    else{
        this.mute = true;
        this.chatVolWhenMuted = this.inst.volume.value;
        this.inst.volume.value = -100;
    }
  }
  unMute(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.chatVolWhenMuted;
      }
  }
  changeHatDouble(){
    let slider = <HTMLInputElement>document.getElementById('hatDouble');
    this.hatEcho = slider.value;
    this.feedBackDelay.wet.value = slider.value;
  }
  changePlaybackRate(sample:string){
    for(let i = 0; i < this.synthChecks.length; i++){
      let playbackslider = <HTMLInputElement>document.getElementById(sample+this.synthChecks[i].toString()+"Pitch");
      if(sample == "chat" && this.selectedHats[i]!=null){
        this.selectedHats[i] = playbackslider.value;
      }
    }
  }

}
