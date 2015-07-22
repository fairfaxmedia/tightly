/*
** Tightly: a simple tool to populate sightly templates with mock data.
**
 */

(function(name, definition, context) {
    if (typeof module != 'undefined' && module.exports) {
        module.exports = definition();
    } else if (typeof context['define'] == 'function' && context['define']['amd']) {
        define(definition);
    } else {
        context[name] = definition();
    }
})('tightly', function() {

    var tightly = (function createTightly(initSettings){
        "use strict";

        function tightly(template, find, data){
            // We store our templates in the data array keyed either by the
            // trimmed template string itself, or the base64 representation if
            // the template is multi-line.
            var value = data[find.trim()] || data[window.btoa(find)];

            if (value) {
                return template.replace(find.trim(), value.trim())
            }

            return template;
        }

        return tightly;
    }());

    return tightly;

}, this);
