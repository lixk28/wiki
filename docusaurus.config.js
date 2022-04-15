// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Snow\'s Wiki',
  tagline: 'My personal technical wiki',
  url: 'https://wiki.xkun.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/sio.png',
  organizationName: 'lixk28', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        sitemap: {
          changefreq: 'hourly',
          priority: 0.5,
        },
        docs: {
          routeBasePath: '/',
          path: 'home',
          sidebarPath: false,
          lastVersion: 'current',
          onlyIncludeVersions: ['current'],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ds',
        path: 'ds',
        routeBasePath: 'ds',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'arch',
        path: 'arch',
        routeBasePath: 'arch',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'os',
        path: 'os',
        routeBasePath: 'os',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'comp',
        path: 'comp',
        routeBasePath: 'comp',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
        // admonitions: {
        //   customTypes: {
        //     question: {
        //       keyword: 'question',
        //       svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zM6.92 6.085c.081-.16.19-.299.34-.398.145-.097.371-.187.74-.187.28 0 .553.087.738.225A.613.613 0 019 6.25c0 .177-.04.264-.077.318a.956.956 0 01-.277.245c-.076.051-.158.1-.258.161l-.007.004a7.728 7.728 0 00-.313.195 2.416 2.416 0 00-.692.661.75.75 0 001.248.832.956.956 0 01.276-.245 6.3 6.3 0 01.26-.16l.006-.004c.093-.057.204-.123.313-.195.222-.149.487-.355.692-.662.214-.32.329-.702.329-1.15 0-.76-.36-1.348-.863-1.725A2.76 2.76 0 008 4c-.631 0-1.155.16-1.572.438-.413.276-.68.638-.849.977a.75.75 0 101.342.67z"></path></svg>',
        //     },
        //   }
        // },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'net',
        path: 'net',
        routeBasePath: 'net',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'db',
        path: 'db',
        routeBasePath: 'db',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'vim',
        path: 'tools/vim',
        routeBasePath: 'tools/vim',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'git',
        path: 'tools/git',
        routeBasePath: 'tools/git',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tmux',
        path: 'tools/tmux',
        routeBasePath: 'tools/tmux',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/lixk28/wiki/tree/main',
      },
    ],
  ],

  themeConfig: {
    metadata: [{name: 'keywords', content: 'wiki, tech, computer science'}],
    hideableSidebar: true,
    autoCollapseSidebarCategories: false,
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Snow\'s Wiki',
      logo: {
        alt: 'My Site Logo',
        src: 'img/sio.png',
      },
      items: [
        {
          to: 'ds/intro',
          label: '数据结构',
          position: 'left',
          activeBaseRegex: 'ds',
        },
        {
          to: 'arch/intro',
          label: '计算机组成',
          position: 'left',
          activeBaseRegex: 'arch',
        },
        {
          to: 'os/intro',
          label: '操作系统',
          position: 'left',
          activeBaseRegex: 'os',
        },
        {
          to: 'comp/intro',
          label: '编译原理',
          position: 'left',
          activeBaseRegex: 'comp',
        },
        {
          to: 'net/intro',
          label: '计算机网络',
          position: 'left',
          activeBaseRegex: 'net',
        },
        {
          to: 'db/intro',
          label: '数据库',
          position: 'left',
          activeBaseRegex: 'db',
        },
        {
          label: 'Tools',
          position: 'left',
          items: [
            {
              to: 'tools/vim/intro',
              label: 'vim',
            },
            {
              to: 'tools/git/intro',
              label: 'git',
            },
            {
              to: 'tools/tmux/intro',
              label: 'tmux',
            }
          ],
        },
        {
          href: 'https://github.com/lixk28/wiki',
          position: 'right',
          className: 'header-github-link',
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          label: 'Blog',
          href: 'https://xkun.me',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/lixk28',
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/lixk28',
        },
        {
          label: 'Telegram',
          href: "https://t.me/lixk28",
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Xuekun Li. All rights reserved.`,
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },

    // i18n: {
    //   defaultLocale: 'zh',
    //   locales: ['en', 'zh'],
    // },
  },
};

module.exports = config;
