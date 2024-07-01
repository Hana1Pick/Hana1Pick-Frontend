import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	message: string;
	onConfirm: () => void;
}

const MoaclubModal: React.FC<ModalProps> = ({ isOpen, onClose, message, onConfirm }) => {
	return (
		<Modal isOpen={isOpen} onRequestClose={onClose}>
			<div>
				<p>{message}</p>
				<button onClick={onConfirm}>확인</button>
			</div>
		</Modal>
	);
};

export default MoaclubModal;
