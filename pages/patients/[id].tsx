import Modal from "@/components/Modal";
import SideMenu from "@/components/SideMenu";
import useContract from "@/hooks/useContract";
import usePatients from "@/hooks/usePatients";
import { currentUserAtom } from "@/jotai";
import { Drugs, PrescriptionData } from "@/mock/presciption";
import { 
    Autocomplete,
    Box, 
    Button, 
    CircularProgress, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Paper, 
    Select, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField,
    Tabs,
    Tab,
    Avatar
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { ethers } from "ethers";
import useDrugs from "@/hooks/useDrugs";
import { convertEpochToDate } from "@/utils/convertEpochToDateString";

const PatientDataPage: NextPage = () => {
    const { getPatient, getPatientPrescriptions } = usePatients();
    const router = useRouter();
    const patientId = Number(router.query.id);
    const [modelOpen, setModal] = useState<boolean>(false);
    const [currentTab, setCurrentTab] = useState<number>(0);

    const contract = useContract();
    const currentUser = useAtomValue(currentUserAtom);

    const [addPrescriptionLoading, setLoading] = useState(false);
    const [addPrescriptionError, setError] = useState<boolean>(false);

    const { isLoading, data, error } = useQuery(["patient", patientId], async () => {
        const [patientData, patientPrescriptions] = await Promise.all([
            await getPatient(patientId),
            await getPatientPrescriptions(patientId)
        ])
        return { patientData, patientPrescriptions };
    });

    const handleModal = () => {
        setModal(true);
    }

    const [drugs, setDrugs] = useState<any[]>([]);
    const [methodOfPayement, setMethodOfPayement] = useState("")

    const { drugs: allDrugs } = useDrugs();
    const autocompleteOptions = allDrugs.map((drug) => ({ id: drug.id, label: drug.name, manufacturer: drug.manufacturer }))
    
    const addPrescription = async () => {
        setLoading(true);
        console.log(currentUser)
        const prescriptionDrugs = drugs.map((drug) => ( Number(drug.id) ));
        try {
            const transaction = await contract.AddPrescription(
                patientId,
                methodOfPayement,
                new Date().valueOf(),
                currentUser.id ?? 55,
                prescriptionDrugs
            )
            await transaction.wait();
            alert("success");
        } catch (e) {
            setError(true);
            alert(e);
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <SideMenu>
            <main>
                <Box height="100svh" marginTop={10}>
                    {
                        isLoading ? 
                        <div className="flex items-center justify-center w-full h-full">
                            <CircularProgress/>
                        </div>
                        : 
                        <div>
                            <div className="flex items-center gap-4">
                                <Avatar 
                                    sx={{ width: 70, height: 70 }}
                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.patientData.name}`}
                                />
                                <div>
                                    <h2>{data?.patientData?.name}</h2>
                                    <p>{data?.patientData?.nin}</p>
                                </div>
                            </div>
                            
                            <Tabs 
                                value={currentTab} 
                                onChange={(_, val) => setCurrentTab(val)}
                                aria-label="Tabs Section"
                            >
                                <Tab label="Profile"/>
                                <Tab label="Prescriptions"/>
                            </Tabs>

                            <TabPanel value={currentTab} index={0}>
                                <UserDataEntry>
                                    <h3>Date of Birth</h3>
                                    <p>{convertEpochToDate(Number(data?.patientData.date_of_birth))}</p>
                                </UserDataEntry>
                            </TabPanel>
                            <TabPanel value={currentTab} index={1}>
                                <section>
                                    <Box width="100%" display="flex" justifyContent="space-between">
                                        <h1>Recent Prescriptions Issued</h1>
                                    
                                        <Button onClick={handleModal}>
                                            Add Prescription
                                        </Button>
                                    </Box>
                                    <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
                                        <Table>
                                            <TableHead>
                                            <TableRow className="bg-primary text-white">
                                                <TableCell className="text-white">ID</TableCell>
                                                <TableCell>Drug Name</TableCell>
                                                <TableCell>Issued By</TableCell>
                                                <TableCell>Date Issued</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                data?.patientPrescriptions?.map((data, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index}</TableCell>
                                                    <TableCell>{data.method_of_payment}</TableCell>
                                                    <TableCell>{data.issued_by}</TableCell>
                                                    <TableCell>{data.date_issued}</TableCell>
                                                </TableRow>
                                
                                                ))
                                            }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </section>
                            </TabPanel>

                        </div>
                    }
                </Box>
                
                <Modal open={modelOpen} onClose={() =>  setModal(false)}>
                    <Box width="80%" display="flex" flexDirection="column">
                        <h1 className="text-xl text-center font-medium">
                            Add a Prescription
                        </h1>
                        <Autocomplete
                            sx={{ marginY: 1.5 }}
                            multiple={true}
                            options={autocompleteOptions}
                            onChange={(e, values) => setDrugs(values)}
                            value={drugs}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Drugs"
                                />)
                            }
                        />

                        <FormControl sx={{ marginY: 1.5 }}>
                            <InputLabel id="method-of-payment-label">
                                Method of Payment
                            </InputLabel>
                            <Select
                                onChange={(e) => setMethodOfPayement(e.target.value as string)} 
                                label="Method of Payment"
                                labelId="method-of-payment-label">
                                <MenuItem value="cash">
                                    Cash
                                </MenuItem>
                                <MenuItem value="card">
                                    Card
                                </MenuItem>
                                <MenuItem value="bank-transfer">
                                    Bank Transfer
                                </MenuItem>
                                <MenuItem value="other">
                                    Other
                                </MenuItem>
                            </Select>
                        </FormControl>

                        
                        <button 
                            className="flex items-center justify-center text-white bg-blue-600 px-6 py-2 rounded-lg"
                            onClick={addPrescription}
                        >
                        { addPrescriptionLoading ? <CircularProgress size={20} sx={{color:'#fff'}}/> : "Add Prescription" }
                        </button>

                    </Box>
                </Modal>
            </main>
        </SideMenu>
    )
}

export default PatientDataPage;

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}


function UserDataEntry({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-slate-400 dark:bg-gray-600 text-black dark:text-white px-2 py-3 box-border">
            {children}
        </div>
    )
}