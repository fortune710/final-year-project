import { Drawer, Container, List, ListItem } from '@mui/material';

interface SideMenuProps {
    children: React.ReactNode;
}

const drawerWidth = 300;


const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
    return(
        <main className='flex w-[100vw]'>
            <Drawer
                sx={{ 
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                    },
                }}
                open={true}
                anchor='left'
                variant='persistent'
            >
                <div>
                    <h1>Drug Prescription</h1>
                </div>
                <List>
                    <ListItem>
                        Home
                    </ListItem>
                    <ListItem>
                        Patients
                    </ListItem>
                    <ListItem>
                        Drugs
                    </ListItem>
                </List>

            </Drawer>
            <Container
                sx={{ marginLeft: `${drawerWidth}px` }}
            >
                {children}
            </Container>
        </main>
    )
}

export default SideMenu;