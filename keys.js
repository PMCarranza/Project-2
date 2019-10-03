// 'use strict';

console.log('keys.js loaded');

exports.npsKey = {
    // The process.env property returns an object containing the user environment
    id: process.env.NPS_SECRET
};