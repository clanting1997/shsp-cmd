import $ from 'jquery';
import 'bootstrap';
import './scss/main.scss';

// components
import test from "./js/test";
import Canvas from "./js/Canvas";

// globals
window.$ = window.jQuery = $;

$(function() {
    test();
    Canvas();
});
