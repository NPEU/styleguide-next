/*
    IE11 Fixes

    1. Inline SVG sizes (c-badge)
*/

(function() {

    var set_style = function(element, style) {
        Object.keys(style).forEach(function(key) {
            element.style[key] = style[key];
        });
    }

    var run = function() {
        fix_svg();
    }

    var fix_svg = function() {
        var elements = document.querySelectorAll('.c-badge--primary-logo');

        Array.prototype.forEach.call(elements, function(el, i) {

            var svg = el.querySelector('svg');
            var view_box = svg.getAttribute('viewBox');
            var height = parseInt(svg.getAttribute('height'), 10);
            var view_box_array = view_box.split(' ');
            var ratio = view_box_array[2] / view_box_array[3];
            var max_width = height * ratio;

            set_style(el, {
                'width': '100%',
                'max-width': max_width + 'px'
            });
        });
    }

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(run);
})();
