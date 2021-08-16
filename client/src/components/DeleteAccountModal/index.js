import React from 'react';
import styles from './style.module.css';

export default ({ isVisible, closeModal }) => {
	const modalStyle = {
		opacity: isVisible ? 1 : 0,
		pointerEvents: isVisible ? 'all' : 'none',
	};

	return (
		<section style={modalStyle} className={styles.deleteAccountModal}>
			<div role="presentation">
				<button onClick={closeModal}>&times;</button>
				<p>Are you sure you want to delete your account?</p>
				<p className={styles.warning}>THIS ACTION IS IRREVERSIBLE</p>
				<button>Delete Account</button>
			</div>
		</section>
	);
};
