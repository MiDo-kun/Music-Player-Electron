# Music Player - Electron

## Todo List
>  - [x] Fix menu button.
>  - [x] Slider functionality.
>  - [x] Volume functionality.
>  - [x] Set background icon into fixed size.
>  - [x] Use downloaded fonts instead of built-in fonts
>  - [x] Change port of the server to avoid collisions in future projects.
>  - [ ] Bugs when playing a specific track. 
>  - [ ] Add info or loading screen in asynchronous functions.
>  - [ ] Show GIF's if the list of track is empty.
>  - [ ] Add transition delay when changing the volume in the controller.
>  - [ ] Create readMe.md file that contains the description of the project and make sure that it is legal and readable.
>  - [ ] Learn more about how response works in express.
>  - [ ] Create modal to display info or errors
>  - [ ] Re-read the screenshot on how to organize css selectors.
>  - [ ] Check the DATA-API repo to know more about licensing

## Functionalities

* ### **Display**
  - Thumbnail of a song as background image.
  - Thumbnail of a song as icon.
  - Playlist in local.
  - Search list in youtube.
  - Current track when hovering in the display.
  - Thumbnail image when hovering out in the display.
  - Title of the song.
  - Basic controls.
  - Close and Open controls.
  - Search input in youtube list.

* ### **Controls**
  - Pause and play.
  - Next.
  - Previous.
  - Shuffle.
  - Repeat.
  - Show list.

* ### **Local**
  - Show title of the track.
  - Show duration of the track.
  - Save info in local storage.
    - Song ID.
    - Song name.
    - Song thumbnail.
  - Remove track in the local storage.
  - Play specific track in the list.

* ### **Youtube**
  - Show search query result.
    - Title of the video.
    - Duration.
    - Video ID (used to save and play the track).
  - Play track as a stream.
  - Save track as .mp3 file.