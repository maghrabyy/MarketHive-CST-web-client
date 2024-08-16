import { Button } from 'antd';
import { Rate } from 'antd';
import { QuantitySelector } from '../../Components/ProductDetails-comp/QuantitySelector';
import { Avatar } from 'antd';
import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
export const ProductDetails = ({ product, store, reviews }) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const productPrice = product.discount
    ? product.price - product.price * product.discount
    : product.price;
  const avgRate =
    reviews.map((review) => review.rating).reduce((a, b) => a + b, 0) /
    reviews.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="product-images">
        <img
          src={product.images[activeImage]}
          alt={product.title}
          className="max-h-[400px] object-contain"
        />
        <div className="prod-images flex gap-2">
          {product.images.map((img, index) => {
            return (
              <img
                key={img}
                src={img}
                alt={product.title}
                className={`w-20 h-14 object-contain cursor-pointer border-2 rounded-md ${
                  activeImage === index ? ' border-primary' : 'border-slate-400'
                }`}
                onClick={() => setActiveImage(index)}
              />
            );
          })}
        </div>
      </div>
      <div className="product-info space-y-4">
        <div className="product-details border-b border-b-gray-200 pb-2 flex flex-col gap-2">
          <div className="detail-header items-center flex justify-between">
            <FaRegHeart className="text-xl cursor-pointer hover:text-red-500" />
            <div className="store-info items-center flex gap-2">
              <h1 className="text-2xl font-bold">{store.name}</h1>
              <Avatar src={store.logo} alt={store.name} size="large" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <div className="product-rate flex items-center gap-2">
            <Rate count={5} disabled value={avgRate} />(
            {product.reviews.length.toLocaleString()})
          </div>
          <h1
            className={`font-semibold ${
              product.stockQuantity > 0
                ? product.stockQuantity > 5
                  ? 'text-green-600'
                  : 'text-yellow-600'
                : 'text-red-500'
            }`}
          >
            {product.stockQuantity > 0
              ? product.stockQuantity > 5
                ? 'In Stock'
                : `Only ${product.stockQuantity} in stock`
              : 'Out Stock'}
          </h1>
          <p>{product.description}</p>
        </div>
        <div className="product-action space-y-2">
          <div className="product-price">
            {product.discount ? (
              <h1>
                <span className="discounted-price text-4xl font-bold">
                  {productPrice.toLocaleString()} EGP
                </span>
                <span className=" line-through">
                  {product.price.toLocaleString()} EGP
                </span>
              </h1>
            ) : (
              <h1 className="text-4xl font-bold">
                {productPrice.toLocaleString()} EGP
              </h1>
            )}
          </div>

          <div className="action-btns flex gap-2">
            <QuantitySelector
              value={selectedQty}
              onChange={setSelectedQty}
              maxValue={product.stockQuantity}
            />
            <Button type="primary" className="flex-grow">
              Buy Now
            </Button>
            <Button className="flex-grow">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
