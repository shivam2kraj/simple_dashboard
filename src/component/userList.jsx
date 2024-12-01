
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setUsers, setSearch, setCity, filterUsers } from "../redux";
import {
  CircularProgress,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const UserList = () => {
  const dispatch = useDispatch();
  const { filteredUsers, search, city, users } = useSelector((state) => state.users);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        dispatch(setUsers(response.data));
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch data. Please try again.");
        setLoading(false);
      });
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(filterUsers());
  };

  const handleCityFilter = (e) => {
    dispatch(setCity(e.target.value));
    dispatch(filterUsers());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  const uniqueCities = [...new Set(users.map((user) => user.address.city))];

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

    return (
    <div className="min-h-screen bg-gray-100 p-4">

        <TextField
          label="Search by Name"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          fullWidth
          className="bg-white"
        />
        <TextField
          select
          label="Filter by City"
          value={city}
          onChange={handleCityFilter}
          fullWidth
          className="bg-white"
        >
          <MenuItem value="">All Cities</MenuItem>
          {uniqueCities.map((city, index) => (
            <MenuItem key={index} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>

      {/* Table Display */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell className="font-bold">
                ID
              </TableCell>
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Phone</TableCell>
              <TableCell className="font-bold">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link
                      to={`/user/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.id}
                    </Link>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};


export default UserList;
