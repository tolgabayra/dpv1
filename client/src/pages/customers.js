import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, SvgIcon, Typography, MenuItem, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { appAxios } from 'src/utils/axios';
import * as React from 'react';
import CustomersTable from 'src/sections/customer/customers-table';


const genders = [
  {
    value: "Erkek",
    label: "",
  },
  {
    value: "Kadın",
    label: "",
  },
  {
    value: "Diğer",
    label: "",
  }
]




const Page = () => {
  const [clients, setClients] = useState([])
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [newClient, setNewClient] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: null,
    weight: null,
    height: null,
    target_weight: null,
    chronic_illness: ""
  })


  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    console.log(rowSelectionModel);
  }, [rowSelectionModel])






  useEffect(() => {
    appAxios.get(`/api/v1/clients/by_user/1`)
      .then((res) => {
        console.log(res.data.Clients);
        setClients(res.data.Clients)
      })
      .catch(err => console.log(err))
  }, [])



  const createNewClient = () => {
    appAxios.post("/api/v1/clients/", {
      first_name: newClient.first_name,
      last_name: newClient.last_name,
      gender: newClient.gender,
      age: newClient.age,
      weight: newClient.weight,
      height: newClient.height,
      target_weight: newClient.target_weight,
      chronic_illnesses: newClient.chronic_illness,
      user_id: localStorage.getItem("user_id")
    }, { withCredentials: true })
      .then((res) => {
        console.log("CREATED");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <>
      <Head>
        <title>
          Customers | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Danışanlarım
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={handleClickOpen}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Ekle
                </Button>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Yeni Danışan Ekle</DialogTitle>
                  <DialogContent
                    sx={{ margin: "12px" }}
                  >
                    <DialogContentText marginBottom="12px" >
                      Danışanlarınızın bilgilerini burada girip, daha sonra değişterebilirsiniz.
                    </DialogContentText>
                    <TextField
                      onChange={(e) => setNewClient({ ...newClient, first_name: e.target.value })}
                      sx={{ marginRight: "60px" }}
                      type="text"
                      variant="standard"
                      margin="dense"
                      id="firstname"
                      label="Adı"
                    />
                    <TextField
                      onChange={(e) => setNewClient({ ...newClient, last_name: e.target.value })}
                      type="text"
                      margin="dense"
                      variant="standard"
                      id="lastname"
                      label="Soyadı"
                    />
                    <TextField
                      onChange={(e) => setNewClient({ ...newClient, gender: e.target.value })}
                      sx={{ marginRight: "60px", width: "220px" }}
                      margin="dense"
                      variant="standard"
                      id="outlined-select-currency"
                      select
                      label="Cinsiyet"
                      defaultValue="Erkek"
                      helperText="Lütfen cinsiyet seçiniz"
                    >
                      {genders.map((gender) => (
                        <MenuItem key={gender.value} value={gender.value}>
                          {gender.value}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
                      type="number"
                      margin="dense"
                      variant="standard"
                      id="lastname"
                      label="Yaş"

                    />
                    <TextField
                      onChange={(e) => setNewClient({ ...newClient, weight: e.target.value })}
                      sx={{ marginRight: "60px" }}

                      type="number"
                      margin="dense"
                      variant="standard"
                      id="kilo"
                      label="Kilo(Kg)"

                    />
                    <TextField
                      onChange={(e) => setNewClient({ ...newClient, height: e.target.value })}
                      type="number"
                      margin="dense"
                      variant="standard"
                      id="boy"
                      label="Boy(Cm)"

                    />
                    <TextField
                      onChange={(e) => setNewClient({ ...newClient, target_weight: e.target.value })}
                      sx={{ marginRight: "60px" }}

                      type="number"
                      margin="dense"
                      variant="standard"
                      id="kilo"
                      label="Hedef Kilo(Kg)"

                    />
                    <TextField
                      onChange={(e) => setNewClient({ ...newClient, chronic_illness: e.target.value })}
                      type="text"
                      margin="dense"
                      variant="standard"
                      id="cronic_illness"
                      label="Kronik Hastalık(Var ise)"

                    />


                    <TextField
                      sx={{ marginRight: "60px" }}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Telefon "
                      type="email"
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"

                      variant="standard"
                    />

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>İptal</Button>
                    <Button onClick={createNewClient}>Ekle</Button>
                  </DialogActions>
                </Dialog>


              </div>
            </Stack>

            <CustomersTable />

          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
