'use client';

import Container from '../Container';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Search from './Search';
import UserMenu from './UserMenu';
import { User } from '@prisma/client';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-sm">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Image
              src="/images/logo.png"
              alt="Curdin Logo"
              height="100"
              width="100"
              className="block cursor-pointer"
            />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
