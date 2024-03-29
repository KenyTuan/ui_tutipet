"use client"
import { AddCircle, Delete, Edit } from '@mui/icons-material'
import { Box, Button, Divider, Modal, Paper, Stack, TableCell, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
import { Board, Column } from '../dashboard/Board'
import AddFormPromotion from './AddFormPromotion'
import axios from 'axios'
import EditForm from './EditForm'
import Swal from 'sweetalert2'

const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 60, align: 'center' },
    { id: 'from', label: 'Từ Ngày', minWidth: 170, align: 'center' },
    { id: 'to', label: 'Đến Ngày', minWidth: 170, align: 'center' },
    { id: 'type', label: 'Giảm Theo', minWidth: 90, align: 'center'},
    { id: 'value', label: 'Giá giảm', minWidth: 50, align: 'center' },
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

export default function ListPromotion() {
    const [data, setData] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => {setOpenEdit(false); fetchData()};
    const [promotion, setPromotion] = React.useState(null);

    const getListPromotion = async() =>{
        try{
            const token = getCookieValue('AuthToken');
            const res = await axios.get(`http://localhost:8080/api/v1/promotion`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
    
          console.log("products: ", res)
          
          return res.data
        }catch(error){
          console.error("error",error)
        }
      }

      const fetchData = React.useCallback(async () => {
        try {
          const result = await getListPromotion();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },[])
        
      React.useEffect(() => {
        fetchData();
      }, [fetchData]);

    async function deleteProduct(id: number) {
        const token = getCookieValue('AuthToken');
        const res = await axios.delete(`http://localhost:8080/api/v1/promotion/`+ id,
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
    
    const handleEditProduct = (data: any) => {
        setPromotion(data);
        handleOpenEdit();
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
                <AddFormPromotion eventClose={handleCloseAdd}/>
            </Box>
        </Modal>
        <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <EditForm eventClose={handleCloseEdit} promotion={promotion} />
            </Box>
        </Modal>
        <Paper className='w-full'>
            <Typography gutterBottom variant='h4' component={'div'} className='font-bold p-5'>
                Chương Trinh Khuyến Mãi
            </Typography>
            <Divider/>
            <Box height={10}/>
            <Stack direction="row" spacing={1}  justifyContent="flex-end" className="mx-4">
                <Button variant="contained" endIcon={<AddCircle />} className='bg-blue-500' onClick={handleOpenAdd} >
                    Tạo Chương Trình Ưu Đãi
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
                <TableCell key={"fromTime"} align={"center"} className='border-r-2'>
                    {row.fromTime}
                </TableCell>
                <TableCell key={"toTime"} align={"center"} className='border-r-2'>
                    {row.toTime}
                </TableCell>
                <TableCell key={"discountType"} align={"center"} className='border-r-2'>
                    {row.discountType=== "PERCENTAGE"? "Phần Trăm": "Giá"}
                </TableCell>
                <TableCell key={"price"} align={"center"} className='border-r-2'>
                    {row.discountType=== "PERCENTAGE"? row.value * 100 + "%": row.value.toLocaleString('en-US', {
                          style: 'decimal',
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          }) + "VND"}
                </TableCell>
                {/* <TableCell key={"status"} align={"center"} className='border-r-2'>
                {row.enableStatus == "ENABLED"?
                  (
                    <Button variant="contained" className='bg-green-500 hover:bg-green-600 text-sm'>Hiện</Button>

                  ):(
                    <Button variant="outlined">Ẩn</Button>
                  )
                }
                </TableCell> */}
                <TableCell key={"action"} align="left" className='border-r-2'>
                    <Stack spacing={2} direction="row" justifyContent={"center"}>
                        <Edit
                            style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                            }}
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
