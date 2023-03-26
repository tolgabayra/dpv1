import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  Alert,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Snackbar
} from '@mui/material';
import { appAxios } from 'src/utils/axios';


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






const CustomersTable = (props) => {
  const [customers, setCustomers] = useState([])
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [edited, setEdited] = useState({})
  const ifNotIllness = "Yok";

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    appAxios.get(`/api/v1/clients/by_user/1`)
      .then((res) => {
        console.log(res.data.Clients);
        setCustomers(res.data.Clients)
      })
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    console.log(props.customers);
  }, [])




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = customers.map((customer) => customer.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };






  const editSelectedCustomers = (selectedCustomers) => {
    setEdited(selectedCustomers)
    // do something with selected customers
    console.log('Selected customers:', selectedCustomers);
  };

  const editDeleteCustomer = (selectedCustomer) => {
    console.log("BURASI SİLME İŞLEMİ");
    appAxios.delete(`/api/v1/clients/${selectedCustomer.id}`)
      .then(() => {
        return (<> Başarılı... </>)
      })
      .catch(err => {
        return
      })
  }



  const handleDeleteSelected = (customer) => {
    const newCustomers = customers.filter((customer) => !selected.includes(customer.id));
    // Silinen müşterilerin listesi
    const deletedCustomers = customers.filter((customer) => selected.includes(customer.id));
    // Silinen müşterilerin işlemleri burada yapılabilir
    console.log('Deleted customers:', deletedCustomers);
    // Yeni müşterilerin listesi
    console.log('New customers:', newCustomers);

    const selectedCustomer = customer;
    editDeleteCustomer(selectedCustomer);

  };


  const handleEditSelected = (customer) => {
    setOpen(true)
    // Seçili müşterilerin verilerini al
    const selectedCustomers = customer;

    // İşlev çağrısı ile seçili müşterileri düzenleme sayfasına aktar
    editSelectedCustomers(selectedCustomers);
  };








  const isSelected = (id) => selected.indexOf(id) !== -1;









  return (
    <div>
      <TextField
        label="Ara"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Snackbar
        open={true}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        message="Note archived">
        <Alert severity="success">This is a success message!</Alert>
      </Snackbar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni Danışan Ekle</DialogTitle>
        <DialogContent
          sx={{ margin: "12px" }}
        >
          <DialogContentText marginBottom="12px" >
            Danışanlarınızın bilgilerini burada girip, daha sonra değişterebilirsiniz.
          </DialogContentText>
          <TextField
            value={edited.first_name}
            sx={{ marginRight: "60px" }}
            type="text"
            variant="standard"
            margin="dense"
            id="firstname"
            label="Adı"
          />
          <TextField
            value={edited.last_name}
            type="text"
            margin="dense"
            variant="standard"
            id="lastname"
            label="Soyadı"
          />
          <TextField
            value={edited.gender}
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
            value={edited.age}
            type="number"
            margin="dense"
            variant="standard"
            id="lastname"
            label="Yaş"

          />
          <TextField
            sx={{ marginRight: "60px" }}
            value={edited.weight}
            type="number"
            margin="dense"
            variant="standard"
            id="kilo"
            label="Kilo(Kg)"

          />
          <TextField
            value={edited.height}
            type="number"
            margin="dense"
            variant="standard"
            id="boy"
            label="Boy(Cm)"

          />
          <TextField
            value={edited.target_weight}
            sx={{ marginRight: "60px" }}
            type="number"
            margin="dense"
            variant="standard"
            id="kilo"
            label="Hedef Kilo(Kg)"

          />
          <TextField
            value={edited.chronic_illnessess}
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
          <Button onClick={handleClose}>Ekle</Button>
        </DialogActions>
      </Dialog>



      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < customers.length
                  }
                  checked={selected.length === customers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Cinsiyet</TableCell>
              <TableCell>Boy(cm)</TableCell>
              <TableCell>Kilo(kg)</TableCell>
              <TableCell>Hedef Kilo(kg)</TableCell>
              <TableCell>Kronik Hastalık</TableCell>

              <TableCell>İşlemler</TableCell> {/* Edit ve Delete butonları için yeni TableCell */}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => {
                const isItemSelected = isSelected(customer.id);

                return (
                  <TableRow
                    key={customer.id}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox onClick={(event) => handleSelectOne(event, customer.id)} checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{customer.first_name} {customer.last_name}</TableCell>
                    <TableCell>{customer.gender}</TableCell>
                    <TableCell>{customer.height}</TableCell>
                    <TableCell>{customer.weight}</TableCell>
                    <TableCell>{customer.target_weight}</TableCell>
                    <TableCell>{customer.chronic_illnessess ?? ifNotIllness}</TableCell>

                    <TableCell>
                      <TableCell align="right">
                        <Button style={{ marginRight: "3px" }} variant="contained" color="info" onClick={() => handleEditSelected(customer)}>
                          Edit
                        </Button>
                        <Button variant="contained" color="error" onClick={() => handleDeleteSelected(customer)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableCell> {/* İki butonun bulunduğu TableCell */}
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomersTable;