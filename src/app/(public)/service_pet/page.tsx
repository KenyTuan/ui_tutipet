import { Box, Button, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import pet from '@/app/img/pet.png'
import dogcat from '@/app/img/dogcat.png'
import iconsport from '@/app/img/iconsport.png'
import house from '@/app/img/house.png'
import flower from '@/app/img/flower.png'

import shadows from '@mui/material/styles/shadows'
import flower from '@/app/img/flower.png'

export default function page() {
  return (
      <Box sx={{ padding: 3}}>
        <Grid container>
          <Stack direction="row" spacing={2}>
            <Grid item xs={4}>
              <Typography variant='h6' gutterBottom>
                PET SERVICE
              </Typography>
              <Typography variant='h3'  gutterBottom>
                  DỊCH VỤ
              </Typography>
              <Divider/>
              <Typography variant='h3' gutterBottom>
                  Hàng đầu             
              </Typography>
              <Image src={dogcat} height={260} alt={'cho meo'} />
            </Grid>

            <Grid item xs={4} >
              <Box p={2} sx={{ border:'2px solid black', boxShadow: 1,borderRadius: 2, '&:hover': {color: 'ButtonHighlight',backgroundColor: 'burlywood'} }}>
                <Image src={iconsport} height={70} alt={'dang cap'} />
                <Typography variant='h6' gutterBottom>
                  ĐẲNG CẤP
                </Typography>
                <Typography variant='h6' gutterBottom>
                Chúng tối biết cách làm thế nào để thú cưng của bạn trở nên đẳng cấp và 
                cá tính hơn. Với dịch vụ cắt tỉa lông thú cưng chúng tôi sẽ giúp các bé trở thành phiên bản hoàn hảo nhất.
                </Typography>
              </Box>
            </Grid>
    
            <Grid item xs={4}>
              <Box p={2} sx={{ border: '2px solid black', boxShadow: 1,borderRadius: 2,
              '&:hover': {color: 'ButtonHighlight',backgroundColor: 'burlywood'}}}>
                <Image src={pet} height={70} alt={'shop'} />
                  <Typography variant='h6' gutterBottom>
                    SHOP
                  </Typography>
                  <Typography variant='h6' gutterBottom>
                  Cùng với hơn 3.000 khách hàng đã luôn tin tưởng, đồng hành, chúng tôi luôn đặt ra những mục tiêu
                  và thử thách mới. PET SERVICE cung cấp các sản phẩm, phụ kiện rất đa dạng...
                  </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={4}>
              <Box p={2} sx={{ border: '2px solid black', boxShadow: 1,borderRadius: 2,
              '&:hover': {color: 'ButtonHighlight',backgroundColor: 'burlywood'} }}>
                <Image src={house} height={70} alt={'shop'} />
                <Typography variant='h6' gutterBottom>  
                  NGHỈ DƯỠNG
                </Typography>
                <Typography variant='h6' gutterBottom>
                Mọi hành động ở PET SERVICE đều bắt đầu từ sứ mệnh Trao Gửi Yêu Thương. 
                Mọi thú cưng mới khi đến với chúng tôi đều được quan tâm đặc biệt bởi đội ngũ Nhân viên nhiều kinh nghiệm...
                </Typography>
              </Box>
            </Grid>
          </Stack>
        </Grid>
        <Paper elevation={3}>
          <Box sx={{p: 2, borderRadius: 2,  display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 2,}} >
            <Stack direction="column">
              
              <div className='self-center'>
              <Image src={flower} height={70} alt={'cho meo'} />
              </div>
              <div className ='text-center p-5'>
                <h2 className=' text-amber-900'>CHÚNG TÔI Ở ĐÂY ĐỂ CHĂM SÓC THÚ CƯNG CỦA BẠN!</h2>
                <h6 className='p-4'>Vui lòng điền thông tin vào biểu mẫu để đặt lịch chăm sóc cho thú cưng của bạn tại dịch vụ của TuTi's Pet.
                Sau khi nhận được yêu cầu, nhân viên của chúng tôi sẽ liên hệ xác nhận với bạn qua điện thoại. </h6>
                <p >CẢM ƠN BẠN ĐÃ TIN TƯỞNG VÀ SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI.</p>
              </div>
                
              </Stack>
              <Stack direction="row"> 
              <form>

                <Grid item xs ={12}>
                  <Stack direction="row" spacing ={5}  padding={2} >
                    <Grid item xs ={8}> 
                      <TextField id="outlined-basic" label="Họ và tên" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={8} >
                      <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" fullWidth  />
                    </Grid>
                  </Stack>
                </Grid>

                <Grid item xs ={8}>
                  <Stack direction="row" spacing ={5} justifyContent={"flex-end"} padding={2}> 
                    <input type="date" placeholder='Ngay' className="w-full h-10 px-4 border-2 "  />
                    <input type="time" placeholder='Gio' className="w-full h-10 px-4 border-2 "/>   
                  </Stack>
                </Grid>
                <Grid item xs ={8}>
                  <Stack direction="row" spacing ={5} justifyContent={"flex-start"} padding={2}> 
                    <TextField id="multiline" label="Ghi chú" multiline maxRows={4}/>
                  </Stack>
                </Grid>
                
                <Grid item xs ={8}>
                  <Stack direction="row" spacing ={2} justifyContent={"flex-end"}> 
                    <Button variant="contained" color="success">ĐẶT HẸN NGAY</Button>
                  </Stack>
                </Grid>
              </form>
              </Stack>
          </Box>

        </Paper>
       
      </Box>
      
  )
}
