/*global mathUtils */
describe('mathUtils object', function() {
    'use strict';

    it('should be available globally', function() {
        expect(mathUtils).toBeDefined();
    });
    
    describe('sign method', function() {
        it('should return -1 for negative numbers', function() {
            expect(mathUtils.sign(-456)).toEqual(-1);
            expect(mathUtils.sign(-10.03)).toEqual(-1);
            expect(mathUtils.sign(-0.0095)).toEqual(-1);
        });
        
        it('should return 1 for positive numbers', function() {
            expect(mathUtils.sign(3)).toEqual(1);
            expect(mathUtils.sign(590.52)).toEqual(1);
            expect(mathUtils.sign(0.64)).toEqual(1);
        });
    });
    
    describe('constrain method', function() {
        it('should return input when number falls in range', function() {
            expect(mathUtils.constrain(45, 30, 80)).toEqual(45);
        });
        
        it('should return min value when number is smaller', function() {
            expect(mathUtils.constrain(12, 31, 60)).toEqual(31);
        });
        
        it('should return max value when number is bigger', function() {
            expect(mathUtils.constrain(374, 200, 300)).toEqual(300);
        });
    });
    
    describe('getAngle method', function() {
        it('should calculate the angle from to points', function() {
            expect(mathUtils.getAngle(0, 0, 40, 40)).toEqual(45);
            expect(mathUtils.getAngle(10, 10, 20, 10)).toEqual(0);
            expect(mathUtils.getAngle(10, 10, 10, 0)).toEqual(-90);
            expect(mathUtils.getAngle(10, 10, 0, 10)).toEqual(180);
            expect(mathUtils.getAngle(10, 10, 10, 20)).toEqual(90);
        });
    });
    
    describe('getDistance method', function() {
        it('should return the distance between two points in 2D space', function() {
            expect(mathUtils.getDistance(0, 0, 250, 0)).toEqual(250);
            expect(mathUtils.getDistance(-100, -80, -100, -250)).toEqual(170);
        });
    });
    
    describe('toDegrees method', function() {
        it('should return degrees for given radians', function() {
            expect(mathUtils.toDegrees(Math.PI)).toEqual(180);
            expect(Math.round(mathUtils.toDegrees(0.785398163))).toEqual(45);
            expect(Math.round(mathUtils.toDegrees(2.47836754))).toEqual(142);
        });
    });
    
    describe('toRadians method', function() {
        it('should return radians for given degrees', function() {
            expect(mathUtils.toRadians(45)).toMatch(/^0.785398163/);
            expect(mathUtils.toRadians(219)).toMatch(/^3.82227106/);
            expect(mathUtils.toRadians(180)).toEqual(Math.PI);
        });
    });
    
    describe('isOdd method', function() {
        it('should return true for odd numbers', function() {
            expect(mathUtils.isOdd(3)).toBeTruthy();
            expect(mathUtils.isOdd(379)).toBeTruthy();
        });
        
        it('should return false for even numbers', function() {
            expect(mathUtils.isOdd(8)).toBeFalsy();
            expect(mathUtils.isOdd(260)).toBeFalsy();
        });
    });
    
    describe('isEven method', function() {
        it('should return true for even numbers', function() {
            expect(mathUtils.isEven(4)).toBeTruthy();
            expect(mathUtils.isEven(408)).toBeTruthy();
        });
        
        it('should return false for odd numbers', function() {
            expect(mathUtils.isEven(7)).toBeFalsy();
            expect(mathUtils.isEven(689)).toBeFalsy();
        });
    });
});