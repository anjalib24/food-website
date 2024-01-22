import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { useHistory } from 'react-router-dom';
import Editdimension from "./Editdimension";
import { Add as AddIcon } from "@mui/icons-material";
import AddDimension from './AddDimension';
import Loader from '@/components/Loader';


const Page = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const [dimension, setDimension] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation()

  const fetchReviews = () => {
    setIsLoading(true);
    fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/dimensions/get-product-dimension")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDimension(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      }).finally(() => {
        setIsLoading(false); 
      });
  };
  useEffect(() => {
 

    fetchReviews();
  }, [location]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Switch>
        <Route path={match.path + "/adddimension"}>
          <AddDimension />
        </Route>
        <Route path={match.path + "/:id"}>
          <Editdimension />
        </Route>
        <Route path={match.path}>
          <div className="w-full py-2 flex justify-between items-center flex-row mb-3">
            <div>
              <h1 className="text-3xl font-medium">Dimension</h1>
            </div>
            <div>
              <Link to={match.path + "/adddimension"}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="whitespace-nowrap w-max text-white !p-3 !bg-indigo-500 hover:!bg-indigo-600 !rounded-md"
                >
                  Add
                </Button>
              </Link>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '100px' }} align="right">Dimensions</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">length</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">width</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">height</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">shipment_dimension_price</TableCell>
                  <TableCell style={{ width: '100px' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dimension?.map((data) => (
                  <TableRow
                    key={data.userId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ width: '20%' }} component="th" scope="row" align="right">
                      {data.dimensions}
                    </TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.length}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.width}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.height}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">{data?.shipment_dimension_price}</TableCell>
                    <TableCell style={{ width: '20%' }} align="right">
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link to={`${match.path}/${data._id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ opacity: 0.9 }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                          variant="contained"
                          color="primary"
                          style={{ opacity: 0.9 }}
                          onClick={() => {
                            fetch(import.meta.env.VITE_APP_BASE_API+`/api/v1/dimensions/${data._id}`, {
                              method: 'DELETE',
                            })
                              .then(response => response.json())
                              .then(data => {
                                console.log('Success:', data);
                                setDimension(dimension.filter(item => item._id !== data._id));
                              })
                              .catch((error) => {
                                console.error('Error:', error);
                              });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </>
  )
}

export default Page