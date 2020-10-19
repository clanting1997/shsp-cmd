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
    var value;
    global.SoundData = [];
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

    $.playSound = function() {
        // vind de data
        var answer = $(".Guru"),
        environment = parseInt(answer.attr('data-environment')), 
        health = parseInt(answer.attr("data-health")), 
        finance = parseInt(answer.attr("data-finance")), 
        society = parseInt(answer.attr("data-society")),
        social = parseInt(answer.attr("data-social"));
        value = [finance,society,health,environment,social]; 

        value.forEach(PakMuziek);
        function PakMuziek(item, index){
            if (item !== 0) {
                var selectIndex = index;
                var AudioElement = document.createElement('audio');
                AudioElement.setAttribute('src', Sounds[selectIndex]);
                AudioElement.play();
                SoundData.push(Sounds[selectIndex]);
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