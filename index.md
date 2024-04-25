## Accessibility enhancements for links

*Link Purpose Icons* is a lightweight vanilla JS library that finds and marks links that introduce a change of context:

* <a href="mailto:comments@whitehouse.gov">Opening an email client</a>
* <a href="tel:555-555-5555">Making a telephone call</a>
* <a href="https://www.irs.gov/pub/irs-pdf/f1040.pdf">Opening a document</a>
* <a href="https://github.com/itmaybejj/linkpurpose/archive/refs/heads/main.zip" download>Downloading a file</a>
* <a href="https://github.com/itmaybejj/linkpurpose">External links</a>
* <a href="slack://open">Links that directly open apps</a>
* <a href="/" target="_blank">Opening a new window</a>

Each category is optional, and custom categories and icons can be defined in config.

### Why JS?
Much of this *can* be done with fancy CSS, e.g.
```css
a[href^="mailto:"]::after {
  content: "(Link sends email)";
}
```

But JS lets us do some fancy things:
1. The last word of the link can be wrapped into a span with the icon, preventing line breaks between the text and the icon.
2. Inline SVG can be used, which follow the link text's color through hover and focus states.
3. Visually hidden, *translatable* text alternatives for screen readers can be provided. Automatic translations tend to miss text in CSS.
4. Links inside Shadow DOM/Web components can be marked as well.


### Generated markup
The library accepts numerous parameters for its markup. But by default, it will convert this:
```html
<a href="https://example.com">
    EXAMPLE LINK
</a>
```
to this:
```html
<a href="https://example.com" class="link-purpose link-purpose-external">
    EXAMPLE 
    <span class="link-purpose-nobreak">
        LINK
        <span class="link-purpose-icon link-purpose-external-icon" aria-hidden="true">
            <svg ...></svg>
        </span>
        <span class="link-purpose-text">
            (Link is external)
        </span>
    </span>
</a>
```

The default icons can be overridden using inline SVG, img files, class-based symbol fonts (e.g. FontAwesome) and text-based symbol fonts (Material).

&nbsp;
&nbsp;

## Installation

There is a turnkey [Drupal module](https://www.drupal.org/project/linkpurpose).

For standalone installs, download and attach the JS and the default CSS:
```html
<link rel="stylesheet" media="all" href="/YOUR-PATH-TO/linkpurpose.css">

<script src="/YOUR-PATH-TO/linkpurpose.min.js"></script>
```

And then call the library, optionally specifying domains that should be treated as internal links:
```html
<script>

    const linkPurpose = new LinkPurpose({
        
        domain: 'https://example.com, https://example.dev',
   
    })

</script>
```

And that's it.

&nbsp;
&nbsp;


## Choosing your own classes and icons

### Override base classes

```html
<script>
    const linkPurpose = new LinkPurpose({

        baseLinkClass: 'link-purpose',
        baseIconWrapperClass: 'link-purpose-icon',
        noBreakClass: 'link-purpose-nobreak',

    })
</script>
```

You only have to list options you want to override; any "missing" keys will fall back to the defaults.


### Custom icons via inline SVG
This is the default icon type, so you just need to provide the SVG you want overridden. E.g.:
```html
<script>
    const linkPurpose = new LinkPurpose({
        
        purposes: {
            document: {
                iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M360-240h240q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320H360q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm0-160h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z"/></svg>',
            }
            // etc.
        }
    })
</script>
```

&nbsp;

### Class-based icon fonts (e.g. FontAwesome)

This assumes you already have a class-based icon library on the page.

Here's an example configuration that switches each of the default purposes to use classes rather than the included inline SVG icons:

```js
// ...inside script wrapper...

purposes: {
    app: {
      iconType: 'classes',
    },
    externalLink: {
      iconType: 'classes',
    },
    document: {
      iconType: 'classes',
    },
    download: {
      iconType: 'classes',
    },
    mailTo: {
      iconType: 'classes',
    },
    newWindow: {
      iconType: 'classes',
    },
    tel: {
      iconType: 'classes',
    },
}
```

&nbsp;

### Text-based icon fonts (e.g. Material)

If no classes are specified, the [FontAwesome](https://fontawesome.com/docs/web/setup/get-started) classes that match the default SVGs will be inserted.

Specify custom classes with the iconClasses key. This would make a [smiley face](https://fontawesome.com/icons/smile?f=classic&s=regular):
```js
purposes: {
  download: {
    iconHTML: '<span class="material-symbols-outlined">download</span>',
  },
  // etc.
},

```

&nbsp;

### Custom icons via CSS
Switch the iconType to classes, and provide your icons via CSS pseudo-elements or background images. E.g.:

```css
/* Applies to mailto */
.link-purpose-mailto-icon {
  background-image: url("/my-images-folder/my-envelope-icon.svg");
}

/* Applies to all */
.link-purpose-icon {
    background-size: .75em .75em;
    background-repeat: no-repeat;
}

/* Declare colors, since they will no longer inherit */
.link-purpose-icon:hover,
.link-purpose-icon:focus, {
    filter: hue-rotate(180deg);
}

/* etc... */

```

&nbsp;
&nbsp;

## Translations and/or overriding the text provided to screen readers

Each of the marked link types has a default hidden text provided to screen readers. Each can be overridden:
```js
// ...inside script wrapper...

purposes: {
    mailto: {
        message: '(Correo electrónico)',
    },
}
```

&nbsp;
&nbsp;

## Controlling which links get marked

### Only mark links within these sections of the page

```js
roots: '.example-content-area, #example-footer'
```

### Visually hide the icon on specific links

The screen reader hint text will still be inserted.

```js
hideIcon: '.fancycard a, .in-the-news a,
```

### Visually hide the icon on links that contain images

Themers can selectively reveal these icons via CSS, e.g. `.my-container .link-purpose-icon {display: initial;}`:
```js
noIconOnImages: true,
```

### Ignore certain links
```js
ignore: '.purchase-links a, .external-resources a',
```

### Check within Web components
```js
// Selector for component
shadowComponents: 'fancy-widget, tab-panel', 
// CSS file to insert into shadow components. e.g., /path/to/linkpurpose.css
shadowCSS : false,
```
&nbsp;


### Prevent marking certain pages

These parameters make sure the library does not modify the DOM when a selector is present or absent, e.g., while a page is being edited:
```js
// ...inside script wrapper...

noRunIfPresent: '.edit-mode',

noRunIfAbsent: '.page-content,
```

&nbsp;

## Overriding selectors

Default selectors are provided for which both HTML tags are links (`a[href]`) as well as which links match each category.

These selectors can be overridden if you want to mark more (or less). e.g.:

```js
/* Treat custom element as if it is a link */
baseSelector: 'a[href], custom-link-tag',

purposes: {
    mailto: {
        /* Add selector for JS-based action */
        selector: '[href^="mailto:"], [data-action-mail-to]',
    }
}
```


## Removing a link category
Negate the selector to turn off a link category:
```js
purposes: {
    newWindow: {
        selector: false,
    }
}
```
&nbsp;

## Adding a link category
This is a bit more work, because you must provide ALL the keys the base library looks for, or the library may error out.

Here's an example that adds a type for spreadsheets, and assigns it to the FontAwesome Excel icon class:
```js
purposes: {
    spreadsheet: {
          priority: 50, // Highest number "wins" on multiple matches, e.g. a spreadsheet download from an external site
          selector: '[href$=\'.xls\'], [href*=\'.xls?\'], [href^="https://docs.google.com/spreadsheets/"]',
          message: '(Link downloads spreadsheet)', // Hidden text for screen readers
          linkClass: 'link-purpose-spreadsheet', // Goes on link
          iconWrapperClass: 'link-purpose-spreadsheet-icon', // Goes on span around icon
          iconPosition: 'beforeend', // beforebegin, afterbegin, beforeend, afterend
          iconType: 'classes', // Apply classes to a span to create link
          iconClasses: ['fa-regular', 'fa-file-excel'], // Apply these classes
          redundantStrings: /(xls|spreadsheet|download)/i, // Do not add screen reader text if the text of the link matches this regex
        },
}
```

&nbsp;
&nbsp;

## All available parameters

This is the *entire* default option set. Override any of these as suggested above, or add additional Purposes.

And remember that *your* options array should only contain the keys you want overridden. For most sites, that is just the domain and what type of icon you want to use.

```html
<script>

    const linkPurpose = new LinkPurpose({

        domain: false, // your site's internal domain https://mysite.example

        watch: true,

        // Only check within these containers, e.g. "#main, footer."
        roots: 'body',

        // Shadow components inside the root to check within, e.g., 'accordion, spa-content'
        shadowComponents: false,
        // CSS file to insert into shadow components. e.g., /path/to/linkpurpose.css
        shadowCSS : false,

        // For these links, only provide the screen reader help text. e.g. '.in-the-news a'
        hideIcon: '',
        noIconOnImages: '',

        // Make sure the icon does not end up inside these hidden spans in the link.
        // E.g., <a href>Email <span class="sr-only">J. Smith</span></a>
        insertIconOutsideHiddenSpan: '.sr-only, .visually-hidden',

        // Identify links directly, e.g. "header a, footer a, .my-ok-link".
        // If this is not a valid selector, no links will be flagged.
        ignore: '',

        // Do not run if these elements are present or absent, e.g., ".live-editing-toolbar" or ".editable-content"
        noRunIfPresent: false,
        noRunIfAbsent: false,

        // Selector for links to examine.
        baseSelector: 'a[href]',

        // Classes for all matched links
        baseLinkClass: 'link-purpose', // A unique class MUST be provided to prevent recursion
        baseIconWrapperClass: 'link-purpose-icon',
        noBreakClass: 'link-purpose-nobreak',
        hiddenTextClass: false,

        // Mask headers when users click out to external links
        noReferrer: false,

        purposes: {

            // These are listed in priority order

            newWindow: {
                priority: 0, // Higher numbers "win," e.g. external documents in new window will be marked as documents
                selector: '[target="_blank"]', // Which <a> tags will be marked
                message: 'Link opens in new window', // Hidden text for screen readers
                linkClass: 'link-purpose-window', // Goes on link
                iconWrapperClass: 'link-purpose-window-icon', // Goes on span around icon
                iconType: 'html', // html, src or classes
                iconPosition: 'beforeend', // beforebegin, afterbegin, beforeend, afterend
                iconHTML: '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M432 48H208c-17.7 0-32 14.3-32 32V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V336h16c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32zM48 448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V256H48V448zM64 128H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z"/></svg>',
                iconClasses: ['fa-regular', 'fa-window-restore'], // Goes on icon span only if iconType is "classes"
                redundantStrings: /\b(window|tab)\b/i, // Screen reader text will not be inserted if present
            },

            external: {
                priority: 10,
                selector: '[href*="https://"], [href^="http://"]', // Protocol prefixes to be tested against the domain.
                additionalSelector: false, // Links that should always match, e.g. '[href^="/redirect-to/"]'
                newWindow: false,
                message: 'Link is external',
                linkClass: 'link-purpose-external',
                iconWrapperClass: 'link-purpose-external-icon',
                iconType: 'html',
                iconPosition: 'beforeend',
                iconHTML: '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>',
                iconClasses: ['fa-solid', 'fa-up-right-from-square'],
                redundantStrings: false,
            },

            download: {
                priority: 20,
                selector: '[download]',
                message: 'Link downloads file',
                linkClass: 'link-purpose-download',
                iconWrapperClass: 'link-purpose-download',
                iconType: 'html',
                iconPosition: 'beforeend',
                iconHTML: '<svg class="linkpurpose-default-svg" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
                iconClasses: ['fa-solid', 'fa-download'], // set iconType to classes to use
                redundantStrings: /(download)/i,
            },

            document: {
                priority: 50,
                selector: '[href$=\'.pdf\'], [href*=\'.pdf?\'], [href$=\'.doc\'], [href$=\'.docx\'], [href*=\'.doc?\'], [href*=\'.docx?\'], [href$=\'.ppt\'], [href$=\'.pptx\'], [href*=\'.ppt?\'], [href*=\'.pptx?\']',
                message: 'Links downloads document', // filetype will be appended
                linkClass: 'link-purpose-document',
                iconWrapperClass: 'link-purpose-document-icon',
                iconType: 'html',
                iconPosition: 'beforeend',
                iconHTML: '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>',
                iconClasses: ['fa-regular', 'fa-file-lines'], // set iconType to classes to use
                redundantStrings: /\b(download|file|document|doc|docx|word|excel|xls|xlsx|powerpoint|pptx|ppt)\b/i,
            },

            // Ref www.iana.org/assignments/uri-schemes/uri-schemes.xhtml
            app: {
                priority: 90, // Unknown protocols generally win.
                selector: ':is([href*="://"]):not([href^="https:"], [href^="http:"], [href^="file:"])',
                additionalSelector: false,
                newWindow: false,
                message: 'Link opens app',
                linkClass: 'link-purpose-app',
                iconWrapperClass: 'link-purpose-app-icon',
                iconType: 'html',
                iconPosition: 'beforeend',
                iconHTML: '<svg class="linkpurpose-default-svg" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M432 64H208c-8.8 0-16 7.2-16 16V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V320h16c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16zM0 192c0-35.3 28.7-64 64-64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192zm64 32c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32 14.3-32 32z"/></svg>',
                iconClasses: ['fa-solid', 'fa-window-restore'],
                redundantStrings: false,
            },

            mail: {
                priority: 100, // Known protocol queries always win.
                selector: '[href^="mailto:"]',
                message: 'Link opens email app',
                linkClass: 'link-purpose-mailto',
                iconWrapperClass: 'link-purpose-mail-icon',
                iconType: 'html',
                iconPosition: 'beforeend',
                iconHTML: '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>',
                iconClasses: ['fa-regular', 'fa-envelope'], // set iconType to classes to use
                redundantStrings: /@|mail/i,
            },

            tel: {
                priority: 100, // Known protocol queries always win.
                selector: '[href^="tel:"]',
                message: 'Link opens phone app',
                linkClass: 'link-purpose-tel',
                iconWrapperClass: 'link-purpose-tel-icon',
                iconType: 'html',
                iconPosition: 'beforeend',
                iconHTML: '<svg class="linkpurpose-default-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/></svg>',
                iconClasses: ['fa-solid', 'fa-square-phone'], // set iconType to classes to use
                redundantStrings: false,
            }
      }
   
    })

</script>
```

<!--suppress HtmlUnknownTarget -->
<div hidden><style>
.wrapper {
  margin: auto;
  min-height: 100vh;
  }
a {font-weight: 500;}
a.github {
  display: inline-block;
  height: auto;
  padding: 12px 2px 12px 32px;
}
header li {
  width: 11rem;
  height: auto;
}
body {
  font-size: 16px;
}
header {
  width: auto;
  max-width: 192px;
}
@media print, screen and (max-width: 960px) {
  header ul {
    position: relative;
    right: auto;
    top: auto;
    }
  body {
    padding: 0 2vw 0 1vw;
  }
  header {
    width: 90vw;
    max-width: 90vw;
    padding-right: 0;
    margin-top: 12px;
    margin-left: -1vw;
  }
  header li {
    max-width: 68vw;
  }
  div.wrapper {
    width: 100%;
  }
}
</style>
 <script src="{{ site.baseurl}}/js/linkpurpose.min.js"></script>
 <link rel="stylesheet" href="/linkpurpose/css/linkpurpose.css">
  <!--suppress JSUnusedGlobalSymbols -->
<script>
      const linkPurpose = new LinkPurpose({
          ignore: '.buttons'
          });
  </script>
</div>
