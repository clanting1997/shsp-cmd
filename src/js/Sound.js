class Sound {
    constructor($Sound) {
        this.$Sound = $Sound;
        this.$SoundWrapper = $Sound.find('.sound');
        this.listener();
    }

listener() {
    if ( $("#geefgender").length) {
    var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', '././src/assets/sounds/BM.mp3');
            audioElement.play();
            $("#status").text("Status: Playing");
            console.log('speel audio')
        };
    }
}   

export default(() => {
    $('.sound').each(function() {
        new Sound($(this));
    })
})