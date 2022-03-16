import * as Tone from 'tone';

export class Chord {
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

    chords = ["A3","A#3", "B3","B#3", "C3", "C#3", "D3", "D#3", "E3", "F3","F#3", "G3","G#3",
    "A4", "A#4", "B4", "B#4", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4"];


    constructor(){
        this.hpFilter = new Tone.Filter(500,'highpass');
        this.hpFilter.toDestination();
        
        this.inst = new Tone.Synth().connect(this.hpFilter);
        this.inst2 = new Tone.Synth().connect(this.hpFilter);
        this.inst3 = new Tone.Synth().connect(this.hpFilter);
        this.noteDelay = 0;
        
        
        

        this.mute = false;
        this.min = false;
        this.chordVolWhenMuted = 0;

        this.selectedChord = [null, null, null, null, null, null, null, null];

        this.chordSong = (time:any, trigger:any) =>{
            if(trigger!=null){
              let note = parseInt(trigger);
              if(this.min == true){
                this.inst.triggerAttackRelease(this.chords[trigger], '16n', time);
                this.inst2.triggerAttackRelease(this.chords[note+3], '16n', time + this.noteDelay);
                this.inst3.triggerAttackRelease(this.chords[note+7], '16n', time + this.noteDelay*2);
              }
              else{
                this.inst.triggerAttackRelease(this.chords[trigger], '16n', time);
                this.inst2.triggerAttackRelease(this.chords[note+4], '16n', time + this.noteDelay);
                this.inst3.triggerAttackRelease(this.chords[note+7], '16n', time + this.noteDelay*2);
              }  
              
            }
        }
        this.chordLoop = new Tone.Pattern(this.chordSong, this.selectedChord).start(0);
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
}
