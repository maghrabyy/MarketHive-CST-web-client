import Header from '../../Components/Homepage-comp/Header';
import { HomeSection } from '../../Components/Homepage-comp/HomeSection';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ProductCard, CategoryCard } from '../../Components/EcommerceCards.jsx';

export default function HomePage() {
  const [popularProdList, setPopularProdList] = useState([]);
  const [popularCategoryList, setPopularCategoryList] = useState([]);
  const [storesList, setStoresList] = useState([]);

  useEffect(() => {
    const fetchProds = async () => {
      const res = await axios.get('https://fakestoreapi.com/products');
      const prodsData = res.data;
      setPopularProdList(prodsData.slice(0, 4));
    };
    const fetchCategories = async () => {
      const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
      const catData = res.data;
      setPopularCategoryList(catData.slice(0, 4));
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
          {popularProdList.map((prod) => {
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
          {storesList.map((prod) => {
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
          title="Popular Categories"
          pathTitle={'Categories'}
          sectionPath={'/categories'}
        >
          {popularCategoryList.map((cat) => {
            return (
              <CategoryCard
                key={cat.id}
                prodImg={cat.image}
                prodTitle={cat.name}
              />
            );
          })}
        </HomeSection>
      </div>
    </>
  );
}
