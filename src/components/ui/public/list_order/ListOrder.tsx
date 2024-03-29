"use client"
import React from 'react'
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Stack, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

export default function ListOrder() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

  return (
    <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{width: 800}} label="Chờ duyệt" value="1" />
            <Tab sx={{width: 800}} label="Đã duyệt" value="2" />
            <Tab sx={{width: 800}} label="Đã hủy" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box>
            <ListItem alignItems="center" style={{marginBottom: 2, borderWidth: 0.5,}}>
              <ListItemAvatar>
                <Avatar
                sx={{ width: 100, height: 100 }}
                variant='rounded' 
                alt="Remy Sharp" 
                src='/ne.jpg'
                />
              </ListItemAvatar>
                      <ListItemText >
                    <Box padding={1}>
                    <Typography gutterBottom variant="body1" component="div"  style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 1, 
                        fontStyle: "italic"
                    }}>
                       
                    </Typography>
                    <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Typography fontSize={20}>Đơn giá</Typography>
                        <Typography fontSize={16}>{} VND</Typography>
                    </Stack>
                    <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Typography fontSize={16}>Số lượng</Typography>
                        <Typography fontSize={16}>{}</Typography>
                    </Stack>
                    <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Typography fontSize={16}>Thành Tiền</Typography>
                        <Typography fontSize={16}>{}</Typography>
                    </Stack>
                    </Box>
                </ListItemText>
            </ListItem>
          </Box>
        </TabPanel>
        <TabPanel value="2">Item to</TabPanel>
      </TabContext>
  );
}
