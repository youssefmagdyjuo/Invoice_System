
export default function PopUpLayout({children ,open}) {
    // const [open,setOpen] = useState(false)
    return (
        <div className={`PopUpLayout_container ${open?'flex':''}`}>
            <div className="PopUpLayout_box">
                {
                    children
                }
            </div>
        </div>
    )
}
