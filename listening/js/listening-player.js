const audio = document.querySelector("audio");

if (audio) {
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
  });
}
