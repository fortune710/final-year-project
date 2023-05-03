import { 
    Drawer, 
    Container, 
    List, 
    ListItem, 
    useTheme, 
    ListItemButton, 
    ListItemText, 
    Toolbar, 
    Divider, 
    AppBar, 
    InputBase, 
    Paper, 
    ListItemIcon, 
    Box, 
    SxProps,
    TextField,
    RadioGroup,
    Radio,
    InputLabel,
    FormControl,
    FormLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { 
    HomeOutlined, 
    Home,
    PeopleOutlineOutlined,
    PeopleOutline,
    MedicationOutlined,
    Medication,
    Search,
    SearchOutlined,
    AddOutlined,
    AddCircleOutline
} from "@mui/icons-material";
import usePatients from '@/hooks/usePatients';
import Link from 'next/link';
import { useState } from 'react';
import Modal from './Modal';

interface SideMenuProps {
    children: React.ReactNode;
}

const drawerWidth = 300;


const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
    const theme = useTheme();
    const { searchUser } = usePatients();

    const [patients, setPatients] = useState<any[]|undefined>(undefined);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleSearch = (query:string) => {
        if (!query) {
            return setPatients(undefined);
        }

        const patients = searchUser(query);
        return setPatients(patients!);
    }

    //Style objects for MUI components
    const searchResults: SxProps = {
        marginTop: 0.5,
        width: 300,
        position: 'absolute'
    }

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
                        <ListItemButton LinkComponent={Link} href='/'>
                            <ListItemIcon>
                                <HomeOutlined/>
                            </ListItemIcon>
                            <ListItemText>
                                Home
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <MedicationOutlined/>
                            </ListItemIcon>
                            
                            <ListItemText>
                                Drugs
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton LinkComponent={Link} href='/delegates'>
                            <ListItemIcon>
                                <PeopleOutlineOutlined/>
                            </ListItemIcon>
                            
                            <ListItemText>
                                My Delegates
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>


                    
                </List>

            </Drawer>
            <Container sx={{ position: 'relative' }}>
                <AppBar 
                    sx={{ left: 0, right: 0 }} 
                    position="absolute"
                >
                    <Toolbar>
                        <Box sx={{ position: 'relative', width: '40%' }}>
                            <Paper sx={{ boxShadow: 0, padding: 1, width: '100%', display:'flex', alignItems: 'center' }}>
                                <SearchOutlined sx={{ marginRight: '10px' }}/>
                                <InputBase onChange={(e) => handleSearch(e.target.value)} placeholder="Search for a user"/>
                            </Paper>
                            {
                                !patients ? null :
                                patients && patients.length === 0 ? 
                                <Paper sx={searchResults}>
                                    <List>
                                        <ListItemButton onClick={() => setModalOpen(true)}>
                                            <ListItemIcon>
                                                <AddCircleOutline/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                Add Patient
                                            </ListItemText>
                                        </ListItemButton>
                                    </List>
                                </Paper>
                                :<Paper sx={searchResults}>
                                    <List>
                                    {
                                        patients.map((patient) => (
                                            <ListItem>{patient.name}</ListItem>
                                        ))
                                    }
                                    </List>
                                </Paper>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>

                {children}
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <Box width="80%" display="flex" flexDirection="column">

                        <TextField
                            margin="normal"
                            sx={{ "::placeholder": "#fff" }}
                            variant="outlined"
                            label="Full Name"
                            name="full_name"
                            placeholder="Enter Patient's Full Name"
                        />

                        <TextField
                            margin="normal"
                            label="Phone Number"
                            name="phone_number"
                            placeholder="Enter Patient's Full Name"
                        />
                        <TextField
                            margin="normal"
                            label="NIN"
                            name="nin"
                            placeholder="Enter Patient's Full Name"
                        />
                        <TextField
                            margin="normal"
                            label="Address"
                            name="home_address"
                            placeholder="Enter Patient's Full Name"
                        />

                        <DatePicker 
                            sx={{ marginVerical: 5 }}
                            label="Date of Birth"
                        />

                        <Container>
                            <InputLabel>Gender</InputLabel>
                            <RadioGroup>
                                <Box display="flex" alignItems="center">
                                    <Radio value={"male"}/>
                                    <InputLabel>Male</InputLabel>
                                </Box>

                                <Box display="flex" alignItems="center">
                                    <Radio value={"female"}/>
                                    <InputLabel>Female</InputLabel>
                                </Box>
                            </RadioGroup>
                        </Container>
                        
                    </Box>
                </Modal>
            </Container>
        </main>
    )
}

export default SideMenu;