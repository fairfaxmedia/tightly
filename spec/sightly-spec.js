describe("Our template engine", function() {
    "use strict";

    tim.settings({start: '\\${'});
    tim.settings({end: '}'});

    var data = {
        msg: 'cool',
        wcmmode: {
            edit: false,
            display: 'stuff'
        }
    };

    it ("should allow interpolation of template variables, e.g. '<p>This is ${msg} stuff</p>'", function() {

        var mockBefore = (function() {/*
            <p>This is ${msg} stuff</p>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var mockAfter = (function() {/*
            <p>This is cool stuff</p>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tim(mockBefore, data)).toBe(mockAfter);
    });

    it ("should allow interpolation of attribute templates, e.g. '<p data-sly-test=\"${wcmmode.display}\">'", function() {

        var mockBefore = (function() {/*
            <p data-sly-test="${wcmmode.display}">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var mockAfter = (function() {/*
            <p data-sly-test="stuff">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tim(mockBefore, data)).toBe(mockAfter);
    });

    it ("should allow interpolation of simple 'or' conditional attribute templates, e.g. '<p data-sly-test=\"${wcmmode.edit || wcmmode.display}\">'", function() {

        var mockBefore = (function() {/*
            <p data-sly-test="${wcmmode.edit || wcmmode.display}">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var mockAfter = (function() {/*
            <p data-sly-test="stuff">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tim(mockBefore, data)).toBe(mockAfter);
    });

    it ("should allow interpolation of simple 'and' conditional attribute templates, e.g. '<p data-sly-test=\"${wcmmode.edit && wcmmode.display}\">'", function() {

        var mockBefore = (function() {/*
            <p data-sly-test="${wcmmode.display && wcmmode.edit}">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var mockAfter = (function() {/*
            <p data-sly-test="false">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tim(mockBefore, data)).toBe(mockAfter);
    });

    it ("should allow interpolation of simple '!' conditional attribute templates, e.g. '<p data-sly-test=\"${!wcmmode.edit}\">'", function() {

        var mockBefore = (function() {/*
            <p data-sly-test="${!wcmmode.edit}">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var mockAfter = (function() {/*
            <p data-sly-test="true">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tim(mockBefore, data)).toBe(mockAfter);
    });

    it ("should allow interpolation of complex conditional attribute templates, e.g. '<p data-sly-test=\"${wcmmode.edit && wcmmode.display || !wcmmode.edit}\">'", function() {

        var mockBefore = (function() {/*
            <p data-sly-test="${wcmmode.edit && wcmmode.display || !wcmmode.edit}">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var mockAfter = (function() {/*
            <p data-sly-test="true">
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tim(mockBefore, data)).toBe(mockAfter);
    });


});
