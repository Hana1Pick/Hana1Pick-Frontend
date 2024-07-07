import { CommonModalType } from '../../type/commonType';

function CommonModal2({ msg, show, onCancle, onConfirm }: CommonModalType) {
	if (!show) return null;

	return (
		<>
			<div className='commonModal2-backdrop'>
				<div className='commonModal2'>
					<p>{msg}</p>
					<div className='commonModal2-buttons'>
						<button onClick={onCancle}>취소</button>
						<button onClick={onConfirm}>확인</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default CommonModal2;
