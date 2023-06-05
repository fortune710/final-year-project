import { AppBar, Box, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from "@mui/material";
import { NextPage } from "next";
import { PrescriptionData } from "@/mock/presciption";
import SideMenu from "@/components/SideMenu";
import Modal from "@/components/Modal";
import { FormEvent, useEffect, useState } from "react";
import  { ethers } from "ethers";
import usePatients from "@/hooks/usePatients";


const HomePage: NextPage = () => {
  

  const [modalOpen, setModalOpen] = useState(false);

  const patients = usePatients();

  /*
  async function addUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(fields);

    const tx = await contract.AddUser(data.id, data.email, data.password, data.name)
    await tx.wait()
    alert("successfull")

    const newUser = await contract.users(data.id)
    console.log(newUser)
  }*/

  return (
    <SideMenu
      children={
        <main className="relative min-h-[86svh]">
          <Box marginTop={10}>
            <h1 className="text-lg">
              Recent Prescriptions Issued
            </h1>
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

          <Modal open={modalOpen}>
              <TextField
                  focused={true}
                  sx={{ "::placeholder": "#fff" }}
                  variant="outlined"
                  label="Full Name"
                  name="full_name"
                  placeholder="Enter Patient's Full Name"
              />
          </Modal>
        </main>
      }
    />
  )
}

export default HomePage;