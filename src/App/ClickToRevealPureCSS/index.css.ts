import { globalStyle } from '@vanilla-extract/css';

globalStyle(`.masked-link-container .masked-link`, {
  display: 'inline-block',
  position: 'relative',
  whiteSpace: 'nowrap',
  color: 'transparent',
  transition: 'color 0.3s ease',
  userSelect: 'none',
  cursor: 'pointer',
});

globalStyle(`.masked-link-container .masked-link::before`, {
  content: 'attr(data-masked)',
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  whiteSpace: 'nowrap',
  color: '#666',
  transition: 'opacity 0.3s ease',
});

globalStyle(`.masked-link-container .masked-link:focus`, {
  color: '#2563eb',
  outline: '2px solid #2563eb',
  outlineOffset: '2px',
});

globalStyle(`.masked-link-container .masked-link:focus::before`, {
  opacity: 0,
});
