/*------------------------------------------------------------------------------------------------*\
    Fall-Back Cookie Notice Pattern v0.1
    ------------------------------------

    To avoid any confusion, it's probably best to copy these settings to another file that you're
    concatenating and then make any changes to the defaults.
\*------------------------------------------------------------------------------------------------*/

var cookie_name                   = 'fallback_accept_cookies';
var cookie_expire_days            = 60;
var cookie_notice_id              = 'cookie_notice';
var cookie_button_id              = 'accept_cookies';
var cookie_notice_class           = 'cookie_notice';
var cookie_button_class           = '';
var cookie_close_class            = 'cookie_notice--close';
var cookie_notice_effect_duration = 1000;
var cookie_html                   =
'<div id="' + cookie_notice_id + '" class="' + cookie_notice_class + '">' + "\n" +
'<p class="cookie_notice__message">This site uses <a href="http://www.allaboutcookies.org/" rel="external noopener noreferrer" target="_blank">cookies</a> to improve user experience. By using this site you agree to our use of cookies.</p>' + "\n" +
'<span class="cookie_notice__action"><button id="' + cookie_button_id + '" class="' + cookie_button_class + '">Dismiss</button></span>' + "\n" +
'</div>';

/*
    iframe - fit height to contents.
*/

(function() {

    var setIframeHeight = function(iframe) {
        
        var newHeight = iframe.contentDocument.querySelector('html').offsetHeight;
        iframe.style.height = newHeight + 'px';
    };

    var fit_content = function() {
        // Get all elements we want to apply this to:
        var elements = document.querySelectorAll('iframe.js-fit-contents');

        Array.prototype.forEach.call(elements, function(el, i) {
            var iframe        = el;
            var iframe_window = iframe.contentWindow;
            
            iframe.addEventListener('load', function() {
                setIframeHeight(iframe);
            });

            iframe_window.addEventListener('resize', function(e) {
                setIframeHeight(iframe);
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

    ready(fit_content);
})();

/*
    Can't be totally sure what this is for, now...
    It'll come back to me...
*/

(function() {
    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    var adjustJustifyContent = {
        run: function() {
            var containers = document.querySelectorAll('.js-adjust-me');
            Array.prototype.forEach.call(containers, function(container, i) {
                var item = container.querySelector('.js-adjust-me__reference');
                if (getComputedStyle(container)['height'] > getComputedStyle(item)['height']) {
                    container.style.justifyContent = 'center';
                } else {
                    container.style.justifyContent = 'space-between';
                }
            });
        }
    }



    ready(adjustJustifyContent.run);
    window.onresize = adjustJustifyContent.run;
})();

/*
    Object-fit polyfill.
    Browsers that don't support object-fit:
    IE
    Edge 15-
    FF 35-
    Chrome 30-
    Safari 9.1-
    Opera 18-
    iOS Safari 9.3-
    Android 4.4-
*/

(function() {
    //if(('objectFit' in document.documentElement.style !== false) || !(navigator.userAgent.indexOf('UCBrowser') > -1)) {
    if('objectFit' in document.documentElement.style !== false) {
        return;
    }

    // https://davidwalsh.name/javascript-debounce-function
    // Returns a function, that, as long as it continues to be invoked, will not be triggered. 
    // The function will be called after it stops being called for N milliseconds. If `immediate` 
    // is passed, trigger the function on the leading edge, instead of the trailing.
    var debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var compare_heights = function() {
        // Get all elements we want to apply this to:
        var elements = document.querySelectorAll('.js-image-cover');

        Array.prototype.forEach.call(elements, function(el, i) {

            var img = el.querySelector('img');

            // Get the container dimensions:
            var container_rect = el.getBoundingClientRect();

            // Get the image dimensions:
            var image_rect = img.getBoundingClientRect();
            //console.log(container_rect.height, image_rect.height, img.height < container_rect.height);

            // Remove the style. Note the behaviour here isn't ideal, but it's better than the image
            // getting stuck at a small size which can happen otherwise.
            img.removeAttribute('style');

            // If the image is not tall enough to fill the container, swap width/height styles:
            if (img.height <= container_rect.height) {

                img.style.width  = 'auto';
                img.style.height = '100%';
            }
        });
    };

    var polyfill = function() {
        // Run on page load...
        compare_heights();

        var checkresize = debounce(function() {
            compare_heights();
        }, 250);

        // .. and whenever the window resizes:
        window.addEventListener('resize', checkresize);
    };

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(polyfill);
})();

/*!
    Fall-Back Cookie Notice v1.1.0
    https://github.com/Fall-Back/Cookie-Notice
    Copyright (c) 2017, Andy Kirk
    Released under the MIT license https://git.io/vwTVl
*/
(function() {
    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    var createCookie = function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    var readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    var eraseCookie = function(name) {
        createCookie(name,"",-1);
    }
    
    var cookienotice = {

        init: function() {
            var accepted_cookies = readCookie(cookie_name);
            if (!accepted_cookies) {
                var body_el = document.getElementsByTagName('body')[0];
                body_el.insertAdjacentHTML('afterbegin', cookie_html);
                
                document.getElementById(cookie_button_id).onclick = function(){
                    createCookie(cookie_name, 'true', cookie_expire_days);
                    document.getElementById(cookie_notice_id).setAttribute('data-close', true);
                    //document.getElementById(cookie_notice_id).className += '  ' + cookie_close_class;
                    /*
                        Without CSS (or transition support - IE9) the notice won't disappear, so wait until fade 
                        has finished then remove:
                    */
                    setTimeout(function(){
                        var c = document.getElementById(cookie_notice_id);
                        c.parentNode.removeChild(c);
                    }, cookie_notice_effect_duration);
                };
            }
        }
    }
    
    ready(cookienotice.init);
})();

/*! --------------------------------------------------------------------------------------------- *\

    Fall-Back Close Button v1.0.0
    https://github.com/Fall-Back/Patterns/tree/master/Close%20Button
    Copyright (c) 2021, Andy Kirk
    Released under the MIT license https://git.io/vwTVl

    Designed for use with the EM2 [CSS Mustard Cut](https://github.com/Fall-Back/CSS-Mustard-Cut)
    Edge, Chrome 39+, Opera 26+, Safari 9+, iOS 9+, Android ~5+, Android UCBrowser ~11.8+
    FF 47+

    PLUS IE11

\* ---------------------------------------------------------------------------------------------- */

(function() {

    var close_button_container_selector    = '[data-js="close-button"]';
    var close_button_focus_target_selector = 'h1[tabindex=\'-1\']';
    var close_button_class                 = 'close-button';
    var close_button_id                    = '';
    var close_button_effect_duration       = 1000;

    var close_button_container_class       = 'js-close-button-container';

    var close_button_class_string = '';
    if (close_button_class) {
        close_button_class_string = ' class="' + close_button_class +'"';
    }

    var close_button_id_string = '';
    if (close_button_id) {
        close_button_id_string = ' class="' + close_button_id +'"';
    }
    
    // Focus HAS to move somewhere so default to h1. May rethink this...
    if (!close_button_focus_target_selector) {
        close_button_focus_target_selector = 'h1';
    }

    var close_button_focus_target_selector_string = ' data-js-focus-target="' + close_button_focus_target_selector +'"';


    var close_button_html  =
'<button' + close_button_id_string + close_button_class_string + close_button_focus_target_selector_string + '>' +
'    <span hidden="" aria-hidden="false">Close</span>' +
'    <svg focusable="false" class="icon  icon--is-open"><use xlink:href="#icon-cross"></use></svg></button>' +
'</button>' + "\n";

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    var $close_button = {

        close_buttons: null,
        close_button_containers: null,

        init: function() {
			var self = this;

            $close_button.close_button_containers = document.querySelectorAll(close_button_container_selector);

            Array.prototype.forEach.call($close_button.close_button_containers, function (close_button_container, i) {

                close_button_container.className += '  ' + close_button_container_class;

                close_button_container.innerHTML += close_button_html;

                var close_button = close_button_container.lastElementChild;

                close_button.addEventListener('click', function(e) {
                    e.preventDefault();

                    close_button_container.setAttribute('data-close', true);

                    setTimeout(function(){
                        close_button_container.parentNode.removeChild(close_button_container);
                    }, close_button_effect_duration);
                    
                    document.querySelector(this.getAttribute('data-js-focus-target')).focus();
                });
            });
        }
    }

    ready($close_button.init);
})();

/*!
    Fall-Back Content Min-row v1.0.1
    https://github.com/Fall-Back/Patterns/tree/master/Content%20Min%20Row
    Copyright (c) 2021, Andy Kirk
    Released under the MIT license https://git.io/vwTVl
*/

// Remove polyfill:
(function() {
  function remove() { this.parentNode && this.parentNode.removeChild(this); }
  if (!Element.prototype.remove) Element.prototype.remove = remove;
  if (Text && !Text.prototype.remove) Text.prototype.remove = remove;
})();

(function() {

    //var debug                                = true;
    var debug                                = false;
    var ident                                = 'cmr';
    var selector                             = '[data-js="' + ident + '"]';
    var js_classname_prefix                  = 'js';
    var container_js_classname_wide_suffix   = 'wide';
    var container_js_classname_narrow_suffix = 'narrow';

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    var set_style = function(element, style) {
        Object.keys(style).forEach(function(key) {
            element.style[key] = style[key];
        });
    }

    var $cmr = {

        cmrs: null,

        root_font_size: window.getComputedStyle(document.documentElement).getPropertyValue('font-size'),

        switcher: function(cmr) {

            // Check for browser font chnage and reset breakpoints if it has:
            if ($cmr.root_font_size != window.getComputedStyle(document.documentElement).getPropertyValue('font-size')) {
                $cmr.set_breakpoints($cmr.cmrs);
            }

            // Note using getAttribute('data-') instead of dataset so it doesn't fail on older
            // browsers and leave behind the clone.
            // May rethink this as I don't NEED to support older browsers witht this - I just don't
            // want it broken. Maybe I should quit out of this if dataset isn't supported, but it's
            // ok for now.
            var wide = cmr.offsetWidth > cmr.getAttribute('data-js-breakpoint');
            // Need to make these classnames dynamic
            if (wide) {
                cmr.classList.add(js_classname_prefix + '-' + ident + '--' + container_js_classname_wide_suffix);
                cmr.classList.remove(js_classname_prefix + '-' + ident + '--' + container_js_classname_narrow_suffix);

                if (debug) {
                    cmr.style.outline = '3px solid red';
                }
            } else {
                cmr.classList.add(js_classname_prefix + '-' + ident + '--' + container_js_classname_narrow_suffix);
                cmr.classList.remove(js_classname_prefix + '-' + ident + '--' + container_js_classname_wide_suffix);

                if (debug) {
                    cmr.style.outline = '3px solid blue';
                }
            }
        },

        set_breakpoints: function(cmrs) {

            Array.prototype.forEach.call(cmrs, function (cmr, i) {
                var clone = cmr.cloneNode(true);
                clone.classList.add(js_classname_prefix + '-' + ident + '--' + container_js_classname_wide_suffix);

                set_style(clone, {
                    position: 'absolute',
                    border: '0',
                    left: '0',
                    top: '0',
                });
                cmr.parentNode.appendChild(clone);

                var children   = clone.children;
                var breakpoint = 0;
                Array.prototype.forEach.call(children, function (child, i) {
                    // If this child is intended to be flexible, we need to add it's min-width,
                    // rather than actual width:
                    if (child.getAttribute('data-min-width')) {
                        breakpoint += Math.ceil(child.getAttribute('data-min-width'));
                    } else {
                        breakpoint += Math.ceil(child.offsetWidth);
                    }
                });

                cmr.setAttribute('data-js-breakpoint', breakpoint);

                clone.remove();
            });
        },

        init: function() {

            if (debug) {
                console.log('Initialising ' + ident);
            }

            var self = this;

            // Get all the CMR's:
            $cmr.cmrs = document.querySelectorAll(selector);

            $cmr.set_breakpoints($cmr.cmrs);

            var check = window.ResizeObserver;

            if (check) {
                var ro = new ResizeObserver(function (entries) {
                    Array.prototype.forEach.call(entries, function (entry, i) {
                        $cmr.switcher(entry.target);
                    });
                });

                Array.prototype.forEach.call($cmr.cmrs, function (cmr, i) {
                    ro.observe(cmr);
                    $cmr.switcher(cmr);
                });
            } else {
                if (debug) {
                    console.log('No ResizeObserver support.');
                }

                var style = {
                    position: 'absolute',
                    display: 'block',
                    border: '0',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: '-1'
                };

                // Note visibility: hidden prevents the resize event from occuring in FF.

                Array.prototype.forEach.call($cmr.cmrs, function (cmr, i) {
                    var detector = document.createElement('iframe');
                    set_style(detector, style);
                    detector.setAttribute('aria-hidden', 'true');

                    cmr.appendChild(detector);

                    detector.contentWindow.addEventListener('resize', function() {
                        $cmr.switcher(cmr);
                    });
                    $cmr.switcher(cmr);
                });
            }
            return;
        }
    }

    ready($cmr.init);
})();

/*! --------------------------------------------------------------------------------------------- *\
    
    Fall-Back Dropdown v2.0.0
    https://github.com/Fall-Back/Patterns/tree/master/Dropdown
    Copyright (c) 2021, Andy Kirk
    Released under the MIT license https://git.io/vwTVl

    Designed for use with the EM2 [CSS Mustard Cut](https://github.com/Fall-Back/CSS-Mustard-Cut)
    Edge, Chrome 39+, Opera 26+, Safari 9+, iOS 9+, Android ~5+, Android UCBrowser ~11.8+
    FF 47+

    PLUS IE11

\* ---------------------------------------------------------------------------------------------- */

(function() {

    //var debug                 = true;
    var debug                 = false;
    var ident                 = 'dropdown';
    var selector              = '[data-js="' + ident + '"]';

    var dropdown_js_has_classname = 'js-has--' + ident;
    
    var dropdown_is_open_classname      = ident + '__area--is-open';
    var dropdown_is_animating_classname = ident + '__area--is-animating';

    var check_for_css = function(selector) {

        if (debug) {
            console.log('Checking for CSS: ' + selector);
        }

        var rules;
        var haveRule = false;
        if (typeof document.styleSheets != "undefined") { // is this supported
            var cssSheets = document.styleSheets;

            // IE doesn't have document.location.origin, so fix that:
            if (!document.location.origin) {
                document.location.origin = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ':' + document.location.port: '');
            }
            var domain_regex  = RegExp('^' + document.location.origin);

            outerloop:
            for (var i = 0; i < cssSheets.length; i++) {
                var sheet = cssSheets[i];

                // Some browsers don't allow checking of rules if not on the same domain (CORS), so
                // checking for that here:
                if (sheet.href !== null && domain_regex.exec(sheet.href) === null) {
                    continue;
                }

                // Check for IE or standards:
                rules = (typeof sheet.cssRules != "undefined") ? sheet.cssRules : sheet.rules;
                for (var j = 0; j < rules.length; j++) {
                    if (rules[j].selectorText == selector) {
                        haveRule = true;
                        break outerloop;
                    }
                }
            }
        }

        if (debug) {
            console.log(selector + ' ' + (haveRule ? '' : 'not') + ' found');
        }

        return haveRule;
    }

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

	var dropdown = {

        init: function() {

            if (debug) {
                console.log('Initialising ' + ident);
            }

            if (css_is_loaded) {

                var dropdowns = document.querySelectorAll(selector);

                // ... and control actions:
                var controls = document.querySelectorAll('[data-js="dropdown__control"]');
                Array.prototype.forEach.call(controls, function(control, i) {
                    var control_id = control.getAttribute('id');
                    var area       = document.getElementById(control_id + '--target');

                    control.setAttribute('aria-expanded', 'false');

                    // Main control:
                    control.addEventListener('click', function() {

                        area.classList.add(dropdown_is_animating_classname);


                        // Switch the `aria-expanded` attribute:
                        var expanded = this.getAttribute('aria-expanded') === 'true' || false;

                        // Close any open dropdown:
                        var expanded_controls = document.querySelectorAll('[data-js="dropdown__control"][aria-expanded="true"]');
                        Array.prototype.forEach.call(expanded_controls, function(expanded_control, i) {
                            expanded_control.setAttribute('aria-expanded', 'false');
                            var expanded_area = document.getElementById(expanded_control.getAttribute('id') + '--target');
                            expanded_area.classList.remove(dropdown_is_open_classname);
                        });

                        // Set the attribute:
                        this.setAttribute('aria-expanded', !expanded);
                        
                        // Toggle the `is_open` class:
                        if (!expanded) {
                            area.classList.add(dropdown_is_open_classname);
                        } else {
                            area.classList.remove(dropdown_is_open_classname);
                        }

                        // Set the focus to the first link if submenu newly opened:
                        if (!expanded) {
                            var first_link = document.querySelector('#' + control_id + '--target [data-js="dropdown__focus-start"]');
                            if (first_link) {
                                first_link.focus();
                            }
                        }
                    });

                    // Remove `animating` class at transition end.
                    area.addEventListener('transitionend', function() {
                        area.classList.remove(dropdown_is_animating_classname);
                    });

                });

            }
        }
	}

    // This is _here_ to mitigate a Flash of Basic Styled Dropdown:
    var css_is_loaded = check_for_css('.' + dropdown_js_has_classname);

    if (css_is_loaded) {
        // Add the JS class name ...
        var html_el = document.querySelector('html');

        html_el.classList.add(dropdown_js_has_classname);
    }

	ready(dropdown.init);
})();

/*! --------------------------------------------------------------------------------------------- *\
    
    Fall-Back Over Panel v2.0.0
    https://github.com/Fall-Back/Patterns/tree/master/Over%20Panel
    Copyright (c) 2021, Andy Kirk
    Released under the MIT license https://git.io/vwTVl

    Designed for use with the EM2 [CSS Mustard Cut](https://github.com/Fall-Back/CSS-Mustard-Cut)
    Edge, Chrome 39+, Opera 26+, Safari 9+, iOS 9+, Android ~5+, Android UCBrowser ~11.8+
    FF 47+

    PLUS IE11

\* ---------------------------------------------------------------------------------------------- */

(function() {

    //var debug             = true;
    var debug             = false;
    var ident             = 'over-panel';
    var selector          = '[data-js="' + ident + '"]';
    var overlay_selector  = '[data-js="' + ident + '__overlay"]';
    var control_selector  = '[data-js="' + ident + '__control"]';
    var contents_selector = '[data-js="' + ident + '__contents"]';

    var over_panel_js_has_classname       = 'js-has--' + ident;
    //var over_panel_js_classname           = 'js-' + ident;
    //var over_panel_control_js_classname   = 'js-' + ident + '-control';
    var over_panel_is_open_classname      = ident + '--is-open';
    var over_panel_is_animating_classname = ident + '--is-animating';

    var check_for_css = function(selector) {

        if (debug) {
            console.log('Checking for CSS: ' + selector);
        }

        var rules;
        var haveRule = false;
        if (typeof document.styleSheets != "undefined") { // is this supported
            var cssSheets = document.styleSheets;

            // IE doesn't have document.location.origin, so fix that:
            if (!document.location.origin) {
                document.location.origin = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ':' + document.location.port: '');
            }
            var domain_regex  = RegExp('^' + document.location.origin);

            outerloop:
            for (var i = 0; i < cssSheets.length; i++) {
                var sheet = cssSheets[i];

                // Some browsers don't allow checking of rules if not on the same domain (CORS), so
                // checking for that here:
                if (sheet.href !== null && domain_regex.exec(sheet.href) === null) {
                    continue;
                }

                // Check for IE or standards:
                rules = (typeof sheet.cssRules != "undefined") ? sheet.cssRules : sheet.rules;
                for (var j = 0; j < rules.length; j++) {
                    if (rules[j].selectorText == selector) {
                        haveRule = true;
                        break outerloop;
                    }
                }
            }
        }

        if (debug) {
            console.log(selector + ' ' + (haveRule ? '' : 'not') + ' found');
        }

        return haveRule;
    }

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }


	var over_panel = {

        init: function() {

            if (debug) {
                console.log('Initialising ' + ident);
            }

            if (css_is_loaded) {

                var over_panels = document.querySelectorAll(selector);

                Array.prototype.forEach.call(over_panels, function(over_panel, i) {

                    // Find corresponding controls:
                    var over_panel_id = over_panel.getAttribute('id');
                    var over_panel_control = document.querySelector('[aria-controls="' + over_panel_id + '"]');
                    var over_panel_overlay = over_panel.querySelector(overlay_selector);

                    // Check we've got a corresponding control. If not we can't proceed so skip:
                    if (!over_panel_control) {
                        return;
                    }

                    // Main toggle button:
                    over_panel_control.addEventListener('click', function() {

                        over_panel.classList.add(over_panel_is_animating_classname);

                        // Invert the `aria-expanded` attribute:
                        var expanded = this.getAttribute('aria-expanded') === 'true' || false;

                        // Close any open panels:
                        var expanded_buttons = document.querySelectorAll(control_selector + '[aria-expanded="true"]');
                        Array.prototype.forEach.call(expanded_buttons, function(expanded_button, i) {
                            //expanded_button.setAttribute('aria-expanded', 'false');
                            expanded_button.click();
                        });

                        // Set the attribute:
                        this.setAttribute('aria-expanded', !expanded);

                        // Toggle the `is_open` class:
                        if (!expanded) {
                            over_panel.classList.add(over_panel_is_open_classname);
                        } else {
                            over_panel.classList.remove(over_panel_is_open_classname);
                        }
                    });

					// Overlay click action:
					over_panel_overlay.addEventListener('click', function() {
						over_panel_control.click()
					});

                    // Remove `animating` class at transition end.
                    over_panel.addEventListener('transitionend', function() {
                        over_panel.classList.remove(over_panel_is_animating_classname);
                    });

                    // Focus trap inspired by:
					// http://heydonworks.com/practical_aria_examples/progressive-hamburger.html
                    var over_panel_contents = over_panel.querySelector(contents_selector);
                    var focusables          = over_panel_contents.querySelectorAll('a, button, input, select, textarea');

                    if (focusables.length > 0) {
                        var first_focusable     = focusables[0];
                        var last_focusable      = focusables[focusables.length - 1];

                        // At end of navigation block, return focus to navigation menu button
                        last_focusable.addEventListener('keydown', function(e) {
                            if (over_panel_control.getAttribute('aria-expanded') == 'true' && e.keyCode === 9 && !e.shiftKey) {
                                e.preventDefault();
                                over_panel_control.focus();
                            }
                        });

                        // At start of navigation block, refocus close button on SHIFT+TAB
                        over_panel_control.addEventListener('keydown', function(e) {
                            if (over_panel_control.getAttribute('aria-expanded') == 'true' && e.keyCode === 9 && e.shiftKey) {
                                e.preventDefault();
                                last_focusable.focus();
                            }
                        });
                    }
                });
            }
        }
	}

    // This is _here_ to mitigate a Flash of Basic Styled OverPanel:
    var css_is_loaded = check_for_css('.' + over_panel_js_has_classname);

    if (css_is_loaded) {
        // Add the JS class name ...
        var html_el = document.querySelector('html');

        html_el.classList.add(over_panel_js_has_classname);
    }

	ready(over_panel.init);
})();

/*
Details Element Polyfill 2.4.0
Copyright © 2019 Javan Makhmali
 */
(function() {
  "use strict";
  var element = document.createElement("details");
  var elementIsNative = typeof HTMLDetailsElement != "undefined" && element instanceof HTMLDetailsElement;
  var support = {
    open: "open" in element || elementIsNative,
    toggle: "ontoggle" in element
  };
  //var styles = '\ndetails, summary {\n  display: block;\n}\ndetails:not([open]) > *:not(summary) {\n  display: none;\n}\nsummary::before {\n  content: "►";\n  padding-right: 0.3rem;\n  font-size: 0.6rem;\n  cursor: default;\n}\n[open] > summary::before {\n  content: "▼";\n}\n';
  var _ref = [], forEach = _ref.forEach, slice = _ref.slice;
  if (!support.open) {
    //polyfillStyles();
    polyfillProperties();
    polyfillToggle();
    polyfillAccessibility();
  }
  if (support.open && !support.toggle) {
    polyfillToggleEvent();
  }
  function polyfillStyles() {
    document.head.insertAdjacentHTML("afterbegin", "<style>" + styles + "</style>");
  }
  function polyfillProperties() {
    var prototype = document.createElement("details").constructor.prototype;
    var setAttribute = prototype.setAttribute, removeAttribute = prototype.removeAttribute;
    var open = Object.getOwnPropertyDescriptor(prototype, "open");
    Object.defineProperties(prototype, {
      open: {
        get: function get() {
          if (this.tagName == "DETAILS") {
            return this.hasAttribute("open");
          } else {
            if (open && open.get) {
              return open.get.call(this);
            }
          }
        },
        set: function set(value) {
          if (this.tagName == "DETAILS") {
            return value ? this.setAttribute("open", "") : this.removeAttribute("open");
          } else {
            if (open && open.set) {
              return open.set.call(this, value);
            }
          }
        }
      },
      setAttribute: {
        value: function value(name, _value) {
          var _this = this;
          var call = function call() {
            return setAttribute.call(_this, name, _value);
          };
          if (name == "open" && this.tagName == "DETAILS") {
            var wasOpen = this.hasAttribute("open");
            var result = call();
            if (!wasOpen) {
              var summary = this.querySelector("summary");
              if (summary) summary.setAttribute("aria-expanded", true);
              triggerToggle(this);
            }
            return result;
          }
          return call();
        }
      },
      removeAttribute: {
        value: function value(name) {
          var _this2 = this;
          var call = function call() {
            return removeAttribute.call(_this2, name);
          };
          if (name == "open" && this.tagName == "DETAILS") {
            var wasOpen = this.hasAttribute("open");
            var result = call();
            if (wasOpen) {
              var summary = this.querySelector("summary");
              if (summary) summary.setAttribute("aria-expanded", false);
              triggerToggle(this);
            }
            return result;
          }
          return call();
        }
      }
    });
  }
  function polyfillToggle() {
    onTogglingTrigger(function(element) {
      element.hasAttribute("open") ? element.removeAttribute("open") : element.setAttribute("open", "");
    });
  }
  function polyfillToggleEvent() {
    if (window.MutationObserver) {
      new MutationObserver(function(mutations) {
        forEach.call(mutations, function(mutation) {
          var target = mutation.target, attributeName = mutation.attributeName;
          if (target.tagName == "DETAILS" && attributeName == "open") {
            triggerToggle(target);
          }
        });
      }).observe(document.documentElement, {
        attributes: true,
        subtree: true
      });
    } else {
      onTogglingTrigger(function(element) {
        var wasOpen = element.getAttribute("open");
        setTimeout(function() {
          var isOpen = element.getAttribute("open");
          if (wasOpen != isOpen) {
            triggerToggle(element);
          }
        }, 1);
      });
    }
  }
  function polyfillAccessibility() {
    setAccessibilityAttributes(document);
    if (window.MutationObserver) {
      new MutationObserver(function(mutations) {
        forEach.call(mutations, function(mutation) {
          forEach.call(mutation.addedNodes, setAccessibilityAttributes);
        });
      }).observe(document.documentElement, {
        subtree: true,
        childList: true
      });
    } else {
      document.addEventListener("DOMNodeInserted", function(event) {
        setAccessibilityAttributes(event.target);
      });
    }
  }
  function setAccessibilityAttributes(root) {
    findElementsWithTagName(root, "SUMMARY").forEach(function(summary) {
      var details = findClosestElementWithTagName(summary, "DETAILS");
      summary.setAttribute("aria-expanded", details.hasAttribute("open"));
      if (!summary.hasAttribute("tabindex")) summary.setAttribute("tabindex", "0");
      if (!summary.hasAttribute("role")) summary.setAttribute("role", "button");
    });
  }
  function eventIsSignificant(event) {
    return !(event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.target.isContentEditable);
  }
  function onTogglingTrigger(callback) {
    addEventListener("click", function(event) {
      if (eventIsSignificant(event)) {
        if (event.which <= 1) {
          var element = findClosestElementWithTagName(event.target, "SUMMARY");
          if (element && element.parentNode && element.parentNode.tagName == "DETAILS") {
            callback(element.parentNode);
          }
        }
      }
    }, false);
    addEventListener("keydown", function(event) {
      if (eventIsSignificant(event)) {
        if (event.keyCode == 13 || event.keyCode == 32) {
          var element = findClosestElementWithTagName(event.target, "SUMMARY");
          if (element && element.parentNode && element.parentNode.tagName == "DETAILS") {
            callback(element.parentNode);
            event.preventDefault();
          }
        }
      }
    }, false);
  }
  function triggerToggle(element) {
    var event = document.createEvent("Event");
    event.initEvent("toggle", false, false);
    element.dispatchEvent(event);
  }
  function findElementsWithTagName(root, tagName) {
    return (root.tagName == tagName ? [ root ] : []).concat(typeof root.getElementsByTagName == "function" ? slice.call(root.getElementsByTagName(tagName)) : []);
  }
  function findClosestElementWithTagName(element, tagName) {
    if (typeof element.closest == "function") {
      return element.closest(tagName);
    } else {
      while (element) {
        if (element.tagName == tagName) {
          return element;
        } else {
          element = element.parentNode;
        }
      }
    }
  }
})();
