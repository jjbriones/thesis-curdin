'use client';
import phil from 'phil-reg-prov-mun-brgy';

const formattedBarangays = phil.getBarangayByMun('064501').map((brgy) => ({
  label: brgy.name,
  value: brgy.name,
  region: brgy.prov_code,
}));

const useBarangay = () => {
  const getAll = () => formattedBarangays;

  const getByValue = (value: string) => {
    return formattedBarangays.find((brgy) => brgy.value === value);
  };
  return { getAll, getByValue };
};

export default useBarangay;
