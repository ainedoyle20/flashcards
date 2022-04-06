import { connect } from 'react-redux';

import { toggleErrorModal } from '../../redux/modals/modals-actions';

function DeleteErrorModal({ toggleErrorModal }) {
    return (
        <div className="flex flex-col items-center p-4 w-[60vw] h-auto absolute top-[30vh] left-[20vw] text-white rounded-2xl bg-[#9C0000] cursor-default md:w-[50vw] md:left-[25vw] lg:w-[40vw] lg:left-[30vw]">
            <h2 className="text-2xl mt-[5%] mb-[2%]">Invalid Authorization</h2>
            <p className="p-4"> You can only make changes to a public deck if you are the creator. <br /> However, if you copy a public deck into your own personal decks collection, you can then alter it freely.</p>
            <div className="mt-[2%] w-full p-4 flex justify-end">
              <button onClick={() => toggleErrorModal()}>Close</button>  
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleErrorModal: () => dispatch(toggleErrorModal())
});

export default connect(null, mapDispatchToProps)(DeleteErrorModal);
