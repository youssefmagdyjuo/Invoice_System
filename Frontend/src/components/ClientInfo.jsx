import Input from './Input'
import { useDispatch, useSelector } from 'react-redux'
import { updateClientName, updateClientAddress, updateClientPhone } from '../features/invoice/invoiceSlice'
export default function ClientInfo() {
    const dispatch = useDispatch()
    const clientName = useSelector((state) => state.invoice.clientName)
    const clientPhone = useSelector((state) => state.invoice.clientPhone)
    const clientAddress = useSelector((state) => state.invoice.clientAddress)
    return (
        <div className='clintInfo'>
            <div className="flex gap-4">
                <Input
                    type='text'
                    placeholder='Client Name'
                    value={clientName}
                    fun={(e) => { dispatch(updateClientName(e.target.value.trim().toLowerCase())) }}
                />
                <Input
                    type='text'
                    placeholder='Client Phone'
                    value={clientPhone}
                    fun={(e) => { dispatch(updateClientPhone(e.target.value.trim())) }}
                />
            </div>
            <div className="flex justify-between gap-4">
                <Input
                    type='text'
                    placeholder='Country'
                    value={clientAddress.country}
                    fun={(e) => { dispatch(updateClientAddress({ field: 'country', value: e.target.value.trim().toLowerCase() })) }}
                />
                <Input
                    type='text'
                    placeholder='City'
                    value={clientAddress.city}
                    fun={(e) => { dispatch(updateClientAddress({ field: 'city', value: e.target.value.trim().toLowerCase() })) }}
                />
                <Input
                    type='text'
                    placeholder='Street'
                    value={clientAddress.street}
                    fun={(e) => { dispatch(updateClientAddress({ field: 'street', value: e.target.value.trim().toLowerCase() })) }}
                />
            </div>
        </div>
    )
}
