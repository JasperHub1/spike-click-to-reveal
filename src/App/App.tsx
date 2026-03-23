import 'braid-design-system/reset';

import {
  ContentBlock,
  BraidProvider,
  Divider,
  Heading,
  Stack,
} from 'braid-design-system';
import seekJobs from 'braid-design-system/themes/seekJobs';
import { StrictMode } from 'react';

import { ClickToRevealAlreadyMasked } from './ClickToRevealAlreadyMasked';
import { ClickToRevealFrontendMask } from './ClickToRevealFrontendMask';
import { ClickToRevealPureCSS } from './ClickToRevealPureCSS';

export const App = () => (
  <StrictMode>
    <BraidProvider theme={seekJobs}>
      <Stack space="large">
        <Divider />

        <ContentBlock>
          <Heading level="4">Pure CSS - Click to contact directly</Heading>
          <ClickToRevealPureCSS />
        </ContentBlock>

        <Divider />

        <ContentBlock>
          <Heading level="4">Backend doing Masking logic</Heading>
          <ClickToRevealAlreadyMasked />
        </ContentBlock>

        <Divider />

        <ContentBlock>
          <Heading level="4">Frontend doing Masking logic</Heading>
          <ClickToRevealFrontendMask />
        </ContentBlock>
      </Stack>
    </BraidProvider>
  </StrictMode>
);
