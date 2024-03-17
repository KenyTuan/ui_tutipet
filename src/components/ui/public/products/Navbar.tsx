"use client"
import { ArrowBackIos, ArrowForwardIos, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Typography } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'



export default function Navbar() {
    const [openCat, setOpenCat] = React.useState(false);
    const [openDog, setOpenDog] = React.useState(false);
    const [typeDog, setTypeDog] = React.useState([]);
    const [typeCat, setTypeCat] = React.useState([]);
    const router = useRouter();

    const handleClickDog = () => {
        setOpenDog(!openDog)
        setOpenCat(false);
    }

    const handleClickCat = () => {
        setOpenCat(!openCat);
        setOpenDog(false)
    };

    const getProductTypes = async() =>{
        try{
          const res = await axios.get(`http://localhost:8080/api/v1/types`)
  
          console.log("types: ", res)
          return res.data
        }catch(error){
          console.error("error",error)
        }
      }

    React.useEffect(() => {

        const fetchData = async () => {
            const result = await getProductTypes();
            if(result){
                const data = result._embedded.productTypeResList;
                
                const catData = data.filter((item: any) => item.petType == "CAT");
                setTypeCat(catData)

                
                const dogData = data.filter((item: any) => item.petType == "DOG");
                setTypeDog(dogData);
            }
            
          };
          fetchData();
    }, [])

    const handleTypeClick = (type: string) => {
        const params = new URLSearchParams();
        params.append('type', type)
        router.push(`/products/list_products?${params.toString()}`);
    };


    return (
    <Paper elevation={3}  sx={{padding: 2,minWidth: "20%",maxWidth: "50%", borderRadius: 4, backgroundColor: "#eee",maxHeight: 400}}>
          <List sx={{ width: '100%', backgroundColor: "#eee" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader"  sx={{marginBottom: 2 , backgroundColor: "#eee"}}>
                <Typography variant="h5" align="center" sx={{fontWeight: 700, textTransform: 'uppercase'}}>Danh Mục</Typography >
              </ListSubheader>
            }
          >
            <Divider />
            <Box height={10}/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
                <ListItemButton onClick={handleClickDog} >
                <ListItemIcon>
                    <svg className="h-12 w-12 text-yellow-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor" >  
                    <path d="M10.77 2.394c.416-.3.9-.394 1.23-.394h1.446a2.5 2.5 0 0 1 1.286.356l1.783 1.07a1 1 0 0 
                    1 .485.857V5.5A1.5 1.5 0 0 1 15.5 7H15v8.038c.421.065.843.222 1.195.515c.51.424.805 1.077.805 1.947a.5.5 0 0 1-.5.5H5a3 
                    3 0 0 1-1.803-5.398a.5.5 0 0 1 .601.799A2 2 0 0 0 5 17c.288 0 .47-.07.59-.15a.817.817 0 0 0 .275-.324A1.344 1.344 0 0 0 6 
                    16v-.045l.004-.11a9.33 9.33 0 0 1 .26-1.716c.263-1.05.796-2.396 1.882-3.483C9.99 8.803 10 6.331 10 5.5V4c0-.763.33-1.288.77-1.606m.154 4.506c-.155 1.256-.629 3.012-2.07 4.454c-.914.913-1.381 2.067-1.619 3.017a8.326 8.326 0 0 0-.232 1.519a3.693 3.693 0 0 0-.003.087v.056l-.004.067a2.344 2.344 0 0 1-.25.9h6.173c-.1-.32-.303-.649-.652-.832A1.622 1.622 0 0 0 11.5 16h-1a.5.5 0 0 1 0-1h1c.176 0 .342.014.5.04V12.5a.5.5 0 0 1 1 0v2.948c.58.418.847 1.04.948 1.552h2c-.075-.328-.225-.539-.393-.678c-.257-.215-.63-.322-1.055-.322a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 0 .5-.5V4.283l-1.782-1.07A1.5 1.5 0 0 0 13.446 3H12c-.17 0-.436.055-.645.206C11.17 3.338 11 3.563 11 4v1.5c0 .087.03.228.106.333c.057.08.157.167.394.167c.237 0 .337-.088.394-.167A.619.619 
                    0 0 0 12 5.5a.5.5 0 0 1 1 0c0 .247-.07.606-.294.917c-.243.337-.643.583-1.206.583a1.62 1.62 0 0 1-.576-.1M7 16.001L6.5 16Z"/>
                  </svg>
                </ListItemIcon>
                    
                <ListItemText 
                    primary={<Typography sx={{color: "#facc15", fontWeight: 600, fontSize: 24,}}>Chó</Typography>} 
                />
                    {openDog ? <ArrowBackIos/> : <ArrowForwardIos />}
                </ListItemButton>
                <Collapse in={openDog} timeout={500} unmountOnExit sx={{position: "absolute", backgroundColor: "#eee", left: 269,width: 800, transition: 'width 0.5s'}}>
                    <Box display="grid" flexDirection="row" gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                    {
                        typeDog?.map(
                            (item: any)=>(
                                <ListItem key={item.id}>
                                    <ListItemButton>
                                    <ListItemText primary={
                                        <Typography variant="body1" paragraph sx={{textAlign: "center", fontWeight: 500}}>
                                            {item.name}
                                        </Typography>
                                    } 
                                        onClick={()=>handleTypeClick(item.id)}
                                    />
                                    </ListItemButton>
                                </ListItem>
                            )
                        )
                    }
                    </Box>
                </Collapse>
            </Box>

            <Box sx={{display: "flex", flexDirection: "row"}}>
                <ListItemButton onClick={handleClickCat} >
                <ListItemIcon>
                    <svg className="h-10 w-10 text-yellow-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"   >  
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 
                    5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 
                    5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                </ListItemIcon>
                    
                <ListItemText 
                    primary={<Typography sx={{color: "#facc15", fontWeight: 600, fontSize: 24,}}>Mèo</Typography>} 
                />
                    {openCat ? <ArrowBackIos/> : <ArrowForwardIos />}
                </ListItemButton>
                <Collapse in={openCat} timeout={500} unmountOnExit sx={{position: "absolute", backgroundColor: "#eee", left: 269,width: 800, transition: 'width 0.5s', zIndex: 9}}>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} >
                        {
                            typeCat?.map(
                                (item: any)=>(
                                    <ListItem key={item.id}>
                                        <ListItemButton>
                                            <ListItemText primary={
                                                <Typography variant="body1" paragraph sx={{textAlign: "center", fontWeight: 500}}>
                                                    {item.name}
                                                </Typography>
                                            }
                                            onClick={()=>handleTypeClick(item.id)}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )
                        }

                    </Box>
                </Collapse>
            </Box>
            
          </List>
    </Paper >
  )
}
