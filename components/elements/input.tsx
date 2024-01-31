const style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";


type WiInputParams = {
    type?: string,
    name?: string,
    inputStyle?: string,
    value: any,
    handleChange: any
}


function WiInput({type = "text", name = "", inputStyle = style, value, handleChange}: WiInputParams) {

    return (
        <input
            type={type}
            name={name}
            className={inputStyle}
            value={value}
            onChange={handleChange}>
        </input>)
}

export default WiInput;