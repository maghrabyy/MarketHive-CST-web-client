import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { useParams } from 'react-router-dom';
import { ProductDetails } from '../../Components/ProductDetails-comp/ProductDetails';
import { ReviewForm } from '../../Components/ProductDetails-comp/ReviewForm';
import { CustomersReviews } from '../../Components/ProductDetails-comp/CustomersReviews';
import { Breadcrumb } from 'antd';
import { Spin } from 'antd';
import { FaHome, FaStore, FaShoppingBag } from 'react-icons/fa';
import { auth } from '../../firebase';

function ProductDetailPage() {
  const { prodId } = useParams();
  const { product, store, category, productReviews, isProductLoading } =
    useFetchProduct(prodId);
  return isProductLoading ? (
    <div className="h-full absolute left-1/2 flex flex-col justify-center">
      <Spin size="large" className="self-stretch " />
    </div>
  ) : (
    <div className="product-details-page paddingX py-5 space-y-5">
      <Breadcrumb
        items={[
          {
            href: '/',
            title: (
              <div className="flex gap-2 items-center">
                <FaHome />
                <span>Home</span>
              </div>
            ),
          },
          {
            href: `/stores/${store.id}`,
            title: (
              <div className="flex gap-2 items-center">
                <FaStore />
                <span>{store.name}</span>
              </div>
            ),
          },
          {
            href: `/categories/${category.id}`,
            title: (
              <div className="flex gap-2 items-center">
                <FaShoppingBag />
                <span>{category.categoryName}</span>
              </div>
            ),
          },
          {
            title: (
              <div className="flex gap-2 items-center">
                <FaShoppingBag />
                <span>{product.title}</span>
              </div>
            ),
          },
        ]}
      />
      <ProductDetails
        product={product}
        store={store}
        reviews={productReviews}
      />
      {auth.currentUser && <ReviewForm productId={prodId} />}
      <CustomersReviews reviews={productReviews} />
    </div>
  );
}

export default ProductDetailPage;
