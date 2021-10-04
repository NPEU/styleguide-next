/*
    Card enhancements
*/

(function() {

    var card = function() {
        // Get all elements we want to apply this to:
        var elements = document.querySelectorAll('.js-c-card');

        Array.prototype.forEach.call(elements, function(el, i) {

            el.classList.add('c-card--has-js');

            var h_link = el.querySelector('.c-card__title > a');
            var cta = el.querySelector('.c-cta');
            var down, up;

            el.addEventListener('mousedown', function(e) {
                el.classList.add('c-card--is-mousedown');
                down = +new Date();
            });

            el.addEventListener('mouseup', function(e) {
                el.classList.remove('c-card--is-mousedown');
                up = +new Date();
                if ((up - down) < 200) {
                    h_link.click();
                }
            });
        });
    };

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(card);
})();
