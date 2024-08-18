import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { useParams } from 'react-router-dom';
import { ProductDetails } from '../../Components/ProductDetails-comp/ProductDetails';
import { ReviewForm } from '../../Components/ProductDetails-comp/ReviewForm';
import { CustomersReviews } from '../../Components/ProductDetails-comp/CustomersReviews';
import { BreadCrumb } from '../../Components/BreadCrumb';
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
      <BreadCrumb
        items={[
          {
            href: '/',
            icon: <FaHome />,
            title: 'Home',
          },
          {
            href: `/stores/${store.id}`,
            icon: <FaStore />,
            title: store.name,
          },
          {
            href: `/categories/${category.id}`,
            icon: <FaShoppingBag />,
            title: category.categoryName,
          },
          {
            icon: <FaShoppingBag />,
            title: product.title,
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
