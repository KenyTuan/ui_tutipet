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
    const [type,setType] = React.useState('');
    const [hasFetchedData, setHasFetchedData] = React.useState(false);
    const [search,setSearch] = React.useState('');

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
                setHasFetchedData(true); 
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    React.useEffect(() => {
        if (!hasFetchedData) {
            fetchData();
        }
    }, [fetchData, hasFetchedData]);

    React.useEffect(() => {
        const typeFromParams = searchParams.get('type');
        const searchFromParams = searchParams.get('search');
        setType(typeFromParams ?? '');
        setSearch(searchFromParams ?? '')
    }, [searchParams]);

    console.log("search",searchParams.toString())
    const filteredProducts = products.filter(product => {
        const productName = product?.name.toLowerCase();
        const searchTerm = search ? search.toLowerCase().trim() : null; 
    
        if (!searchTerm) {
            return !type || product.type.id === type;
        }
    
        const regex = new RegExp(searchTerm, 'i');
    
        console.log("regex", regex.test(productName));
    
        return regex.test(productName) && (!type || product.type.id == type);
    });
    
    
    console.log("regex",filteredProducts)
    
  return (

    <Grid container spacing={1} width={"95%"} sx={{ padding: 2, display: "flex", borderWidth: 0.5, borderRadius: 5, borderStyle: "dotted", backgroundColor: "#ccc"}}>
      <Grid item xs={8} sx={{height: "fit-content", padding: 2 }} >
        <SearchBar />
      </Grid>
      <Grid item xs={12} sx={{ height: "100%"}}>
        <Grid container spacing={2} justifyContent={"center"}>
          {filteredProducts
          .map((row: any) => (
            <Grid item xs={2.4} key={row.id}>
              <CardProduct data={row} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>

  )  
}
