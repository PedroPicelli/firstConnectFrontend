import "./BaseError.css"

function BaseError( { text } ) {

    const active = text.length > 0

    return (
        <>
        
            <div className="base-error-wrapper" data-active={ active }>
                <p
                    className="base-error-text"
                    role="alert"
                    aria-live="polite"
                >
                    { text }
                </p>
            </div>

        </>
    )

}


export default BaseError
