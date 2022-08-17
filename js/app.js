//select  
let background = document.querySelector(".background");
let listBtn = document.querySelector(".list");
let imgContainer = document.querySelector(".img-container")
let trackImg = document.querySelector(".track-img");
let trackNameTag = document.querySelector(".track-name");
let artistNameTag = document.querySelector(".artist-name");
let audioTag = document.querySelector("audio");
let progressContainerTag = document.querySelector(".progressBar-container");
let progressTag = document.querySelector(".progress");
let currentTimeTag = document.querySelector(".current-time");
let durationTag = document.querySelector(".duration");
let soundBarTag = document.querySelector(".soundBar");
//btn
let previousBtn = document.querySelector(".previous");
let playBtn = document.querySelector(".play");
let pauseBtn = document.querySelector(".pause");
let nextBtn = document.querySelector(".next");
//select playlist
let playListTag = document.querySelector(".playListContainer");
let innerPlayListTag = document.querySelector(".innerPlayList");
let editBtn = document.querySelector(".edit");
let deleteBtn = document.querySelector(".delete");
let songId = document.querySelector(".song-id");
let songNameTag = document.querySelector(".song-name");
let artistTag = document.querySelector(".artist");

//function
let count = 0;
let uploadToDisplay= (count) => {
    background.src = tracks[count].trackImage;
    trackImg.src = tracks[count].trackImage;
    trackNameTag.textContent = tracks[count].trackName;
    artistNameTag.textContent = tracks[count].artistName;
}
uploadToDisplay(count);

//to play song
let songPlay = (currentPlayingIndex) => {
    audioTag.volume = soundBarTag.value / 100;
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    uploadToDisplay(currentPlayingIndex);
    audioTag.src = songIdToPlay;
    audioTag.play();   
   
}

//to spin image
let toSpinImage = (state) => {
    if(state){
        imgContainer.style.animationPlayState = "running";
    }else{
        imgContainer.style.animationPlayState = "paused";
    }
}

//update play and pause button
let updatePlayAndPauseButton = () => {
    if(isPlaying){
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
    }else{
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    }
}

//crete time text to show in display
let createTimeText = (totalSecond) => {
    let minute = Math.floor(totalSecond/60);
    let second = Math.floor(totalSecond%60);

    let minuteText = minute.toString().padStart(2,"0");
    let secondText = second.toString().padStart(2,"0");
    
    return `${minuteText}:${secondText}`;
}

/*update progress in progress bar*/
let updateProgress = () => {
    let currentWidth = (320 / duration) * currentTime;
    progressTag.style.width = `${currentWidth}px`;
}

//EventListener
let duration = 0;
let currentTime = 0;
let durationText = "00:00";
let currentTimeText ;


//to get duration of track
audioTag.addEventListener("loadeddata",() => {
    duration = Math.floor(audioTag.duration);  
    durationText = createTimeText(duration);
   
})

//to get currentTime of track and upload time
audioTag.addEventListener("timeupdate",() => {
    currentTime = Math.floor(audioTag.currentTime);
    currentTimeText = createTimeText(currentTime);
    durationTag.innerHTML = durationText;
    currentTimeTag.innerHTML = currentTimeText;  
    updateProgress();
})

//playBtn
playBtn.addEventListener("click",() => {
    let currentTime  = Math.floor(audioTag.currentTime);
    if(currentTime === 0){
        count = 0;
        songPlay(count);
    }else{
         audioTag.play();
    }            
        isPlaying = true;
        toSpinImage(true);
        updatePlayAndPauseButton();

});

//pause
pauseBtn.addEventListener("click",() => {
    isPlaying = false;
    audioTag.pause();
    toSpinImage(false);
    updatePlayAndPauseButton();
})

//next
nextBtn.addEventListener("click",() => {    
    count ++;
    isPlaying = true;
    if(count > tracks.length-1){
        count = 0;       
    }
    songPlay(count);  
    toSpinImage(true);
    updatePlayAndPauseButton(); 
})


previousBtn.addEventListener("click",() => {
    count --;
    isPlaying = true;
    if(count < 0){
        count = tracks.length-1;
    }
    songPlay(count);     
    toSpinImage(true);
    updatePlayAndPauseButton(); 
})

//loop
audioTag.addEventListener("ended",() => {
    count ++;
    isPlaying = true;
    if(count > tracks.length-1){
        count = 0;
    }
        songPlay(count);
        toSpinImage(true);
        updatePlayAndPauseButton();   
})


soundBarTag.addEventListener("change",() => {
    audioTag.volume = soundBarTag.value/100;
});

progressContainerTag.addEventListener("click",(e) => {
    const width = progressContainerTag.clientWidth;
    const clickX = e.offsetX;
    let time = clickX / width * duration;  
    audioTag.currentTime = time; 
});


let addSongToPlayList = () => {
    for(let i=0; i<tracks.length; i++){

    let songContainerTag = document.createElement("div");
    songContainerTag.classList.add("song-container");
    songContainerTag.addEventListener("click",() => {
        songPlay(i);
        isPlaying = true;
        toSpinImage(true);
        updatePlayAndPauseButton();
        
    })

    let songIdTag = document.createElement("div");
    songIdTag.classList.add("song-id");
    songIdTag.append(i + 1);
    
    let photoTag = document.createElement("div");
    photoTag.classList.add("photo");
    let iconTag = document.createElement("i");
    iconTag.classList.add("fa-solid", "fa-music");
    photoTag.append(iconTag);

    let songInfoTag = document.createElement("div");
    songInfoTag.classList.add("song-info");
    
    let songName = document.createElement("div");
    songName.classList.add("song-name");
    songName.append(tracks[i].trackName);

    let artist = document.createElement("div");
    artist.classList.add("artist");
    artist.append(tracks[i].artistName);

    songInfoTag.append(songName,artist);   
    songContainerTag.append(songIdTag,photoTag,songInfoTag);
    innerPlayListTag.append(songContainerTag);
    };
   
}


//to open playlist
let isClicked = true;
listBtn.addEventListener("click",() => {
    innerPlayListTag.innerHTML = "";
    playListTag.classList.add("transition");
    addSongToPlayList();
    // let song = document.querySelectorAll(".song-container");
    if(isClicked){   
        playListTag.style.transform = `translateY(${0}%)`;
        isClicked = false;
    }else{
        playListTag.style.transform = `translateY(${100}%)`;
         isClicked = true;
    }
  
})


















