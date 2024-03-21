'use client'
import Logo from '@/components/logo'
import NavLinks from '@/components/nav-links'
import ShoppingCartButton from '@/components/shopping_cart'
import { AccountBox, FileCopy, ListAlt, Person, Visibility } from '@mui/icons-material'
import { Box, Button, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const actions = [
  { icon: <AccountBox />, name: 'Thông tin Account',href: "user/profile" },
  { icon: <ListAlt />, name: 'Danh Sách Đơn Hàng', href: "/list_order" },
  // { icon: <Visibility />, name: 'View Admin', href: "/dashboard" },
];

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const jwt = require('jsonwebtoken');

  const handleNavigate = (href: any) => {
    router.push(href)
  }
  
  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift()?.trim();
  }  

  React.useEffect(() => {
    const token = getCookie('AuthToken');
      setIsLoggedIn(!!token)
      const decodedToken = jwt.decode(token);
      setRole(decodedToken?.role);
  }, [jwt]);


  const handleNavigateToSignUp = () => {
    if (isLoggedIn) {
      document.cookie = 'AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.reload();
    } else{
      window.location.href = "/login"
    }
  };

  return (
    <>
      <header className='z-10 bg-white fixed top-0 left-0 right-0 w-full mb-4 px-2 border-b-2 shadow-lg pb-4 rounded-b-3xl'>
        <div className='grid grid-cols-3 p-4 bg-white '>
          <div>
          </div>
          <Logo /> 
          <div className=' flex-row flex p-6 justify-end'>
            <div className='px-2 flex items-center'>
              <ShoppingCartButton itemCount={cartItems} />
            </div>
            <div className='px-2 flex items-end'>
              <Button onClick={handleNavigateToSignUp} className='p-4 bg-[#CA9D7C] rounded-xl hover:bg-[#B45F30]'>
                <span className='capitalize font-bold text-white'>
                  {isLoggedIn ? 'đăng xuất' : 'đăng nhập'}
                </span>
              </Button>
            </div>

          </div>

        </div>
        <div className='flex grow flex-row justify-center space-x-2 px-2 pb-2'>
          <NavLinks />
        </div>
      </header>
      {
        isLoggedIn && (
          <Box>
            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 11,
              }}
              icon={
                <div style={{ backgroundColor: '#FC9C55', borderRadius: '50%', width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Person />
                </div>}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleNavigate(action.href)}
                />
              ))}
              {
                role === "ADMIN" && (
                  <SpeedDialAction
                    key={'View Admin'}
                    icon={<Visibility />}
                    tooltipTitle={'View Admin'}
                    onClick={() => handleNavigate("/dashboard")}
                />
                )
              }
            </SpeedDial>
          </Box>
        )
      }
    </>
  )
}
