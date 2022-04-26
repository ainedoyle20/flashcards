import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { toggleModal } from '../../redux/modals/modals-actions';

function DecksHeader() {
    const dispatch = useDispatch();
    const router = useRouter();
    const isPublicHeader = router.route === '/public-decks' ? true : false;

    return (
        <div className="w-full flex justify-end">
            {
                isPublicHeader 
                ?   <div className="flex items-center cursor-pointer pr-5 py-3.5 text-[15px] hover:text-base">
                        <span onClick={() => dispatch(toggleModal('addDeckModal'))}>Create Public Deck</span>
                    </div>
                : <div className="flex items-center cursor-pointer pr-5 py-3.5 text-[15px] hover:text-base">
                    <span onClick={() => dispatch(toggleModal('addDeckModal'))}>Create Deck</span>
                  </div>
            }
        </div>
    );
}

export default DecksHeader;
