import React, {useEffect, useRef} from "react";
import WiButton from "@/components/elements/button";

export default function DeleteWishModal({wishId, setShowDeleteCardModal, deleteFromState}: {
    wishId: number
    setShowDeleteCardModal: React.Dispatch<React.SetStateAction<any>>
    deleteFromState: any
}) {

    const modalRef: any = useRef();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowDeleteCardModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowDeleteCardModal]);

    console.log(wishId);
    const deleteWish = () => {
        fetch('/api/wish', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({wishId})
        }).then(
            (res=> {
                deleteFromState();
            })
        )
    }

    return (

        <div ref={modalRef}
             className="justify-center rounded-xl my-4 items-center flex overflow-y-auto bg-white fixed focus:outline-none shadow-lg">
            <div className="relative w-auto max-w-3xl mx-3  my-3 ">
                {/*content*/}
                <div
                    className="border-0  relative flex flex-col">
                    <label htmlFor="">Do you want delete?</label>

                        <WiButton
                            className="bg-green-200 my-2"
                            onClickHandler={deleteWish}>
                           <span className="text-l">Delete</span>
                        </WiButton>


                </div>
            </div>
        </div>);
}