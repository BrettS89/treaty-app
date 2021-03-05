import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DesktopWindowsRoundedIcon from '@material-ui/icons/DesktopWindowsRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

export const brokerSidebar = [
    {
    text: 'Dashboard',
    Icon: DesktopWindowsRoundedIcon,
    path: '/app/broker/dashboard',
  },
  {
    text: 'My deals',
    Icon: LibraryBooksRoundedIcon,
    path: '/app/broker/my-deals',
  },
  {
    text: 'Markets',
    Icon: BusinessRoundedIcon,
    path: '/app/broker/markets',
  },
  {
    text: 'Create deal',
    Icon: AddRoundedIcon,
    path: '/app/broker/create-deal',
  }
];

export const purchaserSidebar = [
  {
    text: 'Dashboard',
    Icon: DesktopWindowsRoundedIcon,
    path: '/app/purchaser/dashboard',
  },
  {
    text: 'My deals',
    Icon: LibraryBooksRoundedIcon,
    path: '/app/purchaser/my-deals',
  },
  {
    text: 'Search deals',
    Icon: SearchRoundedIcon,
    path: '/app/purchaser/search-deals',
  },
];