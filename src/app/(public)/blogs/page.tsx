import React from 'react'
import Image from "next/image";
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';


export default function page() {
  return (
    <div className='p-1'>
      <div className='flex justify-center items-center '>
        <Image src='/petipp.png' width={500} height={150} alt={'meow'} className='items-center' />
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
                  Hồ bơi là nơi tuyệt vời để gia đình và thú cưng của bạn tận hưởng kỳ nghỉ hè. 
                  Đó là giải pháp hoàn hảo để hạ nhiệt, tắm nắng và tận hưởng nhiều niềm vui. 
                  Tuy nhiên, giống như trẻ nhỏ, chó của bạn có thể có nguy cơ bị thương nếu không được giám sát đúng cách.
                  Không phải tất cả các con chó đều là những tay bơi giỏi và không phải tất cả các hồ bơi đều được coi là thân thiện với chó.
                </p>
            </div>
      </div>

        <Box sx={{padding: 3, display: 'grid',gridTemplateColumns: 'repeat(3, 2fr)'}}>
            <Box p={3} m={3} sx={{boxShadow: 1, borderRadius:2, '&:hover': {backgroundColor: 'ButtonHighlight'} }} >
                  <Image src='/tia.jpg' width={500} height={100} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom>
                    Lời khuyên khi chuyển đến nhà mới của chó
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Chuyển nhà là một chuyện vô cùng khó khăn đối với thành viên trong gia đình, khi chuyển trường, rời xa bạn bè cũ...
                  </Typography>
                </Box>

                <Box p={2} m={3} sx={{boxShadow: 1, borderRadius:2, '&:hover': {backgroundColor: 'ButtonHighlight'}}} >
                  <Image src='/tia1.jpg' width={400} height={500} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom>
                    Cách chăm sóc, tỉa lông cho mèo đúng cách 
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Một số con mèo có thể dễ dàng trở nên lồng lộn và xinh đẹp nhờ một phần vào cách chăm sóc cũng như cách tỉa lông đúng cách...
                  </Typography>
                </Box>
<Box p={2} m={3} sx={{boxShadow: 1, borderRadius:2, '&:hover': {backgroundColor: 'ButtonHighlight'}}} >
                  <Image src='/care.jpg' width={400} height={50} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom>
                    Chăm sóc thú cưng
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Cùng thú cưng chăm sóc cơ thể, nâng niu và chăm sóc da mặt hay body cùng nhau cũng là một việc thú vị...
                  </Typography>
                </Box>
                <Box p={2} m={3} sx={{boxShadow: 1, borderRadius:2, '&:hover': {backgroundColor: 'ButtonHighlight'}}} >
                  <Image src='/care3.jpg' width={500} height={100} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom >
                    Tại sao mèo luôn đói bụng
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Một số con mèo có thể dễ dàng trở thành những kẻ kén ăn, trong khi những con khác vui vẻ ăn tối, 
                    nhai và ăn nhẹ với bất kỳ món ăn nào có sẵn. Nhưng nếu con mèo của bạn thèm ăn… 
                  </Typography>
                </Box>
                <Box p={2} m={3} sx={{boxShadow: 1, borderRadius:2, '&:hover': {backgroundColor: 'ButtonHighlight'}}} >
                  <Image src='/care2.jpg' width={400} height={100} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom>
                    Lời khuyên khi chuyển đến nhà mới của chó
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Chuyển nhà là một chuyện vô cùng khó khăn đối với thành viên trong gia đình, khi chuyển trường, rời xa bạn bè cũ...
                  </Typography>
                </Box>
                <Box p={2} m={3} sx={{boxShadow: 1, borderRadius:2, '&:hover': {backgroundColor: 'ButtonHighlight'}}} >
                  <Image src='/care1.jpg' width={500} height={100} alt={'meow'} className='justify-center' />
                  <Typography variant='h6' gutterBottom>
                    Lời khuyên khi chải lông cho bé mèo
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    Việc chọn một chiếc lược êmmm và mềmmm để chải lông cho bé mèo nhà bạn, bạn đã biết chưa?
                  </Typography>
                </Box>
        </Box>
    </div>
  )
}