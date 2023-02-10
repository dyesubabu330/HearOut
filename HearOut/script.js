console.log("welcome to HearOut");

// intialize the variables//
let songIndex = 0;
let audioElement = new Audio ('songs/mirchi.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById ('myProgressBar');
let gif = document.getElementById ('gif');
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from (document.getElementsByClassName("songItem"));

let songs = [
    {songName: "mirchi", filePath: "songs/mirchi.mp3", coverPath: "covers/1.jpeg"},
    {songName: "idedho", filePath: "songs/idedho.mp3", coverPath: "covers/2.jpeg"},
    {songName: "kowntere", filePath: "songs/yahoo yahoo.mp3", coverPath: "covers/3.jpeg"},
    {songName: "hellosenorita", filePath: "songs/Barbie girl.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Nee chupala", filePath: "songs/Nee chupula.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Pandagala", filePath: "songs/pandagala.mp3", coverPath: "covers/6.jpeg"},
    {songName: "darlingey", filePath: "songs/darlingey.mp3", coverPath: "covers/7.jpeg"},
   
]
songItems.forEach((element , i) => {
   element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//handle play pause click
masterPlay.addEventListener('click',() =>{
    if (audioElement.paused || audioElement. currentTime<=0) {
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;

    }

})

//listen to events//
audioElement.addEventListener('timeupdate', () =>{
   
    //seek bar update

    progress = parseInt ((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    })
const makeAllPlays = () =>{
    Array.from (document.getElementsByClassName("songItemPlay")).forEach((element) =>{
        element.classList.remove("fa-solid fa-circle-pause");
        element.classList.add("fa-solid fa-circle-play");
    })
}
Array.from (document.getElementsByClassName("songItemPlay")).forEach((element) =>{
    element.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex =  parseInt (e.target.id);
        e.target.classList.remove("fa-solid fa-circle-play");
        e.target.classList.add("fa-solid fa-circle-pause");
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })

})
document.getElementById ('next') .addEventListener ('click', () =>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById ('previous') .addEventListener ('click', () =>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})