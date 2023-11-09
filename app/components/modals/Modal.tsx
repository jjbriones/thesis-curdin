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
    <>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="w-full relative md:w-2/3 lg:w-1/2 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
          <div
            className={`translate h-full ${
              showModal ? 'translate-y-0' : 'translate-y-full'
            }
            ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="flex flex-col w-full bg-white outline-none focus:outline-none translate h-full md:h-auto border-0 rounded-lg shadow-lg relative ">
              <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoCloseCircleOutline size={18} />
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
                      disabled={disabled}
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
    </>
  );
};

export default Modal;
