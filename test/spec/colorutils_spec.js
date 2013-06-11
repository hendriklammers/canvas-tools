describe('COLOR_UTILS helper methods', function() {
    'use strict';
    
    var cu = window.COLOR_UTILS;
    
    it('should be available globally', function() {
        expect(cu).toBeDefined();
    });
    
    describe('invertColor', function() {
        it('takes a rgb color and returns the inverted rgb string', function() {
            expect(cu.invertColor(200, 100, 75)).toEqual('rgb(55, 155, 180)');
        });
    });
    
    describe('toGrayscale', function() {
        it('converts a rgb color to grayscale', function() {
            expect(cu.toGrayscale(255, 0, 0)).toEqual('rgb(54, 54, 54)');
            expect(cu.toGrayscale(255, 0, 0, 'lightness')).toEqual('rgb(128, 128, 128)');
            expect(cu.toGrayscale(200, 100, 30, 'average')).toEqual('rgb(110, 110, 110)');
        });
        
        it('should throw error when invalid method is passed as argument', function() {
            expect(function() {
                cu.toGrayscale(100, 255, 0, 'foobar');
            }).toThrow(new Error('Not a valid grayscale method'));
        });
    });
    
    describe('hslToString', function() {
        it('returns a valid hsl string with h, s, l argument values', function() {
            expect(cu.hslToString(220, 100, 50)).toEqual('hsl(220, 100%, 50%)');
        });
        
        it('returns a valid hsla string with h, s, l, a argument values', function() {
            expect(cu.hslToString(360, 75, 20, 0.08)).toEqual('hsla(360, 75%, 20%, 0.08)');
        });
    });
    
    describe('hslToObject', function() {
        it('returns an object with hsla properties of the given hsl color', function() {
            expect(cu.hslToObject('hsl(120, 100%, 50%)')).toEqual({h: 120, s: 100, l: 50, a: 1});
        });
        
        it('returns an object with hsla properties of the given hsla color', function() {
            expect(cu.hslToObject('hsla(240, 75%, 80%, 0.84)')).toEqual({h: 240, s: 75, l: 80, a: 0.84});
        });
        
        it('should throw error when argument is not a valid hsl(a) string', function() {
            expect(function() {
                cu.hslToObject('hsl(34%, 100,)');
            }).toThrow(new Error('Not a valid hsl(a) string'));
        });
    });
    
    describe('rgbToString', function() {
        it('returns a valid rgb string with r, g, b values from arguments', function() {
            expect(cu.rgbToString(220, 100, 73)).toEqual('rgb(220, 100, 73)');
        });
        
        it('returns a valid rgba string with r, g, b, a values from arguments', function() {
            expect(cu.rgbToString(34, 78, 255, 0.75)).toEqual('rgba(34, 78, 255, 0.75)');
        });
    });
    
    describe('rgbToObject', function() {
        it('returns an object with rgba properties of the given rgb color', function() {
            expect(cu.rgbToObject('rgb(244, 14, 0)')).toEqual({r: 244, g: 14, b: 0, a: 1});
            expect(cu.rgbToObject('rgb(17,213,255)')).toEqual({r: 17, g: 213, b: 255, a: 1});
        });
        
        it('returns an object with rgba properties of given rgba color', function() {
            expect(cu.rgbToObject('rgba(100, 50, 255, 0.17)')).toEqual({r: 100, g: 50, b: 255, a: 0.17});
        });
        
        it('should throw error when argument is not a valid rgb(a) string', function() {
            expect(function() {
                cu.rgbToObject('rgba(255. 100. 50%)');
            }).toThrow(new Error('Not a valid rgb(a) string'));
        });
    });
    
    describe('randomHex', function() {
        it('returns a valid hex color string', function() {
            expect(cu.randomHex()).toMatch(/^#[a-f0-9]{6}$/i);
        });
    });
    
    describe('randomRGB', function() {
        var color;
        
        beforeEach(function() {
            color = cu.randomRGB();
        });
        
        it('returns an object with r,g,b properties', function() {
            expect(color.r).toBeDefined();
            expect(color.g).toBeDefined();
            expect(color.b).toBeDefined();
        });
        
        it('returns object with property values from 0-255', function() {
            expect(color.r >= 0 && color.r <= 255).toBeTruthy();
            expect(color.g >= 0 && color.r <= 255).toBeTruthy();
            expect(color.b >= 0 && color.r <= 255).toBeTruthy();
        });
    });
    
    describe('toRGB', function() {
        it('converts a hex string to an RGB string', function() {
            expect(cu.toRGB('#000000')).toEqual('rgb(0, 0, 0)');
            expect(cu.toRGB('#FFFFFF')).toEqual('rgb(255, 255, 255)');
            expect(cu.toRGB('#9f3ff1')).toEqual('rgb(159, 63, 241)');
        });
        
        it('accepts short hex strings too', function() {
            expect(cu.toRGB('#F92')).toEqual('rgb(255, 153, 34)');
        });
        
        it('optionally returns objects', function() {
            expect(cu.toRGB('#000000', 'object')).toEqual({r: 0, g: 0, b: 0});
            expect(cu.toRGB('#FFFFFF', 'object')).toEqual({r: 255, g: 255, b: 255});
            expect(cu.toRGB('#9f3ff1', 'object')).toEqual({r: 159, g: 63, b: 241});
        });
        
        it('accepts short hex strings too', function() {
            expect(cu.toRGB('#F92', 'object')).toEqual({r: 255, g: 153, b: 34});
        });
        
        it('should throw an Error for invalid hex colors', function() {
            expect(function() {
                cu.toRGB('#G8922');
            }).toThrow(new Error('Not a valid hex color'));
        });
    });
    
    describe('toHex', function() {
        it('converts a RGB color into a hex string', function() {
            expect(cu.toHex(255, 255, 255)).toEqual('#ffffff');
            expect(cu.toHex(0, 0, 0)).toEqual('#000000');
            expect(cu.toHex(103, 232, 66)).toEqual('#67e842');
        });
    });
    
    describe('toHSL', function() {
        it('converts a RGB color to a HSL color', function() {
            expect(cu.toHSL(255, 0, 0)).toEqual('hsl(0, 100%, 50%)');
            expect(cu.toHSL(0, 0, 0)).toEqual('hsl(0, 0%, 0%)');
            expect(cu.toHSL(65, 234, 208)).toEqual('hsl(171, 80%, 59%)');
            expect(cu.toHSL(255, 128, 0)).toEqual('hsl(30, 100%, 50%)');
        });
        
        it('optionally returns objects', function() {
            expect(cu.toHSL(0, 255, 0, 'object')).toEqual({h: 120, s: 100, l: 50});
            expect(cu.toHSL(65, 234, 208, 'object')).toEqual({h: 171, s: 80, l: 59});
        });
    });
});