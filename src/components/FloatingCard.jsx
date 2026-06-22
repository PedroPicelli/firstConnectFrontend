import "./FloatingCard.css"


function FloatingCard(args) {

    return (

        <>
            <section className="floating-card-screen-filler">

                <section className={ args.className ? "floating-card-section " + args.className : "floating-card-section" }>

                    { args.children }

                </section>
            </section>
        
        </>

    )

}


export default FloatingCard
