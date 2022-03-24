import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';
@Component({
  selector: 'app-sampler',
  templateUrl: './sampler.component.html',
  styleUrls: ['./sampler.component.css']
})
export class SamplerComponent implements OnInit {

  fileName:any;
  sample:any;
  inputFile:any;
  sampleSong:any;
  sampleLoop:any;
  blob:Blob | undefined;
  url:any;
  mute:any;
  inst:any;
  sampleVolWhenMuted:any;
  synthChecks = [1,2,3,4,5,6,7,8];
  unmuteButton:any;
  selectedSamples:any;
  startPoint:any;
  endPoint:any;
  reverse:any;

  constructor() { 
    this.inst = new Tone.Player(this.sample).toDestination();
    this.mute = false;
    this.startPoint = 0;
    this.reverse = false;
    
    this.sampleVolWhenMuted = 0;
    this.selectedSamples = [null, null, null, null, null, null, null, null];
    this.sampleSong = (time:any, trigger:any) =>{
        if(trigger!=null){
          this.inst.playbackRate = trigger;
          if(this.inst.loaded){
            this.inst.start(time, this.startPoint, this.endPoint);
          }
        }
    }
    this.sampleLoop = new Tone.Pattern(this.sampleSong, this.selectedSamples).start(0);

    this.unmuteButton = <HTMLButtonElement>document.getElementById('unmuteButton');
    this.unmuteButton.addEventListener("click", ()=>{
      this.unMute();
    })
  }
  ngOnInit(): void {
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("sample"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.selectedSamples[i] != null){
          this.selectedSamples[i] = null;
          }
        else{
          let playBackSlider = <HTMLInputElement>document.getElementById("sample"+this.synthChecks[i].toString()+"Pitch");
          this.selectedSamples[i] = playBackSlider.value;
        }
        });
      }
  }
  upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.sample = files[0];
    this.blob = new Blob([this.sample], {type : 'audio/wav'});
    this.url = URL.createObjectURL(this.blob);
    this.inst.load(this.url);
    //this.inst.loop = true;
  }
  playSample(){
    
    if(this.inst.loaded){
      this.inst.start(0, this.startPoint, this.endPoint);
    }
  }
  muteSample(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.sampleVolWhenMuted;
    }
    else{
        this.mute = true;
        this.sampleVolWhenMuted = this.inst.volume.value;
        this.inst.volume.value = -100;
    }
  }
  unMute(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.sampleVolWhenMuted;
    }
  }
  changePlaybackRate(sample:string){
    for(let i = 0; i < this.synthChecks.length; i++){
      let playbackslider = <HTMLInputElement>document.getElementById(sample+this.synthChecks[i].toString()+"Pitch");
      if(sample == "sample" && this.selectedSamples[i]!=null){
        this.selectedSamples[i] = playbackslider.value;
        console.log(this.selectedSamples);
      }
    }
  }
  changeSampleVol(){
    let sampleVolSlider = <HTMLInputElement>document.getElementById("sampleVol");
    this.inst.volume.value = sampleVolSlider.value;
  }
  sampleStart(){
    let sampleStartSlider = <HTMLInputElement>document.getElementById("sampleStart");
    this.startPoint = sampleStartSlider.value;
  }
  sampleEnd(){
    let sampleEndSlider = <HTMLInputElement>document.getElementById("sampleEnd");
    this.endPoint = sampleEndSlider.value;
  }
  reverseSample(){
    if(this.reverse){
      this.reverse = false;
      this.inst.reverse = false;
    }
    else{
      this.reverse = true;
      this.inst.reverse = true;
    }
  }


  
  
  
 

  
  

  

}
