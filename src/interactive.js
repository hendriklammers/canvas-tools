window.INTERACTIVE = (function() {
    'use strict';
    
    return {
        /**
         * Get coordinates of mouse position on the canvas
         * 
         * @param {object} canvas The html Canvas element
         * @param {object} event MouseEvent used to get current position
         * @returns {object} Object with x and y properties
         */
        getMousePosition: function(canvas, event) {
            var rect = canvas.getBoundingClientRect();

            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }
    };
}());