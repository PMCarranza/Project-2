// 'use strict';

console.log('keys.js loaded');

require("dotenv").config();

exports.catsKey = {
    // The process.env property returns an object containing the user environment
    id: process.env.CATS_SECRET
};