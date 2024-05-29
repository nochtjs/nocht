import { defineConfig } from 'vitepress'

const pkgs = ['DOM','Fx','Reactive','Data','Fetch','CSS'];



// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/nocht/',
  title: "Nocht",
  description: "A jQuery-like library to make web development less of a pain",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Packages',
        items: [{ text: 'Overview', link: '/packages/' }, ...pkgs.map(pkg => ({ text: `@nocht/${pkg.toLowerCase()}`, link: `/packages/${pkg.toLowerCase()}` }))]
      }
    ],

    sidebar: [
      {
        text: 'Start Here',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Differences from jQuery', link: '/differences' },
          { text: 'A note about .ready', link: '/a-note-about-ready' }
        ]
      },
      {
        text: 'Core',
        items: ['Events','Scheduler','Bind'].map(feat => ({ text: feat, link: `/core/${feat.toLowerCase()}` }))
      },
      {
        text: 'Packages',
        items: pkgs.map(pkg => ({ text: pkg, link: `/packages/${pkg.toLowerCase()}` }))

      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nochtjs/nocht' }
    ]
  }
})