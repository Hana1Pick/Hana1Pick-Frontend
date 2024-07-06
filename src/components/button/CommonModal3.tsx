import { CommonModalType2 } from '../../type/commonType';

function CommonModal3({ msg, show, onConfirm }: CommonModalType2) {
	if (!show) return null;

	return (
		<>
			<div className='commonModal3-backdrop'>
				<div className='commonModal3'>
					<p>{msg}</p>
					<div className='commonModal3-buttons'>
						<button onClick={onConfirm}>확인</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default CommonModal3;
