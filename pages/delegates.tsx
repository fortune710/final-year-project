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
    Typography, 
    Container, 
    Button,
    InputLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import Modal from "@/components/Modal";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const DelegatesPage: NextPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return(
        <>
        <Head>
            <title>My Delegtates</title>
        </Head>
        <SideMenu
            children={
                <main className="relative">
                    <Box marginTop={10}>
                        <Box 
                            width="100%" 
                            justifyContent="space-between" 
                            alignItems="center" 
                            display="flex"
                        >
                            <Typography color="#fff">
                                My Delegates
                            </Typography>

                            <Button onClick={() => setModalOpen(true)}>
                                Add Delegate
                            </Button>                        
                        </Box>
                        <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow className="bg-primary text-white">
                                    <TableCell className="text-white">ID</TableCell>
                                    <TableCell>Drug Name</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Dosage</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    PrescriptionData.map((data) => (
                                    <TableRow>
                                        <TableCell>{data.id}</TableCell>
                                        <TableCell>{data.drug.name}</TableCell>
                                        <TableCell>{data.patient.name}</TableCell>
                                        <TableCell>{data.prescribed_dosage}</TableCell>
                                    </TableRow>
                    
                                    ))
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>

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

                    </Box>
                </main>
            }
        />
        </>
    )
}

export default DelegatesPage;