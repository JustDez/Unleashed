import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../../assets/Images/Logo.png';
import { theme } from '../../../Theme/themes';

// Navigation links
const navLinks = [
  { text: 'Yellowstone Kennels', path:'https://yellowstonekennels.com/'},
  { text: 'Shop', path: '/' },
  { text: 'Cart', path: '/cart' },
];

// Styles
const appBarStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  margin: 0,
  padding: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  boxShadow: 'none',
  zIndex: 1100,
};

const logoBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
};

const logoStyles = {
  height: '80px',
  marginRight: '10px',
};

const typographyStyles = {
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'Chalkboard SE',
  fontSize: '1.50rem',
  color: 'inherit',
};

const menuButtonBoxStyles = {
  flexGrow: 1,
  display: { xs: 'flex', md: 'none' },
};

const mobileLogoBoxStyles = {
  display: { xs: 'flex', md: 'none' },
  alignItems: 'center',
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
};

const mobileTypographyStyles = {
  variant: 'h5',
  noWrap: true,
  sx: {
    fontFamily: 'Chalkboard SE',
    fontWeight: 700,
    color: 'inherit',
  },
};

const navLinksBoxStyles = {
  flexGrow: 1,
  display: { xs: 'none', md: 'flex' },
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyles = (path, location) => ({
  my: 2,
  color: 'black',
  display: 'block',
  fontSize: '1.25rem',
  paddingLeft: '1.5rem',
  paddingRight: '3rem',
  position: 'relative',
  transition: 'opacity 0.1s',
  '&:hover': {
    opacity: 0.5,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '0.5px',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '2px',
    width: '14px',
    backgroundColor: 'black',
    display: location.pathname === path ? 'block' : 'none',
  },
});

const signedInButtonStyles = (location) => ({
  my: 2,
  color: 'black',
  display: 'block',
  fontSize: '1.25rem',
  paddingLeft: '1.5rem',
  paddingRight: '3rem',
  position: 'relative',
  transition: 'opacity 0.1s',
  '&:hover': {
    opacity: 0.5,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '0px',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '2px',
    width: '16px',
    backgroundColor: 'black',
    display: location.pathname === '/signin' ? 'block' : 'none',
  },
});

// Navbar Component
export const Navbar = ({ isSignedIn, handleSignOut, cartItemCount }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
    handleCloseNavMenu();
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={appBarStyles}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box component="a" href="/" sx={logoBoxStyles}>
              <img src={Logo} alt="Logo" style={logoStyles} />
              <Typography variant="h6" noWrap sx={typographyStyles}>
                {"Unleashed"}
              </Typography>
            </Box>
            <Box sx={menuButtonBoxStyles}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {navLinks.map((link) => (
                  <MenuItem key={link.text} onClick={() => handleNavigate(link.path)}>
                    <Typography textAlign="center">{link.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box component="a" href="/" sx={mobileLogoBoxStyles}>
              <Typography variant="h5" noWrap sx={mobileTypographyStyles.sx}>
                {"Unleashed"}
              </Typography>
            </Box>
            <Box sx={navLinksBoxStyles}>
              {navLinks.map((link) => (
                <Button
                  key={link.text}
                  onClick={() => handleNavigate(link.path)}
                  sx={buttonStyles(link.path, location)}
                >
                  {link.text === 'Cart' ? (
                    <Badge badgeContent={cartItemCount} color="secondary" sx={{ marginLeft: 1 }}>
                      {link.text}
                    </Badge>
                  ) : (
                    link.text
                  )}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isSignedIn ? (
                <Button onClick={handleSignOut} sx={signedInButtonStyles(location)}>
                  Sign Out
                </Button>
              ) : (
                <Button onClick={() => handleNavigate('/signin')} sx={signedInButtonStyles(location)}>
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

Navbar.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  cartItemCount: PropTypes.number.isRequired,
};
