import useIsDesktop from "../hooks/useIsDesktop"

function ContactInfo({style}:{style:string}) {
    const isDesktop = useIsDesktop()
    return (
        <div className={`pb-4 flex justify-center items-center
${isDesktop ? 'flex-row' : 'flex-col'}
${style}
`}>
            <p>+44 7354430588</p>
            {isDesktop && <p>&nbsp;|&nbsp;</p>}
            <p> steven_herlihy@yahoo.com</p>
        </div>
    )
}

export default ContactInfo
