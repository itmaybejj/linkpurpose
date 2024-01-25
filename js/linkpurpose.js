/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
class LinkPurpose {
  // ESLint config

  constructor (option) {
    LinkPurpose.version = 'dev'

    const defaultOptions = {

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

      // Default selectors.
      /*
                To disable a group, set selector to a false boolean, e.g.:
                options.externalLink.selector = false,
            */

      // Defaults for all marked links
      allPurposes: {
        // Class applied to all matched links.
        linkClass: 'link-purpose',
        // Class applied to inner span.
        iconWrapperClass: 'link-purpose-icon',
        // Class applied to span containing last word in link.
        noBreakClass: 'link-purpose-nobreak'
      },

      purposes: {
        externalLink: {
          selector: '[href^=\'/\'], [href^=\'.\'], [href^=\'#\']', // Inverted; these are relative URLs.
          message: '(Link is external)',
          linkClass: 'link-purpose-external',
          iconWrapperClass: 'link-purpose-external-icon',
          iconType: 'html', // html, src or classes
          // Google Material Icons 3.x
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h560v-240q0-17 11.5-28.5T800-480q17 0 28.5 11.5T840-440v240q0 33-23.5 56.5T760-120H200Zm560-584L416-360q-11 11-28 11t-28-11q-11-11-11-28t11-28l344-344H600q-17 0-28.5-11.5T560-800q0-17 11.5-28.5T600-840h240v240q0 17-11.5 28.5T800-560q-17 0-28.5-11.5T760-600v-104Z"/></svg>',
          iconSRC: false,
          iconClasses: ['fa-solid', 'fa-up-right-from-square'] // set iconType to classes to use
        },

        document: {
          selector: '[href$=\'.pdf\'], [href*=\'.pdf?\'], [href$=\'.doc\'], [href$=\'.docx\'], [href*=\'.doc?\'], [href*=\'.docx?\'], [href$=\'.ppt\'], [href$=\'.pptx\'], [href*=\'.ppt?\'], [href*=\'.pptx?\'], [href^=\'https://docs.google\']',
          message: '(Link opens document)',
          linkClass: 'link-purpose-document',
          iconWrapperClass: 'link-purpose-document-icon',
          iconType: 'html',
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M360-240h240q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320H360q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm0-160h240q17 0 28.5-11.5T640-440q0-17-11.5-28.5T600-480H360q-17 0-28.5 11.5T320-440q0 17 11.5 28.5T360-400ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z"/></svg>',
          iconSRC: false,
          iconClasses: ['fa-regular', 'fa-file-lines'] // set iconType to classes to use
        },

        mailTo: {
          selector: '[href^="mailto:"]',
          message: '(Link sends Email)',
          linkClass: 'link-purpose-mailto',
          iconWrapperClass: 'link-purpose-mail-icon',
          iconType: 'html',
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>',
          iconURL: false,
          iconClasses: ['fa-regular', 'fa-envelope'] // set iconType to classes to use
        },

        newWindow: {
          selector: '[target="_blank"]',
          message: '(Link opens in new window)',
          linkClass: 'link-purpose-window',
          iconWrapperClass: 'link-purpose-window-icon',
          iconType: 'html',
          iconHTML: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h200q17 0 28.5 11.5T440-800q0 17-11.5 28.5T400-760H200v560h560v-200q0-17 11.5-28.5T800-440q17 0 28.5 11.5T840-400v200q0 33-23.5 56.5T760-120H200Zm440-520h-80q-17 0-28.5-11.5T520-680q0-17 11.5-28.5T560-720h80v-80q0-17 11.5-28.5T680-840q17 0 28.5 11.5T720-800v80h80q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640h-80v80q0 17-11.5 28.5T680-520q-17 0-28.5-11.5T640-560v-80Z"/></svg>',
          iconURL: false,
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
      LinkPurpose.options = {
        ...defaultOptions,
        ...option
      };
      LinkPurpose.links = [];
      LinkPurpose.sortedLinks = [];
      // Convert the container ignore user option to a CSS :not selector.
      LinkPurpose.ignore = LinkPurpose.options.ignore ? `:not(${LinkPurpose.options.ignore}, ${LinkPurpose.options.allPurposes.linkClass})` : `:not(${LinkPurpose.options.allPurposes.linkClass})`;
      if (LinkPurpose.options.purposes.externalLink.selector) {
        if (LinkPurpose.options.domain) {
          LinkPurpose.options.purposes.externalLink.selector = `:not(${LinkPurpose.options.purposes.externalLink.selector}, ${LinkPurpose.options.domain}})`;
        } else {
          LinkPurpose.options.purposes.externalLink.selector = `:not(${LinkPurpose.options.purposes.externalLink.selector})`;
        }
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
        const subSelector = `:is(${LinkPurpose.options.allPurposes.selector})${LinkPurpose.options.ignore}`
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
          mark.link.classList.add(LinkPurpose.options.allPurposes.linkClass, LinkPurpose.options.purposes[hit].linkClass)

          console.log(hit)

          if (i === 0) {
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

            let spanTarget = mark.link
            if (lastTextNode && lastTextNode.nodeName === '#text' && lastTextNode.textContent.length > 0) {
              const lastText = lastTextNode.textContent
              const lastWordRegex = /\S+\s*$/g
              const lastWord = lastText.match(lastWordRegex)
              if (lastWord !== null) {
                // Wrap the last word in a span.
                const breakPreventer = document.createElement('span')
                breakPreventer.classList.add(LinkPurpose.options.allPurposes.noBreakClass)
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

            const iconSpan = document.createElement('span')
            iconSpan.classList.add(LinkPurpose.options.allPurposes.iconWrapperClass, LinkPurpose.options.purposes[hit].iconWrapperClass)
            // TODO 'classes'
            if (LinkPurpose.options.purposes[hit].iconType === 'html') {
              iconSpan.innerHTML = LinkPurpose.options.purposes[hit].iconHTML
            } else if (LinkPurpose.options.purposes[hit].iconType === 'classes') {
              console.log('classes!')
              LinkPurpose.options.purposes[hit].iconClasses.forEach((cls) => {
                iconSpan.classList.add(cls)
              })
            } else if (LinkPurpose.options.purposes[hit].iconType === 'src') {
              const image = document.createElement('img')
              image.setAttribute('src', LinkPurpose.options.purposes[hit].iconSRC)
            }
            const iconText = document.createElement('span')
            iconText.classList.add('link-purpose-text')
            iconText.textContent = LinkPurpose.options.purposes[hit].message
            iconSpan.append(iconText)
            spanTarget.append(iconSpan)
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
