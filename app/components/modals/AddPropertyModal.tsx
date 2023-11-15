'use client';

import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../Navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import CitySelect from '../inputs/CitySelect';
import RegionSelect from '../inputs/RegionSelect';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import BarangaySelect from '../inputs/BarangaySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import AreaInput from '../inputs/AreaInput';

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
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

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
      location: '',
      cityLocation: '',
      barangayLocation: '',
      area: 0,
      floorCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 0,
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
  const roomCount = watch('roomCount');
  const floorCount = watch('floorCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  const area = watch('area');
  const carport = watch('carport');

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post('/api/properties', data)
      .then(() => {
        toast.success('Property added successfully!');
        router.refresh;
        reset();
        setStep(STEPS.CATEGORY);
        addPropertyModal.close();
      })
      .catch(() => {
        toast.error('Please fill in all the fields');
      })
      .finally(() => {
        setIsLoading(false);
      });
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

        <RegionSelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        {location?.label === 'REGION VI (WESTERN VISAYAS)' ? (
          <div>
            <CitySelect
              value={cityLocation}
              onChange={(value) => setCustomValue('cityLocation', value)}
            />
            {cityLocation?.label === 'BACOLOD CITY (Capital)' ? (
              <div className="mt-8">
                <BarangaySelect
                  value={barangayLocation}
                  onChange={(value) =>
                    setCustomValue('barangayLocation', value)
                  }
                />
              </div>
            ) : null}
          </div>
        ) : null}

        <Map
          center={
            cityLocation?.label === 'BACOLOD CITY (Capital)'
              ? [10.6713, 122.9511]
              : [10, 122]
          }
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Amenities" />
        <AreaInput
          title="Area"
          value={area}
          onChange={(value) => setCustomValue('area', value)}
        />
        <hr />
        <Counter
          title="Floors"
          value={floorCount}
          onChange={(value) => setCustomValue('floorCount', value)}
        />
        <hr />
        <Counter
          title="Bedrooms"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
        <hr />
        <Counter
          title="Carport"
          value={carport}
          onChange={(value) => setCustomValue('carport', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add Property Image" />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Describe the Property" />
        <div className="flex flex-row items-center gap-2 justify-start text-neutral-500 text-center text-lg font-light">
          <div>Add the address of the place</div>
        </div>
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Price" />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Add Property"
      isOpen={addPropertyModal.isOpen}
      onClose={addPropertyModal.close}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default AddPropertyModal;
