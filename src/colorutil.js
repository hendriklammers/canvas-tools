/**
 * Various helper methods for working with colors
 */
window.COLOR_UTIL = (function() {
    'use strict';
    
    var outputType = 'auto';
    
    var utils = {
        /**
         * Sets the default outputType for certain methods that return a color
         *
         * @param {string} type outputType: 'object', 'string' or 'auto' (default)
         */
        setOutputType: function(type) {
            if (type === 'object' || type === 'string' || type === 'auto') {
                outputType = type;
            } else {
                throw new Error('Not a valid type');
            }
        },
        
        /**
         * Inverts a rgb color
         *
         * @param {number} r Red value 0-255
         * @param {number} g Green value 0-255
         * @param {number} b Blue value 0-255
         * @returns {string} Inverted rgb color, e.g. 'rgb(255, 100, 50)'
         */
        invertColor: function(r, g, b) {
            return 'rgb(' + (255 - r) + ', ' + (255 - g) + ', ' + (255 - b) + ')';
        },
        
        /**
         * Converts a rgb color to grayscale
         *
         * @param {number} r Red value 0-255
         * @param {number} g Green value 0-255
         * @param {number} b Blue value 0-255
         * @param {string} method Optional Grayscale algorithm: 'average', 'lightness' or 'luminosity' (Default)
         * @returns {string} Grayscale color in string format, e.g. 'rgb(127, 127, 127)'
         */
        toGrayscale: function(r, g, b, method) {
            var grey;
            
            switch(method || 'luminosity') {
                case 'luminosity':
                    grey = r * 0.21 + g * 0.72 + b * 0.07;
                    break;
                case 'average':
                    grey = (r + g + b) / 3;
                    break;
                case 'lightness':
                    grey = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
                    break;
                default:
                    throw new Error('Not a valid grayscale method');
            }
            
            grey = Math.round(grey);
            
            //TODO: Different return type?
            return 'rgb(' + grey + ', ' + grey + ', ' + grey + ')';
        },
        
        /**
         * Converts hsl properties to a string
         *
         * @param {number} h Hue value 0-360
         * @param {number} s Saturation value 0-100
         * @param {number} l Lightness value 0-100
         * @param {number} a Alpha value 0-1 (Optional)
         * @returns {string} hsla or hsl string when no alpha is provided. e.g. 'hsla(200, 70%, 50%, 0.75)'
         */
        hslToString: function(h, s, l, a) {
            if (typeof a === 'number' && a >= 0 && a <= 1) {
                return 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';
            } else {
                return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
            }
        },
        
        /**
         * Takes a hsl(a) string and parses it into an object
         *
         * @param {string} color hsl or hsla color string, e.g. 'hsl(300, 100%, 50%)'
         * @returns {object} Object with h,s,l,a properties, e.g. {h: 300, s: 100, l: 50, a: 1}
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
         * Converts rgba properties into a valid rgb(a) string
         *
         * @param {number} r Red value 0-255
         * @param {number} g Green value 0-255
         * @param {number} b Blue value 0-255
         * @param {number} a Alpha value 0-1 (Optional)
         * @returns {string} rgb(a) color string
         */
        rgbToString: function(r, g, b, a) {
            if (typeof a === 'number' && a >= 0 && a <= 1) {
                return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
            } else {
                return 'rgb(' + r + ', ' + g + ', ' + b + ')';
            }
        },
        
        /**
         * Parses a rgb(a) color into an object
         *
         * @param {string} color rgb or rgba string color, e.g. 'rgb(255, 0, 255)' or 'rgba(255, 0, 0, 0.8)'
         * @returns {object} Object with r,g,b,a properties
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
         * Generates a random hex color
         *
         * @returns {string} Random hex color in valid string format, e.g. '#f8cae3'
         */
        randomHex: function() {
            // Adding zeros to make sure lenth is always 6
            return '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
        },
        
        /**
         * Generates a random rgb color
         *
         * @returns {object} Object with r,g,b properties
         */
        randomRGB: function() {
            var color = {r: 0, g: 0, b: 0},
                i;
            
            for (i in color) {
                color[i] = Math.round(Math.random() * 255);
            }
            
            return color;
        },
        
        /**
         * Converts a hex color (#aabbcc, #abc) into rgb object
         *
         * @param {string} color hex color value short or long
         * @param {string} type Sets return type of the method: 'object' or 'string' (default).
         * @returns {object} color parsed into r, g, b properties
         */
        toRGB: function(color, type) {
            type = outputType === 'auto' ? (type || 'string') : outputType;
            
            var six = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,  // Match #aabbcc
                three = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,         // Match #abc
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
            
            if (type === 'string') {
                return 'rgb(' + parsed.r + ', ' + parsed.g + ', ' + parsed.b + ')';
            } else {
                return parsed;
            }
        },
        
        /**
         * Converts a RGB color to a Hex string
         *
         * @param {number} r Red value 0-255
         * @param {number} g Green value 0-255
         * @param {number} b Blue value 0-255
         * @returns {string} hex color, e.g. '#aabbcc'
         */
        toHex: function(r, g, b) {
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        
        /**
         * Converts a RGB color into a HSL color
         *
         * @param {number} r Red value 0-255
         * @param {number} g Green value 0-255
         * @param {number} b Blue value 0-255
         * @param {string} type Sets return type of the method: 'object' or 'string' (default).
         * @returns {string} HSL color, e.g. 'hsl(360, 100%, 50%)'
         */
        toHSL: function(r, g, b, type) {
            r = r / 255;
            g = g / 255;
            b = b / 255;
            type = outputType === 'auto' ? (type || 'string') : outputType;
            
            var max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                delta = max - min,
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
            
            if (type === 'string') {
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