import usePrescribers from "@/hooks/usePrescibers";
import { PrescriptionData } from "@/mock/presciption";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { NextPage } from "next";

const AdminDashboard: NextPage = () => {
    const { prescribers } = usePrescribers();

    return(
        <main>
            <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="bg-primary text-white">
                    <TableCell className="text-white">ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    prescribers!.map((data) => (
                      <TableRow>
                        <TableCell>{Number(data.id)}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        
                        <TableCell>
                            <Button sx={{ background: 'green' }} variant="contained">
                                View License
                            </Button>
                        </TableCell>

                        <TableCell>
                            <Button sx={{ background: 'primary' }} variant="contained">
                                Verify Prescriber
                            </Button>
                        </TableCell>
                      </TableRow>
    
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>


        </main>
    )
}

export default AdminDashboard;