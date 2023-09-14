import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../src/assets/styles/styles.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#181A25',
        },
        {
          name: 'white',
          value: 'white',
        },
      ],
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
