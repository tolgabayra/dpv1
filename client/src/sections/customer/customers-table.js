import React, { useState } from 'react';
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
  IconButton
} from '@mui/material';





const customers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com', status: 'Active' },
  { id: 4, name: 'Alice Johnson', email: 'alice.johnson@example.com', status: 'Inactive' },
  { id: 5, name: 'Mike Wilson', email: 'mike.wilson@example.com', status: 'Active' },
];





const CustomersTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);


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
      const newSelected = filteredCustomers.map((customer) => customer.id);
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
    // do something with selected customers
    console.log('Selected customers:', selectedCustomers);
  };



  const handleDeleteSelected = () => {
    const newCustomers = customers.filter((customer) => !selected.includes(customer.id));
    // Silinen müşterilerin listesi
    const deletedCustomers = customers.filter((customer) => selected.includes(customer.id));
    // Silinen müşterilerin işlemleri burada yapılabilir
    console.log('Deleted customers:', deletedCustomers);
    // Yeni müşterilerin listesi
    console.log('New customers:', newCustomers);
  };


  const handleEditSelected = () => {
    // Seçili müşterilerin verilerini al
    const selectedCustomers = customers.filter(customer => isSelected(customer.id));

    // İşlev çağrısı ile seçili müşterileri düzenleme sayfasına aktar
    editSelectedCustomers(selectedCustomers);
  };








  const isSelected = (id) => selected.indexOf(id) !== -1;








  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearch}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < filteredCustomers.length
                  }
                  checked={selected.length === filteredCustomers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell> {/* Edit ve Delete butonları için yeni TableCell */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => {
                const isItemSelected = isSelected(customer.id);

                return (
                  <TableRow
                    key={customer.id}
                    hover
                    onClick={(event) => handleSelectOne(event, customer.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.status}</TableCell>
                    <TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEditSelected(customer.id)}>
                          Edit
                        </IconButton>
                        <IconButton onClick={() => handleDeleteSelected(customer.id)}>
                          Delete
                        </IconButton>
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
                count={filteredCustomers.length}
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