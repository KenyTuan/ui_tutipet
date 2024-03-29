"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Autocomplete, Box, Button, CardActionArea, CardMedia, Divider, Modal, Stack, TextField, Typography } from '@mui/material';
import { Board,  Column } from '../dashboard/Board';
import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material';
import Swal from 'sweetalert2';
import AddForm from './AddForm';
import EditForm from './EditForm';
import axios from 'axios';


  interface Data {
      id: number;
      name: string;
      type: string;
      petTypes: string;
      price: number;
      status: boolean;
  }

  const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '40%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

  function getCookieValue(cookieName: string) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 60, align: 'center' },
    { id: 'img', label: 'Hình ảnh', minWidth: 80, align: 'center' },
    { id: 'name', label: 'Sản Phẩm', minWidth: 200, align: 'center' },
    { id: 'type', label: 'Loại', minWidth: 170, align: 'center' },
    { id: 'pet', label: 'Pet', minWidth: 50, align: 'center' },
    { id: 'price', label: 'Giá', minWidth: 150, align: 'center'},
    { id: 'discount', label: 'Giá Bán', minWidth: 150, align: 'center'},
    { id: 'status', label: 'Trạng Thái', minWidth: 50, align: 'center' },
    { id: 'action', label: 'Sửa/Xóa', minWidth: 50, align: 'center' },
];


export default function ListProduct() {
  const [data, setData] = React.useState<Data[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {setOpenAdd(false); fetchData()};
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {setOpenEdit(false); fetchData()};
  const [product, setProduct] = React.useState(null);

  const getListProduct = async() =>{
    try{
      const res = await axios.get(`http://localhost:8080/api/v1/products/active`)

      console.log("products: ", res)
      
      return res.data
    }catch(error){
      console.error("error",error)
    }
  }

  async function deleteProduct(id: number) {
    const token = getCookieValue('AuthToken');
    const res = await axios.delete(`http://localhost:8080/api/v1/products/`+ id,
        {
          headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
        }
    )

    if(res.status != 204){
        Swal.fire("ERROR!", "ERROR!", "error");
    }
    Swal.fire("Deleted!", "Bạn Đã Xóa Thành Công.", "success")
    .then(()=>(fetchData()))
  }

  const fetchData = React.useCallback(async () => {
    try {
      const result = await getListProduct();
      setData(result._embedded.productResList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },[])
    
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
      
  const deleteProductByID = (id: number) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.value) {
          deleteProduct(id);
          
        }
    });
  };

  const updateEnableByID = async (id: number,active: boolean) =>  {
    const token = getCookieValue('AuthToken');
    if(!token){
      return;
    }
    const enable = !active ? "ENABLED" : "DISABLED"
    const res = await axios.patch(`http://localhost:8080/api/v1/products?id=${id}&enable=${enable}`,
        {
          headers:{
              'Authorization': `Bearer ${token}`,
          }
        }
    )

    if(res.status != 201){
        Swal.fire("ERROR!", "ERROR!", "error");
    }

    Swal.fire("Đã Cập Nhật!", `Bạn Đã ${!active?"Ẩn Sản Phẩm Này": "Hiện Sản Phẩm Này" }.`, "success")
    .then(()=>(fetchData()))
  }
    
  const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const handleEditProduct = (data: any) => {
    setProduct(data);
    handleOpenEdit();
  };

  const filterData = (v:any) => {
    if (v) {
        setData([v]);
    } else {
        fetchData();
    }
  };

  return (
    <>
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <AddForm eventClose={handleCloseAdd}/>
      </Box>
    </Modal>

    <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <EditForm eventClose={handleCloseEdit} product={product} />
      </Box>
    </Modal>

    <Paper sx={{ width: '100%' }}>
        <Typography gutterBottom variant='h4' component={'div'} sx={{padding: "20px"}} className='font-bold'>
            Danh Sách Sản Phẩm
        </Typography>
        <Divider/>
        <Box height={10} />
        <Stack direction="row" spacing={2} className="mx-4">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={data}
              sx={{ width: "40%" }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Products" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircle />} className='bg-blue-500' onClick={handleOpenAdd}>
              Thêm Sản Phẩm
            </Button>
          </Stack>
          <Box height={25} />
        <Board columns={columns} >
        {
            Array.isArray(data) &&
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell key={"id"} align={"center"} className='border-r-2'>
                    {row.id}
                </TableCell>
                <TableCell key={"name"} align={"center"} className='border-r-2'>
                    <CardActionArea>
                      <CardMedia
                        src={row.img}
                        component="img"
                        height={12}
                        style={{ height: '8rem', objectFit: "contain" }}
                        alt="hình cún con"
                      />
                    </CardActionArea>
                </TableCell>
                <TableCell key={"name"} align={"center"} className='border-r-2'>
                    {row.name}
                </TableCell>
                <TableCell key={"type"} align={"center"} className='border-r-2'>
                    {row.type.name}
                </TableCell>
                <TableCell key={"pet"} align={"center"} className='border-r-2'>
                    {row.type.petTypes==="CAT"? "Mèo": "Chó"}
                </TableCell>
                <TableCell key={"price"} align={"center"} className='border-r-2'>
                    {row.price.toLocaleString('en-US', {
                        style: 'decimal',
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
                        })} VND
                </TableCell>
                <TableCell key={"price"} align={"center"} className='border-r-2'>
                  {!!row.promotion ?
                    (row.promotion.discountType === "PERCENTAGE"?
                    (row.price-row.price * row.promotion.value)
                    :
                    (row.price - row.promotion.value)).toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })
                      :(
                        row.price.toLocaleString('en-US', {
                          style: 'decimal',
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          })
                      )} VND
                </TableCell>
                <TableCell key={"status"} align={"center"} className='border-r-2'>
                  {row.status == "ENABLED"?
                  (
                    <Button variant="contained" className='bg-green-500 hover:bg-green-600 text-sm' onClick={()=>updateEnableByID(row.id,true)}>Hiện</Button>

                  ):(
                    <Button variant="outlined"  onClick={()=>updateEnableByID(row.id,false)}>Ẩn</Button>
                  )
                }
                </TableCell>
                <TableCell key={"action"} align="left" className='border-r-2'>
                    <Stack spacing={2} direction="row">
                        <Edit
                            style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={()=>handleEditProduct(row)}
                        />
                        <Delete
                            style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
                            }}
                            onClick={() => {
                             deleteProductByID(row.id);
                            }}
                        />
                    </Stack>
                </TableCell>
                </TableRow>
            )
            )
        }
        </Board>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
    </>
    
  );
}