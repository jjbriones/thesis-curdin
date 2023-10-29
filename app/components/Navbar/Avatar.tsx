'use client';

import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || '/images/merc.png'}
      objectFit="cover"
      className="rounded-full"
      alt="Avatar"
      width="30"
      height="30"
    />
  );
};

export default Avatar;
