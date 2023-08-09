export type Item = {
  title: string,
  url?: string,
  submenu?: Item[]
}


export const menuItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Services',
    url: '/second-page',
    submenu: [
      {
        title: 'web design',
        url: '/',
      },
      {
        title: 'web development',
        url: '/',
      },
      {
        title: 'SEO',
        url: '/',
      },
    ],
  },
  {
    title: 'About',
    url: '/second-page',
  },
  {
    title: 'web development',
    url: 'web-dev',
    submenu: [
      {
        title: 'Frontend',
        url: '/second-page',
      },
      {
        title: 'Backend',
        submenu: [
          {
            title: 'NodeJS',
            url: '/second-page',
          },
          {
            title: 'PHP',
            url: '/second-page',
          },
        ],
      },
    ],
  },
];