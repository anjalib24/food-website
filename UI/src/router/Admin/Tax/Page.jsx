import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { Add as AddIcon } from "@mui/icons-material";

const Page = () => {
  const match = useRouteMatch();
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    const fetchTaxes = () => {
      fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/tax")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTaxes(data.data);
          console.log(data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchTaxes();
  }, []);

  return (
    <>
      <Switch>
        {/* ... other routes ... */}
        <Route path={match.path}>
          {/* ... other components ... */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">State Code</TableCell>
                  <TableCell align="right">Tax Rate (%)</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taxes.map((tax) => (
                  <TableRow key={tax.state_code}>
                    <TableCell align="right">{tax.state_code}</TableCell>
                    <TableCell align="right">{tax.state_tax_rate}</TableCell>
                    <TableCell align="right">
                      {/* Action buttons here */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </>
  );
};

export default Page;