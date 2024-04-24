'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import qs from 'query-string';
import Heading from '../Heading';
import RegionSelect, { RegionSelectValue } from '../inputs/RegionSelect';
import BarangaySelect, { BarangaySelectValue } from '../inputs/BarangaySelect';
import CitySelect, { CitySelectValue } from '../inputs/CitySelect';
import Counter from '../inputs/Counter';
import AreaInput from '../inputs/AreaInput';

enum STEPS {
  LOCATION = 0,
  INFO = 1,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  const [floorCount, setFloorCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [areaRange, setAreaRange] = useState([0, 100]);
  const [location, setLocation] = useState<RegionSelectValue>();
  const [barangayLocation, setBarangayLocation] =
    useState<BarangaySelectValue>();
  const [cityLocation, setCityLocation] = useState<CitySelectValue>();
  const [area, setArea] = useState(0);
  const [carport, setCarport] = useState(1);
  const [yard, setYard] = useState(0);

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      roomCount,
      floorCount,
      bathroomCount,
      areaRange: areaRange,
      locationValue: location?.value,
      barangayLocation: barangayLocation?.value,
      cityLocation: cityLocation?.value,
      area,
      carport,
      yard,
    };

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.close();
    router.push(url);
  }, [
    step,
    searchModal,
    roomCount,
    floorCount,
    bathroomCount,
    areaRange,
    location,
    router,
    onNext,
    params,
    barangayLocation,
    cityLocation,
    yard,
    area,
    carport,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Back';
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Please pick a place" />
      <RegionSelect
        value={location}
        onChange={(value) => {
          setLocation(value as RegionSelectValue);
        }}
      />
      {location?.value === 'REGION VI (WESTERN VISAYAS)' ? (
        <div>
          <CitySelect
            value={cityLocation}
            onChange={(value) => {
              setCityLocation(value as CitySelectValue);
            }}
          />

          {cityLocation?.value === 'BACOLOD CITY (Capital)' ? (
            <div className="mt-8">
              <BarangaySelect
                value={barangayLocation}
                onChange={(value) => {
                  setBarangayLocation(value as BarangaySelectValue);
                }}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="What are you looking for in a house?" />
        <hr />
        <AreaInput
          title="Area"
          value={area}
          onChange={(value) => setArea(value)}
        />
        <hr />
        <Counter
          title="Floors"
          value={floorCount}
          onChange={(value) => setFloorCount(value)}
        />
        <hr />
        <Counter
          title="Bedrooms"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
        <hr />
        <Counter
          title="Carport"
          value={carport}
          onChange={(value) => setCarport(value)}
        />
        <hr />
        <Counter
          title="Yard"
          value={yard}
          onChange={(value) => setYard(value)}
        />
      </div>
    );
  }

  return (
    <div>
      <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.close}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        body={bodyContent}
      />
    </div>
  );
};

export default SearchModal;
