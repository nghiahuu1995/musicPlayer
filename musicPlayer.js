const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $(".cd");
const heading = $(".apps__header-desc");
const cdThumbnailImage = $(".cd__image-item");
const audio = $("#audio");
const playBtn = $(".btn-play");
const songs = [
  {
    name: "Nevada",
    singer: "Vicestones",
    path: "/songs/",
    image: "",
  },
  {
    name: "Summer Time",
    singer: "Vicestones",
    path: "/songs/",
    image: "",
  },
  {
    name: "Monody",
    singer: "Vicestones",
    path: "/songs/",
    image: "",
  },
  {
    name: "Reality",
    singer: "Vicestones",
    path: "/songs/",
    image: "",
  },
];
const apps = {
  currentIndex: 0,
  songs: [
    {
      name: "Nevada",
      singer: "Vicestones",
      path: "./assests/songs/trasua.mp3",
      image: "./assests/images/suni1.jpeg",
    },
    {
      name: "Summer Time",
      singer: "Vicestones",
      path: "./assests/songs/vaoha.mp3",
      image: "./assests/images/suni2.jpeg",
    },
    {
      name: "Monody",
      singer: "Vicestones",
      path: "./assests/songs/trasua.mp3",
      image: "./assests/images/suni3.jpeg",
    },
    {
      name: "Reality",
      singer: "Vicestones",
      path: "./assests/songs/vaoha.mp3",
      image: "./assests/images/suni4.jpeg",
    },
    {
      name: "Monody",
      singer: "Vicestones",
      path: "./assests/songs/trasua.mp3",
      image: "./assests/images/suni3.jpeg",
    },
    {
      name: "Reality",
      singer: "Vicestones",
      path: "./assests/songs/trasua.mp3",
      image: "./assests/images/suni4.jpeg",
    },
    {
      name: "Monody",
      singer: "Vicestones",
      path: "./assests/songs/trasua.mp3",
      image: "./assests/images/suni3.jpeg",
    },
    {
      name: "Reality",
      singer: "Vicestones",
      path: "./assests/songs/trasua.mp3",
      image: "./assests/images/suni4.jpeg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song) => {
      $(".apps__header-desc").innerHTML = song.name;
      return `
      <li class="apps__songs-list--item">
        <img
          src="${song.image}"
          alt=""
          class="songs__image"
        />
        <div class="songs__desc">
          <h2 class="songs__name">${song.name}</h2>
          <p class="songs__singer">Ca sĩ: ${song.singer}</p>
          <a class="songs__singer--link" href="${song.path}"></a>
        </div>
        <div class="songs__moreinfo">
          <i class="songs__moreinfo-icon fa-solid fa-circle-info"></i>
        </div>
      </li>`;
    });

    $(".apps__songs-list").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const cdImage = $(".cd__image-item");
    const cdHeight = cd.offsetHeight;
    // Phóng to thu nhỏ CD
    document.onscroll = function () {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const newcdHeight = cdHeight - scrollY;

      cd.style.height = newcdHeight > 0 ? newcdHeight + "px" : 0;
      //   cd.style.transform = `scale(${newcdHeight > 0 ? newcdHeight + "px" : 0})`;
      cdImage.style.height = newcdHeight > 0 ? newcdHeight + "px" : 0;
      cdImage.style.width = newcdHeight > 0 ? newcdHeight + "px" : 0;
      cdImage.style.opacity = newcdHeight / cdHeight;
    };

    //Xử lí khi nhấn play
    playBtn.onclick = function () {
      audio.play();
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumbnailImage.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.style.source = this.currentSong.path;
  },
  start: function () {
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  },
};
apps.start();
apps.handleEvents();
