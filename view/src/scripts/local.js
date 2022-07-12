const directory = document.baseURI.split('file:///');
const songDirectory = directory[1].split('index.html')[0] + 'music';
const backgroundDirectory = directory[1].split('index.html')[0] + 'images';

console.log(songDirectory);
console.log(backgroundDirectory);