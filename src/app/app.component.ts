import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sumit';
  record:any;
  recording=false;
  url:any;
  error:any;
  constructor(private Dom:DomSanitizer){}
  sanitize(url:string){
    return this.Dom.bypassSecurityTrustUrl(url);
  }

  StartRecording(){
    console.log('start');
    
    this.recording=true;
    let media={
      video:false,
      audio:true,
    };
    navigator.mediaDevices
    .getUserMedia(media).
    then(this.successCallback.bind(this),this.errorCallback.bind(this));
  }
  
  successCallback(stream:any){
    let options:any={
      mimeType:'audio/wav',
    };
    var StereoAudioRecorder= RecordRTC.StereoAudioRecorder;
    this.record=new StereoAudioRecorder(stream,options);
   console.log(this.record);
   
    this.record.record();
  }
  stopRecording(){
    console.log("stop ");
    
    this.recording=false;
    this.record.stop(this.processsRecording.bind(this));
  }
  processsRecording(blob:any){ 
    this.url= URL.createObjectURL(blob);
    console.log('blob',blob);
    console.log('url',this.url);
  }

  errorCallback(error:any){
    this.error="can not play audio in your"
    console.log(this.error);
    
  }
  
}
