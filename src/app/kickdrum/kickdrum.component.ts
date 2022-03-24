import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
@Component({
  selector: 'app-kickdrum',
  templateUrl: './kickdrum.component.html',
  styleUrls: ['./kickdrum.component.css']
})
export class KickdrumComponent implements OnInit {

  selectedKicks:any;
  inst:any;
  kickSong:any;
  kickLoop:any;
  mute:boolean;
  kickVolWhenMuted:any;
  unmuteButton:any;
  synthChecks = [1,2,3,4,5,6,7,8];

  constructor() {
    this.inst = new Tone.Player("assets/kick.wav").toDestination();
    this.mute = false;
    this.kickVolWhenMuted = 0;
    this.selectedKicks = [null, null, null, null, null, null, null, null];
    this.kickSong = (time:any, trigger:any) =>{
        if(trigger!=null){
          this.inst.playbackRate = trigger;
          this.inst.start(time);
        }
    }
    this.kickLoop = new Tone.Pattern(this.kickSong, this.selectedKicks).start(0);

    this.unmuteButton = <HTMLButtonElement>document.getElementById('unmuteButton');
    this.unmuteButton.addEventListener("click", ()=>{
      this.unMute();
    })
  }
  ngOnInit(): void {
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("kick"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.selectedKicks[i] != null){
          this.selectedKicks[i] = null;
          }
        else{
          let playBackSlider = <HTMLInputElement>document.getElementById("kick"+this.synthChecks[i].toString()+"Pitch");
          this.selectedKicks[i] = playBackSlider.value;
        }
        });
      }
  }
  muteKick(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.kickVolWhenMuted;
    }
    else{
        this.mute = true;
        this.kickVolWhenMuted = this.inst.volume.value;
        this.inst.volume.value = -100;
    }
  }
  unMute(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.kickVolWhenMuted;
    }
  }
  changePlaybackRate(sample:string){
    for(let i = 0; i < this.synthChecks.length; i++){
      let playbackslider = <HTMLInputElement>document.getElementById(sample+this.synthChecks[i].toString()+"Pitch");
      if(sample == "kick" && this.selectedKicks[i]!=null){
        this.selectedKicks[i] = playbackslider.value;
      }
    }
  }
  changeKickVol(){
    let kickVolSlider = <HTMLInputElement>document.getElementById("kickVol");
    this.inst.volume.value = kickVolSlider.value;
  }
}
