"use client";
import React from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import SearchBar from '../SearchBar';
import CardProduct from '../CardProduct';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ListProducts() {
    const router = useRouter();
    const [products, setProducts] = React.useState<any[]>([]);
    const searchParams = useSearchParams()
    const [data,setData] =  React.useState<any[]>([]);

    const getListProduct = async() =>{
      try{
        const res = await axios.get(`http://localhost:8080/api/v1/products`)

        console.log("products: ", res)
        return res.data
      }catch(error){
        console.error("error",error)
      }
    }

    const fetchData = React.useCallback(async () => {
        try {
            const result = await getListProduct();
            if (result) {
                setProducts(result._embedded.productResList);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    React.useEffect(() => {
            fetchData();
    }, [fetchData]);

    React.useEffect(() => {
      const typeFromParams = searchParams.get('type');
      const searchFromParams = searchParams.get('search');
  
      const filteredProducts = products.filter(product => {
          const productName = product?.name.toLowerCase();
          const searchTerm = !!searchFromParams ? searchFromParams.toLowerCase().trim() : null;
          const productType = product.type.id;
  
          if (!searchTerm) {
              return !typeFromParams || productType == typeFromParams;
          }
  
          const regex = new RegExp(searchTerm, 'i');
  
          return regex.test(productName) && (!typeFromParams || productType === typeFromParams);
      });
  
      setData(filteredProducts);
  }, [searchParams, products]);


    
  return (

    <Grid container spacing={1} width={"95%"} sx={{ padding: 2, display: "flex", borderWidth: 0.5, borderRadius: 5, borderStyle: "dotted", backgroundColor: "#ccc"}}>
      <Grid item xs={8} sx={{height: "fit-content", padding: 2 }} >
        <SearchBar />
      </Grid>
      <Grid item xs={12} sx={{ height: "100%"}}>
      {
        data.length === 0 ? (
          <Box sx={{height: 350, width: "100%", backgroundColor: "white"}} justifyContent={"center"} alignItems={"center"} display={"flex"}>
            <Typography variant='h6' color={"black"} fontStyle={"italic"} textAlign={"center"}> Không tìm thấy sản phẩm</Typography>
          </Box>
        ):(
          <Box>
            <Grid container spacing={2} justifyContent={"center"}>
              {data
                .map((row: any) => (
                  <Grid item xs={2.4} key={row.id}>
                    <CardProduct data={row} />
                  </Grid>
                ))}
            </Grid>
          </Box>            
        )
      }
      </Grid>
    </Grid>

  )  
}
