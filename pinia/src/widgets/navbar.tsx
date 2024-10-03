
import { Outlet, Link, useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import reactLogo from '../assets/react.svg'

function Navbar() {
    const navigate = useNavigate();
    const handleNavigation = (path:string) => {
        navigate(path);  // Navigate to the specified path
      };
    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img src={reactLogo} alt="logo" />
                        Dashboard
                    </Typography>
                    <Box>
                        <Button color="inherit" onClick={() => handleNavigation('/')}>Dashboard</Button>
                        <Button color="inherit" onClick={() => handleNavigation('/withdraw')}>Profile</Button>
                        <Button color="inherit" onClick={() => handleNavigation('/about')}>Settings</Button>
                        <Button color="inherit">Log Out</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
};

export default Navbar;