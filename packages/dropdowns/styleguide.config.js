/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/**
 * Package specific styleguide configuration
 * https://github.com/styleguidist/react-styleguidist/blob/master/docs/Configuration.md
 */
module.exports = {
  sections: [
    {
      name: '',
      content: '../../packages/dropdowns/README.md'
    },
    {
      name: 'Dropdown',
      components: '../../packages/dropdowns/src/Dropdown/Dropdown.js'
    },
    {
      name: 'Trigger',
      components: '../../packages/dropdowns/src/Trigger/Trigger.js'
    },
    {
      name: 'Menu',
      components: '../../packages/dropdowns/src/Menu/[A-Z]*.js',
      sections: [
        {
          name: 'Items',
          components: '../../packages/dropdowns/src/Menu/Items/[A-Z]*.js'
        }
      ]
    },
    {
      name: 'Styled Elements',
      components: '../../packages/dropdowns/src/styled/[A-Z]*.js',
      sections: [
        {
          name: 'Menu',
          components: '../../packages/dropdowns/src/styled/menu/[A-Z]*.js'
        },
        {
          name: 'Items',
          components: '../../packages/dropdowns/src/styled/items/[A-Z]*.js',
          sections: [
            {
              name: 'Header',
              components: '../../packages/dropdowns/src/styled/items/header/[A-Z]*.js'
            },
            {
              name: 'Media',
              components: '../../packages/dropdowns/src/styled/items/media/[A-Z]*.js'
            }
          ]
        }
      ]
    }
  ]
};
