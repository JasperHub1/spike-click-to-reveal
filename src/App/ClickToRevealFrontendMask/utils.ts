const maskEmail = (email: string): string => {
  if (!email || email.length <= 4) {
    return email;
  }
  const firstChar = email.charAt(0);
  const lastTwoChars = email.slice(-2);
  const maskedMiddle = '*'.repeat(Math.max(3, email.length - 5));
  return `${firstChar}${maskedMiddle}${lastTwoChars}`;
};

export const maskLinksInHtml = (html: string): string => {
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
