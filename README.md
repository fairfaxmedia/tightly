# Tightly

## What is this?

This is a tool for populating [sightly](http://blogs.adobe.com/experiencedelivers/experience-management/sightly-intro-part-1/) templates with dummy data via JavaScript.

## Why is this needed?

We need a mechanism to load sightly templates with data when they are not served
in a CQ environment.

This allows us to demonstrate the template, filled with exmaple data, in non-CQ
contexts such as the pattern library.

## Usage

Create a data object, with keys representing the data we want to replace, and
the values containing the data we want to inject into the template.

Note that a key is either:

* the literal string that will be replaced (in the case of single-line replacements)

* or the base64 representation of the literal string that will be replaced (in the
case of multi-line replacements)

        var data = {
            'data-sly-text="${msg}"':
            (function() {/*
                data-sly-text="cool"
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

As the tests show, the first item in the data array above can be used as such:

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

Whereas the second item in the data array above can be used as such:

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

        // To generate the base64 string, simply do:
        // console.log(window.btoa(find));

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

## Tests

To see the tests in action:

* install dependencies

        bower install

* open the `SpecRunner.html` in a browser
