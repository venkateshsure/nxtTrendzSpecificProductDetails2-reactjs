// Write your code here
// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {each} = props
  return (
    <li className="list-similar-product">
      <div className="fir-con-similar-product">
        <img
          className="similar-product-item-image"
          src={each.imageUrl}
          alt={`similar product ${each.title}`}
        />
        <div className="sec-con-similar-product">
          <p className="style">{each.title}</p>
          <p>by{each.brand} </p>
          <div className="third-con-similar-product">
            <p>Rs. {each.price}/</p>
            <button type="button">{each.rating}*</button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem

/* availability: each.availability,
        brand: each.brand,
        description: each.description,
        id: each.id,
        price: each.price,
        imageUrl: each.image_url,
        rating: each.rating,
        style: each.style,
        title: each.style,
        totalReviews: each.total_reviews, */
