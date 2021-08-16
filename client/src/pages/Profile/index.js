import React, { useState } from 'react';
import { DeleteAccountModal } from '../../components';

export default () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const handleDeleteClick = () => {
		setShowDeleteModal((prevState) => !prevState);
	};

	const closeDeleteAccountModal = () => {
		setShowDeleteModal(false);
	};

	return (
		<>
			<DeleteAccountModal closeModal={closeDeleteAccountModal} isVisible={showDeleteModal} />
			<main>
				<h1>Hello Profile</h1>
				<button onClick={handleDeleteClick}>Delete Account</button>
			</main>
		</>
	);
};
