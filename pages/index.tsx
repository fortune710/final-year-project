import { AppBar, Box, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from "@mui/material";
import { NextPage } from "next";
import { PrescriptionData } from "@/mock/presciption";
import SideMenu from "@/components/SideMenu";
import { FormEvent, useEffect } from "react";
import  { ethers } from "ethers";

import Contract from '../hardhat/artifacts/contracts/DrugPrescriptionSystem.sol/DrugPrescriptionSystem.json';

const CONTRACT_ADDRESS = "0x5db157bC5D6d911c7aF90E9469260b81195352d1";
const provider = new ethers.EtherscanProvider("sepolia", "HXHC8CZC3NV6TIXW6FTJD9MRFSSPZ7DT43");
const wallet = new ethers.Wallet("8d329f4186655cc0867acbe970d83f51fb9bbed5440575af2a4398b4b898fb4e", provider)
const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, wallet);

const HomePage: NextPage = () => {
  async function getUser() {
    const users = await contract.users(200)
    console.log(users)
  }

  useEffect(() => {
    getUser();
  }, [])

  async function addUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(fields);

    const tx = await contract.AddUser(data.id, data.email, data.password, data.name)
    await tx.wait()
    alert("successfull")

    const newUser = await contract.users(data.id)
    console.log(newUser)
  }

  return (
    <SideMenu
      children={
        <main className="relative">
          <Box>
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

            <form onSubmit={addUser}>
              <input 
                placeholder="ID" 
                type="number" 
                name="id"
              />

              <input
                placeholder="email"
                type="email"
                name="email"
              />
              <input
                placeholder="password"
                type="password"
                name="password"
              />
              <input
                placeholder="name"
                name="name"
              
              />


              <button>Submit</button>
            </form>
          </Box>
        </main>
      }
    />
  )
}

export default HomePage;