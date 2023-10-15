import React, { useState, useEffect, useRef } from "react";
import styles from './modal.module.scss'
import { AiOutlineClose as CloseButton } from 'react-icons/ai'

interface ModalProps {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
};

const Modal = ({
    isOpen,
    hasCloseBtn = true,
    onClose,
    children
}: ModalProps) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className={styles.modal}>
            <div className={styles.modalContent}>
                {hasCloseBtn && (
                    <div className={styles.topContainer}>
                        <button className={styles.closeBtn} onClick={handleCloseModal}>
                            <CloseButton />
                        </button>
                    </div>

                )}
                {children}
            </div>

        </dialog>
    );
};

export default Modal