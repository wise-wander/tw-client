interface INavigationItem {
  href: string;
  title: string;
}

export const NAVIGATION_ITEMS: INavigationItem[] = [
  { title: 'Hotels', href: '/hotels' },
  { title: 'Restaurants', href: '/restaurants' },
  { title: 'Things to do', href: '/things-to-do' },
];
