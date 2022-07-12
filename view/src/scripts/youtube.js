// Get search and input events and value
// Append information on the iframe link 
const yt_search = document.querySelector('#yt_search');
const output_iframe = document.querySelector('.yt #output_iframe');

yt_search.addEventListener('click', () => {
  const yt_input = document.querySelector('#yt_input').value;
  output_iframe.src = 'http://localhost:3000/query.html';
})