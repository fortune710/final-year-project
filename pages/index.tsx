import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { NextPage } from "next";
import { PrescriptionData } from "@/mock/presciption";
import SideMenu from "@/components/SideMenu";

const HomePage: NextPage = () => {
  return (
    <SideMenu
      children={
        <main>
          <Box maxWidth={"80%"}>
            <h1>Recent Prescriptions Issued</h1>
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
          </Box>
        </main>
      }
    />
  )
}

export default HomePage;