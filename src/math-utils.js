/**
 * Various math related helper methods
 */
window.MATH_UTILS = (function() {
    'use strict';
    
    var utils = {
        /**
         * Rounds a number with provided amount of digits behind comma
         *
         * @param {number} value Number to round
         * @param {number} precision Number of digits wanted behind the comma
         * @returns {number} Rounded number
         */
        round: function(value, precision) {
            var factor = Math.pow(10, precision);
            
            return Math.round(value * factor) / factor;
        },
        
        /**
         * Tests if a number is positive or negative.
         *
         * @param {number} value Number to test
         * @returns {number} 1 for positive and -1 for negative numbers
         */
        sign: function (value) {
            return value < 0 ? -1 : 1;
        },
        
        /**
         * Tests whether a number falls within the provided range.
         *
         * @param {number} value Number to test
         * @param {number} min Low boundary of the range
         * @param {number} max Top boundary of the range
         * @returns {number} If smaller: min, if bigger: max, else value
         */
        constrain: function(value, min, max) {
            return Math.min(Math.max(min, value), max);
        },
        
        /**
         * Calculates the angle of 2 points in 2D space
         *
         * @param {number} x1 X value of first point
         * @param {number} y1 Y value of first point
         * @param {number} x2 X value of second point
         * @param {number} y2 Y value of second point
         * @returns {number} angle between the two points
         */
        getAngle: function(x1, y1, x2, y2) {
            var dx = x2 - x1,
                dy = y2 - y1,
                angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
            return angle;
        },
        
        /**
         * Calculates the shortest angle towards a target angle
         *
         * @param {number} startAngle The angle to rotate from
         * @param {number} targetAngle The angle to rotate to
         * @returns {number} positive or negative rotation in degrees
         */
        shortestRotation: function(startAngle, targetAngle) {
            var angle = (targetAngle - startAngle + 360) % 360;
            
            if (angle > 180) {
                return -(360 - angle);
            } else {
                return angle;
            }
        },
        
        /**
         * Calculates the distance between 2 points in 2D space
         *
         * @param {number} x1 X value of first point
         * @param {number} y1 Y value of first point
         * @param {number} x2 X value of second point
         * @param {number} y2 Y value of second point
         * @returns {number} Distance between the 2 points
         */
        getDistance: function(x1, y1, x2, y2) {
            var dx = x1 - x2,
                dy = y1 - y2,
                dist = Math.sqrt((dx * dx) + (dy * dy));
                
            return dist;
        },
        
        /**
         * Generates a random integer between min and max
         *
         * @param {number} min Lowest value (int)
         * @param {number} max Highest value (int)
         * @returns {number} random integer between min and max
         */
        randomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        /**
         * Generates a random number between min and max
         *
         * @param {number} min Lowest value
         * @param {number} max Highest value
         * @returns {number} random number between min and max
         */
        randomBetween: function(min, max) {
            return (Math.random() * (max - min)) + min;
        },

        /**
         * Converts radians to degrees
         *
         * @param {number} radians Radians value
         * @returns {number} Degrees value
         */
        toDegrees: function(radians) {
            return radians * 180 / Math.PI;
        },
        
        /**
         * converts degrees to radians
         *
         * @param {number} Degrees Degrees value
         * @returns {number} Radians value
         */
        toRadians: function(degrees) {
            return degrees * Math.PI / 180;
        }
    };
    
    return utils;
    
}());
