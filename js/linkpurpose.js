/* eslint-disable object-shorthand */
/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
class LinkPurpose {
  // ESLint config

  constructor (option) {
    LinkPurpose.version = '1.0.5';

    let checkLinks = [];
    let marks = [];

    const defaultOptions = {

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
          selector: '[href^="https://"], [href^="http://"], [href^="//"]', // Protocol prefixes to be tested against the domain.
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
          selector: ':is([href*="://"]):not([href^="/"], [href^="https:"], [href^="http:"], [href^="file:"])', // Extra leading / is for internet archive links
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

    }

    // Wait for DOM completion.
    const init = (callback) => {
      if (document.readyState === 'loading') {
        document.onreadystatechange = () => {
          // Anything after loading is fine.
          callback();
        };
      } else {
        callback();
      }
    }


    const startObserver = function (root) {

      // We don't want to nest observers.
      if (typeof root.closest !== 'function') {
        if (root.host.matches('.link-purpose-observer')) {
          return
        } else {
          root.host.classList.add('link-purpose-observer');
        }
      } else {
        if (root.closest('.link-purpose-observer')) {
          return
        } else {
          root.classList.add('link-purpose-observer');
        }
      }

      /*
      Set up mutation observer for added nodes.
      */
      // hat tip https://www.joshwcomeau.com/snippets/javascript/debounce/
      const debounce = (callback, wait) => {
        let timeoutId = null;
        return (...args) => {
          window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
          }, wait);
        };
      }

      const mutated = debounce(() => {
        LinkPurpose.run();

      }, 500);

      // Options for the observer (which mutations to observe)
      const config = { childList: true, subtree: true };

      // Create an observer instance linked to the callback function
      const callback = (mutationList) => {
        for (const mutation of mutationList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length) {
            mutated();
          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);
      // Start observing the target node for configured mutations
      observer.observe(root, config);
    }

    let roots = [];

    const getRoots = function () {
      let foundRoots = Array.from(document.querySelectorAll(`${LinkPurpose.options.roots}:not(.link-purpose-root)`));
      if (foundRoots) {
        foundRoots.forEach(root => {
          root.classList.add('link-purpose-root');
        });
        roots = roots.concat(foundRoots)
      }

      if (LinkPurpose.options.shadowComponents) {
        const shadowRoots = Array.from(document.querySelectorAll(`${LinkPurpose.options.shadowComponents}:not(.link-purpose-root)`));
        if (!shadowRoots) {
          console.warn('Link Purpose: A specified shadow host has no shadowRoot.')
          return false
        }
        for (let index = 0; index < shadowRoots.length; index++) {
          if (shadowRoots[index].shadowRoot) {
            shadowRoots[index].classList.add('link-purpose-root');
            roots.push(shadowRoots[index].shadowRoot)
            if (LinkPurpose.options.shadowCSS) {
              LinkPurpose.attachCSS(shadowRoots[index].shadowRoot);
            }
          }
        }
      }
    }

    const findLinks = function () {
      getRoots();
      if (!roots) {
        return
      }
      checkLinks = []

      // Check for noRun element.
      LinkPurpose.noRun = !!(LinkPurpose.options.noRunIfAbsent && document.querySelector(`:is(${LinkPurpose.options.noRunIfAbsent})`) === null)
      if (!LinkPurpose.noRun && !!LinkPurpose.options.noRunIfPresent) {
        LinkPurpose.noRun = document.querySelector(`:is(${LinkPurpose.options.noRunIfPresent})`) !== null
      }

      if (LinkPurpose.noRun) {
        // Stop execution.
        return
      }

      const selector = `:is(${LinkPurpose.options.baseSelector})${LinkPurpose.ignore}`;

      if (document.readyState === 'interactive') {
        document.onreadystatechange = () => {
          // Wait to set up observers until after document is complete
          LinkPurpose.run();
        };
      } else {
        if (!!roots && LinkPurpose.options.watch) {
          roots.forEach(root => {
            startObserver(root);
          })
        }
      }


      roots.forEach(root => {
        checkLinks = checkLinks.concat(Array.from(root.querySelectorAll(selector)));
      })

    }

    const processLinks = function () {
      marks = []

      if (!checkLinks) {
        return
      }

      checkLinks.forEach(link => {
        const hits = [];
        let newWindow = false;
        for (const [key, value] of Object.entries(LinkPurpose.options.purposes)) {
          if (value.selector && (link.matches(value.selector) || (value.additionalSelector && link.matches(value.additionalSelector))))  {
            // We have a hit.

            // Add new window last, so other icon "wins."
            if (key === 'newWindow') {
              newWindow = true;
            } else if (hits.length === 0) {
              // No existing hit.
              hits.push({
                type: key,
                noReferrer: key === 'external' && LinkPurpose.options.noReferrer
              })
            } else if (value.priority > LinkPurpose.options.purposes[hits[0].type].priority) {
              // New hit is higher priority than existing hit.
              hits[0] = {
                type: key,
                noReferrer: key === 'external' && LinkPurpose.options.noReferrer
              };
            }
          }
        }
        if (newWindow) {
          hits.push({
            type: 'newWindow',
            noReferrer: false
          });
        }
        if (hits.length !== 0) {
          const showIcon = !(LinkPurpose.options.hideIcon && link.matches(LinkPurpose.options.hideIcon));
          marks.push({
            link: link,
            hits: hits,
            showIcon: showIcon
          })
        }
      })
    }

    const spacer = document.createElement('span');
    spacer.classList.add('link-purpose-spacer');
    spacer.textContent = '\u0020';
    const lastWordRegex = /\s*\S+\s*$/g;
    const initialSpaceRegex = /^\s+/g;
    const trailingSpaceRegex = /\s+$/g;

    const markLinks = function () {
      if (!marks) {
        return
      }

      marks.forEach((mark) => {
        mark.hits.forEach((hit, i) => {
          // Don't append redundant screen reader text.
          // If no message exists, don't show it either.
          let showText = !(LinkPurpose.options.purposes[hit.type].redundantStrings &&
            mark.link.textContent.length > 0 &&
            mark.link.textContent.match(LinkPurpose.options.purposes[hit.type].redundantStrings)) &&
            LinkPurpose.options.purposes[hit.type].message

          if (i === 0) {
            let spanTarget = mark.link

            if (hit.noReferrer) {
              mark.link.setAttribute('rel', 'noreferrer')
            }

            if (mark.showIcon) {
              mark.link.classList.add(LinkPurpose.options.baseLinkClass, LinkPurpose.options.purposes[hit.type].linkClass);
              if (LinkPurpose.options.noIconOnImages) {
                mark.link.classList.add('link-purpose-hide-on-image')
              }

              if (LinkPurpose.options.purposes[hit.type].iconPosition === 'beforeend') {
                // Wrap last word in link into a nobreak span.
                let lastTextNode = mark.link.lastChild
                let trailingSpaceNodes = []
                let excludedNode = [];
                let commentNodes = [];

                // Recurses down and back looking for text nodes.
                // This WILL miss if the last element is an empty tree,
                // but missing is better than moving possibly styled nodes.
                while (lastTextNode) {
                  if (lastTextNode.lastChild) {
                    // lastChild has descendants (not a text node).
                    if (lastTextNode.matches(LinkPurpose.options.insertIconOutsideHiddenSpan)) {
                      // lastChild is hidden; move to previous sibling.
                      excludedNode.push(lastTextNode);
                      lastTextNode = lastTextNode.previousSibling;
                    } else {
                      // lastChild is visible, move to descendent node.
                      lastTextNode = lastTextNode.lastChild
                    }
                  } else if (
                    // lastChild IS text, but only whitespace
                    lastTextNode.nodeName === '#text' &&
                    lastTextNode.textContent.trim().length === 0 &&
                    lastTextNode.previousSibling
                  ) {
                    // Move to previous sibling.
                    trailingSpaceNodes.push(lastTextNode);
                    lastTextNode = lastTextNode.previousSibling;
                  } else if (lastTextNode.nodeName === "#comment") {
                    // Comment, so move up to previous sibling.
                    // Capture comment to re-introduce later.
                    commentNodes.push(lastTextNode);
                    lastTextNode = lastTextNode.previousSibling;
                  } else {
                    // Last node was valid text or no siblings remain.
                    break
                  }
                }
                if (lastTextNode && lastTextNode.nodeName === '#text' && lastTextNode.textContent.length > 0) {
                  const lastText = lastTextNode.textContent
                  const lastWord = lastText.match(lastWordRegex)
                  if (lastWord && lastWord[0].length < 30) {
                    // 30-char limit prevents horizontal scrollbars from urls.
                    const onlyWord = lastWord[0].length === lastText.length;
                    const leadingSpace = onlyWord ? lastText.match(initialSpaceRegex) : false;
                    let trailingSpace = lastText.match(trailingSpaceRegex);
                    // Wrap the last word in a span.
                    const breakPreventer = document.createElement('span')
                    breakPreventer.classList.add(LinkPurpose.options.noBreakClass)
                    breakPreventer.textContent = lastWord[0].trim();
                    if (excludedNode.length > 0) {
                      excludedNode.forEach(node => {
                        breakPreventer.append(node);
                      })
                    }
                    if (onlyWord) {
                      // Wrap entire textContent.
                      lastTextNode.textContent = '';
                      lastTextNode.parentNode.append(breakPreventer)
                    } else {
                      // Only wrap last string, and insert a controlled width spacer.
                      lastTextNode.textContent = lastText.substring(0, lastText.length - lastWord[0].length)
                      lastTextNode.parentNode.append(spacer.cloneNode(true), breakPreventer)
                    }
                    if (leadingSpace) {
                      mark.link.insertAdjacentText('beforebegin', '\u0020');
                    }
                    if (trailingSpaceNodes.length > 0) {
                      trailingSpace = true;
                      // Move whitespace out of link.
                      trailingSpaceNodes.forEach(space => {
                        // noinspection JSPrimitiveTypeWrapperUsage
                        space.textContent = ''
                      })
                    }
                    if (trailingSpace) {
                      mark.link.insertAdjacentText('afterend', '\u0020');
                    }
                    // HTML comments inside the link should retain relative position.
                    if (commentNodes.length > 0) {
                      commentNodes.forEach((comment) => {
                        // Clone to be sure comment wrapper moves.
                        mark.link.append(comment.cloneNode(true));
                        comment.remove();
                      });
                    }
                    // Insert the icon into the span rather than the link.
                    spanTarget = breakPreventer
                  }
                }
              }

              const iconSpan = document.createElement('span')
              iconSpan.classList.add(LinkPurpose.options.baseIconWrapperClass, LinkPurpose.options.purposes[hit.type].iconWrapperClass)
              iconSpan.setAttribute('aria-hidden', 'true');
              iconSpan.setAttribute('title', LinkPurpose.options.purposes[hit.type].message);
              if (LinkPurpose.options.purposes[hit.type].iconType === 'html') {
                iconSpan.innerHTML = LinkPurpose.options.purposes[hit.type].iconHTML
              } else if (LinkPurpose.options.purposes[hit.type].iconType === 'classes') {
                LinkPurpose.options.purposes[hit.type].iconClasses.forEach((cls) => {
                  iconSpan.classList.add(cls)
                })
              }
              spanTarget.insertAdjacentElement(LinkPurpose.options.purposes[hit.type].iconPosition, iconSpan);
            } else {
              mark.link.classList.add(LinkPurpose.options.baseLinkClass)
            }

            const iconText = document.createElement('span')
            iconText.classList.add('link-purpose-text');
            if (LinkPurpose.options.hiddenTextClass) {
              iconText.classList.add(LinkPurpose.options.hiddenTextClass);
            }
            iconText.textContent = showText ? `(${LinkPurpose.options.purposes[hit.type].message})` : '';
            spanTarget.append(iconText);
          } else if (showText) {
            const iconText = mark.link.querySelector('.link-purpose-text')
            iconText.textContent = iconText.textContent + ` (${LinkPurpose.options.purposes[hit.type].message})`
          }
          if (LinkPurpose.options.purposes[hit.type].newWindow) {
            mark.link.setAttribute('target', '_blank')
          }
        })
      })
    }

    LinkPurpose.run = () => {
      findLinks()
      processLinks()
      markLinks()
    }



    init(() => {
      // Runs once on load

      // Shallow merge
      LinkPurpose.options = {
        ...defaultOptions,
        ...option
      };
      // Deep merge
      if (typeof (option) === 'object' && 'purposes' in option) {
        for (const property in defaultOptions.purposes) {
          if (property in option.purposes) {
            LinkPurpose.options.purposes[property] = {
              ...defaultOptions.purposes[property],
              ...option.purposes[property]
            }
            // Set default priority once to save if statements later.
            if (property in LinkPurpose.options.purposes && !('priority' in LinkPurpose.options.purposes[property])) {
              LinkPurpose.options.purposes[property].priority = 50;
            }
          } else {
            LinkPurpose.options.purposes[property] = defaultOptions.purposes[property];
          }
        }
      }

      // Convert the container ignore user option to a CSS :not selector.
      LinkPurpose.ignore = LinkPurpose.options.ignore ? `:not(${LinkPurpose.options.ignore}, .${LinkPurpose.options.baseLinkClass})` : `:not(.${LinkPurpose.options.baseLinkClass})`;
      if (LinkPurpose.options.purposes.external.selector && LinkPurpose.options.domain) {
        // Create specific selector to prevent matching query variables.
        const domains = LinkPurpose.options.domain.split(',');
        let domainNot = '';
        domains.forEach((domain, i) => {
          domain = domain.trim();
          if (i > 0) {
            domainNot += ', ';
          }
          if (domain.indexOf('http') === 0) {
            // Protocol is specified, starts-with selector.
            domainNot += `[href^="${domain}"]`;
          } else if (domain.indexOf('*') > -1) {
            // Wildcards must go to a contains selector
            domainNot += `[href*="${domain.replaceAll('*', '')}"]`
          } else {
            // Unspecified protocol selectors can start with any protocol.
            if (domain.indexOf('//') === 0) {
              // Drop before expand to an absolute URL.
              domain = domain.substring(2);
            }
            domainNot += `[href^="https://${domain}"], [href^="http://${domain}"], [href^="//${domain}"]`;
          }
        })
        LinkPurpose.options.purposes.external.selector = `:is(${LinkPurpose.options.purposes.external.selector}):not(${domainNot})`;
      }

      if (LinkPurpose.options.shadowComponents) {
        if (!LinkPurpose.options.shadowCSS) {
          const autoCSS = document.querySelector('link[href*="linkpurpose.css"], link[href*="linkpurpose.min.css"]');
          if (autoCSS) {
            LinkPurpose.options.shadowCSS = autoCSS.getAttribute('href');
          }
        }
        if (LinkPurpose.options.shadowCSS) {
          let cssBundle = document.createElement('div');
          cssBundle.setAttribute('hidden','');
          let cssLink = document.createElement('link');
          cssLink.setAttribute('rel', 'stylesheet');
          cssLink.setAttribute('media', 'all');
          cssLink.setAttribute('href', LinkPurpose.options.shadowCSS + '?v=' + LinkPurpose.version);
          cssBundle.append(cssLink);

          LinkPurpose.attachCSS = function(appendTo) {
            appendTo.appendChild(cssBundle.cloneNode(true));
          };
        }
      }

      LinkPurpose.run()
    })

  }
}
