import SideMenu from "@/components/SideMenu";
import usePatients from "@/hooks/usePatients";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";

const PatientDataPage: NextPage = () => {
    const { getPatient } = usePatients();
    const router = useRouter();
    const patientId = Number(router.query.id);

    const { isLoading, data: patientData, error } = useQuery(["patient", patientId], async () => {
        const patientData = await getPatient(patientId);
        return patientData;
    });
    
    return(
        <SideMenu>
            <main>
                <Box height="100vh" marginTop={10}>
                    {
                        isLoading ? 
                        <Box width="100%" height="100%">
                            <CircularProgress/>
                        </Box>
                        : <h2>{patientData[1]}</h2>
                    }
                </Box>
            </main>
        </SideMenu>
    )
}

export default PatientDataPage;