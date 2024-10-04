
import { Outlet, useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Button, Box , IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import reactLogo from '../assets/react.svg'
import '../App.css'
function Navbar() {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);  // Navigate to the specified path
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        
                        <img className="logo react" src={reactLogo} alt="logo" />
                        <MenuIcon />
                    </IconButton>
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