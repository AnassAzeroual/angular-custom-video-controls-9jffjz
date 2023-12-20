import { Component, OnChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnChanges {
  name = 'Angular';
  // Get a handle to the player
  @ViewChild('player') videoPlayer: ElementRef;
  @ViewChild('btnPlayPause') btnPlayPause: HTMLButtonElement;
  @ViewChild('btnMute') btnMute: HTMLButtonElement;
  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('volumeBar') volumeBar: ElementRef;

  ngOnChanges(){
    
  }
  setVolume(){
    this.videoPlayer.nativeElement.volume = parseInt(this.volumeBar.nativeElement.value);
  }

  playPauseVideo() {
  	if (this.videoPlayer.nativeElement.paused || this.videoPlayer.nativeElement.ended) {
  		// Change the button to a pause button
  		this.changeButtonType(this.btnPlayPause, 'pause');
  		this.videoPlayer.nativeElement.play();
  	}
  	else {
  		// Change the button to a play button
  		this.changeButtonType(this.btnPlayPause, 'play');
  		this.videoPlayer.nativeElement.pause();
  	}
  }
  
  // Stop the current media from playing, and return it to the start position
  stopVideo() {
  	this.videoPlayer.nativeElement.pause();
  	if (this.videoPlayer.nativeElement.currentTime) this.videoPlayer.nativeElement.currentTime = 0;
  }
  
  // Toggles the media player's mute and unmute status
  muteVolume() {
  	if (this.videoPlayer.nativeElement.muted) {
  		// Change the button to a mute button
  		this.changeButtonType(this.btnMute, 'mute');
  		this.videoPlayer.nativeElement.muted = false;
  	}
  	else {
  		// Change the button to an unmute button
  		this.changeButtonType(this.btnMute, 'unmute');
  		this.videoPlayer.nativeElement.muted = true;
  	}
  }
  
  // Replays the media currently loaded in the player
  replayVideo() {
  	this.resetPlayer();
  	this.videoPlayer.nativeElement.play();
  } 
  
  // Update the progress bar
  updateProgressBar() {
  	// Work out how much of the media has played via the duration and currentTime parameters
  	var percentage = Math.floor((100 / this.videoPlayer.nativeElement.duration) * this.videoPlayer.nativeElement.currentTime);
  	// Update the progress bar's value
  	this.progressBar.nativeElement.value = percentage;
  	// Update the progress bar's text (for browsers that don't support the progress element)
  	this.progressBar.nativeElement.innerHTML = percentage + '% played';
  }
  seek(e) {
      var percent = e.offsetX / this.progressBar.nativeElement.offsetWidth;
      this.videoPlayer.nativeElement.currentTime = percent * this.videoPlayer.nativeElement.duration;
      e.target.value = Math.floor(percent / 100);
      e.target.innerHTML = this.progressBar.nativeElement.value + '% played';
  }
  
  // Updates a button's title, innerHTML and CSS class
  changeButtonType(btn, value) {
  	btn.title     = value;
  	btn.innerHTML = value;
  	btn.className = value;
  }
  
  resetPlayer() {
  	this.progressBar.nativeElement.value = 0;
  	// Move the media back to the start
  	this.videoPlayer.nativeElement.currentTime = 0;
  	// Set the play/pause button to 'play'
  	this.changeButtonType(this.btnPlayPause, 'play');
  }  
}
