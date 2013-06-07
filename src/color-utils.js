/**
 * Various helper methods for working with colors
 */
window.COLOR_UTILS = (function() {
    'use strict';
    
    var utils = {
        /**
         * Convert a hex color (#aabbcc, #abc) into rgb object
         *
         * @param {string} color hex color value short or long
         * @param {boolean} str String output, setting it to false will return an object
         * @returns {object} color parsed into r, g, b properties
         */
        toRGB: function(color, str) {
            var six = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,  // Match #aabbcc
                three = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,         // Match #abc
                useString = typeof str === 'undefined' ? true : str,
                parsed,
                result;
            
            if ((result = six.exec(color))) {
                parsed = {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                };
            } else if ((result = three.exec(color))) {
                parsed = {
                    r: parseInt(result[1], 16) * 17,
                    g: parseInt(result[2], 16) * 17,
                    b: parseInt(result[3], 16) * 17
                };
            }
            
            if (useString) {
                return 'rgb(' + parsed.r + ', ' + parsed.g + ', ' + parsed.b + ')';
            } else {
                return parsed;
            }
        },
        
        /**
         * Convert a RGB color to a Hex string
         *
         * @param {number} r Red value 0-255
         * @param {number} g Green value 0-255
         * @param {number} b Blue value 0-255
         * @returns {string} hex color '#aabbcc'
         */
        toHex: function(red, green, blue) {
            return '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
        },
        
        /**
         * Convert a RGB color into a HSL color
         *
         * @param {number} r Red value 0-255
         * @param {number} g Green value 0-255
         * @param {number} b Blue value 0-255
         * @param {boolean} str String output, setting it to false will return an object
         * @returns {string} HSL color 'hsl(360, 100%, 50%)'
         */
        toHSL: function(red, green, blue, str) {
            var r = red / 255,
                g = green / 255,
                b = blue / 255,
                max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                delta = max - min,
                useString = typeof str === 'undefined' ? true : str,
                hue,
                sat,
                light = (max + min) / 2;

            if (max === min) {
                hue = sat = 0;
            } else {
                sat = light > 0.5 ? delta / (2 - max - min) : delta / (max + min);
                
                switch(max) {
                    case r:
                        hue = (g - b) / delta + (g < b ? 6 : 0);
                        break;
                    case g:
                        hue = (b - r) / delta + 2;
                        break;
                    case b:
                        hue = (r - g) / delta + 4;
                        break;
                }
                
                hue = hue / 6;
            }
            
            if (useString) {
                return 'hsl(' + Math.round(hue * 360) + ', ' + Math.round(sat * 100) + '%, ' + Math.round(light * 100) + '%)';
            } else {
                return {
                    h: Math.round(hue * 360),
                    s: Math.round(sat * 100),
                    l: Math.round(light * 100)
                };
            }
        }
    };

    return utils;
}());