'use client';

import Container from '../Container';
import { GiFamilyHouse, GiHouse } from 'react-icons/gi';
import CategoryBox from './CategoryBox';
import { MdOutlineVilla } from 'react-icons/md';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'Luxury',
    icon: GiFamilyHouse,
    description: 'Luxury Subdivisions',
  },
  {
    label: 'Elegant',
    icon: MdOutlineVilla,
    description: 'Elegant Subdivisions',
  },
  {
    label: 'Standard',
    icon: GiHouse,
    description: 'Standard Subdivisions',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }
  return (
    <>
      <hr />
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Categories;
