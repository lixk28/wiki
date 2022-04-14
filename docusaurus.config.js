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
