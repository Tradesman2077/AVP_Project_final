import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import * as Tone from 'tone';

@Component({
  selector: 'app-synth',
  templateUrl: './synth.component.html',
  styleUrls: ['./synth.component.css']
})
export class SynthComponent implements OnInit {
  loop:any;
  clapLoop:any;
  clapSong:any;
  pluckSong:any;
  kickLoop:any;
  kickSong:any;
  hatSong:any;
  hatLoop:any;
  pluckLoop:any;

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
  selectedClaps:any;
  selectedKicks:any;
  selectedHats:any;
  selectedPlucks:any

  synthChecks:any;
  clap:any;
  kick:any;
  hat:any
  pluck:any;
  beatCount:any;
  sub:any;
  selectedSub:any;
  subSong:any;
  subLoop:any;

  synthMute:any;
  synthVolWhenMuted:any;
  clapMute:any;
  clapVolWhenMuted:any;
  kickMute:any;
  kickVolWhenMuted:any;
  chatMute:any;
  chatVolWhenMuted:any;
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

  constructor() {
    this.selectedNotes = [null, null, null, null, null, null, null, null]; //synth//
    this.selectedClaps = [null, null, null, null, null, null, null, null];
    this.selectedKicks = [null, null, null, null, null, null, null, null];
    this.selectedHats = [null, null, null, null, null, null, null, null];
    this.selectedPlucks = [null, null, null, null, null, null, null, null];
    this.selectedSub = [null, null, null, null, null, null, null, null];
    this.synthChecks = [1,2,3,4,5,6,7,8];
    this.beatCount = 0;
    
    Tone.Transport.bpm.value = 180;

    

    //reverb
    this.reverb = new Tone.Reverb(4).toDestination();
    this.reverb.wet.value = 0;

    //feedbackDelay
    this.feedBackDelay = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
    this.feedBackDelay.wet.value = 0;

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
      //this.currentBeat = Tone.Transport.position.toString().split(':');
      
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
    //clap
    this.clap = new Tone.Player("assets/clap.mp3").toDestination();
    this.clapSong = (time:any, trigger:any) =>{
      this.currentBeat = Tone.Transport.position.toString().split(':');
      if(trigger!=null){

        this.clap.playbackRate = trigger;
        this.clap.start(time);
      }
    }
    //kick
    this.kick = new Tone.Player("assets/kick.wav").toDestination();
    this.kickSong = (time:any, trigger:any) =>{
      this.currentBeat = Tone.Transport.position.toString().split(':');
      if(trigger!=null){
        this.kick.playbackRate = trigger;
        this.kick.start(time);
      }
    }
    //hat
    this.hat = new Tone.Player("assets/hat.mp3").connect(this.feedBackDelay);
    this.hatSong = (time:any, trigger:any) =>{
      this.currentBeat = Tone.Transport.position.toString().split(':');
      if(trigger!=null){
        this.hat.playbackRate = trigger;
        this.hat.start(time);
      }
    }
    ///loop
    this.loop = new Tone.Pattern(this.song, this.selectedNotes ).start(0);

    //clap loop
    this.clapLoop = new Tone.Pattern(this.clapSong, this.selectedClaps).start(0);

    //kick loop
    this.kickLoop = new Tone.Pattern(this.kickSong, this.selectedKicks).start(0);

    //hat loop
    this.hatLoop = new Tone.Pattern(this.hatSong, this.selectedHats).start(0);

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
    this.beatCount =0;
    Tone.start();
    Tone.Transport.start();
    this.loop.start(0);
    
    this.clapLoop.start(0);
    this.kickLoop.start(0);
    this.hatLoop.start(0);
    this.pluckLoop.start(0);
    this.subLoop.start(0);
    
  }
  stop(){
    this.loop.stop();
    
    this.clapLoop.stop();
    this.kickLoop.stop();
    this.hatLoop.stop();
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
      if(sample == "clap" && this.selectedClaps[i]!=null){
        this.selectedClaps[i] = playbackslider.value;
      }
      if(sample == "kick" && this.selectedKicks[i]!=null){
        this.selectedKicks[i] = playbackslider.value;
      }
      if(sample == "chat" && this.selectedHats[i]!=null){
        this.selectedHats[i] = playbackslider.value;
      }
      
    }
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
    if(part == 'clap' && this.clapMute == true){
      this.clapMute = false;
      this.clap.volume.value = this.clapVolWhenMuted;
    }
    else if(part == 'clap'){
      this.clapMute = true;
      this.clapVolWhenMuted = this.clap.volume.value;
      this.clap.volume.value = -100;
    }
    if(part == 'kick' && this.kickMute == true){
      this.kickMute = false;
      this.kick.volume.value = this.kickVolWhenMuted;
    }
    else if(part == 'kick'){
      this.kickMute = true;
      this.kickVolWhenMuted = this.kick.volume.value;
      this.kick.volume.value = -100;
    }
    if(part == 'chat' && this.chatMute == true){
      this.chatMute = false;
      this.hat.volume.value = this.chatVolWhenMuted;
    }
    else if(part == 'chat'){
      this.chatMute = true;
      this.chatVolWhenMuted = this.hat.volume.value;
      this.hat.volume.value = -100;
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
    if(this.clapMute == true){
      this.clapMute = false;
      this.clap.volume.value = this.clapVolWhenMuted;
    }
    if(this.synthMute == true){
      this.synthMute = false;
      this.monoSynth.volume.value = this.synthVolWhenMuted;
    }
    if(this.kickMute == true){
      this.kickMute = false;
      this.kick.volume.value = this.kickVolWhenMuted;
    }
    if(this.chatMute == true){
      this.chatMute = false;
      this.hat.volume.value = this.chatVolWhenMuted;
    }
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
  changeHatDouble(){
    let slider = <HTMLInputElement>document.getElementById('hatDouble');
    this.hatEcho = slider.value;
    this.feedBackDelay.wet.value = slider.value;
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
        div.style.backgroundColor="white";
        div.style.color = "black";
      }
    }
  }
}
