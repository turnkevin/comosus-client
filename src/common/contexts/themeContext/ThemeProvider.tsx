import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import '@fontsource/montserrat';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const chakraTheme = {
  fonts: {
    body: 'Montserrat, sans-serif',
  },
  config: {
    initialColorMode: 'system',
  },
};

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ChakraProvider resetCSS={true} theme={extendTheme(chakraTheme)}>
      {children}
    </ChakraProvider>
  );
};
