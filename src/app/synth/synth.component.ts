import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chat } from 'src/instruments/chat';
import { Chord } from 'src/instruments/chord';
import { Clap } from 'src/instruments/clap';
import { KickDrum } from 'src/instruments/kick-drum';


import * as Tone from 'tone';

@Component({
  selector: 'app-synth',
  templateUrl: './synth.component.html',
  styleUrls: ['./synth.component.css']
})
export class SynthComponent implements OnInit {
  loop:any;
  pluckSong:any;
  pluckLoop:any;
  chordArp:any;
  fft:any;

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

  selectedNotes:any
  selectedPlucks:any

  synthChecks:any;
  clap:any;
  kick:any;
  hat:any
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
  synth1Pitch:any;
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
  

  chords = ["A3","A#3", "B3","B#3", "C3", "C#3", "D3", "D#3", "E3", "F3","F#3", "G3","G#3",
    "A4", "A#4", "B4", "B#4", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4"];

  constructor() {
    this.fft = new Tone.FFT(128);
    

    this.kick = new KickDrum();
    this.clap = new Clap();
    this.hat = new Chat();
    this.chord = new Chord();

    this.selectedNotes = [null, null, null, null, null, null, null, null]; //synth//
    this.selectedPlucks = [null, null, null, null, null, null, null, null];
    this.selectedSub = [null, null, null, null, null, null, null, null];
    this.synthChecks = [1,2,3,4,5,6,7,8];
    this.beatCount = 0;
    Tone.Transport.bpm.value = 180;
    //reverb
    this.reverb = new Tone.Reverb(4).toDestination();
    this.reverb.wet.value = 0;
    
    //pluckSynth
    this.pluck = new Tone.PluckSynth().connect(this.reverb);
    this.pluckSong = (time:any, trigger:any) =>{
      if(trigger!=null){
        this.pluck.triggerAttackRelease(trigger, "+2", time);
      }
    }
    //subSynth
    this.sub = new Tone.MembraneSynth().toDestination();
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
    this.song = (time:any, trigger:any) =>{
      if(this.beatCount == 8){
        this.beatCount = 1;
      }
      else{
        this.beatCount++;
      }
      this.updateBeatOnUi();
      console.log(this.fft.getValue());
      if(trigger!=null){
        this.monoSynth.triggerAttackRelease(trigger, '16n', time);
      }
    }
    Tone.Destination.connect(this.fft);
    ///loop
    this.loop = new Tone.Pattern(this.song, this.selectedNotes ).start(0);

    //pluckLoop
    this.pluckLoop = new Tone.Pattern(this.pluckSong, this.selectedPlucks).start(0);

    //subLoop
    this.subLoop = new Tone.Pattern(this.subSong, this.selectedSub).start(0);

   }
   
  ngOnInit(): void {
    Tone.start();
   
    

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
      if(this.selectedPlucks[i] != null){
        this.selectedPlucks[i] = null;
      }
      else{
        let pitchslider = <HTMLInputElement>document.getElementById("checkPluck"+this.synthChecks[i].toString()+"Pitch");
        this.selectedPlucks[i] = pitchslider.value;
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
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("kick"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.kick.selectedKicks[i] != null){
          this.kick.selectedKicks[i] = null;
          }
        else{
          let playBackSlider = <HTMLInputElement>document.getElementById("kick"+this.synthChecks[i].toString()+"Pitch");
          this.kick.selectedKicks[i] = playBackSlider.value;
        }
        });
      }
      for(let i = 0; i < this.synthChecks.length; i++){
        document.getElementById("clap"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
          if(this.clap.selectedClaps[i] != null){
            this.clap.selectedClaps[i] = null;
            }
          else{
            let playBackSlider = <HTMLInputElement>document.getElementById("clap"+this.synthChecks[i].toString()+"Pitch");
            this.clap.selectedClaps[i] = playBackSlider.value;
          }
          });
        }
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("chat"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.hat.selectedHats[i] != null){
          this.hat.selectedHats[i] = null;
          }
        else{
          let playBackSlider = <HTMLInputElement>document.getElementById("chat"+this.synthChecks[i].toString()+"Pitch");
          this.hat.selectedHats[i] = playBackSlider.value;
        }
          });
        }
    // start/stop for transport
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

    this.clap.clapLoop.start(0);
    this.kick.kickLoop.start(0);
    this.hat.chatLoop.start(0);
    this.chord.chordLoop.start(0);
    this.pluckLoop.start(0);
    this.subLoop.start(0);
  }
  stop(){
    this.loop.stop();
    this.clap.clapLoop.stop();
    this.kick.kickLoop.stop();
    this.hat.chatLoop.stop();
    this.chord.chordLoop.stop(0);
    this.pluckLoop.stop();
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
    console.log(this.selectedPlucks);
    for(let i = 0; i < this.synthChecks.length; i++){
      let pitchslider = <HTMLInputElement>document.getElementById("checkPluck"+this.synthChecks[i].toString()+"Pitch");
      if(this.selectedPlucks[i]!=null){
        this.selectedPlucks[i] = pitchslider.value;
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
  changePlaybackRate(sample:string){
    for(let i = 0; i < this.synthChecks.length; i++){
      let playbackslider = <HTMLInputElement>document.getElementById(sample+this.synthChecks[i].toString()+"Pitch");
      if(sample == "clap" && this.clap.selectedClaps[i]!=null){
        this.clap.selectedClaps[i] = playbackslider.value;
      }
      if(sample == "kick" && this.kick.selectedKicks[i]!=null){
        this.kick.selectedKicks[i] = playbackslider.value;
      }
      if(sample == "chat" && this.hat.selectedHats[i]!=null){
        this.hat.selectedHats[i] = playbackslider.value;
      }
    }
  }
  changeSubRelease(){
    let slider = <HTMLInputElement>document.getElementById("subRelease");
    this.sub.envelope.decay = slider.value;
  }
  changeAttackNoise(){
    let slider = <HTMLInputElement>document.getElementById("attackNoise");
    this.pluck.attackNoise = slider.value;
  }
  changeDampening(){
    let slider = <HTMLInputElement>document.getElementById("dampening");
    this.pluck.dampening = slider.value;
  }
  changeRevWet(){
    let revSlider = <HTMLInputElement>document.getElementById("revWet");
    this.reverb.wet.value = revSlider.value;
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
    if(part == 'clap'){
     this.clap.muteClap();
    }
    if(part == 'kick'){
      this.kick.muteKick();
    }
    if(part == 'chat'){
      this.hat.muteHat();
    }
    if(part == 'chord'){
      this.chord.muteChord();
    }

    if(part == 'pluck' && this.pluckMute == true){
      this.pluckMute = false;
      this.pluck.volume.value = this.pluckVolWhenMuted;
    }
    else if(part == 'pluck'){
      this.pluckMute = true;
      this.pluckVolWhenMuted = this.pluck.volume.value;
      this.pluck.volume.value = -100;
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
    this.clap.unMute();
    this.kick.unMute();
    this.hat.unMute();
    this.hat.unMute();
    this.chord.unMute();
    if(this.subMute == true){
      this.subMute = false;
      this.sub.volume.value = this.subVolWhenMuted;
    }
    if(this.pluckMute == true){
      this.pluckMute = false;
      this.pluck.volume.value = this.pluckVolWhenMuted;
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
}