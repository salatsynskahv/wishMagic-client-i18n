import React from "react";


const  WiButton = ({className, children, onClickHandler} : {className?: string, children: React.ReactNode, onClickHandler?: any}) => {

    const DEFAULT_CLASS_NAMES = "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"

    return (
        <button
            onClick={onClickHandler}
            className={className +" " + DEFAULT_CLASS_NAMES}>
            {children}
        </button>
    )
}
export default WiButton;