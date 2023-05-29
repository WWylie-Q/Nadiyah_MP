import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'POWDER',
    songArtist: 'MELANIE MARTINEZ',
    songSrc: './Assets/songs/Powder.mp3',
    songAvatar: './Assets/Images/po.jpg',
  })

  //UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0)

  const currentAudio = useRef()

  const handleMusicProgressBar = (e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  //Change Avatar Class
  let avatarClass = ['objectFitCover','objectFitContain','none']
  const [avatarClassIndex, setAvatarClassIndex] = useState(0)
  const handleAvatar = ()=>{
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0)
    }else{
      setAvatarClassIndex(avatarClassIndex + 1)
    }
  }


  //Play Audio Function
  const handleAudioPlay = ()=>{
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true)
    }else{
      currentAudio.current.pause();
      setIsAudioPlaying(false)
    }
  }

  const musicAPI = [
    {
      songName: 'POWDER',
      songArtist: 'MELANIE MARTINEZ',
      songSrc: './Assets/songs/Powder.mp3',
      songAvatar: './Assets/Images/po.jpg'
    },
    {
      songName: 'PLEASER',
      songArtist: 'WILLOWS',
      songSrc: './Assets/songs/Pleaser.mp3',
      songAvatar: './Assets/Images/pw.jpg'
    },
    {
      songName: 'AIRPLANE MODE',
      songArtist: 'LIMBO',
      songSrc: './Assets/songs/Airplane Mode.mp3',
      songAvatar: './Assets/Images/limbo.jpg'
    },
    {
      songName: 'JAPANESE DENIM',
      songArtist: 'DANIEL CAESAR',
      songSrc: './Assets/songs/Japanese Denim.mp3',
      songAvatar: './Assets/Images/jd.jpg'
    },
    {
      songName: 'CALIFORNIA GURLS',
      songArtist: 'KATY PERRY FT. SNOOP DOGG',
      songSrc: './Assets/songs/California_Gurls.mp3',
      songAvatar: './Assets/Images/kp1.jpg'
    },
    {
      songName: 'MARIPOSA',
      songArtist: 'PEACH TREE RASCALS',
      songSrc: './Assets/songs/MARIPOSA.mp3',
      songAvatar: './Assets/Images/mar.jpg'
    },
    {
      songName: 'SWEETENER',
      songArtist: 'ARIANA GRANDE',
      songSrc: './Assets/songs/sweetener.mp3',
      songAvatar: './Assets/Images/sweet.jpg'
    },
    {
      songName: 'SHOW ME HOW',
      songArtist: 'MEN I TRUST',
      songSrc: './Assets/songs/Show Me How.mp3',
      songAvatar: './Assets/Images/men.png'
    },
    {
      songName: 'TEENAGE DREAM',
      songArtist: 'KATY PERRY',
      songSrc: './Assets/songs/Teenage Dream.mp3',
      songAvatar: './Assets/Images/kp2.jpg'
    },
    
  ]

  const handleNextSong = ()=>{
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }else{
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const handlePrevSong = ()=>{
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }else{
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const updateCurrentMusicDetails = (number)=>{
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar
    })
    setIsAudioPlaying(true);
  }

  const handleAudioUpdate = ()=>{
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes <10 ? `0${minutes}` : minutes} : ${seconds <10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }


  const vidArray = ['./Assets/Videos/video1.mp4','./Assets/Videos/video2.mp4','./Assets/Videos/video3.mp4','./Assets/Videos/video4.mp4','./Assets/Videos/video5.mp4','./Assets/Videos/video6.mp4'];

  const handleChangeBackground = ()=>{
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    }else{
      setVideoIndex(videoIndex + 1)
    }
  }


  return (
    <>
    <div className="container">
      <audio src='./Assets/songs/Powder_.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className='musicPlayer'>Nadiyah</p>
        <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
        <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id='songAvatar'/>
        <div className="musicTimerDiv">
          <p className='musicCurrentTime'>{musicCurrentTime}</p>
          <p className='musicTotalLenght'>{musicTotalLength}</p>
        </div>
        <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar} />
        <div className="musicControlers">
          <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
          <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
          <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
        </div>
      </div>
      <div className="changeBackBtn" onClick={handleChangeBackground}>
        Change Background
      </div>
      <a href="https://youtu.be/1j8kEbxhc8U" title='Subscribe' className='youtube-Subs'>
        <img src="./Assets/Images/logo.png" alt="Logo"/>
        <p>Nadiyah</p>
      </a>
    </div>
    </>
  );
}

export default App;
