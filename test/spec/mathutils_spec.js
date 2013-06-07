describe('MATH_UTILS object', function() {
    'use strict';
    
    // For easy reference
    var mu = window.MATH_UTILS;

    it('should be available globally', function() {
        expect(mu).toBeDefined();
    });
    
    describe('round method', function() {
        it('rounds a number to provided number of digits behind comma', function() {
            expect(mu.round(3.58322845, 2)).toEqual(3.58);
            expect(mu.round(Math.PI, 10)).toEqual(3.1415926536);
            expect(mu.round(-542.67, 1)).toEqual(-542.7);
        });
    });
    
    describe('sign method', function() {
        it('should return -1 for negative numbers', function() {
            expect(mu.sign(-456)).toEqual(-1);
            expect(mu.sign(-10.03)).toEqual(-1);
            expect(mu.sign(-0.0095)).toEqual(-1);
        });
        
        it('should return 1 for positive numbers', function() {
            expect(mu.sign(3)).toEqual(1);
            expect(mu.sign(590.52)).toEqual(1);
            expect(mu.sign(0.64)).toEqual(1);
        });
    });
    
    describe('constrain method', function() {
        it('should return input when number falls in range', function() {
            expect(mu.constrain(45, 30, 80)).toEqual(45);
        });
        
        it('should return min value when number is smaller', function() {
            expect(mu.constrain(12, 31, 60)).toEqual(31);
        });
        
        it('should return max value when number is bigger', function() {
            expect(mu.constrain(374, 200, 300)).toEqual(300);
        });
    });
    
    describe('getAngle method', function() {
        it('should calculate the angle from to points', function() {
            expect(mu.getAngle(0, 0, 40, 40)).toEqual(45);
            expect(mu.getAngle(10, 10, 20, 10)).toEqual(0);
            expect(mu.getAngle(10, 10, 10, 0)).toEqual(-90);
            expect(mu.getAngle(10, 10, 0, 10)).toEqual(180);
            expect(mu.getAngle(10, 10, 10, 20)).toEqual(90);
        });
    });
    
    describe('shortestRotation method', function() {
        it('returns the shortest rotation to get to targetAngle', function() {
            expect(mu.shortestRotation(90, 125)).toEqual(35);
            expect(mu.shortestRotation(260, 60)).toEqual(160);
            expect(mu.shortestRotation(0, 350)).toEqual(-10);
            expect(mu.shortestRotation(310, 132)).toEqual(-178);
        });
    });
    
    describe('getDistance method', function() {
        it('should return the distance between two points in 2D space', function() {
            expect(mu.getDistance(0, 0, 250, 0)).toEqual(250);
            expect(mu.getDistance(-100, -80, -100, -250)).toEqual(170);
        });
    });
    
    describe('toDegrees method', function() {
        it('should return degrees for given radians', function() {
            expect(mu.toDegrees(Math.PI)).toEqual(180);
            expect(Math.round(mu.toDegrees(0.785398163))).toEqual(45);
            expect(Math.round(mu.toDegrees(2.47836754))).toEqual(142);
        });
    });
    
    describe('toRadians method', function() {
        it('should return radians for given degrees', function() {
            expect(mu.toRadians(45)).toMatch(/^0.785398163/);
            expect(mu.toRadians(219)).toMatch(/^3.82227106/);
            expect(mu.toRadians(180)).toEqual(Math.PI);
        });
    });
    
    describe('isOdd method', function() {
        it('should return true for odd numbers', function() {
            expect(mu.isOdd(3)).toBeTruthy();
            expect(mu.isOdd(379)).toBeTruthy();
        });
        
        it('should return false for even numbers', function() {
            expect(mu.isOdd(8)).toBeFalsy();
            expect(mu.isOdd(260)).toBeFalsy();
        });
    });
    
    describe('isEven method', function() {
        it('should return true for even numbers', function() {
            expect(mu.isEven(4)).toBeTruthy();
            expect(mu.isEven(408)).toBeTruthy();
        });
        
        it('should return false for odd numbers', function() {
            expect(mu.isEven(7)).toBeFalsy();
            expect(mu.isEven(689)).toBeFalsy();
        });
    });
});