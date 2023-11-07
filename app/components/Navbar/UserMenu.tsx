'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Avatar from './Avatar';
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const addPropertyModal = useAddPropertyModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 ">
        <div
          onClick={toggleOpen}
          className=" p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[30vw] md:w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={addPropertyModal.open}
                  content="Add Property"
                />
                <MenuItem onClick={() => {}} content="Favorites" />
                <MenuItem onClick={() => {}} content="Reservations" />
                <MenuItem onClick={() => {}} content="Interactive Dashboard" />

                <hr />
                <MenuItem onClick={() => signOut()} content="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.open} content="Login" />
                <MenuItem onClick={registerModal.open} content="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
