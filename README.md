# DT-01 GrooveBox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.
This groovebox was created using tone.js and angular. The box was designed to be like 90s grooveboxes from yamaha and roland. A simple guide to using the box is below.

## Guide

### Overview
The dt-01 works using several different lanes which represent the different soudns or instruments. Each instrument has its own characteristics and parameters. Using the checkboxes to inpout notes at a point in the timeline along with the pitch sliders, you can create insteresting grooves or melodies.

### Transport section
![transport](https://user-images.githubusercontent.com/42988203/160382025-30a25c74-fe24-41d2-86a3-0fd1cbd60f89.jpg)

From left to right there is the title and then a display which shows a parameter being edited, in the picture it is the project bpm (beats per minute). Next is a small waveform display that shows the waveform of the audio output of the groovebox. Next is the master volume and the bpm of the groovebox. Finally there are three buttons,  start stop and unmute. The start and stop buttons do as you would imagine, they start and stop the groovebox. The 'unMute' button unmutes all tracks that are muted. The numbered strip at the top represents the steps in the beat and the step coloured red is the currently playing step.

### Channels
![synth](https://user-images.githubusercontent.com/42988203/160486811-dbc80f9f-6282-49f6-b9b3-5b8627de99f9.jpg)

Each channel has checkboxes that represent a selcted note or step. The sliders below the steps represent the pitch or playback speed of the sound. Each channel has various parameters depending on the channel and will effect the sound in different ways.

### Reference for controls

Buttons-\
Random(Synth) - Randomizes the frequency values of each step.\
Wave(Synth/Chord) - Selects the waveform of the channels synth voices.\
Chorus(Chord) - Adds a chorus effect to the sound.\
7th(Chord) - Adds a seventh note to the currently playing chord.\
Reverse(Sampler) - Reverses the currently loaded sample.\
Reverb(Clap) - adds a reverberation effect to the sound.\
Choose file(sampler) - Opens a fil selection box to add an audio sample to the track.\
Preview(sampler) - Plays the currently loaded audio sample.\
Distortion(Bass/Tom) - Adds distortion effect to the sound.\
Mute(All) - Mutes the track, can be unmuted with a second press or via the unmute button.\

Sliders-\
Filter Attack(synth) - Overn the amount of time the filter takes to open. This is the attack portion of the filter envelope.\
Amp Release(synth) - This controls the amount of time the sound fades out. It controls the release portion of the amplitude envelope.\
Filter env(synth) - This controls the amount of envelope modulation applied to the filter cutoff frequency.\
Delay amt(synth)- This adds a ping pong style delay to the sound.\
Major/Minor(chord) - Change sthe current chord to major/minor based on the root note from the slider.\
Note Delay(chord) - Spreads the notes of the chord over time, the higher the slider value the longer the time between notes.\
Detune(chord) - Detunes the notes from there base frequency.\
Delay Amount(chord) - Adds a delay effect to the sound.\
Start(sampler) - Controls the point in the audio sample that the channel will begin playing from.\
End(sampler) - Controls the point in the audio sample that the channel will stop playing.\
Clp/Sn(clap) - Changes the sound from a clap to a snare sound.\
Echo(hat) - Adds an echo effect to the sound.\
Attack noise(pluck) - Controls the volume of the attack portion of the pluck synth.\
Resonance(pluck) - The amount of resonance of the pluck. Also correlates to the sustain duration.\
Reverb(pluck) - Adds a reverberation effect to the sound.\
Fold(pluck) - Changes the tone of distortion applied to the sound. Effects order of the Chebyshev polynomial which creates the equation which is applied to the incoming signal.\
Release(bass/tom) - Controls the relaese portion of the amplitude envelope. Longer release times makes the sound fade out for longer.\
Vol(all) - Volume of track.\










## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
