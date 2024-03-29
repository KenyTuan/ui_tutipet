'use client';

import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Dịch Vụ', href: '/service_pet' },
    { name: 'Sản Phẩm', href: '/products'},
    { name: 'Bài Viết', href: '/blogs'},
  ];

  export default function NavLinks() {
    const pathname = usePathname();

    return (
      <>
        {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[36px] w-[7%] grow items-center justify-center gap-2 text-white rounded-md bg-[#CA9D7C] p-3 text-sm font-medium hover:bg-[#B45F30] md:flex-none md:p-2 md:px-3',
              {
                'bg-[#B45F30]': pathname === link.href,
              },
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      </>
    )
  }
  