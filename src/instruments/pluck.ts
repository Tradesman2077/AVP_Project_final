import * as Tone from 'tone';
import { Chebyshev } from 'tone';

export class Pluck{
    inst:any;
    reverb:any;
    fold:any;
    hpFilter:any;
    selectedPlucks:any;
    pluckSong:any;
    pluckLoop:any;
    mute:any;
    pluckVolWhenMuted:any;


    constructor(){
        this.mute = false;
        this.pluckVolWhenMuted = 0;
        this.hpFilter = new Tone.Filter(500,'highpass');
        this.fold = new Chebyshev(1).toDestination();
        this.reverb = new Tone.Reverb().toDestination();
        this.inst = new Tone.PluckSynth().connect(this.reverb);
        this.reverb.connect(this.fold);
        this.fold.connect(this.hpFilter);
        this.selectedPlucks = [null, null, null, null, null, null, null, null];
        this.reverb.wet.value = 0;
        this.pluckSong = (time:any, trigger:any) =>{
            if(trigger!=null){
              this.inst.triggerAttackRelease(trigger, "+2", time);
            }
        }
        this.pluckLoop = new Tone.Pattern(this.pluckSong, this.selectedPlucks).start(0);
    }
    mutePluck(){
        if(this.mute == true){
            this.mute = false;
            this.inst.volume.value = this.pluckVolWhenMuted;
        }
        else{
            this.mute = true;
            this.pluckVolWhenMuted = this.inst.volume.value;
            this.inst.volume.value = -100;
        }
    }
    unMute(){
        if(this.mute == true){
            this.mute = false;
            this.inst.volume.value = this.pluckVolWhenMuted;
          }
    }
    changeFold(){
        let slider = <HTMLInputElement>document.getElementById("fold");
        this.fold.order = slider.value;
      }
      changeAttackNoise(){
        let slider = <HTMLInputElement>document.getElementById("attackNoise");
        this.inst.attackNoise = slider.value;
      }
      changeResonance(){
        let slider = <HTMLInputElement>document.getElementById("resonance");
        this.inst.resonance = slider.value;
      }
      changeRevWet(){
        let revSlider = <HTMLInputElement>document.getElementById("revWet");
        this.reverb.wet.value = revSlider.value;
      }
    
}