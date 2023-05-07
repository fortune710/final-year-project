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
    Button,
    CircularProgress,
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
import { FormEvent, useState } from 'react';
import Modal from './Modal';
import { PatientData } from '@/types';

interface SideMenuProps {
    children: React.ReactNode;
}

const drawerWidth = 300;


const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
    const theme = useTheme();
    const { searchUser, addPatientToBlockchain, addPatientMutationLoading } = usePatients();

    const [patients, setPatients] = useState<any[]|undefined>(undefined);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [dateofBirth, setDateofBirth] = useState<string>('');

    const handleSearch = (query:string) => {
        if (!query) {
            return setPatients(undefined);
        }

        const patients = searchUser(query);
        return setPatients(patients!);
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fields  = new FormData(e.target as HTMLFormElement);
        const formData = Object.fromEntries(fields);
        
        const res = await addPatientToBlockchain({
            name: formData.name as string,
            date_of_birth: new Date(dateofBirth).valueOf(),
            nin: formData.nin as string,
            gender: formData.gender as 'M'|'F',
            phone_number: formData.phone_number as string,
        } as PatientData)

        alert(res)
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
                                <InputBase 
                                    onChange={(e) => handleSearch(e.target.value)} 
                                    placeholder="Search for a user"
                                />
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
                                            <ListItemButton 
                                                key={patient.id}
                                                LinkComponent={Link}
                                                href={`/patients/${patient.id}`}
                                            >
                                                <ListItemText>
                                                    {patient.name}
                                                </ListItemText>
                                            </ListItemButton>
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
                    <form onSubmit={handleSubmit} style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            margin="normal"
                            sx={{ "::placeholder": "#fff" }}
                            variant="outlined"
                            label="Full Name"
                            name="name"
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
                            onChange={(newDate) => setDateofBirth(newDate as string)}
                        />

                        <Container>
                            <InputLabel>Gender</InputLabel>
                            <RadioGroup name='gender' sx={{ display: 'flex' }}>
                                <Box display="flex" alignItems="center">
                                    <Radio name='gender' value={"M"}/>
                                    <InputLabel>Male</InputLabel>
                                </Box>

                                <Box display="flex" alignItems="center">
                                    <Radio name='gender' value={"F"}/>
                                    <InputLabel>Female</InputLabel>
                                </Box>
                            </RadioGroup>
                        </Container>
                        
                        <Button 
                            disabled={addPatientMutationLoading} 
                            type='submit'
                            variant='contained'
                            disableElevation
                            color="primary"
                            
                        >
                            { 
                                addPatientMutationLoading ? 
                                <CircularProgress sx={{ color: "#fff" }}/> 
                                : 'Add Patient'
                            }
                        </Button>
                    </form>
                </Modal>
            </Container>
        </main>
    )
}

export default SideMenu;