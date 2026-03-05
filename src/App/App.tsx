import 'braid-design-system/reset';

import { BraidProvider } from 'braid-design-system';
import seekJobs from 'braid-design-system/themes/seekJobs';
import { StrictMode } from 'react';

import { ClickToReveal } from './ClickToReveal';

export const App = () => (
  <StrictMode>
    <BraidProvider theme={seekJobs}>
      <ClickToReveal />
    </BraidProvider>
  </StrictMode>
);
