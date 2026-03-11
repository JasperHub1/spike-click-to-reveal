const maskEmail = (email: string): string => {
  if (!email || email.length <= 4) {
    return email;
  }
  const firstChar = email.charAt(0);
  const lastTwoChars = email.slice(-2);
  const maskedMiddle = '*'.repeat(Math.max(3, email.length - 5));
  return `${firstChar}${maskedMiddle}${lastTwoChars}`;
};

const maskEmailsInHtml = (html: string): string => {
  const emailRegex = /(<a[^>]*href="mailto:([^"]+)"[^>]*>)([\s\S]*?)(<\/a>)/gi;

  return html.replace(
    emailRegex,
    (_match, linkStart, email, linkContent, linkEnd) => {
      const maskEmail_ = maskEmail(email);
      const modifiedContent = linkContent.replace(email, maskEmail_);
      return `${linkStart}${modifiedContent}${linkEnd}`;
    },
  );
};

const findFirstTextNode = (element: Element): Text | null => {
  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node as Text;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const found = findFirstTextNode(node as Element);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export { maskEmail, maskEmailsInHtml, findFirstTextNode };
