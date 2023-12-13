'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {IoCloseCircleOutline} from 'react-icons/io5';
import Button from '../Button';

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    secondaryActionDisabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    secondaryActionDisabled,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);

        onClose();
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [secondaryAction, disabled]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-neutral-800/70">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className={`translate h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex flex-col w-full bg-white outline-none focus:outline-none translate h-full md:h-auto border-0 rounded-lg shadow-lg relative">
                        <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
                            <button
                                onClick={handleClose}
                                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                            >
                                <IoCloseCircleOutline size={18}/>
                            </button>
                            <div className="text-lg font-semibold">{title}</div>
                        </div>
                        <div className="body relative px-6 pt-6 pb-4 flex-auto font-semibold text-xl">
                            {body}
                        </div>
                        <div className="footer flex flex-col gap-2 p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryAction && secondaryActionLabel && (
                                    <Button
                                        label={secondaryActionLabel}
                                        disabled={secondaryActionDisabled}
                                        onClick={handleSecondaryAction}
                                        outline
                                    />
                                )}
                                <Button
                                    label={actionLabel}
                                    disabled={disabled}
                                    onClick={handleSubmit}
                                />
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
