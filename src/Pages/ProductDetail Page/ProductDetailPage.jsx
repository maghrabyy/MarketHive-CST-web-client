import { db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { prodId } = useParams();
  const [product, setProduct] = useState({});
  const [store, setStore] = useState({});
  const [isProductLoading, setIsProductLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getDoc(doc(db, 'Products', prodId));
        const fetchedStore = await getDoc(
          doc(db, 'Stores', fetchedProduct.data().storeId),
        );
        setProduct(fetchedProduct.data());
        setStore(fetchedStore.data());
        setIsProductLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [prodId]);

  return isProductLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="paddingX py-5">
      <img src={product.images[0]} alt={product.title} />
      <h1>name: {product.title}</h1>
      <h1>description: {product.description}</h1>
      <h1>price: {product.price}</h1>
      <h1>store name: {store.name}</h1>
    </div>
  );
}

export default ProductDetailPage;
