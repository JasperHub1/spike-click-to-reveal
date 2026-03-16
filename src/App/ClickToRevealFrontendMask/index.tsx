import { UnsafeJobHtmlRenderer } from '@seek/job-html-renderer';
import { useRef } from 'react';

import { useClickToReveal } from '../hooks/useClickToReveal';

import { maskLinksInHtml } from './utils';

// ASSUMPTION: html from backend has already transformed <p> links into <a href=...>
const maskedHtml = maskLinksInHtml(
  '<p>job description</p><p></p><p><a target="_blank" rel="noopener noreferrer nofollow" href="mailto:test@example.com">test@example.com</a></p><p></p><p><span>please call Steve Mifsud on </span><a target="_blank" rel="noopener noreferrer nofollow" href="tel:(02) 9765 4094"><strong><u>(02) 9765 4094</u></strong></a><span> or via&nbsp;</span><a target="_blank" rel="noopener noreferrer nofollow" href="mailto:steve.mifsud@dcj.nsw.gov.au"><strong><u>steve.mifsud@dcj.nsw.gov.au</u></strong></a></p><p></p>',
);

export const ClickToRevealFrontendMask = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useClickToReveal(containerRef, ['a[href^="mailto:"]', 'a[href^="tel:"]']);

  return (
    <div ref={containerRef}>
      <UnsafeJobHtmlRenderer>{maskedHtml}</UnsafeJobHtmlRenderer>
    </div>
  );
};
