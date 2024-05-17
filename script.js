document.addEventListener('DOMContentLoaded', () => {
        // Controls (as seen below) works in such a way that as soon as you explicitly define (add) one control
        // to the settings, ALL default controls are removed and you have to add them back in by defining those below.

        // For example, let's say you just simply wanted to add 'restart' to the control bar in addition to the default.
        // Once you specify *just* the 'restart' property below, ALL of the controls (progress bar, play, speed, etc) will be removed,
        // meaning that you MUST specify 'play', 'progress', 'speed' and the other default controls to see them again.

        const controls = [
            'play-large', // The large play button in the center
            'play', // Play/pause playback
            'progress', // The progress bar and scrubber for playback and buffering
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'mute', // Toggle mute
            'volume', // Volume control
            'pip', // Picture-in-picture (currently Safari only)
            'airplay', // Airplay (currently Safari only)
            'fullscreen' // Toggle fullscreen
        ];

        const player = Plyr.setup('.js-player', { controls });

    });