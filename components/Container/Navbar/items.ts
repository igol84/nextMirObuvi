import {Item} from "@/components/Container/Navbar/types";

export const menuItems: Item[] = [
  {
    title: 'Home',
    url: '',
  },
  {
    title: 'Services',
    url: 'second-page',
    submenu: [
      {
        title: 'web design',
        url: '',
      },
      {
        title: 'web development',
        url: '',
      },
      {
        title: 'SEO',
        url: '',
      },
    ],
  },
  {
    title: 'About',
    url: 'second-page',
  },
  {
    title: 'web development',
    url: 'second-page',
    submenu: [
      {
        title: 'Frontend',
        url: 'second-page',
      },
      {
        title: 'Backend',
        submenu: [
          {
            title: 'NodeJS',
            url: '',
          },
          {
            title: 'PHP',
            url: 'second-page',
          },
        ],
      },
    ],
  },
];