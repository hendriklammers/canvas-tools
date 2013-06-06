(function() {
    'use strict';
    
    var mathUtils = {
        toDegrees: function(radians) {
            return radians * 180 / Math.PI;
        },
        
        toRadians: function(degrees) {
            return degrees * Math.PI / 180;
        },
        
        isOdd: function(value) {
            return (value % 2) === 1;
        },
        
        isEven: function(value) {
            return (value % 2) === 0;
        }
    };
    
    window.mathUtils = mathUtils;
    
}());
