import { Link } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { SERVER_URL } from '../constants/Url'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/userSlice'

const LandingPage = () => {
  const dispatch = useDispatch()

  // const [ProductInfo, setProductInfo] = useState([])
  // useEffect(() => {
  //   const fetchProductInfo = async () => {
  //     const {data} = await axios.get('/api/products')
  //     setProductInfo(data)
  //   }
  //   fetchProductInfo()
  // }, [])


  const { data: ProductInfo = [], isLoading, error } = useGetProductsQuery()

  const getUser = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/auth/login/success`, {
        withCredentials: true
      })
      console.log(res.data)
      dispatch(setCredentials({
        ...res.data.user._json,
        _id: res.data._id,
        isAdmin: res.data.user.isAdmin
      }))
    } catch (error) {
      // toast.error(error.data.message||error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  })




  return (
    <div>
      <Navbar />
      <h1>Landing Page</h1>

      {isLoading ? (<p>Loading...</p>) : error ? (console.log(error)) : (
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
          {ProductInfo?.map((product) => (
            <Link to={`/products/${product.id}`}
              style={{ border: "1px solid #dedede", width: "15rem" }}
              key={product.id}
            >
              <h3>Name : {product.name}</h3>
              <p>Price : Rs. {product.price}/-</p>
            </Link>
          ))}
        </div>

      )}


    </div>
  )
}

export default LandingPage
