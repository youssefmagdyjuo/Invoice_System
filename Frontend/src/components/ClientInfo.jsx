import Input from './Input'
import { useDispatch ,useSelector} from 'react-redux'
import { updateClientName,updateClientAddress } from '../features/invoice/invoiceSlice'
export default function ClientInfo() {
    const dispatch=useDispatch()
    const clientName=useSelector((state)=>state.invoice.clientName)
    const clientAddress=useSelector((state)=>state.invoice.clientAddress)
    return (
        <div className='clintInfo'>
            <Input
                type='text'
                placeholder='Client Name'
                value={clientName}
                fun={(e)=>{dispatch(updateClientName(e.target.value))}}
            />
            <div className="flex justify-between ">
                <Input
                    type='text'
                    placeholder='Country'
                    value={clientAddress.country}
                    fun={(e)=>{dispatch(updateClientAddress({field:'country',value:e.target.value}))}}
                />
                <Input
                    type='text'
                    placeholder='City'
                    value={clientAddress.city}
                    fun={(e)=>{dispatch(updateClientAddress({field:'city',value:e.target.value}))}}
                />
                <Input
                    type='text'
                    placeholder='Street'
                    value={clientAddress.street}
                    fun={(e)=>{dispatch(updateClientAddress({field:'street',value:e.target.value}))}}
                />
            </div>
        </div>
    )
}
