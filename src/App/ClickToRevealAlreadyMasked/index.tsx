import { UnsafeJobHtmlRenderer } from '@seek/job-html-renderer';
import { useRef } from 'react';

import { useClickToReveal } from '../hooks/useClickToReveal';

// Pre-masked phone & email from Backend
const HTML_CONTENT =
  '<p>job description</p><p><a phone target="_blank" rel="noopener noreferrer nofollow" href="tel:(02) 9765 4094"><strong><u>(02) 9*** ***4</u></strong></a><p></p><a email target="_blank" rel="noopener noreferrer nofollow" href="mailto:steve.mifsud@dcj.nsw.gov.au"><strong><u>s************u</u></strong></a></p>';

export const ClickToRevealAlreadyMasked = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useClickToReveal(containerRef, ['a[href^="mailto:"]', 'a[href^="tel:"]']);

  // OPTION: If attribute (phone or email) is injected by Backend to identify masked phone or email
  // useClickToReveal(containerRef, ['a[phone]', 'a[email]']);

  return (
    <div ref={containerRef}>
      <UnsafeJobHtmlRenderer>{HTML_CONTENT}</UnsafeJobHtmlRenderer>
    </div>
  );
};
