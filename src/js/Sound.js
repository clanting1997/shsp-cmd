// Sounds
import Achtergrond from '../sounds/background2.mp3';

import AM from '../sounds/AM.mp3';
import AV from '../sounds/AV.mp3';
import BM from '../sounds/BM.mp3';
import BV from '../sounds/BV.mp3';
import CM from '../sounds/CM.mp3';
import CV from '../sounds/CV.mp3';
import EM from '../sounds/EM.mp3';
import EV from '../sounds/EV.mp3';
import GM from '../sounds/GM.mp3';
import GV from '../sounds/GV.mp3';

class Sound {
    constructor($Sound) {
        this.$Sound = $Sound;
        this.$SoundWrapper = $Sound.find('.sound');
        this.listener();
    }

listener() {
    var Sounds = [];
    //begin achtergrond muziek
    $('.start-screen-wrapper').click(function () {
    var audioAchtergrond = document.createElement('audio');
    audioAchtergrond.setAttribute('src', Achtergrond)
    audioAchtergrond.play();
    });

    // check of de persoon man/vrouw is
    if ($(".sound").hasClass('Male')){
        Sounds = [AM,BM,CM,EM,GM];
        console.log('mannelijke sounds');
    } else if ($(".sound").hasClass('Female')) {
        Sounds = [AV,BV,CV,EV,GV];
        console.log('vrouwelijke sounds');
    }

    var value;

    $.playSound = function() {
        // vind de data
        const answer = $(".Guru"),
            finance = answer.data("finance"), //A
            society = answer.data("society"), //C
            health = answer.data("health"), //E
            environment = answer.data("environment"), //G
            social = answer.data("social"); //B
        value = [finance,society,health,environment,social]; 

        value.forEach(PakMuziek);

        function PakMuziek(item, index){
            if (item = 1) {
                var selectIndex = index;
                var AudioElement = document.createElement('audio');
                AudioElement.setAttribute('src', Sounds[selectIndex]);
                AudioElement.play();
            }
            }
        }
    }
}   

export default(() => {
    $('.sound').each(function() {
        new Sound($(this));
    })
})