// Display
const closeBtn = document.querySelector('#close');
const img = document.querySelector('.background');
const bgImg = document.querySelector('.background-music');
const list = document.querySelector('.list');
const controls = document.querySelector('.controls');
const bgIcon = document.querySelector('.bg-icon');
const bgTitle = document.querySelector('#music_title');
const localList = document.querySelector('.local');
const ytList = document.querySelector('.yt');
const resultDocument = document.querySelector('.youtube_results');
const audio = document.querySelector('#player');
const ytIcon = document.querySelector('.bg-icon img');
const volumeValue = document.querySelector('#vol_val');
const slider = document.querySelector('#slider');
const emptyGIF = document.querySelector('.empty-list');
const errorModal = document.querySelector('.error-modal');
const closeErrorModal = document.querySelector('#err-close-modal');
const localEmptyList = document.querySelector('.empty-local-list');

// Buttons
const localBtn = document.querySelector('#local_list');
const ytBtn = document.querySelector('#yt_list');
const pausePlayBtn = document.querySelector('#pause-play-btn');
const yt_search = document.querySelector('#yt_search');
const shuffleBtn = document.querySelector('#shuffle-btn');
const volumeBtn = document.querySelector('#volume-btn');
const previousBtn = document.querySelector('#previous-btn');
const nextBtn = document.querySelector('#next-btn');
const repeatBtn = document.querySelector('#repeat-btn');
const openBtn = document.querySelector('#menu-btn');

// Toggles
let closeMenu = false;
let repeat = false;
let randomShuffle = false;
let showVolume = false;

const BACKEND_SERVER = "http://localhost:8887";