import Header from '../../Components/Homepage-comp/Header.jsx';
import { HomeSection } from '../../Components/Homepage-comp/HomeSection.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  ProductCard,
  CollectionCard,
} from '../../Components/EcommerceCards.jsx';
import { SkeletonProdsCard } from '../../Components/EcommerceCards.jsx';
import { SkeletonCollectionCard } from '../../Components/EcommerceCards.jsx';
import dummyStores from '../../data/dummystores.json';

export default function HomePage() {
  const [popularProdList, setPopularProdList] = useState([]);
  const [popularCategoryList, setPopularCategoryList] = useState([]);
  const [isProdsLoading, setProdsLoading] = useState(true);
  const [isCatsLoading, setCatsLoading] = useState(true);
  useEffect(() => {
    const fetchProds = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        const prodsData = res.data;
        setPopularProdList(prodsData.slice(0, 4));
        setProdsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://api.escuelajs.co/api/v1/categories',
        );
        setCatsLoading(false);
        const catData = res.data;
        setPopularCategoryList(catData.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
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
                    prodImg={prod.image}
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
          {dummyStores.map((store) => {
            return (
              <CollectionCard
                key={store.id}
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
                    prodImg={cat.image}
                    prodTitle={cat.name}
                    cover
                  />
                );
              })}
        </HomeSection>
      </div>
    </>
  );
}
