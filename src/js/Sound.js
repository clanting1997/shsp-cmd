// Sounds
import BM from '../sounds/BM.mp3';

class Sound {
    constructor($Sound) {
        this.$Sound = $Sound;
        this.$SoundWrapper = $Sound.find('.sound');
        this.listener();
    }

listener() {
    if ( $("#geefgender").length) {
    var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', BM);
            audioElement.play();
            $("#status").text("Status: Playing");
        };
    }
}   

export default(() => {
    $('.sound').each(function() {
        new Sound($(this));
    })
})