import "./AppHeader.css"
import { ArrowBackIcon } from "./icons/ArrowBackIcon"

function AppHeader( args ) {

    return (

        <>
        
            <header className="app-header">

                {
                    args.backFunction &&
                        <button className="back-header-button" onClick={ args.backFunction }>
                            <ArrowBackIcon width={ 32 } height={ 32 } />
                        </button>
                
                }

                <h1>{ args.title }</h1>

                {
                    args.customItem
                }

            </header>
        
        </>

    )

}

export default AppHeader

