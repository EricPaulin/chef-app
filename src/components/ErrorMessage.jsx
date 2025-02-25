export default function ErrorMessage(props) {
    return (
        <>
            <div className="error-msg"> ERROR: {props.message} </div>
        </>
    )
}