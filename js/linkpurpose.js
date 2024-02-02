/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
class LinkPurpose {
  // ESLint config

  constructor (option) {
    LinkPurpose.version = 'dev'

    const defaultOptions = {

      // TODO: mutationObserver on roots

      domain: false, // your site's internal domain https://mysite.example

      // Only check within these containers, e.g. "#main, footer."
      roots: 'body',

      // Shadow components inside the root to check within, e.g., 'accordion, spa-content'
      shadowComponents: false,

      // :not() based selector to ignore.
      // Identify links directly, e.g. ":not(header a, footer a, .my-ok-link)".
      // If this is not a valid selector, no links will be flagged.
      ignore: '',

      // Do not run if these elements are present or absent, e.g., ".live-editing-toolbar" or ".editable-content"
      noRunIfPresent: false,
      noRunIfAbsent: false,

      // Selector for links to examine.
      baseSelector: 'a[href]',

      // Classes for all matched links
      baseLinkClass: 'link-purpose',
      baseIconWrapperClass: 'link-purpose-icon',
      noBreakClass: 'link-purpose-nobreak',

      purposes: {
        external: {
          selector: '[href*="://"], [href^="//"]', // Inverted; these are relative URLs.
          message: '(Link is external)',
          linkClass: 'link-purpose-external',
          iconWrapperClass: 'link-purpose-external-icon',
          iconType: 'html', // html, src or classes
          iconPosition: 'beforeend',
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>',
          iconClasses: ['fa-regular', 'fa-up-right-from-square'] // set iconType to classes to use
        },

        document: {
          selector: '[href$=\'.pdf\'], [href*=\'.pdf?\'], [href$=\'.doc\'], [href$=\'.docx\'], [href*=\'.doc?\'], [href*=\'.docx?\'], [href$=\'.ppt\'], [href$=\'.pptx\'], [href*=\'.ppt?\'], [href*=\'.pptx?\'], [href^=\'https://docs.google\']',
          message: '(Link opens document)',
          linkClass: 'link-purpose-document',
          iconWrapperClass: 'link-purpose-document-icon',
          iconType: 'html',
          iconPosition: 'beforeend',
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="14" height="14" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>',
          iconClasses: ['fa-regular', 'fa-file-lines'] // set iconType to classes to use
        },

        mail: {
          selector: '[href^="mailto:"]',
          message: '(Link sends Email)',
          linkClass: 'link-purpose-mailto',
          iconWrapperClass: 'link-purpose-mail-icon',
          iconType: 'html',
          iconPosition: 'beforeend',
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>',
          iconClasses: ['fa-regular', 'fa-envelope'] // set iconType to classes to use
        },

        tel: {
          selector: '[href^="tel:"]',
          message: '(Link opens phone)',
          linkClass: 'link-purpose-tel',
          iconWrapperClass: 'link-purpose-tel-icon',
          iconType: 'html',
          iconPosition: 'beforeend',
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="14" height="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/></svg>',
          iconClasses: ['fa-solid', 'fa-square-phone'] // set iconType to classes to use
        },

        newWindow: {
          selector: '[target="_blank"]',
          message: '(Link opens in new window)',
          linkClass: 'link-purpose-window',
          iconWrapperClass: 'link-purpose-window-icon',
          iconType: 'html',
          iconPosition: 'beforeend',
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="14" height="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M432 48H208c-17.7 0-32 14.3-32 32V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V336h16c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32zM48 448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V256H48V448zM64 128H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z"/></svg>',
          iconClasses: ['fa-regular', 'fa-window-restore'] // set iconType to classes to use
        }
      }

    }

    // Immediate if after load
    const init = (callback) => {
      if (document.readyState === 'complete') {
        callback();
      } else {
        window.addEventListener('load', callback);
      }
    }

    init(() => {
      // Runs once on load

      // Shallow merge
      LinkPurpose.options = {
        ...defaultOptions,
        ...option
      };
      // Deep merge
      if ('purposes' in option) {
        for (const property in defaultOptions.purposes) {
          if (property in option.purposes) {
            LinkPurpose.options.purposes[property] = {
              ...defaultOptions.purposes[property],
              ...option.purposes[property]
            }
          } else {
            LinkPurpose.options.purposes[property] = defaultOptions.purposes[property];
          }
        }
      }
      LinkPurpose.links = [];
      LinkPurpose.sortedLinks = [];
      // Convert the container ignore user option to a CSS :not selector.
      LinkPurpose.ignore = LinkPurpose.options.ignore ? `:not(${LinkPurpose.options.ignore}, ${LinkPurpose.options.baseLinkClass})` : `:not(${LinkPurpose.options.baseLinkClass})`;
      if (LinkPurpose.options.purposes.external.selector && LinkPurpose.options.domain) {
        let domains = LinkPurpose.options.domain.split(',');
        let domainNot = '';
        domains.forEach((domain, i) => {
          if (domain.indexOf('//') === -1) {
            if (i > 0) {
              domainNot += ', ';
            }
            domainNot += `[href*="https://${LinkPurpose.options.domain}"], [href*="http://${LinkPurpose.options.domain}"], [href^="//${LinkPurpose.options.domain}"]`;
          }
          domainNot += `[href*="${LinkPurpose.options.domain}"]`;
        })
        LinkPurpose.options.purposes.external.selector = `:is(${LinkPurpose.options.purposes.external.selector}):not(${domainNot})`;
      }

      LinkPurpose.run()
    })

    // QuerySelectAll non-ignored elements within roots, with recursion into shadow components
    LinkPurpose.findLinks = function () {
      LinkPurpose.links = []

      // Check for noRun element.
      LinkPurpose.noRun = !!(LinkPurpose.options.noRunIfAbsent && document.querySelector(`:is(${LinkPurpose.options.noRunIfAbsent})`) === null)
      if (!LinkPurpose.noRun && !!LinkPurpose.options.noRunIfPresent) {
        LinkPurpose.noRun = document.querySelector(`:is(${LinkPurpose.options.noRunIfPresent})`) !== null
      }

      if (LinkPurpose.noRun) {
        // Stop execution.
        return
      }

      // Todo: function and parameter to auto-detect shadow components.
      const shadowSelector = LinkPurpose.options.shadowComponents ? `, ${LinkPurpose.options.shadowComponents}` : ''
      const selector = `:is(${LinkPurpose.options.baseSelector}${shadowSelector})${LinkPurpose.options.ignore}`

      // Add array of elements matching selector, excluding the provided ignore list.
      const roots = document.querySelectorAll(LinkPurpose.options.roots)
      if (!roots) {
        return
      }
      roots.forEach(root => {
        LinkPurpose.links = LinkPurpose.links.concat(Array.from(root.querySelectorAll(selector)))
      })

      // The initial search may be a mix of elements ('p') and placeholders for shadow hosts ('custom-p-element').
      // Repeat the search inside each placeholder, and replace the placeholder with its search results.
      if (LinkPurpose.options.shadowComponents) {
        const subSelector = `:is(${LinkPurpose.options.baseSelector})${LinkPurpose.options.ignore}`
        for (let index = LinkPurpose.links.length - 1; index >= 0; index--) {
          if (LinkPurpose.links[index].matches(LinkPurpose.options.shadowComponents)) {
            // Dive into the shadow root and collect an array of its results.
            const inners = LinkPurpose.links[index].shadowRoot?.querySelectorAll(subSelector)
            if (typeof (inners) === 'object' && inners.length > 0) {
              // Replace shadow host with inner elements.
              LinkPurpose.links.splice(index, 1, ...inners)
            } else {
              // Remove shadow host with no inner elements.
              console.warn('Link Purpose: A specified shadow host has no shadowRoot.')
              LinkPurpose.links.splice(index, 1)
            }
          }
        }
      }
    }

    LinkPurpose.processLinks = function () {
      LinkPurpose.marks = []

      if (!LinkPurpose.links) {
        return
      }

      LinkPurpose.links.forEach(link => {
        const hits = [];
        let newWindow = false;
        for (const [key, value] of Object.entries(LinkPurpose.options.purposes)) {
          if (value.selector && link.matches(`${value.selector}`)) {
            if (key === 'newWindow') {
              newWindow = true;
            } else {
              hits.push(key)
            }
          }
        }
        if (newWindow) {
          hits.push('newWindow');
        }
        if (hits.length !== 0) {
          LinkPurpose.marks.push({
            link,
            hits
          })
        }
      })
    }

    LinkPurpose.markLinks = function () {
      if (!LinkPurpose.marks) {
        return
      }

      LinkPurpose.marks.forEach((mark) => {
        mark.hits.forEach((hit, i) => {
          mark.link.classList.add(LinkPurpose.options.baseLinkClass, LinkPurpose.options.purposes[hit].linkClass)

          if (i === 0) {

            let spanTarget = mark.link

            if (LinkPurpose.options.purposes[hit].iconPosition === 'beforeend') {
              // Wrap last word in link into a nobreak span.
              let lastTextNode = mark.link.lastChild
              let trailingWhitespace = false
              let parentNode = mark.link
              while (lastTextNode) {
                if (lastTextNode.lastChild) {
                  // Last node was not text; step down into child node.
                  parentNode = lastTextNode
                  lastTextNode = lastTextNode.lastChild
                } else if (lastTextNode.nodeName === '#text' && parentNode.lastElementChild && lastTextNode.textContent.trim().length === 0) {
                  // Last node was text, but it was whitespace. Step back into previous node.
                  trailingWhitespace = lastTextNode
                  parentNode = parentNode.lastElementChild
                  lastTextNode = parentNode.lastChild
                } else {
                  // Last node was null or valid text.
                  break
                }
              }
              if (lastTextNode && lastTextNode.nodeName === '#text' && lastTextNode.textContent.length > 0) {
                const lastText = lastTextNode.textContent
                const lastWordRegex = /\S+\s*$/g
                const lastWord = lastText.match(lastWordRegex)
                if (lastWord !== null) {
                  // Wrap the last word in a span.
                  const breakPreventer = document.createElement('span')
                  breakPreventer.classList.add(LinkPurpose.options.noBreakClass)
                  breakPreventer.textContent = lastWord[0]
                  if (trailingWhitespace) {
                    breakPreventer.append(trailingWhitespace.textContent)
                    trailingWhitespace.textContent = ''
                  }
                  lastTextNode.textContent = lastText.substring(0, lastText.length - lastWord[0].length)
                  lastTextNode.parentNode.append(breakPreventer)
                  // Insert the icon into the span rather than the link.
                  spanTarget = breakPreventer
                }
              }
            }

            const iconSpan = document.createElement('span')
            iconSpan.classList.add(LinkPurpose.options.baseIconWrapperClass, LinkPurpose.options.purposes[hit].iconWrapperClass)
            // TODO 'classes'
            if (LinkPurpose.options.purposes[hit].iconType === 'html') {
              iconSpan.innerHTML = LinkPurpose.options.purposes[hit].iconHTML
            } else if (LinkPurpose.options.purposes[hit].iconType === 'classes') {
              LinkPurpose.options.purposes[hit].iconClasses.forEach((cls) => {
                iconSpan.classList.add(cls)
              })
            }
            const iconText = document.createElement('span')
            iconText.classList.add('link-purpose-text');
            iconText.textContent = LinkPurpose.options.purposes[hit].message;
            spanTarget.insertAdjacentElement(LinkPurpose.options.purposes[hit].iconPosition, iconSpan);
            spanTarget.append(iconText);
          } else {
            const iconText = mark.link.querySelector('.link-purpose-text')
            iconText.classList.add(LinkPurpose.options.purposes[hit].iconWrapperClass)
            iconText.textContent = iconText.textContent + LinkPurpose.options.purposes[hit].message
          }
        })
      })
    }

    // You can call this yourself after an AJAX event.
    LinkPurpose.run = () => {
      LinkPurpose.findLinks()
      LinkPurpose.processLinks()
      LinkPurpose.markLinks()
    }
  }
}
