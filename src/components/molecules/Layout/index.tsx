import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const drawerWidth = 240;

type LayoutProps = {
  title?: string
  isLoggedIn: boolean
  children: React.ReactNode
}
export default function Layout({ title, children }: LayoutProps) {
  const router = useRouter()
  const menuList = [{ name: 'Clientes', path: 'clientes' }, { name: 'Veículos', path: 'veiculos' }, { name: 'Condutores', path: 'condutores' }, { name: 'Deslocamentos', path: 'deslocamentos' }]
  const menuList2 = [{ name: 'Sem retorno', path: 'abertos' }, { name: 'Retornados', path: 'fechados' }]
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        open={false}
      >
        <Toolbar css={{alignSelf:'center'}}>
          <Box >
            <Image
              onClick={() => router.push('/')}
              css={{ cursor: 'pointer' }} 
              alt="SGD Naty"
              src="/images/brand-logo.png"
              width={100}
              height={100}
            />
          </Box>
        </Toolbar>
        <Divider />
        <List>
          {menuList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => router.push(item.path)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuList2.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => router.push(item.path)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>

    </Box>

  );
}