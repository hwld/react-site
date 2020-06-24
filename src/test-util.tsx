import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import theme from './theme/theme';

const AllProviders: React.FC = ({ children }) => {
  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
};

// optionsとしてqueriesを考慮しない
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
