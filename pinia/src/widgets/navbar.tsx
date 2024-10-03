
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import reactLogo from '../assets/react.svg'

function Navbar() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img src={reactLogo} alt="logo" />
                    Dashboard
                </Typography>
                <Box>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Profile</Button>
                    <Button color="inherit">Settings</Button>
                    <Button color="inherit">Log Out</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;