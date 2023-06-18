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
    IconButton,
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
    AddCircleOutline,
    MenuOpen
} from "@mui/icons-material";
import usePatients from '@/hooks/usePatients';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Modal from './Modal';
import { PatientData } from '@/types';

interface SideMenuProps {
    children: React.ReactNode;
}



const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
    const { searchUserByNin, addPatientToBlockchain, addPatientMutationLoading } = usePatients();

    const [sidebarFull, setSidebarFull] = useState<boolean>(false);
    const [patients, setPatients] = useState<any[]|undefined>(undefined);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [dateofBirth, setDateofBirth] = useState<string>('');

    const drawerWidth = sidebarFull ? 300 : 200;


    const handleSearch = (query:string) => {
        if (!query) {
            return setPatients(undefined);
        }

        const patients = searchUserByNin(query);
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
        if(res === "success") {
            setModalOpen(false);
        }
    }

    //Style objects for MUI components
    const searchResults: SxProps = {
        marginTop: 0.5,
        width: 300,
        position: 'absolute'
    }

    return(
        <>
        <header>
            <AppBar>
                <Toolbar>
                    <IconButton 
                        onClick={() => setSidebarFull(!sidebarFull)} 
                        aria-label='Toggle Menu'
                    >
                        <MenuOpen/>
                    </IconButton>
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
                                            <ListItemText
                                                primary={patient.name}
                                                secondary={patient.nin}
                                            />
                                        </ListItemButton>
                                    ))
                                }
                                </List>
                            </Paper>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </header>

        <main className={`flex bg-white dark:bg-gray-800`}>
            <aside className={`w-[${drawerWidth}px]`}>
                <Toolbar>
                    <h1>Drug Prescription</h1>
                </Toolbar>
                <Divider/>
                <List>
                    <ListItem>
                        <ListItemButton LinkComponent={Link} href='/prescriptions'>
                            <ListItemIcon>
                                <PeopleOutlineOutlined/>
                            </ListItemIcon>
                            <ListItemText>Prescriptions</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <MedicationOutlined/>
                            </ListItemIcon>
                            
                            <ListItemText>Drugs</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton LinkComponent={Link} href='/delegates'>
                            <ListItemIcon>
                                <PeopleOutlineOutlined/>
                            </ListItemIcon>
                            
                            <ListItemText>My Delegates</ListItemText>
                        </ListItemButton>
                    </ListItem>


                    
                </List>

            </aside>
            <Container sx={{ position: 'relative' }}>
                

                {children}
                <Modal 
                    className='bg-white dark:bg-gray-800' 
                    open={modalOpen} 
                    onClose={() => setModalOpen(false)}
                >
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
                        
                        <button 
                            disabled={addPatientMutationLoading} 
                            type='submit'
                            className='bg-blue-500 rounded-lg py-3 px-7'                            
                        >
                            { 
                                addPatientMutationLoading ? 
                                <CircularProgress sx={{ color: "#fff" }}/> 
                                : 'Add Patient'
                            }
                        </button>
                    </form>
                </Modal>
            </Container>
        </main>
        </>
    )
}

export default SideMenu;