import * as Tone from 'tone';

export class KickDrum {


    selectedKicks:any;
    inst:any;
    kickSong:any;
    kickLoop:any;
    mute:boolean;
    kickVolWhenMuted:any;


    constructor(){

        this.inst = new Tone.Player("assets/kick.wav").toDestination();

        this.mute = false;
        this.kickVolWhenMuted = 0;

        this.selectedKicks = [null, null, null, null, null, null, null, null];

        this.kickSong = (time:any, trigger:any) =>{
            if(trigger!=null){
              this.inst.playbackRate = trigger;
              this.inst.start(time);
            }
        }
        this.kickLoop = new Tone.Pattern(this.kickSong, this.selectedKicks).start(0);
    }
    muteKick(){
        if(this.mute == true){
            this.mute = false;
            this.inst.volume.value = this.kickVolWhenMuted;
        }
        else{
            this.mute = true;
            this.kickVolWhenMuted = this.inst.volume.value;
            this.inst.volume.value = -100;
        }
    }
    unMute(){
        if(this.mute == true){
            this.mute = false;
            this.inst.volume.value = this.kickVolWhenMuted;
          }
    }

}
