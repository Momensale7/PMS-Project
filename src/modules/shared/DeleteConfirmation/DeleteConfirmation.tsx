import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../../../assets/images/navLogo.png';
import { DeleteConfirmationProps } from '../../Interfaces/project';
import LogoLight from '../../../assets/images/PMSlogo.png'
import useDarkModeToggle from '../../hooks/useDarkModeToggle';

export default function DeleteConfirmation({
    handleClose,
    show,
    onConfirm,
    message,
    isDeleting,
}: DeleteConfirmationProps) {
    const { darkMode } = useDarkModeToggle()
    return (
        <Modal show={show} onHide={handleClose} className="align-items-center deleteModal justify-content-center d-flex">
            <Modal.Header className="border-0 pb-0 modal-header-custom contentBg">
                <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
                    <i className="fa fa-close pointer text-danger" onClick={handleClose}></i>
                </div>
            </Modal.Header>

            <Modal.Body className="pt-0 my-0 modal-body-custom contentBg">
                <div className="text-center">
                    <img src={darkMode? LogoLight : logo} className="w-50" alt="logo" />
                </div>
                <p className="fw-bold text-center mt-1 textContent">{message}</p>
            </Modal.Body>

            <Modal.Footer className="border-0 modal-footer-custom contentBg">
                <Button className="bg-transparent btn border-primary-subtle textContent" onClick={handleClose}>
                    Close
                </Button>
                <Button disabled={isDeleting} className="bg-transparent btn border-danger textContent" onClick={onConfirm}>
                    {isDeleting ? <i className='fa fa-spin fa-spinner'></i> : "delete"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
