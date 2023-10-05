// Write your code here
// Write your code here

import {Component} from 'react'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'
import SimilarProductItem from '../SimilarProductItem'

class ProductItemDetails extends Component {
  state = {product: {}, similarProducts: [], stocksCount: 1}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // const [similarProducts, b, c] = data.similar_products
      // console.log(similarProducts, b, c)
      const similarProducts = data.similar_products
      const camelCaseData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        price: data.price,
        imageUrl: data.image_url,
        rating: data.rating,
        style: data.style,
        title: data.style,
        totalReviews: data.total_reviews,
      }

      const camelCaseSimilarData = similarProducts.map(each => ({
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        id: each.id,
        price: each.price,
        imageUrl: each.image_url,
        rating: each.rating,
        style: each.style,
        title: each.style,
        totalReviews: each.total_reviews,
      }))

      this.setState({
        product: camelCaseData,
        similarProducts: camelCaseSimilarData,
      })
    }

    if (response.status === 400) {
      this.setState({similarProducts: []})
    }
  }

  decreaseStocksCount = () =>
    this.setState(pre => ({stocksCount: pre.stocksCount - 1}))

  increaseStocksCount = () =>
    this.setState(pre => ({stocksCount: pre.stocksCount + 1}))

  toProductRoute = () => {
    const {history} = this.props
    console.log(history)

    history.replace('/products')
  }

  render() {
    const {product, similarProducts, stocksCount} = this.state
    return (
      <div>
        {similarProducts.length > 0 ? (
          <div className="con">
            <div className="head-con">
              <div className="fir-con">
                <img
                  src={product.imageUrl}
                  alt="product"
                  className="product-image"
                />
                <div className="sec-con">
                  <h1>{product.title}</h1>
                  <p>Rs {product.price}</p>
                  <div className="rating-con">
                    <button className="add-to-cart" type="button">
                      {product.rating}*
                    </button>
                    <p>{product.totalReviews}Reviews</p>
                  </div>

                  <p>{product.description}</p>
                  <p className="para">
                    Available: <span>{product.availability}</span>
                  </p>
                  <p className="para">
                    Brand: <span>{product.brand}</span>
                  </p>
                  <hr className="hr" />
                  <div className="stock-con">
                    <BsDashSquare
                      className="react-icons"
                      onClick={this.decreaseStocksCount}
                    />
                    <p>{stocksCount}</p>
                    <BsPlusSquare
                      className="react-icons"
                      onClick={this.increaseStocksCount}
                    />
                  </div>
                  <div>
                    <button className="add-to-cart" type="button">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
              <div className="ul-head">
                <p>Similar products</p>
                <ul className="ul-con">
                  {similarProducts.map(each => (
                    <SimilarProductItem key={each.id} each={each} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="failure-con">
            <h1>Product Not Found</h1>

            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
              alt="error view"
              className="failure-image"
            />
            <button onClick={this.toProductRoute} type="button">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default ProductItemDetails
