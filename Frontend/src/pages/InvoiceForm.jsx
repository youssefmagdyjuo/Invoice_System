import Button from '../components/Button';
import Input from '../components/Input';
import ClientInfo from '../components/ClientInfo';
import EnterProducts from '../components/EnterProducts';
export default function InvoiceForm() {
    return (
        <div className="formPage">
            <div className='form_container'>
                <form>
                    <ClientInfo/>
                    <EnterProducts/>
                    <Button
                        type={'button'}
                        text={'Save Invoice'}
                        style={'btn_primary'}
                    />
                </form>
            </div>
        </div>
    )
}
