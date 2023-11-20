'use client';

import Container from '../Container';
import Image from 'next/image';
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeUser } from '@/app/types';
import Categories from './Categories';
import React from "react";
import Link from 'next/link';

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <nav className="w-full bg-white z-10 ">
            <div className="py-4 border-b-sm">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                alt="Curdin Logo"
                                height="100"
                                width="100"
                                className="block cursor-pointer"
                            />
                        </Link>
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </nav>
    );
};

export default Navbar;
