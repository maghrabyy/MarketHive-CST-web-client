import Header from '../../Components/Homepage-comp/Header.jsx';
import { HomeSection } from '../../Components/Homepage-comp/HomeSection.jsx';
import { useState, useEffect } from 'react';
import {
  ProductCard,
  CollectionCard,
} from '../../Components/EcommerceCards.jsx';
import { SkeletonProdsCard } from '../../Components/EcommerceCards.jsx';
import { SkeletonCollectionCard } from '../../Components/EcommerceCards.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';

export default function HomePage() {
  const [popularProdList, setPopularProdList] = useState([]);
  const [popularCategoryList, setPopularCategoryList] = useState([]);
  const [popularStoresList, setPopularStoresList] = useState([]);
  const [isProdsLoading, setProdsLoading] = useState(true);
  const [isCatsLoading, setCatsLoading] = useState(true);
  const [isStoresLoading, setIsStoresLoading] = useState(true);

  useEffect(() => {
    const fetchProds = async () => {
      try {
        const prodsData = [];
        const productsSnapshot = await getDocs(collection(db, 'Products'));
        productsSnapshot.forEach((product) => {
          prodsData.push({ ...product.data(), id: product.id });
        });
        setPopularProdList(
          prodsData
            .sort((a, b) => b.reviews.length - a.reviews.length)
            .slice(0, 4),
        );
        setProdsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCategories = async () => {
      try {
        const catData = [];
        const categorySnapshot = await getDocs(collection(db, 'Categories'));
        categorySnapshot.forEach((category) => {
          catData.push({ ...category.data(), id: category.id });
        });
        setCatsLoading(false);
        setPopularCategoryList(catData.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchStores = async () => {
      try {
        const storeData = [];
        const storeSnapshot = await getDocs(collection(db, 'Stores'));
        storeSnapshot.forEach((store) => {
          storeData.push({ ...store.data(), id: store.id });
        });
        setIsStoresLoading(false);
        setPopularStoresList(storeData.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
    fetchCategories();
    fetchProds();
  }, []);

  return (
    <>
      <Header />
      <div className="paddingX">
        <HomeSection
          title="Popular Products"
          pathTitle={'Products'}
          sectionPath={'/products'}
        >
          {isProdsLoading
            ? Array.from(Array(4)).map((_, index) => (
                <SkeletonProdsCard key={index} />
              ))
            : popularProdList.map((prod) => {
                return (
                  <ProductCard
                    key={prod.id}
                    path={`/products/${prod.id}`}
                    prodImg={prod.images[0]}
                    prodTitle={prod.title}
                    prodPrice={prod.price}
                  />
                );
              })}
        </HomeSection>
        <HomeSection
          title="Stores Collection"
          pathTitle={'Stores'}
          sectionPath={'/stores'}
        >
          {isStoresLoading
            ? Array.from(Array(4)).map((_, index) => (
                <SkeletonCollectionCard key={index} />
              ))
            : popularStoresList.map((store) => {
                return (
                  <CollectionCard
                    key={store.id}
                    path={`/stores/${store.id}`}
                    prodImg={store.logo}
                    prodTitle={store.name}
                    contain
                  />
                );
              })}
        </HomeSection>
        <HomeSection
          title="Popular Categories"
          pathTitle={'Categories'}
          sectionPath={'/categories'}
        >
          {isCatsLoading
            ? Array.from(Array(4)).map((_, index) => (
                <SkeletonCollectionCard key={index} />
              ))
            : popularCategoryList.map((cat) => {
                return (
                  <CollectionCard
                    key={cat.id}
                    path={`/collections/${cat.id}`}
                    prodImg={cat.categoryImage}
                    prodTitle={cat.categoryName}
                    cover
                  />
                );
              })}
        </HomeSection>
      </div>
    </>
  );
}
