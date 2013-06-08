/**
 * Various helper methods for working with colors
 */
window.COLOR_UTILS = (function() {
    'use strict';
    
    var utils = {
        /**
         * Takes hsl properties and converts them to a valid hsl(a) string
         * Alpha is optional
         */
        hslToString: function(h, s, l, a) {
            if (typeof a === 'number' && a >= 0 && a <= 1) {
                return 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
            } else {
                return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
            }
        },
        
        /**
         * Takes a hsl(a) string and parses it into an object with h, s, l, a properties
         */
        hslToObject: function(color) {
            var hsl = /^hsl\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*%\s*,\s*([0-9]{1,3})\s*%\s*\)$/,
                hsla = /^hsla\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*%\s*,\s*([0-9]{1,3})\s*%\s*,\s*([0-9\.]+)\s*\)$/,
                match;
                
            if ((match = hsl.exec(color))) {
                return {
                    h: parseInt(match[1], 10),
                    s: parseInt(match[2], 10),
                    l: parseInt(match[3], 10),
                    a: 1
                };
            } else if ((match = hsla.exec(color))) {
                return {
                    h: parseInt(match[1], 10),
                    s: parseInt(match[2], 10),
                    l: parseInt(match[3], 10),
                    a: parseFloat(match[4])
                };
            } else {
                throw new Error('Not a valid hsl(a) string');
            }
        },
        
        /**
         * Takes rgba properties and converts them to a valid rgb(a) string
         * Alpha is optional
         */
        rgbToString: function(r, g, b, a) {
            if (typeof a === 'number' && a >= 0 && a <= 1) {
                return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
            } else {
                return 'rgb(' + r + ', ' + g + ', ' + b + ')';
            }
        },
        
        /**
         * Takes a rgb(a) string and parses it into an object with r, g, b, a properties
         */
        rgbToObject: function(color) {
            var rgb = /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/,
                rgba = /^rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]+)\s*\)$/,
                match;
                
            if ((match = rgb.exec(color))) {
                return {
                    r: parseInt(match[1], 10),
                    g: parseInt(match[2], 10),
                    b: parseInt(match[3], 10),
                    a: 1
                };
            } else if ((match = rgba.exec(color))) {
                return {
                    r: parseInt(match[1], 10),
                    g: parseInt(match[2], 10),
                    b: parseInt(match[3], 10),
                    a: parseFloat(match[4])
                };
            } else {
                throw new Error('Not a valid rgb(a) string');
            }
        },
        
        /**
         * Returns a random hex color
         */
        randomHex: function() {
            // Adding zeros to make sure lenth is always 6
            return '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
        },
        
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
                match;
            
            if ((match = six.exec(color))) {
                parsed = {
                    r: parseInt(match[1], 16),
                    g: parseInt(match[2], 16),
                    b: parseInt(match[3], 16)
                };
            } else if ((match = three.exec(color))) {
                parsed = {
                    r: parseInt(match[1], 16) * 17,
                    g: parseInt(match[2], 16) * 17,
                    b: parseInt(match[3], 16) * 17
                };
            } else {
                throw new Error('Not a valid hex color');
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
        toHex: function(r, g, b) {
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        
        /**
         * Convert a RGB color into a HSL color
         *
         * @param {number} red Red value 0-255
         * @param {number} green Green value 0-255
         * @param {number} blue Blue value 0-255
         * @param {boolean} str String output, setting it to false will return an object
         * @returns {string} HSL color 'hsl(360, 100%, 50%)'
         */
        toHSL: function(r, g, b, str) {
            r = r / 255;
            g = g / 255;
            b = b / 255;
            
            var max = Math.max(r, g, b),
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