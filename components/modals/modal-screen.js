import { useDispatch } from "react-redux";

import { toggleModal } from '../../redux/modals/modals-actions';

function ModalScreen() {
    const dispatch = useDispatch();

    function closeModal() {
        dispatch(toggleModal(null));
    }

    return (
        <div 
            onClick={closeModal} 
            className="w-screen h-screen absolute top-0 flex justify-center items-center bg-black opacity-30"
        ></div>
    );
}

export default ModalScreen;
