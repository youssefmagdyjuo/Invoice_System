import { useState } from 'react'
import Button from '../components/Button';
import Input from '../components/Input';
import ClientInfo from '../components/ClientInfo';
export default function InvoiceForm() {
    const [products, setProducts] = useState([
        { product_name: "", count: null, price: null, discount: null, total: 0 },
    ])
    // handle add Product function
    const handle_addProduct = () => {
        setProducts([
            ...products,
            { product_name: "", count: null, price: null, discount: null, total: null },
        ]);
    }
    const handleInputChange = (index, name, value) => {
        const updated = [...products];
        updated[index][name] = value;

        // Calculate total based on count, price, and discount
        const count = parseFloat(updated[index].count) || 0;
        const price = parseFloat(updated[index].price) || 0;
        const discount = parseFloat(updated[index].discount) || 0;
        updated[index].total = (count * price) - (discount / 100 * (count * price));

        setProducts(updated);
    }
    return (
        <div className="formPage">
            <div className='form_container'>
                <form>
                    <ClientInfo/>
                    <table>
                        <thead>
                            <tr>
                                <th>Product:</th>
                                <th>Count:</th>
                                <th>Unit Price:</th>
                                <th>Descount:(%)</th>
                                <th>Total Price:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Input
                                                placeholder='Product'
                                                value={product.product_name}
                                                fun={(e) => { handleInputChange(index, 'product_name', e.target.value) }}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                placeholder='0'
                                                value={product.count}
                                                fun={(e) => { handleInputChange(index, 'count', e.target.value) }}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                placeholder='0.0$'
                                                value={product.price}
                                                fun={(e) => { handleInputChange(index, 'price', e.target.value) }}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                placeholder='0%'
                                                value={product.discount}
                                                fun={(e) => { handleInputChange(index, 'discount', e.target.value) }}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                placeholder='0.0$'
                                                value={product.total}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* add product button  */}
                    <span
                        className='addProduct_btn'
                        onClick={handle_addProduct}
                    >
                        +
                    </span>
                    <Button
                        type={'button'}
                        text={'Add'}
                        style={'btn_primary'}
                        fun={() => {
                            alert(JSON.stringify(products, null, 2));
                        }}

                    />
                </form>
            </div>
        </div>
    )
}
