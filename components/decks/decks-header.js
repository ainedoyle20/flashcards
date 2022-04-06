import { useRouter } from "next/router";
import { connect } from "react-redux";

import { toggleDeckModal } from '../../redux/modals/modals-actions';

function DecksHeader({ toggleDeckModal }) {
    const router = useRouter();
    const isPublicHeader = router.route === '/public-decks' ? true : false;

    return (
        <div className="w-full flex justify-end">
            {
                isPublicHeader 
                ?   <div className="flex items-center cursor-pointer pr-5 py-3.5 text-[15px] hover:text-base">
                        <span onClick={() => toggleDeckModal()}>Create Public Deck</span>
                    </div>
                : <div className="flex items-center cursor-pointer pr-5 py-3.5 text-[15px] hover:text-base">
                    <span onClick={() => toggleDeckModal()}>Create Deck</span>
                  </div>
            }
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleDeckModal: () => dispatch(toggleDeckModal()),
});

export default connect(null, mapDispatchToProps)(DecksHeader);
