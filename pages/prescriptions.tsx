import SideMenu from "@/components/SideMenu";
import usePrescriptions from "@/hooks/usePrescriptions";
import { currentUserAtom } from "@/jotai";
import { convertEpochToDate } from "@/utils/convertEpochToDateString";
import { Autocomplete, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { NextPage } from "next";
import { useEffect } from "react";

const PrescriptionsPage: NextPage = () => {
    const { getPrescriberPrescriptions } = usePrescriptions()
    const currentUser = useAtomValue(currentUserAtom);
    
    const { isLoading, data } = useQuery(["your-prescriptions"], async () => {
        const data = await getPrescriberPrescriptions(currentUser!.id! as number)
        return data;
    }, {
        onSuccess: (data) => {
            console.log(data)
        }
    })

    return(
        <SideMenu>
            <main className="relative mt-20">
                { 
                    isLoading ? 
                    <CircularProgress/> : 

                    <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-primary text-white">
                                    <TableCell>ID</TableCell>
                                    <TableCell>Drug Name</TableCell>
                                    <TableCell>Method of Payment</TableCell>
                                    <TableCell>Date Issued</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                data?.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>{data.method_of_payment}</TableCell>
                                    <TableCell>{convertEpochToDate(Number(data.date_issued))}</TableCell>
                                </TableRow>
                
                                ))
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    
                }
            </main>
        </SideMenu>
    )
}

export default PrescriptionsPage;