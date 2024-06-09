import { useParams } from 'react-router-dom'
// import ProductInfo from '../constants/ProductInfo'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetProductQuery } from '../slices/productsApiSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../slices/cartSlice'

const ProductsPage = () => {
    const { id } = useParams()
    console.log(id)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [ProductInfo, setProductInfo] = useState([])
    // useEffect(() => {
    //     const fetchProductInfo = async () => {
    //         const { data } = await axios.get(`/api/products/${id}`)
    //         setProductInfo(data)
    //     }
    //     fetchProductInfo()
    // }, [id])

    const { data: ProductInfo = {}, isLoading, error } = useGetProductQuery(id)

    const [quantity, setQuantity] = useState(1)

    const addToCartHandler = () => {
        dispatch(addToCart({
            ...ProductInfo,
            quantity
        }))
        navigate('/cart')
    }


    return (
        <div>
            {isLoading ? (<p>Loading...</p>) : error ? (console.log(error)) : (
                <>
                    <h1>Product - {ProductInfo.id}</h1>
                    <p>Product Id - {ProductInfo.id}</p>
                    <p>Name - {ProductInfo.name}</p>
                    <p>Price - Rs. {ProductInfo.price}/-</p>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                </>
            )}
        </div>
    )
}

export default ProductsPage
