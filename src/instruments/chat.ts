import * as Tone from 'tone';

export class Chat {


    selectedHats:any;
    inst:any;
    chatSong:any;
    chatLoop:any;
    mute:boolean;
    chatVolWhenMuted:any;
    hatEcho:any;
    feedBackDelay:any;


    constructor(){
            //feedbackDelay
        this.feedBackDelay = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
        this.feedBackDelay.wet.value = 0;

        this.inst = new Tone.Player("assets/hat.mp3").toDestination();
        this.inst.connect(this.feedBackDelay);
        
        this.mute = false;
        this.chatVolWhenMuted = 0;

        this.selectedHats = [null, null, null, null, null, null, null, null];
        this.chatSong = (time:any, trigger:any) =>{
            if(trigger!=null){
              this.inst.playbackRate = trigger;
              this.inst.start(time);
            }
        }
        this.chatLoop = new Tone.Pattern(this.chatSong, this.selectedHats).start(0);
    }
    muteHat(){
        console.log('here');
        if(this.mute == true){
            this.mute = false;
            this.inst.volume.value = this.chatVolWhenMuted;
        }
        else{
            this.mute = true;
            this.chatVolWhenMuted = this.inst.volume.value;
            this.inst.volume.value = -100;
        }
    }
    unMute(){
        if(this.mute == true){
            this.mute = false;
            this.inst.volume.value = this.chatVolWhenMuted;
          }
    }
    changeHatDouble(){
        let slider = <HTMLInputElement>document.getElementById('hatDouble');
        this.hatEcho = slider.value;
        this.feedBackDelay.wet.value = slider.value;
      }
}
