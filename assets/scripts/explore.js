// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
    var pressToTalk = document.querySelector("button");
	var textToSpeak = document.getElementById("text-to-speak");
	var smileyFace = document.querySelector("#explore > img");
	var voiceSelect = document.getElementById("voice-select");

	var synthesis = window.speechSynthesis;

	var voices = [];

	function populateVoiceList() {
		voices = synthesis.getVoices();
		for (var i = 0; i < voices.length; i++) {
			var option = document.createElement("option");
			option.textContent = voices[i].name + " (" + voices[i].lang + ")";

			if (voices[i].default) {
				option.textContent += " -- DEFAULT";
			}

			option.setAttribute("data-lang", voices[i].lang);
			option.setAttribute("data-name", voices[i].name);
			voiceSelect.appendChild(option);
		}
	}

	populateVoiceList();

	if (synthesis.onvoiceschanged !== undefined) {
		synthesis.onvoiceschanged = populateVoiceList;
	}

	pressToTalk.addEventListener("click", function (event) {
		smileyFace.src = `assets/images/smiling-open.png`;
		var message = new SpeechSynthesisUtterance(textToSpeak.value);
		var selectedOption = voiceSelect.selectedOptions[0].getAttribute(
			"data-name"
		);



		for (var i = 0; i < voices.length; i++) {
			if (voices[i].name === selectedOption) {
				message.voice = voices[i];
			}
		}
		message.volume = 1;
		message.rate = 1;
		message.pitch = 1;

		synthesis.speak(message);
		console.log(synthesis.speaking);

		message.addEventListener('end', function(event) {
			smileyFace.src = `assets/images/smiling.png`;
		});

		textToSpeak.blur();
	});
}