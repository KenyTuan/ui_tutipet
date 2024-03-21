import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import type { NextRequest } from 'next/server'
import axios from 'axios';

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

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

    const getInfoUser = useCallback(async () => {
        try {
        const token = getCookieValue('AuthToken');

        if (!token) {
            router.push('/login');
            return;
        }

        const res = await axios.get(`http://localhost:8080/api/v1/users/info`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });

        console.log("users: ", res.data);
        setUserInfo(res.data);
        return res.data;
        } catch (error) {
        console.error("error", error);
        }
    }, [router]);

    useEffect(() => {

        getInfoUser();

    }, [getInfoUser]);


  return userInfo;
}
