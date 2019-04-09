# @zendeskgarden/react-dropdowns [![npm version](https://img.shields.io/npm/v/@zendeskgarden/react-dropdowns.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/react-dropdowns)

This package includes components relating to dropdowns in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/react-dropdowns

# Peer Dependencies - Also Required
npm install react react-dom prop-types styled-components @zendeskgarden/react-theming
```

## Usage

```jsx static
/**
 * Include dropdowns styling at the root of your application
 */
import '@zendeskgarden/react-dropdowns/dist/styles.css';

import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';

/**
 * Place a `ThemeProvider` at the root of your React application
 */
<ThemeProvider>
  <Dropdown onSelect={value => console.log('Selected: ', value)}>
    <Trigger>
      <button>This triggers a menu</button>
    </Trigger>
    <Menu placement="end" arrow>
      <Item value="option-1">Option 1</Item>
      <Item value="option-2">Option 2</Item>
      <Item value="option-3">Option 3</Item>
    </Menu>
  </Dropdown>
  ;
</ThemeProvider>;
```
