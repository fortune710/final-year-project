import { Drawer, Container, List, ListItem, useTheme, ListItemButton, ListItemText, Toolbar, Divider, AppBar, InputBase, Paper } from '@mui/material';

interface SideMenuProps {
    children: React.ReactNode;
}

const drawerWidth = 300;


const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
    const theme = useTheme();

    return(
        <main className='grid grid-cols-[300px_auto]'>
            <Drawer
                sx={{ 
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                      background: '#333333',
                      color: 'white'
                    },
                }}
                open={true}
                anchor='left'
                variant='persistent'
            >
                <Toolbar>
                    <h1>Drug Prescription</h1>
                </Toolbar>
                <Divider/>
                <List>
                    <ListItem>
                        <ListItemButton>
                            
                            <ListItemText>
                                Home
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            
                            <ListItemText>
                                Patients
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            
                            <ListItemText>
                                Drugs
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>


                    
                </List>

            </Drawer>
            <Container sx={{ position: 'relative' }}>
                <AppBar 
                    sx={{
                    left: 0,
                    right: 0
                    }} 
                    position="absolute"
                >
                    <Toolbar>
                        <Paper>

                            <InputBase placeholder="Search for a user"/>
                        </Paper>
                    </Toolbar>
                </AppBar>

                {children}
            </Container>
        </main>
    )
}

export default SideMenu;