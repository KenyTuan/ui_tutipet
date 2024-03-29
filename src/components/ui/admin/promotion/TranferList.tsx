import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Avatar, FormControl, InputLabel, ListItemAvatar, MenuItem, Select, SelectChangeEvent } from '@mui/material';
interface FormSelectProductProps {
  eventClose: () => void;
  setDatas: (data: any) => void;
}

export default function TransferList({ eventClose, setDatas }: FormSelectProductProps) {
  const [checked, setChecked] = React.useState<readonly any[]>([]);
  const [left, setLeft] = React.useState<readonly any[]>([]);
  const [data, setData] = React.useState([]);
  const [pet, setPet] = React.useState('');
  const [type, setType] = React.useState('');
  const [filteredLeft, setFilteredLeft] = React.useState<readonly any[]>([]);

  const getListProduct = async() =>{
    try{
      const res = await axios.get(`http://localhost:8080/api/v1/products/active`)

      console.log("products: ", res)
      
      return res.data
    }catch(error){
      console.error("error",error)
    }
  }

  const fetchData = React.useCallback(async () => {
    try {
      const result = await getListProduct();
      setLeft(result._embedded.productResList);
      setFilteredLeft(result._embedded.productResList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },[])
  
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getAllProductType = async() => {
    try{
      const res = await axios.get(`http://localhost:8080/api/v1/types`)

      console.log("type: ", res)
      
      return res.data
    }catch(error){
      console.error("error",error)
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
        try {
          const result = await getAllProductType();
          
          setData(result._embedded.productTypeResList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setPet(event.target.value);
  };

  const handleAppyChecked = () => {
    setDatas(checked)
    eventClose()
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    const selectedType = event.target.value;
    setType(selectedType);
    if(selectedType != "0"){
      if (!selectedType) {
        setFilteredLeft(left);
        return;
      }
  
      const filteredProducts = left.filter((product) => product.type.id == selectedType);
      setFilteredLeft(filteredProducts);
      return
    }
    setFilteredLeft(left);
  };

  const customList = (items: readonly any[]) => (
    <Paper sx={{ width: "100%", height: screen.height - (screen.height * 50 / 100), overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value: any) => {
          const labelId = `transfer-list-item-${value.id}-label`;
          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar alt={value.name} src={value.img} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} direction={"row"} justifyContent="center" alignItems="center"   >
      <Grid item xs={4}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Pet</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pet}
                label="Pet"
                onChange={handleChange}
            >
                <MenuItem value={"CAT"}>Mèo</MenuItem>
                <MenuItem value={"DOG"}>Chó</MenuItem>
            </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Loại </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="type"
                name='type'
                onChange={handleChangeType}
                MenuProps={{ 
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    classes: {
                        paper: "scroll-menu", 
                    },
                    PaperProps: {
                        style: {
                            maxHeight: 300, 
                        },
                    },
                }}
            >   
                <MenuItem value={0}>Tất Cả</MenuItem>
                {
                    Array.isArray(data) && data.map((item : any) =>
                        (
                          item.petType == pet &&
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        )    
                    )
                }
                
            </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>{customList(filteredLeft)}</Grid>
      <Grid item xs={10}>
        <Typography variant='h3' align='center' marginLeft={"20%"} marginRight={"20%"}>
            <Button variant='contained' type='submit' className='bg-blue-500' fullWidth onClick={handleAppyChecked}>
                Đồng Ý
            </Button>
        </Typography>
      </Grid>
    </Grid>
  );
}