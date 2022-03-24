import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
@Component({
  selector: 'app-clapsnare',
  templateUrl: './clapsnare.component.html',
  styleUrls: ['./clapsnare.component.css']
})
export class ClapsnareComponent implements OnInit {

  selectedClaps:any;
  inst:any;
  clapSong:any;
  clapLoop:any;
  mute:boolean;
  clapVolWhenMuted:any;
  unmuteButton:any;
  synthChecks = [1,2,3,4,5,6,7,8];
  reverb:any;
  reverbOn:boolean;


  constructor() { 
    this.mute = false;
    this.inst = new Tone.Player("assets/clap.mp3").toDestination();
    this.reverb = new Tone.Reverb().toDestination();
    this.reverb.wet.value = 0;
    this.inst.connect(this.reverb);
    this.clapVolWhenMuted = 0;
    this.reverbOn = false;
    this.selectedClaps = [null, null, null, null, null, null, null, null];

    this.clapSong = (time:any, trigger:any) =>{
      if(trigger!=null){
        this.inst.playbackRate = trigger;
        this.inst.start(time);
      }
    }
    this.clapLoop = new Tone.Pattern(this.clapSong, this.selectedClaps).start(0);
    this.unmuteButton = <HTMLButtonElement>document.getElementById('unmuteButton');
    this.unmuteButton.addEventListener("click", ()=>{
      this.unMute();
    })
  }

  ngOnInit(): void {
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("clap"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.selectedClaps[i] != null){
          this.selectedClaps[i] = null;
          }
        else{
          let playBackSlider = <HTMLInputElement>document.getElementById("clap"+this.synthChecks[i].toString()+"Pitch");
          this.selectedClaps[i] = playBackSlider.value;
        }
        });
      }
  }
  changePlaybackRate(sample:string){
    for(let i = 0; i < this.synthChecks.length; i++){
      let playbackslider = <HTMLInputElement>document.getElementById(sample+this.synthChecks[i].toString()+"Pitch");
      if(sample == "clap" && this.selectedClaps[i]!=null){
        this.selectedClaps[i] = playbackslider.value;
      }
    }
  }
  muteClap(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.clapVolWhenMuted;
    }
    else{
        this.mute = true;
        this.clapVolWhenMuted = this.inst.volume.value;
        this.inst.volume.value = -100;
    }
  }
  unMute(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.clapVolWhenMuted;
      }
  }
  changeSample(){
    let slider = <HTMLInputElement>document.getElementById('clap/snare');
    if(slider.value != "0"){
        this.inst.load("assets/snare.wav");
    }
    else{
        this.inst.load("assets/clap.mp3");
    }
  }
  reverbSwitch(){
    if(this.reverbOn == false){
        this.reverb.wet.value = 0.8;
        this.reverbOn = true;
    }
    else{
        this.reverbOn = false;
        this.reverb.wet.value = 0;
    }
  }
  changeClapVol(){
    let clapVolSlider = <HTMLInputElement>document.getElementById("clapVol");
    this.inst.volume.value = clapVolSlider.value;
  }
}
