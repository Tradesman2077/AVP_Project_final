import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
@Component({
  selector: 'app-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.css']
})
export class ChordComponent implements OnInit {
    inst:any;
    inst2:any;
    inst3:any;
    mute:any;
    selectedChord:any;
    chordVolWhenMuted:any;
    chordSong:any;
    chordLoop:any;
    min:boolean;
    hpFilter:any;
    noteDelay:any;
    chorus:any;
    chorusOn:boolean;
    chorusVolWhenMuted:any;
    detuneVal:any;
    waveCounter:any;
    delay:any;
    unmuteButton:any;

    chords = ["A3","A#3", "B3","B#3", "C3", "C#3", "D3", "D#3", "E3", "F3","F#3", "G3","G#3",
    "A4", "A#4", "B4", "B#4", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4"];
    synthChecks = [1,2,3,4,5,6,7,8];


  constructor() { 
    this.hpFilter = new Tone.Filter(500,'highpass');
        this.hpFilter.toDestination();
        this.chorus = new Tone.Vibrato().toDestination();
        
        this.inst = new Tone.Synth().connect(this.hpFilter);
        this.inst2 = new Tone.Synth().connect(this.hpFilter);
        this.inst3 = new Tone.Synth().connect(this.hpFilter);
        this.hpFilter.connect(this.chorus);
        this.noteDelay = 0;
        this.chorusOn = false;
        this.chorus.wet.value = 0;

        this.mute = false;
        this.min = false;
        this.chordVolWhenMuted = 0;
        this.delay= new Tone.FeedbackDelay("8n", 0.5).toDestination();
        this.inst.detune.value = 0;
        this.inst2.detune.value = 0;
        this.inst3.detune.value = 0;
        this.inst.oscillator.type = "square";
        this.inst2.oscillator.type = "square";
        this.inst3.oscillator.type = "square";
        this.inst.volume.value = -15;
        this.inst2.volume.value = -15;
        this.inst3.volume.value = -15;
        this.delay.wet.value = 0;
        this.chorus.connect(this.delay);
        this.waveCounter = 2;
        
        this.selectedChord = [null, null, null, null, null, null, null, null];

        this.chordSong = (time:any, trigger:any) =>{
            if(trigger!=null){
              let note = parseInt(trigger);
              if(this.min == true){
                this.inst.triggerAttackRelease(this.chords[trigger], '8n', time);
                this.inst2.triggerAttackRelease(this.chords[note+3], '8n', time + this.noteDelay);
                this.inst3.triggerAttackRelease(this.chords[note+7], '8n', time + this.noteDelay*2);
              }
              else{
                this.inst.triggerAttackRelease(this.chords[trigger], '8n', time);
                this.inst2.triggerAttackRelease(this.chords[note+4], '8n', time + this.noteDelay);
                this.inst3.triggerAttackRelease(this.chords[note+7], '8n', time + this.noteDelay*2);
              }  
              
            }
        }
        this.chordLoop = new Tone.Pattern(this.chordSong, this.selectedChord).start(0);
        this.unmuteButton = <HTMLButtonElement>document.getElementById('unmuteButton');
        this.unmuteButton.addEventListener("click", ()=>{
        this.unMute();
        })

  }
  ngOnInit(): void {
    for(let i = 0; i < this.synthChecks.length; i++){
      document.getElementById("checkChord"+this.synthChecks[i].toString())?.addEventListener("click", async () => {
        if(this.selectedChord[i] != null){
          this.selectedChord[i] = null;
        }
        else{
          let pitchslider = <HTMLInputElement>document.getElementById("checkChord"+this.synthChecks[i].toString()+"Pitch");
          this.selectedChord[i] = pitchslider.value;
        }
        });
      }
  }
  muteChord(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.chordVolWhenMuted;
    }
    else{
        this.mute = true;
        this.chordVolWhenMuted = this.inst.volume.value;
        this.inst.volume.value = -100;
        this.inst2.volume.value = -100;
        this.inst3.volume.value = -100;
    }
  }
  unMute(){
    if(this.mute == true){
        this.mute = false;
        this.inst.volume.value = this.chordVolWhenMuted;
        this.inst2.volume.value = this.chordVolWhenMuted;
        this.inst3.volume.value = this.chordVolWhenMuted;
      }
  }
  majorMinorSwitch(){
    if(this.min == true){
        this.min = false;
    }
    else{
        this.min = true;
    }
  }
  noteDelayChange(){
    let slider = <HTMLInputElement>document.getElementById("noteDelay");
    this.noteDelay = parseFloat(slider.value);  
  }
  chorusOnOff(){
    if(this.chorusOn == false){
        this.chorusOn = true;
        this.chorus.wet.value = 1;
    }
    else{
        this.chorusOn = false;
        this.chorus.wet.value = 0;
    }
  }
  changeDetune(){
    let slider = <HTMLInputElement>document.getElementById('changeDetune');
    this.detuneVal = slider.value;
    this.inst.detune.value = this.detuneVal;
    this.inst2.detune.value = this.detuneVal;
    this.inst3.detune.value = this.detuneVal;
  }
  changeDelayAmt(){
    let slider = <HTMLInputElement>document.getElementById("delayFeedbackChord");
    let amt = parseFloat(slider.value);
    this.delay.wet.value = amt;
  }
  waveChange(){
    if(this.waveCounter == 2){
        this.waveCounter = 0;
        this.inst.oscillator.type = "sawtooth";
        this.inst2.oscillator.type = "sawtooth";
        this.inst3.oscillator.type = "sawtooth";
    }
    else if(this.waveCounter == 0){
        this.inst.oscillator.type = "triangle";
        this.inst2.oscillator.type = "triangle";
        this.inst3.oscillator.type = "triangle";
        this.waveCounter++;
    }
    else{
        this.inst.oscillator.type = "square";
        this.inst2.oscillator.type = "square";
        this.inst3.oscillator.type = "square";
        this.waveCounter++;
    }
  }
  resetChordPitch(){
    for(let i = 0; i < this.synthChecks.length; i++){
      let pitchslider = <HTMLInputElement>document.getElementById("checkChord"+this.synthChecks[i].toString()+"Pitch");
      if(this.selectedChord[i]!=null){
        this.selectedChord[i] = pitchslider.value;
      }
    }
  }
  changeChordVol(){
    let synthVolSlider = <HTMLInputElement>document.getElementById("chordVol");
    this.inst.volume.value = synthVolSlider.value;
    this.inst2.volume.value = synthVolSlider.value;
    this.inst3.volume.value = synthVolSlider.value;
  }

  

}
