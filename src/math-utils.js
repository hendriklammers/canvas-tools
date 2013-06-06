/**
 * Various math related helper methods
 */
var MATH_UTILS = (function() {
    'use strict';
    
    var utils = {
        //TODO: Add shortestRotation method
        
        /**
         * Test if a number is positive or negative.
         * Returns 1 for positive and -1 for negative numbers
         */
        sign: function (value) {
            return value < 0 ? -1 : 1;
        },
        
        /**
         * Test whether a number falls within the range.
         * If it's bigger return max, if it's smaller return min
         */
        constrain: function(value, min, max) {
            return Math.min(Math.max(min, value), max);
        },
        
        /**
         * Calculate the angle of 2 points in 2D space
         */
        getAngle: function(x1, y1, x2, y2) {
            var dx = x2 - x1,
                dy = y2 - y1,
                angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
            return angle;
        },
        
        /**
         * Calculate the distance between 2 points in 2D space
         */
        getDistance: function(x1, y1, x2, y2) {
            var dx = x1 - x2,
                dy = y1 - y2,
                dist = Math.sqrt((dx * dx) + (dy * dy));
                
            return dist;
        },
        
        /**
         * Get a random integer between min and max
         */
        randomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        /**
         * Get a random number between min and max
         */
        randomBetween: function(min, max) {
            return (Math.random() * (max - min)) + min;
        },

        /**
         * Turns radians into degrees
         */
        toDegrees: function(radians) {
            return radians * 180 / Math.PI;
        },
        
        /**
         * Turns degrees into radians
         */
        toRadians: function(degrees) {
            return degrees * Math.PI / 180;
        },
        
        /**
         * Test if a number is odd
         */
        isOdd: function(value) {
            return (value % 2) === 1;
        },
        
        /**
         * Test if a number is even
         */
        isEven: function(value) {
            return (value % 2) === 0;
        }
    };
    
    return utils;
    
}());
