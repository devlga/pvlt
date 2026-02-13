import { create } from "zustand";
const {BASE_URL} = import.meta.env; 

const SONGS = [
  {
    title: "Tadhana",
    artist: "Up Dharma Down",
    volume: 0.05,
    audioSrc: BASE_URL +  "/1.mp3",
    imageSrc: "/1.jpg",
  },
  {
    title: "Stay (With Me)",
    artist: "Nina",
    volume: 0.2,
    audioSrc: BASE_URL +  "/2.mp3",
    imageSrc: "/2.webp"
  },
  {
    title: "Ikaw Lamang",
    artist: "Silent Sanctuary",
    volume: 0.2,
    audioSrc: BASE_URL +  "/3.mp3",
    imageSrc: "/3.jpg"
  },
  {
    title: "Sparks",
    artist: "Coldplay",
    volume: 0.2,
    audioSrc: BASE_URL +  "/4.mp3",
    imageSrc: "/4.jpg"
  }
];
const audio = new Audio();

function preload(){
  SONGS.forEach(song => {
    new Image().src = song.imageSrc
    new Audio().src = song.audioSrc;
  })
}

preload();

interface MusicState {
  volume: number;
  duration: number;
  currentTime: number;
  currentSong: (typeof SONGS)[0];
  songIndex: number;
  songs: typeof SONGS;
  startTime: number;
  endTime: number;
  isShowingMusicPlayer: boolean;
  isPlaying: boolean;
  init: () => void;
  cleanup: () => void;
  play: () => void;
  pause: () => void;
  rewind: () => void;
  showMusicPlayer: () => void;
  playLastSong: () => void;
  playNextSong: () => void;
}

const initialState = {
  volume: 0.05,
  duration: Infinity,
  currentTime: 0,
  songIndex: 0,
  currentSong: SONGS[0],
  songs: SONGS,
  startTime: 0,
  endTime: 0,
  isShowingMusicPlayer: false,
  isPlaying: false,
};

const useMusicStore = create<MusicState>((set, get) => ({
  ...initialState,
  init: () => {
    const setMeta = () => {
      set((state) => ({
        ...state,
        duration: audio.duration,
        currentTime: audio.currentTime,
      }));
    };

    audio.addEventListener("timeupdate", setMeta);
    audio.addEventListener("ended", get().playNextSong)

    set((state) => ({
      ...state,
      cleanup: () => {
        audio.removeEventListener("timeupdate", setMeta);
            audio.removeEventListener("ended", get().playNextSong)

      },
    }));
  },
  cleanup: () => {},
  play: () => {
    const songIndex = get().songIndex;
    const currentTime = get().currentTime;
    if (!currentTime) {
      audio.src = get().songs[songIndex].audioSrc;
    }
    audio.play();
    audio.volume = get().songs[songIndex].volume;
    set((state) => ({ ...state, isPlaying: true }));
  },
  showMusicPlayer: () => {
    set((state) => ({ ...state, isShowingMusicPlayer: true }));
  },
  pause: () => {
    audio.pause();
    set((state) => ({ ...state, isPlaying: false }));
  },
  rewind: () => {
    audio.currentTime = 0;
  },
  playLastSong: () => {
    const songs = get().songs;
    const songIndex = get().songIndex;
    if (songIndex <= 0) {
      const newIndex = songs.length - 1;

      set((state) => ({
        ...state,
        songIndex: newIndex,
        currentSong: SONGS[newIndex],
                currentTime: 0

      }));
      audio.src = get().songs[newIndex].audioSrc;

    } else {
      const newIndex = songIndex - 1;

      set((state) => ({
        ...state,
        songIndex: newIndex,
        currentSong: SONGS[newIndex],
                currentTime: 0

      }));

      audio.src = get().songs[newIndex].audioSrc;
    }

    get().play();
  },
  playNextSong: () => {
    const songs = get().songs;
    const songIndex = get().songIndex;

    if (songIndex >= songs.length - 1) {
      const newIndex = 0;
      console.log(newIndex);

      set((state) => ({
        ...state,
        songIndex: newIndex,
        currentSong: SONGS[newIndex],
        currentTime: 0
      }));
      audio.src = get().songs[newIndex].audioSrc;
    } else {
      const newIndex = songIndex + 1;
      set((state) => ({
        ...state,
        songIndex: newIndex,
        currentSong: SONGS[newIndex],
        currentTime: 0
      }));
      audio.src = get().songs[newIndex].audioSrc;
    }

    get().play();
  },
}));

export default useMusicStore;
