import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/nocht/',
  title: "Nocht",
  description: "A jQuery-like library to make web development less of a pain",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Start Here',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Caveats', link: 'caveats' },
          { text: 'Differences from jQuery', link: 'differences' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Packages',
        items: [
          { text: '@nocht/dom', link: '/dom-examples' },
          { text: '@nocht/plugin', link: '/plugin-examples' },
          { text: '@nocht/shared', link: '/shared-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nochtjs/nocht' }
    ]
  }
})
