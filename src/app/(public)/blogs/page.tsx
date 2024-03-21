import React from 'react'
import Image from "next/image";
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { shadow } from '@cloudinary/url-gen/actions/effect';
import { scale } from '@cloudinary/url-gen/actions/resize';

export default function page() {
  return (
    <div className='p-5'>
      <div className='flex justify-center items-center '>
        <Image src='/peti.jpg' width={500} height={150} alt={'meow'} className='items-center' />
      </div>
      <div className={"flex flex-row m-2 p-10"}>
            <Image src='/boi.jpg'
              alt={"Hình Giới Thiệu"} 
              className=" ml-4 w-1/3 rounded-lg" 
              height={250}
              width={500}/>
            <div className="m-4 p-5 px-28 w-2/3 mr-4">
                <h2 className="text-center p-2 uppercase "> Ồ <br/>Hồ bơi có an toàn cho thú cưng của bạn?</h2>
                <p className="text-xl p-2 text-center italic">
                    Nơi cung cấp những dịch vụ chăm sóc thú cưng và là nơi kết nối những người yêu thích pet
                    Hãy đến và trải nghiệm những dịch vụ đặc biệt cùng với những sản phẩm uy tín, chất lượng.
                    Chúng tôi sẽ không làm bạn phải thất vọng!
                </p>
            </div>
      </div>
      {/* <Image src='/cho.jpg' width={200} height={150} alt={'meow'} className='justify-center' /> */}
        <Box sx={{padding: 3}}>
          <Grid container>
            <Stack direction='row' spacing={2}>
              <Grid item xs={4} >
                <Box p={2} sx={{boxShadow: 1, borderRadius:2}} >
                  <Image src='/cho.jpg' width={500} height={100} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom>
                    Lời khuyên khi chuyển đến nhà mới của chó
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Chuyển nhà là một chuyện vô cùng khó khăn đối với thành viên trong gia đình, khi chuyển trường, rời xa bạn bè cũ...
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={4} >
                <Box p={2} sx={{boxShadow: 1, borderRadius:2}} >
                  <Image src='/cho.jpg' width={500} height={100} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom>
                    Lời khuyên khi chuyển đến nhà mới của chó
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Chuyển nhà là một chuyện vô cùng khó khăn đối với thành viên trong gia đình, khi chuyển trường, rời xa bạn bè cũ...
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={4} >
                <Box p={2} sx={{boxShadow: 1, borderRadius:2}} >
                  <Image src='/cho.jpg' width={500} height={100} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom>
                    Lời khuyên khi chuyển đến nhà mới của chó
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Chuyển nhà là một chuyện vô cùng khó khăn đối với thành viên trong gia đình, khi chuyển trường, rời xa bạn bè cũ...
                  </Typography>
                </Box>
              </Grid>
            </Stack>

          </Grid>
        </Box>
    </div>
  )
}
