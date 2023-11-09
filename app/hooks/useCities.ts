'use client';
import phil from 'phil-reg-prov-mun-brgy';

const formattedCities = phil.getCityMunByProvince('0645').map((city) => ({
  label: city.name,
  value: city.name,
  region: city.prov_code,
}));

const useCities = () => {
  const getAll = () => formattedCities;

  const getByValue = (value: string) => {
    return formattedCities.find((city) => city.value === value);
  };
  return { getAll, getByValue };
};

export default useCities;
