import { UnsafeJobHtmlRenderer } from '@seek/job-html-renderer';
import { useState, useEffect, useRef } from 'react';

// Pre-masked phone & email
// Phone & email detection is purely based on a[href^="mailto:"] and a[href^="tel:"] respectively.
// Not based on any extra attribute injected by Backend
const HTML_CONTENT = `
<p>job description</p>

<p>
  <a
    phone
    target="_blank"
    rel="noopener noreferrer nofollow"
    href="tel:(02) 9765 4094"
  >
    <strong><u>(02) 9*** ***4</u></strong>
  </a>

  <p></p>

  <a
    email
    target="_blank"
    rel="noopener noreferrer nofollow"
    href="mailto:steve.mifsud@dcj.nsw.gov.au"
  >
    <strong><u>s************u</u></strong>
  </a>
</p>
`;

export const ClickToRevealAlreadyMasked = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // a[email] if use custom attribute approach (injected by backend), otherwise a[href^="tel:"] as per current implementation
    const mailtoLinks =
      containerRef.current.querySelectorAll<HTMLAnchorElement>(
        'a[href^="mailto:"]',
      );

    mailtoLinks.forEach((link) => {
      const email = link.getAttribute('href')?.replace('mailto:', '') || '';
      if (!email) {
        return;
      }

      const isRevealed = revealed.has(email);
      if (isRevealed) {
        link.textContent = email;
      }

      link.style.cursor = 'pointer';
      link.onclick = (e) => {
        if (!revealed.has(email)) {
          e.preventDefault();
          setRevealed((prev) => new Set(prev).add(email));
        }
      };
    });

    // a[phone] if use custom attribute approach (injected by backend), otherwise a[href^="tel:"] as per current implementation
    const telLinks =
      containerRef.current.querySelectorAll<HTMLAnchorElement>(
        'a[href^="tel:"]',
      );

    telLinks.forEach((link) => {
      const phone = link.getAttribute('href')?.replace('tel:', '') || '';
      if (!phone) {
        return;
      }

      const isRevealed = revealed.has(phone);
      if (isRevealed) {
        link.textContent = phone;
      }

      link.style.cursor = 'pointer';
      link.onclick = (e) => {
        if (!revealed.has(phone)) {
          e.preventDefault();
          setRevealed((prev) => new Set(prev).add(phone));
        }
      };
    });
  }, [revealed]);

  return (
    <div ref={containerRef}>
      <UnsafeJobHtmlRenderer>{HTML_CONTENT}</UnsafeJobHtmlRenderer>
    </div>
  );
};
