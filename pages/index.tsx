import { AppBar, Box, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from "@mui/material";
import { NextPage } from "next";
import { PrescriptionData } from "@/mock/presciption";
import SideMenu from "@/components/SideMenu";
import Modal from "@/components/Modal";
import { FormEvent, useEffect, useState } from "react";
import  { ethers } from "ethers";
import usePatients from "@/hooks/usePatients";


/*
const CONTRACT_ADDRESS = "0x5db157bC5D6d911c7aF90E9469260b81195352d1";
const provider = new ethers.EtherscanProvider("sepolia", "HXHC8CZC3NV6TIXW6FTJD9MRFSSPZ7DT43");
const wallet = new ethers.Wallet("8d329f4186655cc0867acbe970d83f51fb9bbed5440575af2a4398b4b898fb4e", provider)
const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, wallet);
*/

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
        <main className="relative">
          <Box marginTop={10}>
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