// expose.js
const jsConfetti = new JSConfetti();
var horn_select = document.getElementById("horn-select");
var volume_controls = document.querySelector("#volume-controls > input");
var hornImage = document.querySelector("#expose > img");
var volumeImage = document.querySelector("#volume-controls > img");
var changeAudio = document.querySelector("#expose > audio");
var honk_button = document.querySelector("#expose > button");
window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO

  honk_button.addEventListener('click', playAudio);
  function playAudio(audio){
    audio.preventDefault();
    if (volume_controls.volume != 0 && horn_select.value == "party-horn"){
      jsConfetti.addConfetti();
    }
    honk_button.setAttribute("disabled", "");  
    changeAudio.play();
    changeAudio.addEventListener('ended', function(event) {
      honk_button.removeAttribute("disabled", "");  
    });
  }

  volume_controls.addEventListener('input',changeVolume);
  function changeVolume(){
    changeAudio.volume = volume_controls.value / 100;
    if(volume_controls.value == 0){
      volumeImage.src = "./assets/icons/volume-level-0.svg";
      honk_button.setAttribute("disabled", "");
    }
    else{
      if(volume_controls.value > 0 && volume_controls.value <= 33){
        volumeImage.src = "./assets/icons/volume-level-1.svg";
      }
      else if(volume_controls.value > 33 && volume_controls.value < 67){
        volumeImage.src = "./assets/icons/volume-level-2.svg";
      }
      else if(volume_controls.value >= 67){
        volumeImage.src = "./assets/icons/volume-level-3.svg";
      }
      honk_button.removeAttribute("disabled", "");
    }
  }

  horn_select.addEventListener('change', changeHorn);
  function changeHorn(){
    if(horn_select.value == "air-horn"){
      changeAudio.src = "./assets/audio/air-horn.mp3";
      hornImage.src = "./assets/images/air-horn.svg";
    }
    else if(horn_select.value == "car-horn"){
      changeAudio.src = "./assets/audio/car-horn.mp3";
      hornImage.src = "./assets/images/car-horn.svg";
    }
    else{
      changeAudio.src = "./assets/audio/party-horn.mp3";
      hornImage.src = "./assets/images/party-horn.svg";
    }
  }
}
