const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $(".apps__header");
const heading = $(".apps__header-desc");
const cd = $(".cd");
const cdImage = $(".cd__image-item");
const cdBackground = $("#image-background");
const cdThumbnailImage = $(".cd__image-item");

const playList = $(".playlist");
const playListAudio = $(".playlist-audio");
const audio = $("#audio");
const appControl = $(".apps__control");

const playBtn = $(".btn-play");
const player = $(".player");
const progress = $("#progress");

const PLAYER_STORAGE_KEY = "MUSIC_PLAYER";

const volume = $("#volume");
const volumeInput = $("#volume-input");
const songTimeline = $("#music__current-progress");
const songDur = $("#music__current-duration");
const shuffleBtn = $(".btn-shuffle");
const repeatBtn = $(".btn-repeat");
const autoPlayBtn = $(".btn-autoplay");
const nextBtn = $(".btn-forward");
const prevBtn = $(".btn-back");

const modalControl = $(".playlist__control");

const songs = [
  {
    name: "Nevada",
    singer: "Vicestones",
    path: "assests/music/vaoha.mp3",
    image: "",
  },
  {
    name: "Summer Time",
    singer: "Vicestones",
    path: "assests/music/milktea.mp3",
    image: "",
  },
  {
    name: "Monody",
    singer: "Vicestones",
    path: "assests/music/myworld.mp3",
    image: "",
  },
  {
    name: "Reality",
    singer: "Vicestones",
    path: "assests/music/6809065341606619327.mp3",
    image: "",
  },
];

// add songs to playlist
// current  timeline update
//waveform animation cdImage

const apps = {
  currentIndex: 1,
  isPlaying: false,
  isRepeating: false,
  autoPlay: false,
  isRandom: false,
  playlist: new Set(),
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Nevada",
      singer: "Vicestones",
      path: "assests/music/vaoha.mp3",
      image: "./assests/images/suni1.jpeg",
    },
    {
      name: "Summer Time",
      singer: "Vicestones",
      path: "./assests/music/vaoha.mp3",
      image: "./assests/images/suni2.jpeg",
    },
    {
      name: "Monody",
      singer: "Vicestones",
      path: "assests/music/milktea.mp3",
      image: "./assests/images/suni3.jpeg",
    },
    {
      name: "Reality",
      singer: "Vicestones",
      path: "./assests/music/vaoha.mp3",
      image: "./assests/images/suni4.jpeg",
    },
    {
      name: "Không sao mà",
      singer: "Vicestones",
      path: "assests/music/vaoha.mp3",
      image: "./assests/images/suni1.jpeg",
    },
    {
      name: "Em đây rồi",
      singer: "Vicestones",
      path: "./assests/music/vaoha.mp3",
      image: "./assests/images/suni2.jpeg",
    },
    {
      name: "Minodo",
      singer: "Vicestones",
      path: "assests/music/milktea.mp3",
      image: "./assests/images/suni3.jpeg",
    },
    {
      name: "Realities",
      singer: "Vicestones",
      path: "./assests/music/vaoha.mp3",
      image: "./assests/images/suni4.jpeg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
      // $(".apps__header-desc").innerHTML = song.name;

      return `
      <li class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
        <img
          src="${song.image}"
          alt=""
          class="songs__image"
        />
        <div class="songs__desc">
          <h2 class="songs__name">${song.name}</h2>
          <p class="songs__singer">Singer: ${song.singer}</p>
          <a class="songs__singer--link" href="${song.path}"></a>
        </div>
        <div class="songs__moreinfo">
          <i class="songs__moreinfo-icon fa-solid fa-plus"></i>
        </div>
      </li>`;
    });

    playList.innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdImage = $(".cd__image-item");
    const cdHeight = cd.offsetHeight;
    // xử cd quay
    const cdAnimate = cdImage.animate(
      {
        transform: "rotate(360deg)",
      },
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    cdAnimate.pause();
    //active songs

    document.onscroll = function () {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const newcdHeight = cdHeight - scrollY;
      const heightOnScroll = newcdHeight > 0 ? newcdHeight + "px" : 0;
      cd.style.height = heightOnScroll;

      cdImage.style.height = heightOnScroll;
      header.style.height =
        newcdHeight > 0 ? Math.round(2.13333 * newcdHeight) + "px" : 0;
      cdImage.style.width = heightOnScroll;
      cdImage.style.opacity = newcdHeight / cdHeight;
      cdBackground.style.height = heightOnScroll;
      cdBackground.style.width = heightOnScroll;
      //appControl move up  12px to hide playlist
      appControl.style.margin = heightOnScroll <= 0 ? -12 + "px" : 0;
    };

    playBtn.onclick = function () {
      if (_this.isPlaying) {
        $("#image-background").removeAttribute("class");

        audio.pause();
        cdAnimate.pause();
        // _this.isPlaying = false;

        // player.classList.remove("is_playing");
      } else {
        $("#image-background").setAttribute(
          "class",
          "cd__image-item-background"
        );
        audio.play();
        cdAnimate.play();

        // _this.isPlaying = true;
        // player.classList.add("is_playing");
      }
    };

    audio.onended = function () {
      if (_this.isRepeating) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    repeatBtn.onclick = function () {
      _this.isRepeating = !_this.isRepeating;
      _this.setConfig("isRepeating", _this.isRepeating);
      repeatBtn.classList.toggle("repeat", _this.isRepeating);
    };
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.shuffleSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollIntoView();
    };
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.shuffleSong();
      } else {
        _this.prevSong();
      }

      audio.play();
      _this.render();
      _this.scrollIntoView();
    };
    shuffleBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      shuffleBtn.classList.toggle("shuffled", _this.isRandom);
      // _this.shuffleSong();
      // audio.play();
    };
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };

    audio.ontimeupdate = function (e) {
      if (audio.duration > 0 && audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }

      const currentTime = e.target.currentTime;
      const duration = e.target.duration;
      const minute = Math.floor(currentTime / 60);
      const second = Math.floor(currentTime % 60);

      const currentTimeline = `${minute}:${
        second < 10 ? "0" + second : second
      }`;

      songTimeline.innerText = currentTimeline;

      // songTimeline.innerText = audio.currentTime;
    };
    audio.onloadeddata = function () {
      const songDurMin = Math.round(audio.duration / 60);
      const songDurSec = Math.round(audio.duration % 60);

      const songTotalDur = `${songDurMin}:${
        songDurSec < 10 ? "0" + songDurSec : songDurSec
      }`;
      songDur.innerText = songTotalDur;
    };

    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      // console.log(e);
      audio.currentTime = seekTime;
    };

    volume.onchange = function (e) {
      const volControl = e.target.value / 100;
      audio.volume = volControl;
      volumeInput.value = volControl * 100;
    };
    playList.onclick = function (e) {
      const songs = $$(".song");
      songs.forEach((song) => {
        song.classList.remove("active");
      });
      // console.log(songs);
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".songs__moreinfo")) {
        if (songNode && !e.target.closest(".songs__moreinfo")) {
          songNode.classList.add("active");
          _this.currentIndex = songNode.dataset.index;

          _this.loadCurrentSong();

          audio.play();
        }

        if (e.target.closest(".songs__moreinfo")) {
          _this.currentIndex = songNode.dataset.index;
          songNode.classList.add("active");
          _this.playlist.add(_this.songs[_this.currentIndex]);
          _this.renderPlaylist();
        }
      }
    };

    modalControl.onclick = function () {
      $(".playlist__modal").classList.toggle("playlist__modal-active");
    };
    $(".modal__fav_song-list").onclick = function (e) {
      const modalSong = e.target.closest(".modal__fav_song");
      const modalHeaderImg = $(".modal__cd-image");
      $(".modal__fav_song.active").classList.remove("active");
      if (modalSong) {
        modalSong.classList.add("active");
        _this.loadCurrentSong();
        modalHeaderImg.src = [..._this.playlist][modalSong.dataset.index].image;
        _this.currentSong.name = [..._this.playlist][
          modalSong.dataset.index
        ].name;
        _this.currentIndex = modalSong.dataset.index;
        console.log([..._this.playlist], modalSong.dataset.index);

        audio.src = [..._this.playlist][modalSong.dataset.index].path;
        console.log(audio.src);
        // playListAudio.src = [..._this.playlist].path;
        audio.play();
      }
    };
  },
  renderPlaylist: function () {
    const playListArray = [...this.playlist];
    // console.log(playListArray);

    //get songs from playlist
    const listSong = playListArray.map((song, index) => {
      // $(".apps__header-desc").innerHTML = song.name;

      return `
      <li class="modal__fav_song${
        song.name === this.currentSong.name ? " active" : ""
      }" data-index="${index}">
              
              <div class="modal__playlist-song-name">${song.name}</div>
              <div class="modal__playlist-song-singer">${song.singer}</div>
              <audio class="playlist-audio" id="fav-song-${index}" src="${
        song.path
      }"></audio>
              <span class="audio-duration">3:00</span>
            </li>`;
    });

    $(".modal__fav_song-list").innerHTML = listSong.join("");
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumbnailImage.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeating = this.config.isRepeating;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) this.currentIndex = 0;
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
    this.loadCurrentSong();
  },

  shuffleSong: function () {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * this.songs.length);
    } while (randomIndex === this.currentIndex);
    this.currentIndex = randomIndex;
    this.loadCurrentSong();
  },
  scrollIntoView: function () {
    $(".song.active").scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  },
  start: function () {
    this.render();
    this.renderPlaylist();
    //load config from local storage
    this.loadConfig();
    //add currentsong property
    this.defineProperties();
    //event handlers button
    this.handleEvents();
    this.loadCurrentSong();

    repeatBtn.classList.toggle("repeat", this.isRepeating);
    shuffleBtn.classList.toggle("shuffled", this.isRandom);
  },
};
apps.start();
apps.handleEvents();
