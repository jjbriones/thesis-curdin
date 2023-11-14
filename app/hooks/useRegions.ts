import phil from 'phil-reg-prov-mun-brgy';

const formattedRegions = phil.regions.map((regions) => ({
  label: regions.name,
  value: regions.name,
  region: regions.reg_code,
}));

const useRegions = () => {
  const getAllRegions = () => formattedRegions;

  const getRegionValue = (value: string) => {
    return formattedRegions.find((region) => region.value === value);
  };

  return { getAllRegions, getRegionValue };
};

export default useRegions;
