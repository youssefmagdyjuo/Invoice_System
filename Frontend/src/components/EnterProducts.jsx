import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct ,removeProduct ,calculateTotal} from '../features/invoice/invoiceSlice';
import Input from './Input';
export default function EnterProducts() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.invoice.products);
    return (
        <>
            {/* add product button  */}
            <span
                className='addProduct_btn'
                onClick={() => dispatch(addProduct())}
            >
                +
            </span>
        <div className='scrollable_container'>
            <table className='products_table'>
                <thead>
                    <tr>
                        <th>Product:</th>
                        <th>Count:</th>
                        <th>Unit Price:</th>
                        <th>Descount:(%)</th>
                        <th>Total Price:</th>
                        <th></th>
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
                                            dispatch(calculateTotal());
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
                                            dispatch(calculateTotal());
                                        }}
                                    />
                                </td>
                                <td>
                                    <Input
                                        placeholder='0.0$'
                                        value={product.product_price}
                                        fun={(e) => {
                                            dispatch(updateProduct({
                                                index: index,
                                                field: 'product_price',
                                                value: Number(e.target.value)
                                            }))
                                            dispatch(calculateTotal());
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
                                            dispatch(calculateTotal());
                                        }}
                                    />
                                </td>
                                <td>
                                    <Input
                                        placeholder='0.0$'
                                        value={product.product_total_price}
                                    />
                                </td>
                                <td>
                                    {/* remove product button  */}
                                    <span
                                        className='removeProduct_btn'
                                        onClick={() => {dispatch(removeProduct(index)); dispatch(calculateTotal());}}
                                    >
                                        -
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </>

    )
}
