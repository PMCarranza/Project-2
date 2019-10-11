// 'use strict';

console.log('keys.js loaded');

require("dotenv").config();

exports.parksKey = {
    // The process.env property returns an object containing the user environment
    id: process.env.PARKS_SECRET
};