import * as Tone from 'tone';

export class Clap {


    selectedClaps:any;
    inst:any;
    clapSong:any;
    clapLoop:any;
    mute:boolean;
    clapVolWhenMuted:any;
    reverb:any;
    reverbOn:boolean;


    constructor(){

        this.inst = new Tone.Player("assets/clap.mp3");
        this.reverb = new Tone.Reverb().toDestination();
        this.reverb.wet.value = 0;
        this.inst.connect(this.reverb);
        this.mute = false;
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

}
