import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import logo from '../../../assets/images/navLogo.png'
import { DeleteConfirmationProps } from '../../Interfaces/project';

export default function DeleteConfirmation({ handleClose, show, onConfirm, message, isDeleting }: DeleteConfirmationProps) {
    return (
        <>

            <Modal show={show} onHide={handleClose} className='align-items-center justify-content-center d-flex'>
                <Modal.Header className='border-0 pb-0 bg-body-secondary' >
                    <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
                        <i className="fa fa-close pointer text-danger" onClick={handleClose}></i>
                    </div>
                </Modal.Header>
                <Modal.Body className='pt-0 my-0 bg-body-secondary'>
                <div className="text-center">
                        <img src={logo} className='w-50' alt="" />
                      </div>
                        <p className='fw-bold text-center mt-1'>{message}</p>
                </Modal.Body>
                <Modal.Footer className='border-0 bg-body-secondary'>
                    <Button className="bg-transparent border-primary-subtle text-dark" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={isDeleting} className="bg-transparent border-danger text-danger" onClick={onConfirm}>
                        {isDeleting ? <i className='fa fa-spin fa-spinner'></i> : "delete"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


