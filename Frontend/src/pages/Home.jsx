
import Button from '../components/Button'
import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <section className='heroSection'>
            <div className="homeImage">
                <img src="/imges/homeImge.svg" alt="" />
            </div>
            <div className="buttons">
                <Link to={'/invoiceform'}>
                    <Button
                        type={'button'}
                        text={'Add Invoice'}
                        style={'btn_primary'}
                    />
                </Link>
                <Button
                    type={'button'}
                    text={'Invoices'}
                    style={'btn_secondry'}
                />
            </div>
        </section>
    )
}
