import { UnsafeJobHtmlRenderer } from '@seek/job-html-renderer';
import React, { useState, useEffect, useRef } from 'react';

import { maskEmail, maskEmailsInHtml, findFirstTextNode } from './utils';

const HTML_CONTENT = `
  <p>job description</p>

  <p></p>
  <p><span>(2) 1234567</span></p>
  <p></p>
  <p>
    <a
      target="_blank"
      rel="noopener noreferrer nofollow"
      href="mailto:test@example.com"
      >test@example.com</a
    >
  </p>
  <p></p>
  <p>
    <span>please call Steve Mifsud on </span
    ><a
      target="_blank"
      rel="noopener noreferrer nofollow"
      href="tel:(02) 9765 4094"
      ><strong><u>(02) 9765 4094</u></strong></a
    ><span> or via &nbsp;</span
    ><a
      target="_blank"
      rel="noopener noreferrer nofollow"
      href="mailto:steve.mifsud@dcj.nsw.gov.au"
      ><strong><u>steve.mifsud@dcj.nsw.gov.au</u></strong></a
    >
  </p>
  <p></p>
  `;

export const ClickToRevealFrontendMask = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedEmails, setRevealedEmails] = useState<Set<string>>(new Set());

  const maskedHtml = React.useMemo(() => maskEmailsInHtml(HTML_CONTENT), []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const mailtoLinks =
      containerRef.current.querySelectorAll<HTMLAnchorElement>(
        'a[href^="mailto:"]',
      );

    mailtoLinks.forEach((link) => {
      const email = link.getAttribute('href')?.replace('mailto:', '') || '';
      if (!email) {
        return;
      }

      const textNode = findFirstTextNode(link);
      if (textNode) {
        const isRevealed = revealedEmails.has(email);
        textNode.data = isRevealed ? email : maskEmail(email);
      }

      link.style.cursor = 'pointer';
      link.onclick = (e) => {
        if (!revealedEmails.has(email)) {
          e.preventDefault();
          setRevealedEmails((prev) => new Set(prev).add(email));
        }
      };
    });
  }, [maskedHtml, revealedEmails]);

  return (
    <div ref={containerRef}>
      <UnsafeJobHtmlRenderer>{maskedHtml}</UnsafeJobHtmlRenderer>
    </div>
  );
};
