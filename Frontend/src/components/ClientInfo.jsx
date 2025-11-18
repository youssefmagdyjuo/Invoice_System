import Input from './Input'

export default function ClientInfo() {
    return (
        <div className='clintInfo'>
            <Input
                type='text'
                placeholder='Client Name'
            />
            <div className="flex justify-between ">
                <Input
                    type='text'
                    placeholder='Country'
                />
                <Input
                    type='text'
                    placeholder='City'
                />
                <Input
                    type='text'
                    placeholder='Street'
                />
            </div>
        </div>
    )
}
