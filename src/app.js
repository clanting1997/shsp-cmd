import $ from 'jquery';
import 'bootstrap';
import './scss/main.scss';
import * as THREE from 'three';

const OBJLoader = require('three-obj-loader')(THREE),
    OrbitControls = require('three-orbit-controls')(THREE);

// components
import test from "./js/test";
import TestThreeJS from "./js/TestThreeJS";

// globals
window.$ = window.jQuery = $;

$(function() {
    test();
    TestThreeJS();
});
