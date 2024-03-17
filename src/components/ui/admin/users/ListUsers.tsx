"use client"
import { AddCircle, Delete, Edit } from '@mui/icons-material'
import { Autocomplete, Box, Button, Divider, Modal, Paper, Stack, TableCell, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import { Board, Column } from '../dashboard/Board'
import AddFormUser from './AddUser'
import axios from 'axios'
import Swal from 'sweetalert2'

const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 60, align: 'center' },
    { id: 'fullName', label: 'Tên Người dùng', minWidth: 170, align: 'center' },
    { id: 'email', label: 'Email Người dùng', minWidth: 170, align: 'center' },
    { id: 'gender', label: 'Giới Tính', minWidth: 50, align: 'center' },
    { id: 'action', label: 'Sửa/Xóa', minWidth: 50, align: 'center' },
];

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



export default function ListUsers() {
    const [data, setData] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

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

    const getListUser = React.useCallback(async() =>{
        try{
            const token = getCookieValue('AuthToken');
            const res = await axios.get(`http://localhost:8080/api/v1/users`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            console.log("uses: ", res)
            
            return res.data
        }catch(error){
            console.error("error",error)
        }
    },[])

    const fetchData = React.useCallback(async () => {
        try {
          const result = await getListUser();

          setData(result._embedded.userResList);
        } catch (error) {
          Swal.fire("Error!", "Failed to fetch product data.", "error");
          console.error('Error fetching data:', error);
        }
      },[getListUser])

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                <AddFormUser eventClose={handleCloseAdd}/>
            </Box>
        </Modal>
        <Paper className='w-full'>
            <Typography gutterBottom variant='h4' component={'div'} className='font-bold p-5'>
                Danh Sách Khách Hàng
            </Typography>
            <Divider/>
            <Box height={10}/>
            <Stack direction="row" spacing={1} className="mx-4">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={data}
                    sx={{ width: 300 }}
                    onChange={(e, v) => filterData(v)}
                    getOptionLabel={(rows) => rows.name || ""}
                    renderInput={(params) => (
                        <TextField {...params} size="small" label="Tìm Khách Hàng" />
                    )}
                    />
                <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                ></Typography>
                <Button variant="contained" endIcon={<AddCircle />} className='bg-blue-500' onClick={handleOpenAdd} >
                    Add
                </Button>
            </Stack>
            <Box height={25} />
            <Board columns={columns}>
            {
            Array.isArray(data) &&
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell key={"id"} align={"center"} className='border-r-2'>
                    {row.id}
                </TableCell>
                <TableCell key={"fullName"} align={"center"} className='border-r-2'>
                    {row.name}
                </TableCell>
                <TableCell key={"email"} align={"center"} className='border-r-2'>
                    {row.email}
                </TableCell>
                <TableCell key={"gender"} align={"center"} className='border-r-2'>
                    {row.gender?"Nam":"Nữ"}
                </TableCell>
                <TableCell key={"action"} align="left" className='border-r-2'>
                    <Stack spacing={2} direction="row" justifyContent={"center"} alignItems={"center"}>
                        <Edit
                            style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                            }}
                        />
                        <Delete
                            style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
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
function fetchData() {
    throw new Error('Function not implemented.')
}

