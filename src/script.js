// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function () {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
}());

/**
 * This file is used for development only!
 */
(function() {
    'use strict';
    
    var canvas = document.getElementById('my-canvas'),
        context = canvas.getContext('2d');
        
    function animationLoop() {
    	
		setTimeout(function () {
			requestAnimationFrame(animationLoop);

			render();
		}, 1000 / 60);
    };
    
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        context.fillStyle = COLOR_UTILS.randomHex();
        context.fillRect(50, 100, 80, 80);
    };
    
    function findPos(elem) {
        var left = 0,
            top = 0;
            
        if (elem.offsetParent) {
            do {
                left += elem.offsetLeft;
                top += elem.offsetTop;
            } while (elem = elem.offsetParent);
            
            return { x: left, y: top };
        }
        
        return undefined;
    }
    
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    
    function init() {
        requestAnimationFrame(animationLoop);
        
        canvas.onmousemove = function(event) {
            // var pos = findPos(this);
            //             var x = event.pageX - pos.x;
            //             var y = event.pageY - pos.y;
            
            var pos = INTERACTIVE_UTILS.getMousePosition(canvas, event);
            
            console.log('Mouse Position - x: ' + pos.x + ', y: ' + pos.y);
        };
    };
        
    init();

}());