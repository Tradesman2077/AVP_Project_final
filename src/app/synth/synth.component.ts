import { Component, OnInit } from '@angular/core';
import { Chord } from 'src/instruments/chord';
import { Pluck } from 'src/instruments/pluck';

import * as Tone from 'tone';

@Component({
  selector: 'app-synth',
  templateUrl: './synth.component.html',
  styleUrls: ['./synth.component.css']
})
export class SynthComponent implements OnInit {
  wave:any;
  loop:any;
  pluckSong:any;
  pluckLoop:any;
  
  isDist:any;
  dist:any;

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
  selectedPlucks:any

  synthChecks:any;
  pluck:any;
  chord:any;
  beatCount:any;
  sub:any;
  selectedSub:any;
  subSong:any;
  subLoop:any;

  synthMute:any;
  synthVolWhenMuted:any;

  pluckMute:any;
  pluckVolWhenMuted:any;
  subMute:any;
  subVolWhenMuted:any;
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
  hatEcho:any;
  fold:any;
  waveCounter:any;
  hpFilter:any;
  canvas:any;
  ctx:any;

  chords = ["A3","A#3", "B3","B#3", "C3", "C#3", "D3", "D#3", "E3", "F3","F#3", "G3","G#3",
    "A4", "A#4", "B4", "B#4", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4"];

  constructor() {
    this.wave = new Tone.Waveform(512);
    this.chord = new Chord();
    this.dist = new Tone.Distortion(0.8).toDestination();
    this.hpFilter = new Tone.Filter(500,'highpass');
    this.pluck = new Pluck();

    this.selectedNotes = [null, null, null, null, null, null, null, null]; //synth//
    this.selectedSub = [null, null, null, null, null, null, null, null];
    this.synthChecks = [1,2,3,4,5,6,7,8];
    this.beatCount = 0;
    this.isDist =false;
    this.dist.oversample = "2x";
    this.dist.distortion = 0;
    this.waveCounter = 1;
    Tone.Destination.connect(this.wave);
    Tone.Transport.bpm.value = 180;

    //subSynth
    this.sub = new Tone.MembraneSynth().toDestination();
    this.sub.connect(this.dist);
    this.subSong = (time:any, trigger:any) =>{
      if(trigger!=null){
        this.sub.triggerAttackRelease(trigger, '8n', time);
      }
    } 
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
    //subLoop
    this.subLoop = new Tone.Pattern(this.subSong, this.selectedSub).start(0);
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
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("checkChord"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.chord.selectedChord[i] != null){
          this.chord.selectedChord[i] = null;
        }
        else{
          let pitchslider = <HTMLInputElement>document.getElementById("checkChord"+this.synthChecks[i].toString()+"Pitch");
          this.chord.selectedChord[i] = pitchslider.value;
        }
        });
      }
    for(let i = 0; i < this.synthChecks.length; i++){
    document.getElementById("checkPluck"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
      if(this.pluck.selectedPlucks[i] != null){
        this.pluck.selectedPlucks[i] = null;
      }
      else{
        let pitchslider = <HTMLInputElement>document.getElementById("checkPluck"+this.synthChecks[i].toString()+"Pitch");
        this.pluck.selectedPlucks[i] = pitchslider.value;
      }
      });
    }
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
    this.chord.chordLoop.start(0);
    this.pluck.pluckLoop.start(0);
    this.subLoop.start(0);
  }
  stop(){
    this.loop.stop();
    this.chord.chordLoop.stop();
    this.pluck.pluckLoop.stop();
    this.subLoop.stop();
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
  resetChordPitch(){
    for(let i = 0; i < this.synthChecks.length; i++){
      let pitchslider = <HTMLInputElement>document.getElementById("checkChord"+this.synthChecks[i].toString()+"Pitch");
      if(this.chord.selectedChord[i]!=null){
        this.chord.selectedChord[i] = pitchslider.value;
      }
    }
  }
  resetPluckPitch(){
    for(let i = 0; i < this.synthChecks.length; i++){
      let pitchslider = <HTMLInputElement>document.getElementById("checkPluck"+this.synthChecks[i].toString()+"Pitch");
      if(this.pluck.selectedPlucks[i]!=null){
        this.pluck.selectedPlucks[i] = pitchslider.value;
      }
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
  
  changeSubRelease(){
    let slider = <HTMLInputElement>document.getElementById("subRelease");
    this.sub.envelope.decay = slider.value;
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
    if(part == 'chord'){
      this.chord.muteChord();
    }
    if(part == 'pluck'){
      this.chord.mutePluck();
    }
    if(part == 'sub' && this.subMute == true){
      this.subMute = false;
      this.sub.volume.value = this.subVolWhenMuted;
    }
    else if(part == 'sub'){
      this.subMute = true;
      this.subVolWhenMuted = this.sub.volume.value;
      this.sub.volume.value = -100;
    }
  }
  unMute(){
    this.chord.unMute();
    this.pluck.unMute();
    if(this.subMute == true){
      this.subMute = false;
      this.sub.volume.value = this.subVolWhenMuted;
    }
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