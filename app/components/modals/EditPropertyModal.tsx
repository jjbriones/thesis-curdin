'use client';

import { SafeListing } from "@/app/types";
import Modal from "./Modal";
import { ChangeEventHandler, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface EditPropertyModalProps {
    listing: SafeListing;
    open: boolean;
    onClose: any;
}

interface EditPropertyModalBodyProps {
    listing: SafeListing;
    handleChange: ChangeEventHandler<HTMLElement>;
}

const EditPropertyModalBody: React.FC<EditPropertyModalBodyProps> = ({ listing, handleChange }) => {
    return (
        <form>
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-neutral-500">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={listing.title}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-neutral-500">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={listing.description}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="price" className="text-neutral-500">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={listing.price}
                        onChange={handleChange}
                        min={1}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="area" className="text-neutral-500">
                        Area SQM
                    </label>
                    <input
                        type="number"
                        id="area"
                        name="area"
                        value={listing.area}
                        onChange={handleChange}
                        min={1}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="roomCount" className="text-neutral-500">
                        Bedroom Count
                    </label>
                    <input
                        type="number"
                        id="roomCount"
                        name="roomCount"
                        value={listing.roomCount}
                        onChange={handleChange}
                        min={1}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="bathroomCount" className="text-neutral-500">
                        Bathroom Count
                    </label>
                    <input
                        type="number"
                        id="bathroomCount"
                        name="bathroomCount"
                        value={listing.bathroomCount}
                        onChange={handleChange}
                        min={1}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="carport" className="text-neutral-500">
                        Carport
                    </label>
                    <input
                        type="number"
                        id="carport"
                        name="carport"
                        value={listing.carport}
                        onChange={handleChange}
                        min={0}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="yard" className="text-neutral-500">
                        Yard
                    </label>
                    <input
                        type="number"
                        id="yard"
                        name="yard"
                        value={listing.yard}
                        onChange={handleChange}
                        min={0}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </div>
        </form>
    );
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({ listing, open, onClose }) => {
    const [data, setData] = useState(listing);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        setLoading(true);

        axios.put(`/api/listings/${listing.id}`, data)
            .then(() => toast.success("Property updated successfully"))
            .finally(() => setLoading(false));
    }

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={"Edit Property"}
            body={<EditPropertyModalBody listing={data} handleChange={handleChange} />}
            actionLabel="Save"
            disabled={loading}
            onSubmit={handleSubmit}
        />
    )
}

export default EditPropertyModal;