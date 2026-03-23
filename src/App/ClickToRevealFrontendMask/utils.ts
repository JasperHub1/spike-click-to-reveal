const MASK_CHAR = '●';

const maskValue = (value: string): string => {
  if (!value || value.length <= 4) {
    return value;
  }
  const firstChar = value.charAt(0);
  const lastTwoChars = value.slice(-2);
  const maskedMiddle = MASK_CHAR.repeat(Math.max(3, value.length - 5));
  return `${firstChar}${maskedMiddle}${lastTwoChars}`;
};

export const maskLinksInHtml = (html: string): string => {
  const linkRegex =
    /(<a[^>]*href="(?:mailto|tel):([^"]+)"[^>]*>)([\s\S]*?)(<\/a>)/gi;

  return html.replace(
    linkRegex,
    (_match, linkStart, value, linkContent, linkEnd) => {
      const masked = maskValue(value);
      const modifiedContent = linkContent.replace(value, masked);
      return `${linkStart}${modifiedContent}${linkEnd}`;
    },
  );
};
