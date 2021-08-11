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

            var svg    = el.querySelector('svg');
            var height = parseInt(svg.getAttribute('height'), 10);
            var width  = parseInt(svg.getAttribute('width'), 10);
            var ratio  = height / width * 100;

            set_style(el, {
                'width': width + 'px',
                'position': 'relative'
            });

            var after = document.createElement('div');
            set_style(after, {
                'width': '100%',
                'padding-bottom': ratio + '%'
            });
            
            el.appendChild(after);

            set_style(svg, {
                'position': 'absolute',
                'width': '100%',
                'height': '100%',
                'top': '0',
                'left': '0'
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
