import SideMenu from "@/components/SideMenu";
import { NextPage } from "next";
import Head from "next/head"
import { PrescriptionData } from "@/mock/presciption";
import { 
    Box, 
    TableContainer, 
    Paper, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Chip,
    Button,
    InputLabel,
    TextField,
    CircularProgress,
    FormControl,
    MenuItem,
    Select,
    Snackbar,
    Alert,
} from "@mui/material";
import Modal from "@/components/Modal";
import { FormEvent, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import useDelegates from "@/hooks/useDelegates";
import Image from "next/image";
import { convertEpochToDate } from "@/utils/convertEpochToDateString";
import { Gender } from "@/types";

const EmptyState = ({ openModal }: { openModal: () => void }) => (
    <div className="w-full lg:w-2/6 gap-2 flex flex-col items-center mx-auto">
        <Image 
            src="/empty-box.svg" 
            alt="empty-box" 
            width={400} 
            height={400}
        />
        <h1>You don't have any delegates yet. Add one</h1>
        <button
            onClick={openModal}
            className="flex w-full items-center justify-center text-white bg-blue-600 px-6 py-2 rounded-lg"
        >
            Add Delegate
        </button>

    </div>
)

const DelegatesPage: NextPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { delegates, loadingDelegates, addDelagatesLoading, addDelegate, addDelegateSuccess, addDelegateError } = useDelegates();

    const addNewDelegate = async (e:FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const formData = Object.fromEntries(data);
        
        addDelegate({
            name: formData.name as string,
            email: formData.email as string,
            home_address: formData.home_address as string,
            license_expiry: new Date(licenseExpiry).valueOf(),
            gender: formData.gender as Gender,
            profile_pic: `https://api.dicebear.com/6.x/initials/svg?seed=${formData.name}`,
            pharmacy_id: 0,         
        })
    }

    const [licenseExpiry, setLicenseExpiry] = useState<string>("");
    return(
        <>
        <Head>
            <title>My Delegtates</title>
        </Head>
        <SideMenu>
            <main className="relative">
                <Box marginTop={10}>
                    {   
                        loadingDelegates ? <CircularProgress/> :
                        delegates!.length < 1 ? 
                        <EmptyState 
                            openModal={() => setModalOpen(true)}
                        /> :
                        <>
                            <Box 
                                width="100%" 
                                justifyContent="space-between" 
                                alignItems="center" 
                                display="flex"
                            >
                                <h1>
                                    My Delegates
                                </h1>

                                <Button onClick={() => setModalOpen(true)}>
                                    Add Delegate
                                </Button>                        
                            </Box>

                            <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow className="bg-primary text-white">
                                            <TableCell>ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        delegates?.map((data, index) => (
                                        <TableRow>
                                            <TableCell>{index}</TableCell>
                                            <TableCell>{data.name}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={data.verified ? 'Verified' : 'Unverified'}
                                                    color={data.verified ? 'success' : 'error'}
                                                />

                                            </TableCell>
                                        </TableRow>
                        
                                        ))
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </>
                    }

                    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                        <Box width="80%" display="flex" flexDirection="column">
                            <h1>Add Delegate</h1>
                            <form onSubmit={addNewDelegate} className="flex flex-col">
                                <TextField
                                    margin="dense"
                                    sx={{ "::placeholder": "#fff" }}
                                    variant="outlined"
                                    label="Full Name"
                                    name="name"
                                    placeholder="Enter Patient's Full Name"
                                />

                                <TextField
                                    margin="dense"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <TextField
                                    margin="dense"
                                    label="Address"
                                    name="home_address"
                                    placeholder="Enter your Home Address"
                                />

                                <DatePicker 
                                    sx={{ marginVerical: 5 }}
                                    label="License Expiry"
                                    slotProps={{
                                        textField: {
                                            helperText: "The date your license expires"
                                        }
                                    }}
                                    onChange={(newDate) => setLicenseExpiry(newDate as string)}
                                />

                                <FormControl>
                                    <InputLabel id="user-gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="user-gender-label"
                                        id="user-gender"
                                        name="gender"
                                        label="Gender"
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </Select>
                                </FormControl>

                                <button
                                    type="submit"
                                    className="flex my-2 items-center justify-center text-white bg-blue-600 px-6 py-2 rounded-lg"
                                >
                                { addDelagatesLoading ? <CircularProgress size={25} sx={{color:'#fff'}}/> : "Complete Registration" }
                                </button>


                            </form>

                        </Box>

                    </Modal>

                    <Snackbar
                        open={addDelegateSuccess}
                        autoHideDuration={3000}
                    >
                        <Alert severity="success">
                            Added Delegate Successfully
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        open={addDelegateError}
                        color="error"
                        message="Error while adding delegate"
                        autoHideDuration={3000}
                    />
                </Box>


            </main>
        </SideMenu>
        </>
    )
}

export default DelegatesPage;