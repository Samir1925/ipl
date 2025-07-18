function speak() {
  const text = document.getElementById("script").value;
  const lang = document.getElementById("language").value;
  responsiveVoice.speak(text, lang);
}

function download() {
  alert("To download audio, use a screen recorder or upgrade to the Pro version using ElevenLabs or Google TTS backend.");
}
