// Display
const menu = document.querySelector('#menu');
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

// Buttons
const localBtn = document.querySelector('#local_list');
const ytBtn = document.querySelector('#yt_list');
const pausePlayBtn = document.querySelector('#pause-play-btn');
const yt_search = document.querySelector('#yt_search');
const shuffleBtn = document.querySelector('#shuffle-btn');
const previousBtn = document.querySelector('#previous-btn');
const nextBtn = document.querySelector('#next-btn');
const repeatBtn = document.querySelector('#repeat-btn');

// Toggles
let closeMenu = true;
let repeat = false;
let randomShuffle = false;