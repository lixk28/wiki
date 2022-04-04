// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Snow\'s Wiki',
  tagline: 'My personal technical wiki',
  url: 'https://wiki.xkun.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/kaf.png',
  organizationName: 'lixk28', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      {
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
        editUrl: 'https://github.com/lixk28/wiki',
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
        editUrl: 'https://github.com/lixk28/wiki',
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
        editUrl: 'https://github.com/lixk28/wiki',
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
        editUrl: 'https://github.com/lixk28/wiki',
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
        editUrl: 'https://github.com/lixk28/wiki',
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
        editUrl: 'https://github.com/lixk28/wiki',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'vim',
        path: 'vim',
        routeBasePath: 'vim',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/lixk28/wiki',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'git',
        path: 'git',
        routeBasePath: 'git',
        sidebarPath: require.resolve('./sidebars.js'),
        lastVersion: 'current',
        onlyIncludeVersions: ['current'],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/lixk28/wiki',
      },
    ],
  ],

  themeConfig: {
    metadata: [{name: 'keywords', content: 'wiki, tech, computer science'}],
    hideableSidebar: true,
    autoCollapseSidebarCategories: true,
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
          to: 'vim/intro',
          label: 'vim',
          position: 'left',
          activeBaseRegex: 'vim',
        },
        {
          to: 'git/intro',
          label: 'git',
          position: 'left',
          activeBaseRegex: 'git',
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
