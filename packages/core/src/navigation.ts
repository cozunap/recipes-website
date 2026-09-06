export interface NavigationItem {
  id: string;
  label: string;
  type: 'internal' | 'external';
  url?: string;
  pageId?: string;
  openInNewTab: boolean;
  children?: NavigationItem[];
}

export interface NavigationMenu {
  id: string;
  name: string;
  items: NavigationItem[];
}
