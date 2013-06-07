describe('COLOR_UTILS helper methods', function() {
    'use strict';
    
    var cu = window.COLOR_UTILS;
    
    it('should be available globally', function() {
        expect(cu).toBeDefined();
    });
    
    describe('randomHex', function() {
        it('returns a valid hex color string', function() {
            expect(cu.randomHex()).toMatch(/^#[a-f0-9]{6}$/i);
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
            expect(cu.toRGB('#000000', false)).toEqual({r: 0, g: 0, b: 0});
            expect(cu.toRGB('#FFFFFF', false)).toEqual({r: 255, g: 255, b: 255});
            expect(cu.toRGB('#9f3ff1', false)).toEqual({r: 159, g: 63, b: 241});
        });
        
        it('accepts short hex strings too', function() {
            expect(cu.toRGB('#F92', false)).toEqual({r: 255, g: 153, b: 34});
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
            expect(cu.toHSL(0, 255, 0, false)).toEqual({h: 120, s: 100, l: 50});
            expect(cu.toHSL(65, 234, 208, false)).toEqual({h: 171, s: 80, l: 59});
        });
    });
});