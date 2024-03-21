import Link from "next/link";
import Image from "next/image";
import { Box, Grid, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <div>
        <Image src='/tutipet.gif'
          alt={"Hình con mèo"}
          height={250}
          width={500}
          className='w-full object-cover cursor-pointer'/>
        <div className={'mb-8 mx-36 mt-[-2rem] p-3 bg-[#FFC195] rounded-b-xl relative shadow-lg shadow-slate-300 border'}>
            <h1 className='text-center'>CHÀO MỪNG BẠN ĐẾN VỚI CHÚNG TÔI</h1>
        </div>
        <div className={"flex flex-row m-2 p-10"}>
            <Image src='/ne.jpg'
              alt={"Hình Giới Thiệu"} 
              className=" ml-4 w-1/3" 
              height={250}
              width={500}/>
            <div className="m-4 p-5 px-28 w-2/3 mr-4">
                <h2 className="text-center p-2 uppercase ">Xin chào! <br/>Chúng tôi là TuTiPet</h2>
                <p className="text-xl p-2 text-center italic">
                    Nơi cung cấp những dịch vụ chăm sóc thú cưng và là nơi kết nối những người yêu thích pet
                    Hãy đến và trải nghiệm những dịch vụ đặc biệt cùng với những sản phẩm uy tín, chất lượng.
                    Chúng tôi sẽ không làm bạn phải thất vọng!
                </p>
            </div>
        </div>
        <div className="flex flex-row m-2 p-10">
            <div className="m-4 p-5 px-28 w-2/3">
                <h2 className="text-left p-2 pl-16 uppercase">Sự nhiệt huyết</h2>
                <p className="text-xl p-2 pl-24 text-start italic">
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Với đội ngũ chăm sóc thú cưng tại cửa hàng của chúng tôi đầy
                    nhiệt huyết và đam mê. Với sứ mệnh tận tâm, họ không chỉ là những người chăm sóc mà còn là
                    những người bạn đồng hành cho từng bé cưng. Tận tụy trong việc tạo môi trường thân thiện
                    và an toàn, họ luôn sẵn sàng chia sẻ kiến thức và kinh nghiệm 
                    để giúp khách hàng hiểu rõ hơn về việc chăm sóc và nuôi dưỡng thú cưng của mình. 
                    Sự ân cần, chu đáo và sự yêu thương chân thành là điều mà đội ngũ chăm sóc thú cưng của chúng tôi 
                    luôn muốn truyền tải đến từng người yêu thú cưng.
                </p>
            </div>
            <Image 
              src='/he.jpg' 
              alt={"Hình Giới Thiệu"} 
              className="m-4 w-1/4" 
              height={200}
              width={500}
              />
        </div>

        <div className={"flex m-2 p-10"}>
        <Image 
              src='/tay.png' 
              alt={"Hình Giới Thiệu"} 
              className="ư-1/4" 
              height={200}
              width={500}
              />
            <div className=" px-28">
                <h2 className="text-center p-2 uppercase "> <br/>Bạn có thể tin tưởng 100% vào chúng tôi</h2>
                <Box sx={{ width: '100%' }}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                     <Stack direction={"row"} padding={2}>
                      <Image src='/pet.png' width={40} height={40} alt={'meow'} />
                      <Typography variant='h6' gutterBottom paddingLeft={3}>  
                        CHÚNG TÔI YÊU CHÓ MÈO 
                        </Typography>
                     </Stack>
                    <Typography variant='h6' gutterBottom paddingLeft={3}>  
                    Tất cả thành viên tại TuTi Pet đều đã và đang chăm sóc thú cưng của riêng mình. 
                    Cũng như các bạn, chúng tôi coi thú cưng là một thành viên trong gia đình và xứng đáng được chăm sóc tốt nhất.​ 
                    </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack direction={"row"} padding={2}>
                        <Image src='/pet.png' width={40} height={40} alt={'meow'} />
                        <Typography variant='h6' gutterBottom paddingLeft={3}>  
                          SỰ TẬN TÂM 
                          </Typography>
                      </Stack>
                      <Typography variant='h6' gutterBottom paddingLeft={3}>  
                        Chúng tôi luôn thấu hiểu khi rời xa bạn lông xù của mình, 
                        chúng tôi đảm bảo rằng thú cưng của bạn sẽ nhận được những sự chăm sóc tốt nhất.​ 
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                    <Stack direction={"row"} padding={2}>
                        <Image src='/pet.png' width={40} height={40} alt={'meow'} />
                        <Typography variant='h6' gutterBottom paddingLeft={3}>  
                          SỰ CHUYÊN NGHIỆP
                          </Typography>
                      </Stack>
                      <Typography variant='h6' gutterBottom paddingLeft={3}>  
                        Chúng tôi luôn đầu tư vào những đồ dùng hiện đại cùng với đội ngũ chăm sóc có chuyên môn tối thiểu 3 năm kinh nghiệm.
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack direction={"row"} padding={2}>
                          <Image src='/pet.png'width={40} height={40} alt={'meow'} />
                          <Typography variant='h6' gutterBottom paddingLeft={3}>  
                            SỰ MINH BẠCH
                            </Typography>
                        </Stack>
                        <Typography variant='h6' gutterBottom paddingLeft={3}>  
                          Chúng tôi muốn bạn tin tưởng tuyệt đối vào sự chăm sóc tận tâm, dịch vụ chất lượng và giá cả hợp lý mà chúng tôi mang lại.
                        </Typography>
                    </Grid>
                  </Grid>
                  
                </Box>
                
            </div>
            
        </div>
        <div className="w-full px-8 mb-4">
          <div className="">
            <Link 
              href={"#"} 
              className="mr-8"
              >
                <span 
                  className="text-lg capitalize text-green-700 
                  font-bold hover:text-green-300"
                  >
                    xem thêm
                  </span>
              </Link>
            </div>
        </div>
    </div>
    </>
  );
}
