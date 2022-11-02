const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
//Song titles
const songs = ['hey', 'summer', 'ukulele'];

//keep track of songs
let songIndex = 0;

//initial load song info DOM
loadSong(songs[songIndex]);

//update song details function
function loadSong(song) {
    title.textContent = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};
const playSong = () => {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play()
}
const pauseSong = () => {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause()
}
const prevSong = () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
const nextSong = () => {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}
const updateProgress = (e) => {
    // console.log(e.srcElement.currentTime); //get the current time from src audio
    // console.log(e.srcElement.duration); //get total duration of src audio
    const { duration, currentTime } = e.srcElement;
    // console.log(e.srcElement);
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
const setProgress = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX ;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
//event listeners
playBtn.addEventListener('click', () => musicContainer.classList.contains('play') ? pauseSong() : playSong());

//change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
