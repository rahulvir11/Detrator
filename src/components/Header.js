import * as React from 'react';
import {
  Badge,
  Divider,
  Toolbar,
  Typography,
  styled,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SideDrawer from './SideDrawer';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  fontSize: 20,
  textTransform: 'uppercase',
  justifyContent: 'center',
  fontFamily: 'Montserrat',
}));

const TitleTypography = styled(Typography)({
  flexGrow: 1,
});

function Header() {
  return (
    <>
      <Toolbar>
        <SideDrawer>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        </SideDrawer>
        <TitleTypography variant="h6">Real-Time Comments</TitleTypography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>

      <Divider />

      <StyledToolbar>
        Express your emotions through words
      </StyledToolbar>
    </>
  );
}

export default Header;
