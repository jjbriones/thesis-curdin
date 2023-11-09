'use client';

import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import Modal from './Modal';
import { useCallback, useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../Navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import CitySelect from '../inputs/CitySelect';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import BarangaySelect from '../inputs/BarangaySelect';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const AddPropertyModal = () => {
  const addPropertyModal = useAddPropertyModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      cityLocation: null,
      barangayLocation: null,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      carport: 1,
      yard: false,
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const cityLocation = watch('cityLocation');
  const barangayLocation = watch('barangayLocation');

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Add Property';
    }

    return 'Next';
  }, [step]);

  const secondActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Under which finish does the house fall?" />
      <div className="flex flex-row items-center gap-2 justify-start text-neutral-500 text-center text-lg font-light">
        <div>Pick a finish</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is the property located?" />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        {location?.label === 'Philippines' ? (
          <div>
            <CitySelect
              value={cityLocation}
              onChange={(value) => setCustomValue('cityLocation', value)}
            />
            {cityLocation?.label === 'BACOLOD CITY (Capital)' ? (
              <BarangaySelect
                value={barangayLocation}
                onChange={(value) => setCustomValue('barangayLocation', value)}
              />
            ) : null}
          </div>
        ) : null}

        <Map
          center={
            cityLocation?.label === 'BACOLOD CITY (Capital)'
              ? [10.6713, 122.9511]
              : location?.latlng
          }
        />
      </div>
    );
  }

  return (
    <Modal
      title="Add Property"
      isOpen={addPropertyModal.isOpen}
      onClose={addPropertyModal.close}
      onSubmit={onNext}
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default AddPropertyModal;
