/**
 * Loads a test page and waits until Link Purpose has finished marking links.
 *
 * The library defers its first run until readyState leaves "loading", and
 * runs again on "complete" (which is also when shadow roots are picked up).
 * Waiting for "complete" plus two animation frames covers both passes without
 * a fixed timeout.
 */
export async function gotoProcessed(page, path) {
  await page.goto(path);
  await page.waitForFunction(() => document.readyState === 'complete');
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
}

/** Describes a link the way assistive tech and the stylesheet see it. */
export function describeLink(link) {
  const describedBy = (link.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
  const root = link.getRootNode();
  return {
    classes: Array.from(link.classList),
    target: link.getAttribute('target'),
    rel: link.getAttribute('rel'),
    describedBy,
    // Resolve describedby IDs within the link's own tree (document or shadow root).
    description: describedBy
      .map((id) => root.getElementById(id)?.textContent.trim())
      .filter(Boolean)
      .join(' | '),
    icons: link.querySelectorAll('.link-purpose-icon').length,
    texts: link.querySelectorAll('.link-purpose-text').length,
    // Only the wrapper's own text nodes: the icon and hidden text are appended inside it.
    lastWord: (() => {
      const wrapper = link.querySelector('.link-purpose-last-word');
      if (!wrapper) return null;
      return Array.from(wrapper.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent)
        .join('')
        .trim();
    })(),
    lastWordNoBreak: link.querySelector('.link-purpose-last-word')?.classList.contains('link-purpose-nobreak') ?? null
  };
}
