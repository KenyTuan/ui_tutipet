"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Autocomplete, Box, Button, Divider, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import { Board,  Column } from '../dashboard/Board';
import { AddCircle, Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Swal from 'sweetalert2';
import axios from 'axios';
import ItemOrders from './ItemOrders';
import { useRouter } from 'next/navigation';



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



  async function deleteProduct(id: number) {
    const res = await fetch('http://localhost:8080/api/v1/products/' + id,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(!res.ok){
        Swal.fire("ERROR!", "ERROR!", "error");
    }

    Swal.fire("Deleted!", "Your file has been deleted.", "success")
  
  }

  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
    { id: 'name', label: 'Tên  Người Nhận', minWidth: 150, align: 'center' },
    { id: 'address', label: 'Địa Chỉ Nhận Hàng', minWidth: 200, align: 'center' },
    { id: 'phone', label: 'Liên Hệ', minWidth: 100, align: 'center' },
    { id: 'count_product', label: 'Số Lượng', minWidth: 50, align: 'center' },
    { id: 'total', label: 'Thành Tiền', minWidth: 50, align: 'center' },
    { id: 'status', label: 'Trạng Thái', minWidth: 50, align: 'center' },
    { id: 'action', label: 'Sửa/Xóa', minWidth: 150, align: 'center' },
    ];


export default function ListOrders() {
    const [data, setData] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [product, setProduct] = React.useState(null);
    const route = useRouter();

    const getListOrder = React.useCallback(async() =>{
        try{
            const token = getCookieValue('AuthToken');
            const res = await axios.get(`http://localhost:8080/api/v1/orders`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            console.log("order: ", res)
            
            return res.data
        }catch(error){
            console.error("error",error)
        }
    },[])

    const fetchData = React.useCallback(async () => {
        try {
          const result = await getListOrder();

          setData(result._embedded.orderResList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },[getListOrder])

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
    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleShowOrder = (data: any) => {
      const params = new URLSearchParams();
      const jsonString = JSON.stringify(data);
      const encodedData = btoa(unescape(encodeURIComponent(jsonString)));
      params.append('order', encodedData);
      route.push(`/dashboard/orders/detail_order?${params.toString()}`);
    };

    const handleEditProduct = (data: any) => {
      const params = new URLSearchParams();
      const jsonString = JSON.stringify(data);
      const encodedData = btoa(unescape(encodeURIComponent(jsonString)));
      params.append('order', encodedData);
      route.push(`/dashboard/orders/edit_order?${params.toString()}`);
  };


  return (
    <>
    {/* <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      </Box>
    </Modal> */}
    <Paper sx={{ width: '100%' }}>
        <Typography gutterBottom variant='h4' component={'div'} sx={{padding: "20px"}} className='font-bold'>
            Danh Sách Đơn Hàng
        </Typography>
        <Divider/>
        <Board columns={columns} >
        {
            Array.isArray(data) &&
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <ItemOrders key={row.id} row={row} deleteProductByID={deleteProductByID} handleEditProduct={handleEditProduct} handleShowOrder={handleShowOrder}/>
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