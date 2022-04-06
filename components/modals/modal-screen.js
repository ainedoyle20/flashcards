function ModalScreen({ toggleModal }) {
    return (
        <div 
            onClick={() => toggleModal()} 
            className="w-screen h-screen absolute top-0 flex justify-center items-center bg-black opacity-30"
        ></div>
    );
}

export default ModalScreen;
