import { UnsafeJobHtmlRenderer } from '@seek/job-html-renderer';
import { useRef } from 'react';

import './index.css';

// Frontend needs to detect the link, and 1. add class="masked-link" 2. add data-masked="masked text to show" to the <a> tag
const maskedHtml =
  '<p>job description</p><p></p><p></p><p></p><p><span>please call Steve Mifsud on </span><a class="masked-link" data-masked="(02) 97●● ●●94" target="_blank" rel="noopener noreferrer nofollow" href="tel:(02) 9765 4094"><strong><u>(02) 9765 4094</u></strong></a><span> or via&nbsp;</span><a target="_blank" rel="noopener noreferrer nofollow" class="masked-link" data-masked="st●●●●●●●●●●●●●●●●●●●●ov" href="mailto:steve.mifsud@dcj.nsw.gov.au"><strong><u>steve.mifsud@dcj.nsw.gov.au</u></strong></a></p><p></p>';

export const ClickToRevealPureCSS = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Need extra hook to attach click handler for tracking purpose

  return (
    <div ref={containerRef} className="masked-link-container">
      <UnsafeJobHtmlRenderer>{maskedHtml}</UnsafeJobHtmlRenderer>
    </div>
  );
};
