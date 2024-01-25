# Link Purpose

Vanilla JS to mark external links, links that open in new windows, links to documents and links that send emails.

Why JS? 
1. The last word of the link can be wrapped into a span with the icon, preventing line breaks between the text and the icon.
2. Inline SVG can be used, taking advantage of CSS's currentColor fill to follow the link text's color through hover and focus states.
3. Visually hidden, translatable text can be provided for screen readers.
4. Links inside Shadow DOM components can be marked as well.

The library accepts numerous parameters for which links to mark and how. By default, it will convert this:
```
<a href="https://example.com">
    EXAMPLE LINK
</a>
```
to:
```
<a href="https://example.com" class="link-purpose link-purpose-external">
    EXAMPLE 
    <span class="link-purpose-nobreak">
        LINK
        <span class="link-purpose-icon link-purpose-external-icon">
            <svg ...></svg>
            <span class="link-purpose-text">
                (Link is external)
            </span>
        </span>
    </span>
</a>
```

You can also bring your own icons: inline SVG, remote img files and class-based symbol fonts (e.g. FontAwesome) are supported.

## Basic use

Download and attach the JS and the default CSS:
```
<link rel="stylesheet" media="all" href="/YOUR-PATH-TO/linkpurpose.css">

<script src="/YOUR-PATH-TO/linkpurpose.min.js"></script>
```

And then call the library, optionally specifying domains that should be treated as internal links:
```
<script>

    const linkPurpose = new LinkPurpose({
        
        domain: 'https://example.com, https://example.dev',
   
    })

</script>
```

And that's it. 


## Overriding classes and icons

Default parameters may be overridden when calling the library.

E.g., to set your own classes for all marked links, override the "allPurposes" classes:

```
<script>
    const linkPurpose = new LinkPurpose({
        
        domain: 'https://example.com, https://example.dev',

        allPurposes: {
            linkClass: 'my-better-class',
            iconWrapperClass: 'my-better-icon-class',
        }

    })
</script>
```

You only have to list options you want to override; any "missing" keys will fall back to the defaults.

### Using class-based icon fonts 

This assumes you already have a class-based icon library on the page. 

Here's an example configuration that switches all four default purposes to use classes rather than the included inline ([Material](https://fonts.google.com/icons)) SVG icons. [FontAwesome](https://fontawesome.com/docs/web/setup/get-started) icon classes are provided by default:

```
purposes: {
    externalLink: {
        iconType: 'classes',
    },

    document: {
        iconType: 'classes',
    },

    mailTo: {
        iconType: 'classes',
    },

    newWindow: {
        iconType: 'classes',
    },
}
```

You can then provide your own classes for any of these using the "iconClasses" key:
```
purposes: {
    externalLink: {
        iconType: 'classes',
        iconClasses: ['fa-regular','fa-face-smile'],
    },
    // et cetera 
}
```

### Using image files
Switch the iconType to SRC and provide your image's source URL:

```
purposes: {
    externalLink: {
        iconType: 'src',
        iconSRC: '/example/theme/folder/new-window.png',
    },

    document: {
        iconType: 'src',
        iconSRC: '/example/theme/folder/document.png',
    },

    mailTo: {
        iconType: 'src',
        iconSRC: '/example/theme/folder/mailto.png',
    },

    newWindow: {
        iconType: 'src',
        iconSRC: '/example/theme/folder/new-window.png',
    },
}
```


### Using inline SVG
This is the default icon type, so you just need to provide the SVG you want overridden. E.g.:
```
purposes: {
    document: {
            iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M360-240h240q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320H360q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm0-160h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z"/></svg>',
    }
}
```

## Translating and/or overriding the text provided to screen readers
Each of the four marked link types has a default hidden text provided to screen readers. Each can be overriden.
```
purposes: {
    mailto: {
        message: '(Correo electrónico)',
    },
}
```

## Controlling which links get marked

Maybe you only want to mark links in the content area and footer...so provide your selectors for these regions in the "roots" option: 
```
roots: '.example-content-area, #example-footer',
```

Maybe the content area contains a widget with its own icons. Skip that by defining a CSS :not() selector for links you want ignored:
```
ignore: ':not(.example-widget a, #example-footer nav a, .example-ok-link)',
```

Or maybe the content area contains some shadow DOM / Web components, and you want the library to check within them:
```
shadowComponents: 'example-component-1, .example-component-2',
```

### Disabling a link category
Maybe you do not want to mark external links at all, only documents, emails and new windows. Each of the four can be disabled independently by negating its selector:
```
purposes: {
    newWindow: {
        selector: false,
    }
}
```

### Adding a link category
This is a bit more work, because you need to provide all the keys the base library looks for. 

Here's an example that adds a type for spreadsheets, and assigns it to the FontAwesome Excel icon class:
```
purposes: {
    spreadsheet: {
          selector: '[href$=\'.xls\'], [href*=\'.xls?\'], [href^="https://docs.google.com/spreadsheets/"]',
          message: '(Link downloads spreadsheet)',
          linkClass: 'link-purpose-spreadsheet',
          iconWrapperClass: 'link-purpose-spreadsheet-icon',
          iconType: 'classes',
          iconHTML: false,
          iconSRC: false,
          iconClasses: ['fa-regular', 'fa-file-excel'],
        },
}
```

### Prevent marking certain pages

Maybe you have a dynamic, inline editing tool, and you do not want the DOM manipulated if it is present. Or maybe you only want the page modified if something is NOT present.
```
noRunIfPresent: '.example-editor-toolbar',

noRunIfAbsent: '.example-public-content-wrapper,
```

### Overriding selectors

Default selectors are provided for links (`a[href]`), as well as what links are mailTo, documents, etc.

Any of these selectors can be overridden if you want to mark more (or less). e.g.:
```
baseSelector: {

    selector: 'a[href], custom-link-tag[href]',

}

purposes: {

    document: {
        selector: '[href$=\'.pdf\'], [href*=\'.latex?\']',
    }

    mailto: {
        selector: '[href^="mailto:"], [data-action-mail-to]',
    }

}
```
