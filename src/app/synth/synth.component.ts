import { Component, OnInit } from '@angular/core';


import * as Tone from 'tone';

@Component({
  selector: 'app-synth',
  templateUrl: './synth.component.html',
  styleUrls: ['./synth.component.css']
})
export class SynthComponent implements OnInit {
  wave:any;
  loop:any;
  time:any;
  currentBeat:any;
  currentBeatNum:any;
  isPlaying:boolean=false;
  notes:any;
  monoSynth:any
  monoSynthFilterFreq:any;
  feedBackDelay:any;
  pingPong:any;
  reverb:any;
  song:any;
  bpm:any;
  mixer:any;
  selectedNotes:any
  synthChecks:any;
  beatCount:any;
  synthMute:any;
  synthVolWhenMuted:any;
  currentParamEdit:any;
  masterVol:any;
  masterBpm:any;
  synthPitch:any;
  synth2Pitch:any;
  synth3Pitch:any;
  synth4Pitch:any;
  synth5Pitch:any;
  synth6Pitch:any;
  synth7Pitch:any;
  synth8Pitch:any;
  synthFilterAttack:any;
  synthFilterDecay:any;
  synthFilterBase:any;
  synthDelayVal:any;
  waveCounter:any;
  hpFilter:any;
  canvas:any;
  ctx:any;

  chords = ["A3","A#3", "B3","B#3", "C3", "C#3", "D3", "D#3", "E3", "F3","F#3", "G3","G#3",
    "A4", "A#4", "B4", "B#4", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4"];

  constructor() {
    this.wave = new Tone.Waveform(512);
    this.hpFilter = new Tone.Filter(500,'highpass');

    this.selectedNotes = [null, null, null, null, null, null, null, null]; //synth//
    this.synthChecks = [1,2,3,4,5,6,7,8];
    this.beatCount = 0;
    this.waveCounter = 1;
    Tone.Destination.connect(this.wave);
    Tone.Transport.bpm.value = 180;

    //pingPongDelay
    this.pingPong = new Tone.PingPongDelay('8n').toDestination();
    this.pingPong.wet.value = 0;
    //monoSynth
    this.monoSynth = new Tone.MonoSynth().connect(this.pingPong);
    this.pingPong.connect(this.hpFilter);
    this.song = (time:any, trigger:any) =>{
      if(this.beatCount == 8){
        this.beatCount = 1;
      }
      else{
        this.beatCount++;
      }
      this.updateBeatOnUi();
      if(trigger!=null){
        this.monoSynth.triggerAttackRelease(trigger, '16n', time);
      }
    }
    ///synthloop
    this.loop = new Tone.Pattern(this.song, this.selectedNotes ).start(0);
   }

  ngOnInit(): void {
    Tone.start();
    this.canvas = <HTMLCanvasElement> document.getElementById('mycanvas');
    this.ctx = this.canvas.getContext("2d");
    this.draw();

    //initialise state of buttons and control selection
    for(let i = 0; i < this.synthChecks.length; i++){
    document.getElementById("check"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
      if(this.selectedNotes[i] != null){
        this.selectedNotes[i] = null;
      }
      else{
        let pitchslider = <HTMLInputElement>document.getElementById("check"+this.synthChecks[i].toString()+"Pitch");
        this.selectedNotes[i] = pitchslider.value;
      }
      });
    }
    // start/stop for transport on spacebar
    document.addEventListener('keyup', e => {
      if (e.code === 'Space') {
        if(this.isPlaying == false){
          this.play();
          this.isPlaying = true;
        }
        else{
          this.isPlaying = true;
          this.stop();
          this.isPlaying = false;
        }
      }
    });
  }
  play(){
    this.isPlaying = true;
    Tone.start();
    Tone.Transport.start();
    this.loop.start(0);
  }
  stop(){
    this.loop.stop();
    this.isPlaying = false;
    Tone.Transport.stop();
  }
  changeBpm(){
    let bpmSlider = <HTMLInputElement>document.getElementById("bpm");
    Tone.Transport.bpm.value = parseInt(bpmSlider.value);
    this.currentParamEdit = this.masterBpm/2;
  }
  resetSynthPitch(){
    for(let i = 0; i < this.synthChecks.length; i++){
      let pitchslider = <HTMLInputElement>document.getElementById("check"+this.synthChecks[i].toString()+"Pitch");
      if(this.selectedNotes[i]!=null){
        this.selectedNotes[i] = pitchslider.value;
      }
    }
  }

  changeFilterAttack(){
    let slider = <HTMLInputElement>document.getElementById("monoSynthFilterAttack");
    let Afreq = parseFloat(slider.value);
    this.synthFilterAttack = Afreq;
    this.monoSynth.filterEnvelope.attack = Afreq;
  }
  changeFilterDecay(){
    let slider = <HTMLInputElement>document.getElementById("monoSynthFilterDecay");
    let Dfreq = parseFloat(slider.value);
    this.synthFilterDecay = Dfreq;
    this.monoSynth.envelope.release = Dfreq;
  }
  changeFilterBase(){
    let slider = <HTMLInputElement>document.getElementById("monoSynthFilterBase");
    let base = parseFloat(slider.value);
    this.synthFilterBase = base;
    this.monoSynth.filterEnvelope.baseFrequency = base;
  }
  changeDelayAmt(){
    let slider = <HTMLInputElement>document.getElementById("delayFeedback");
    let amt = parseFloat(slider.value);
    this.synthDelayVal = amt;
    this.pingPong.wet.value = amt;
  }
  ///mute switches method
  mute(part:any){
    if(part == 'synth' && this.synthMute == true){
      this.synthMute = false;
      this.monoSynth.volume.value = this.synthVolWhenMuted;
    }
    else if(part == 'synth'){
      this.synthMute = true;
      this.synthVolWhenMuted = this.monoSynth.volume.value;
      this.monoSynth.volume.value = -100;
    }
  }
  unMute(){
    if(this.synthMute == true){
      this.synthMute = false;
      this.monoSynth.volume.value = this.synthVolWhenMuted;
    }
  }
  changeVol(){
    let volSlider = <HTMLInputElement>document.getElementById("vol");
    Tone.Destination.volume.value = parseInt(volSlider.value);
    this.currentParamEdit = this.masterVol;
    console.log(this.currentParamEdit);
  }
  changeSynthVol(){
    let synthVolSlider = <HTMLInputElement>document.getElementById("synthVol");
    this.monoSynth.volume.value = synthVolSlider.value;
  }
  displayVal(val:any){
    this.currentParamEdit = val;
  }
  updateBeatOnUi(){
    for(let i = 1; i < this.synthChecks.length+1; i++){
      let div =<HTMLDivElement>document.getElementById('beat'+i);
      if(this.beatCount == i){
        div.style.backgroundColor="#aa0404";
        div.style.color = "white";
      }
      else{
        div.style.backgroundColor="rgb(253, 241, 226)";
        div.style.color = "black";
      }
    }
  }
  randomise(){
    for(let i = 0; i < this.selectedNotes.length; i++){
      if(this.selectedNotes[i]!=null){
        this.selectedNotes[i] = Math.floor(Math.random() * 1000) + 1;
      }
    }
  }
  
  waveChange(){
    if(this.waveCounter == 2){
        this.waveCounter = 0;
        this.monoSynth.oscillator.type = "sawtooth";
    }
    else if(this.waveCounter == 0){
        this.monoSynth.oscillator.type = "triangle";
        this.waveCounter++;
    }
    else{
        this.monoSynth.oscillator.type = "square";
        this.waveCounter++;
    }
  }
  draw(){
    if(this.isPlaying){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let arr = this.wave.getValue();
      this.ctx.strokeStyle = "#aa0404";
      for(let i = 0; i < arr.length; i++){
        this.ctx.beginPath();
        this.ctx.arc(0.58*i, this.canvas.height/2 + arr[i]*70, 1, 0, 2 * Math.PI);
        this.ctx.stroke();
      }
    }
    else{
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    requestAnimationFrame(()=> {
      this.draw();
  });
  }
}