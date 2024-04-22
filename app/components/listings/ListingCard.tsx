"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";
import useBarangay from "@/app/hooks/useBarangay";
import useCities from "@/app/hooks/useCities";
import Button from "../Button";
import Link from "next/link";

interface ListingCardProps {
  data: SafeListing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  editActionBtn?: (
    event: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => void;
  editActionBtnLabel?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  editActionBtn,
  editActionBtnLabel,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const { getBarangayValue } = useBarangay();
  const { getCityValue } = useCities();

  const location = getByValue(data.locationValue);
  const barangay = getBarangayValue(data.barangayLocation);
  const city = getCityValue(data.cityLocation);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    return data.price;
  }, [data.price]);

  return (
    <div className="col-span-1 cursor-pointer group">
      <Link href={`/listings/${data.id}`}>
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
              alt="Property Listing"
              src={data.imageSrc}
              className="object-cover h-full w-full group-hover:scale-110 transition"
              fill
            />
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          </div>
          <div className="font-semibold text-lg">{data.title}</div>
          <div className="font-light text-neutral-500">
            {data.roomCount} bds | {data.bathroomCount} ba | {data.cityLocation}{" "}
            | {data.barangayLocation}
          </div>
          <div className="font-semibold">
            ₱{(data.price / 1000000).toFixed(2)} million
          </div>
        </div>
      </Link>
      {onAction ?? editActionBtn ? (
        <>
          <hr className="my-3" />
          <div className="flex flex-col gap-2">
            {onAction && actionLabel && (
              <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
              />
            )}
            {editActionBtn && editActionBtnLabel && (
              <Button
                disabled={disabled}
                small
                outline
                label={editActionBtnLabel}
                onClick={editActionBtn}
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ListingCard;
