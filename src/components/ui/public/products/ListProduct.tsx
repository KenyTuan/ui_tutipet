"use client";
import React from 'react'
import CardProduct from './CardProduct';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import SearchBar from './SearchBar';
import axios from 'axios';

export default function ListProduct() {
    const [products, setProducts] = React.useState([]);

    const getListProduct = async() =>{
      try{
        const res = await axios.get(`http://localhost:8080/api/v1/products`)

        console.log("products: ", res)
        return res.data
      }catch(error){
        console.error("error",error)
      }
    }

    React.useEffect(() => {
      const fetchData = async () => {
        const result = await getListProduct();
        if(result){
          setProducts(result._embedded.productResList);
        }
        
      };
      fetchData();
    }, []);

  return (
    <Grid container spacing={1} sx={{ padding: 2, display: "flex", borderWidth: 0.5, borderRadius: 5, borderStyle: "dotted", marginLeft: 3 }}>
      <Grid item xs={12} sx={{height: "fit-content", padding: 2 }}>
        <SearchBar />
      </Grid>
      <Grid item xs={12} sx={{ height: "100%"}}>
        <Grid container spacing={2}>
          {products?.map((row: any) => (
            <Grid item xs={3} key={row.id}>
              <CardProduct data={row} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>

  )  
}
