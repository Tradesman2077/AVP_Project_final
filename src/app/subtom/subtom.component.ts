import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-subtom',
  templateUrl: './subtom.component.html',
  styleUrls: ['./subtom.component.css']
})
export class SubtomComponent implements OnInit {
  isDist:any;
  dist:any;
  inst:any;
  selectedSub:any;
  subSong:any;
  subLoop:any;
  mute:any;
  subVolWhenMuted:any;
  synthChecks = [1,2,3,4,5,6,7,8];
  unmuteButton:any;

  constructor() {
  this.mute = false;
  this.subVolWhenMuted = 0;

  this.dist = new Tone.Distortion(0.8).toDestination();
  this.selectedSub = [null, null, null, null, null, null, null, null];
  this.isDist =false;
  this.dist.oversample = "2x";
  this.dist.distortion = 0;

  this.inst = new Tone.MembraneSynth().toDestination();
  this.inst.connect(this.dist);
  this.subSong = (time:any, trigger:any) =>{
    if(trigger!=null){
      this.inst.triggerAttackRelease(trigger, '8n', time);
    }
  } 
  this.subLoop = new Tone.Pattern(this.subSong, this.selectedSub).start(0);
  this.unmuteButton = <HTMLButtonElement>document.getElementById('unmuteButton');
      this.unmuteButton.addEventListener("click", ()=>{
      this.unMute();
      })
  }
  ngOnInit(): void {
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("checkSub"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.selectedSub[i] != null){
          this.selectedSub[i] = null;
        }
        else{
          let pitchslider = <HTMLInputElement>document.getElementById("checkSub"+this.synthChecks[i].toString()+"Pitch");
          this.selectedSub[i] = pitchslider.value;
        }
        });
    }
  }
  resetSubPitch(){
    console.log(this.selectedSub);
    for(let i = 0; i < this.synthChecks.length; i++){
      let pitchslider = <HTMLInputElement>document.getElementById("checkSub"+this.synthChecks[i].toString()+"Pitch");
      if(this.selectedSub[i]!=null){
        this.selectedSub[i] = pitchslider.value;
      }
    }
  }
  changeSubRelease(){
    let slider = <HTMLInputElement>document.getElementById("subRelease");
    this.inst.envelope.decay = slider.value;
  }
  distort(){
    if(this.isDist){
        this.dist.distortion = 0;
        this.isDist = false;
    }
    else{
        this.dist.distortion= 1;
        this.isDist = true;
    }
  }
  muteSub(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.subVolWhenMuted;
    }
    else{
        this.mute = true;
        this.subVolWhenMuted = this.inst.volume.value;
        this.inst.volume.value = -100;
    }
  }
  unMute(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.subVolWhenMuted;
      }
  }
  changeSubVol(){
    let subVolSlider = <HTMLInputElement>document.getElementById("subVol");
    this.inst.volume.value = subVolSlider.value;
  }

}
