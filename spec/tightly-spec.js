describe("Tightly", function() {
    "use strict";

    var data = {
        '<p data-sly-text="${msg}">TEXT TO BE REPLACED</p>':
        (function() {/*
            <p data-sly-text="cool">cool</p>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1],

        'data-sly-text="${msg}"':
        (function() {/*
            data-sly-text="cool"
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1],

        /*
            <ul data-sly-list.child='${currentPage.listChildren}'>
              <li>${child.title}</li>
            </ul>
        */
        'CiAgICAgICAgICAgIDx1bCBkYXRhLXNseS1saXN0LmNoaWxkPScke2N1cnJlbnRQYWdlLmxpc3RDaGlsZHJlbn0nPgogICAgICAgICAgICAgIDxsaT4ke2NoaWxkLnRpdGxlfTwvbGk+CiAgICAgICAgICAgIDwvdWw+CiAgICAgICAg':
        (function() {/*
            <ul data-sly-list.child='[{"title":"Title 1"},{"title":"Title 2"},{"title":"Title 3"}]'>
              <li>Title 1</li>
              <li>Title 2</li>
              <li>Title 3</li>
            </ul>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1],

        /*
                <ul data-sly-list.child='${currentPage.listChildren}'>
                  <li>${child.title}</li>
                </ul>
        */
        'CiAgICAgICAgICAgICAgICA8dWwgZGF0YS1zbHktbGlzdC5jaGlsZD0nJHtjdXJyZW50UGFnZS5saXN0Q2hpbGRyZW59Jz4KICAgICAgICAgICAgICAgICAgPGxpPiR7Y2hpbGQudGl0bGV9PC9saT4KICAgICAgICAgICAgICAgIDwvdWw+CiAgICAgICAg':
        (function() {/*
                <ul data-sly-list.child='[{"title":"Title 1"},{"title":"Title 2"},{"title":"Title 3"}]'>
                  <li>Title 1</li>
                  <li>Title 2</li>
                  <li>Title 3</li>
                </ul>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]
    };

    it ("should allow replacement of a string within a single-line template, where the string is the entire template", function() {

        var find = (function() {/*
            <p data-sly-text="${msg}">TEXT TO BE REPLACED</p>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var target = (function() {/*
            <p data-sly-text="cool">cool</p>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tightly(find, find, data)).toBe(target);
    });

    it ("should allow replacement of a string within a single-line template, where the string is not the entire template", function() {

        var template = (function() {/*
            <p data-sly-text="${msg}">MY NEW TEXT</p>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var find = (function() {/*
            data-sly-text="${msg}"
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var target = (function() {/*
            <p data-sly-text="cool">MY NEW TEXT</p>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tightly(template, find, data)).toBe(target);
    });

    it ("should allow replacement of a string within a multi-line template, where the string is the entire template", function() {

        var find = (function() {/*
            <ul data-sly-list.child='${currentPage.listChildren}'>
              <li>${child.title}</li>
            </ul>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var target = (function() {/*
            <ul data-sly-list.child='[{"title":"Title 1"},{"title":"Title 2"},{"title":"Title 3"}]'>
              <li>Title 1</li>
              <li>Title 2</li>
              <li>Title 3</li>
            </ul>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tightly(find, find, data)).toBe(target);
    });

    it ("should allow replacement of a string within a multi-line template, where the string is not the entire template", function() {

        var template = (function() {/*
            <div>
                <ul data-sly-list.child='${currentPage.listChildren}'>
                  <li>${child.title}</li>
                </ul>
            </div>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        var find = (function() {/*
                <ul data-sly-list.child='${currentPage.listChildren}'>
                  <li>${child.title}</li>
                </ul>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

//console.log(window.btoa(find));

        var target = (function() {/*
            <div>
                <ul data-sly-list.child='[{"title":"Title 1"},{"title":"Title 2"},{"title":"Title 3"}]'>
                  <li>Title 1</li>
                  <li>Title 2</li>
                  <li>Title 3</li>
                </ul>
            </div>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

        expect(tightly(template, find, data)).toBe(target);
    });

});
