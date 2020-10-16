import $ from 'jquery';
import 'bootstrap';
import './scss/main.scss';

// components
import StartScreen from "./js/StartScreen";
import Canvas from "./js/Canvas";
import Guru from "./js/guru";
import Sound from './js/Sound';
import guruOverview from "./js/guruOverview";

// globals
window.$ = window.jQuery = $;

$(function() {
    StartScreen();
    Canvas();
    Guru();
    Sound();
    guruOverview();
});
