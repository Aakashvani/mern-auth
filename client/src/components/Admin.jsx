import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Admin = () => {
  const [userList, setUserList] = useState([]);

  const dataGet = async () => {
    const res = await fetch("http://localhost:8080/api/getAll");
    const data = await res.json();
    setUserList(data);
    console.log(data);
  };

  useEffect(() => {
    dataGet();
  }, []);

  return (
    <TableContainer
      sx={{
        width: "60%",
        textAlign: "center",
        margin: "auto",
        marginTop: "5%",
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
              User ID
            </TableCell>
            <TableCell align="center" sx={{ fontSize: 20, fontWeight: "bold" }}>
              Name
            </TableCell>
            <TableCell align="center" sx={{ fontSize: 20, fontWeight: "bold" }}>
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Admin;
