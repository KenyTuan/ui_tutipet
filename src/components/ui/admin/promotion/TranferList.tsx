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

function not(a: readonly any[], b: readonly any[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly any[], b: readonly any[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(setData: any) {
  const [checked, setChecked] = React.useState<readonly any[]>([]);
  const [left, setLeft] = React.useState<readonly any[]>([]);
  const [right, setRight] = React.useState<readonly any[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

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

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: readonly any[]) => (
    <Paper sx={{ width: "100%", height: screen.height - (screen.height * 35 / 100), overflow: 'auto' }}>
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
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} direction={"row"} justifyContent="center" alignItems="center"   >
      <Grid item xs={5}>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5}>{customList(right)}</Grid>
      <Grid item xs={10}>
        <Typography variant='h3' align='center' marginLeft={"20%"} marginRight={"20%"}>
            <Button variant='contained' type='submit' className='bg-blue-500' fullWidth >
                Đã Chọn
            </Button>
        </Typography>
      </Grid>
    </Grid>
  );
}