import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../features/invoice/invoiceSlice';
import Input from './Input';
export default function EnterProducts() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.invoice.products);
    return (
        <div>

            {/* add product button  */}
            <span
                className='addProduct_btn'
                onClick={() => dispatch(addProduct())}
            >
                +
            </span>
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
                                        fun={(e) => {
                                            dispatch(updateProduct({
                                                index: index,
                                                field: 'product_name',
                                                value: e.target.value
                                            }))
                                        }}
                                    />
                                </td>
                                <td>
                                    <Input
                                        placeholder='0'
                                        value={product.count}
                                        fun={(e) => {
                                            dispatch(updateProduct({
                                                index: index,
                                                field: 'count',
                                                value: Number(e.target.value)
                                            }))
                                        }}
                                    />
                                </td>
                                <td>
                                    <Input
                                        placeholder='0.0$'
                                        value={product.price}
                                        fun={(e) => {
                                            dispatch(updateProduct({
                                                index: index,
                                                field: 'product_price',
                                                value: Number(e.target.value)
                                            }))
                                        }}
                                    />
                                </td>
                                <td>
                                    <Input
                                        placeholder='0%'
                                        value={product.discount}
                                        fun={(e) => {
                                            dispatch(updateProduct({
                                                index: index,
                                                field: 'descount',
                                                value: Number(e.target.value)
                                            }))
                                        }}
                                    />
                                </td>
                                <td>
                                    <Input
                                        placeholder='0.0$'
                                        value={product.product_total_price}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
