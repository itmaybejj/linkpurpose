// Characterization tests for tests/index.htm: they pin down what the library
// does to each kind of link today, so refactors (e.g. batching DOM reads and
// writes) can be checked for unintended behavior changes.
import { expect, test } from '@playwright/test';
import { describeLink, gotoProcessed } from './helpers.mjs';

const PAGE = '/tests/index.htm';

/** Returns describeLink() for the first link matching `selector`. */
const link = (page, selector) =>
  page.locator(selector).first().evaluate(describeLink);

test.beforeEach(async ({ page }) => {
  await gotoProcessed(page, PAGE);
});

test('external link gets class, icon, description, rel and target', async ({ page }) => {
  const result = await link(page, '#external li:nth-child(1) a');
  expect(result.classes).toEqual(expect.arrayContaining(['link-purpose', 'link-purpose-external']));
  expect(result.icons).toBe(1);
  expect(result.texts).toBe(1);
  expect(result.description).toBe('Link is external');
  // Page options: noReferrer: true, purposes.external.newWindow: true
  expect(result.rel).toBe('noreferrer');
  expect(result.target).toBe('_blank');
  // Last word is wrapped so the icon cannot wrap onto its own line.
  expect(result.lastWord).toBe('links');
  expect(result.lastWordNoBreak).toBe(true);
});

test('links that should not match are left alone', async ({ page }) => {
  const marked = await page.locator('#negative a.link-purpose').count();
  expect(marked).toBe(0);
  const added = await page.locator('#negative .link-purpose-icon, #negative .link-purpose-text').count();
  expect(added).toBe(0);
});

test('every marked link has exactly one hidden text span with a unique ID', async ({ page }) => {
  const summary = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a.link-purpose'));
    const ids = links.flatMap((a) => Array.from(a.querySelectorAll('.link-purpose-text')).map((s) => s.id));
    return {
      links: links.length,
      singleText: links.every((a) => a.querySelectorAll('.link-purpose-text').length === 1),
      ids: ids.length,
      uniqueIds: new Set(ids).size,
      nosnippet: Array.from(document.querySelectorAll('.link-purpose-text')).every((s) => s.hasAttribute('data-nosnippet'))
    };
  });
  expect(summary.links).toBeGreaterThan(30);
  expect(summary.singleText).toBe(true);
  expect(summary.uniqueIds).toBe(summary.ids);
  expect(summary.nosnippet).toBe(true);
});

test('higher-priority purpose wins the icon; new window text is appended', async ({ page }) => {
  const doc = await link(page, '#document li:nth-child(2) a');
  expect(doc.classes).toContain('link-purpose-document');
  expect(doc.classes).not.toContain('link-purpose-download');

  const docBlank = await link(page, '#document li:nth-child(3) a');
  expect(docBlank.classes).toContain('link-purpose-document');
  expect(docBlank.icons).toBe(1);
  expect(docBlank.description).toContain('Link opens in new window');
});

test('redundant screen reader text is not added', async ({ page }) => {
  // <a download>Download</a> already says what the download message would say.
  const download = await link(page, '#iconHidden ul:nth-of-type(2) li:nth-child(2) a');
  expect(download.classes).toContain('link-purpose-download');
  expect(download.icons).toBe(1);
  expect(download.describedBy).toEqual([]);

  // An email address matches the mail purpose's redundantStrings (/@|mail/).
  const mail = await link(page, '#iconHidden ul:nth-of-type(2) a[href^="mailto:"]');
  expect(mail.describedBy).toEqual([]);
});

test('existing aria-describedby is extended, aria-description is merged', async ({ page }) => {
  const stacked = await link(page, '#extra-description li:nth-child(1) a');
  expect(stacked.describedBy[0]).toBe('already-described');
  expect(stacked.describedBy.length).toBe(2);

  const merged = await link(page, '#extra-description li:nth-child(2) a');
  expect(merged.description).toMatch(/^already-described, /);
});

test('noIconOnImages flags links that contain images or figures', async ({ page }) => {
  const flags = await page
    .locator('#iconHidden ul:first-of-type a')
    .evaluateAll((links) => links.map((a) => a.classList.contains('link-purpose-hide-on-image')));
  expect(flags).toEqual([true, true, true]);

  const textOnly = await link(page, '#iconHidden ul:nth-of-type(2) li:nth-child(2) a');
  expect(textOnly.classes).not.toContain('link-purpose-hide-on-image');
});

test('suppressNoBreak skips the last-word wrapper', async ({ page }) => {
  const result = await link(page, '#suppress-nobreak li:nth-child(1) a');
  expect(result.icons).toBe(1);
  expect(result.lastWord).toBeNull();
});

test('suppressNoBreak survives a higher-priority purpose replacing the first hit', async ({ page }) => {
  // Matches download (priority 20) first, then document (50) replaces it.
  const result = await link(page, '#suppress-nobreak li:nth-child(2) a');
  expect(result.classes).toContain('link-purpose-document');
  expect(result.icons).toBe(1);
  expect(result.lastWord).toBeNull();
});

test('last-word length limit ignores surrounding whitespace', async ({ page }) => {
  // "Accessibility?" is followed by nbsp, en/hair/thin spaces and indentation.
  const result = await link(page, '#trimming li:nth-child(1) a');
  expect(result.lastWord).toBe('Accessibility?');
  expect(result.icons).toBe(1);
});

test('nobreak is removed when it would push the link past its container', async ({ page }) => {
  // <li style="width: 5em"> with a 23-character last word.
  const result = await link(page, '#external li:nth-child(4) a');
  expect(result.lastWord).toBe('exceedTheContainerWidth');
  expect(result.lastWordNoBreak).toBe(false);
});

test('visually hidden trailing spans are moved inside the last-word wrapper', async ({ page }) => {
  // Source indentation after "nobreak:" makes the match 34 chars with whitespace;
  // the 30-char limit must measure the trimmed word.
  const placement = await page.locator('#outside-hidden li:nth-child(2) a').evaluate((a) => {
    const wrapper = a.querySelector('.link-purpose-last-word');
    return {
      hiddenInWrapper: wrapper ? wrapper.querySelectorAll('.visually-hidden').length : 0,
      iconInWrapper: wrapper ? wrapper.querySelectorAll('.link-purpose-icon').length : 0
    };
  });
  expect(placement.hiddenInWrapper).toBeGreaterThan(0);
  expect(placement.iconInWrapper).toBe(1);
});

test('HTML comments inside the link are preserved', async ({ page }) => {
  const comments = await page.locator('#trimming li:nth-child(4) a').evaluate((a) => {
    const walker = document.createTreeWalker(a, NodeFilter.SHOW_COMMENT);
    let count = 0;
    while (walker.nextNode()) {
      // The default SVG icon carries its own license comment; skip it.
      if (!walker.currentNode.parentElement.closest('.link-purpose-icon')) count++;
    }
    return count;
  });
  expect(comments).toBe(2);
});

test('links inside listed shadow components are marked', async ({ page }) => {
  const results = await page.evaluate(() => {
    const root = document.querySelector('shadow-test').shadowRoot;
    return Array.from(root.querySelectorAll('a')).map((a) => ({
      classes: Array.from(a.classList),
      icons: a.querySelectorAll('.link-purpose-icon').length,
      texts: a.querySelectorAll('.link-purpose-text').length
    }));
  });
  expect(results.length).toBe(2);
  for (const r of results) {
    expect(r.classes).toContain('link-purpose-external');
    expect(r.icons).toBe(1);
    expect(r.texts).toBe(1);
  }
});
