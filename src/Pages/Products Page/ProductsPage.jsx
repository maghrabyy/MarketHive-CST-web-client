import { useOutlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Select, Breadcrumb } from 'antd';
import { ProductCard } from '../../Components/EcommerceCards';
import { FaHome } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { SkeletonProdsCard } from '../../Components/EcommerceCards';

export default function ProductsPage({
  productsList,
  collectionName,
  isLoading,
}) {
  const outlet = useOutlet();
  const [products, setProducts] = useState([]);
  const location = useLocation().pathname;
  const currentCollection = location.substring(1, location.lastIndexOf('/'));
  const productPath = {
    base: currentCollection,
    collectionName: collectionName,
  };
  useEffect(() => {
    setProducts(productsList);
  }, [productsList]);

  function handleFilter(value) {
    if (value === 'all') {
      setProducts(productsList);
    }
    if (value === 'discount') {
      setProducts([...productsList.filter((prod) => prod.discount > 0)]);
    }
    if (value === 'availability') {
      setProducts([...productsList.filter((prod) => prod.stockQuantity > 0)]);
    }
  }

  function handleSort(value) {
    setProducts((prods) => [
      ...prods.sort((a, b) => {
        switch (value) {
          case 'priceAsc':
            return a.price - b.price;
          case 'priceDesc':
            return b.price - a.price;
          case 'nameAsc':
            return a.title.localeCompare(b.title);
          case 'nameDesc':
            return b.title.localeCompare(a.title);
          case 'newToOld':
            return b.creationDate - a.creationDate;
          case 'oldToNew':
            return a.creationDate - b.creationDate;
          case 'highRate':
            return b.reviews.length - a.reviews.length;
          case 'lowRate':
            return a.reviews.length - b.reviews.length;
          default:
            return 0;
        }
      }),
    ]);
  }
  const categoriesPath = [
    {
      href: `/categories`,
      title: (
        <div className="flex gap-2 items-center">
          <FaShoppingBag />
          <span>Categories</span>
        </div>
      ),
    },
    {
      title: productPath.collectionName,
    },
  ];
  const storesPath = [
    {
      href: '/stores',
      title: (
        <div className="flex gap-2 items-center">
          <FaStore />
          <span>Stores</span>
        </div>
      ),
    },
    {
      title: productPath.collectionName,
    },
  ];
  return (
    outlet || (
      <div className="paddingX py-5 space-y-3 ">
        <Breadcrumb
          items={
            (productPath.base === 'categories' && [
              {
                href: '/',
                title: (
                  <div className="flex gap-2 items-center">
                    <FaHome />
                    <span>Home</span>
                  </div>
                ),
              },
              ...categoriesPath,
            ]) ||
            (productPath.base === 'stores' && [
              {
                href: '/',
                title: (
                  <div className="flex gap-2 items-center">
                    <FaHome />
                    <span>Home</span>
                  </div>
                ),
              },
              ...storesPath,
            ])
          }
        />
        <div className="flex gap-2">
          <Select
            defaultValue={'Filter By'}
            className="min-w-40"
            onChange={handleFilter}
            options={[
              {
                value: 'all',
                label: 'All',
              },
              {
                value: 'discount',
                label: 'Discount',
              },
              {
                value: 'availability',
                label: 'Available',
              },
            ]}
          />
          <Select
            defaultValue={'Sort By'}
            className="min-w-40"
            onChange={handleSort}
            options={[
              {
                value: 'priceAsc',
                label: 'Price - Low to High',
              },
              {
                value: 'priceDesc',
                label: 'Price - High to Low',
              },
              {
                value: 'nameAsc',
                label: 'Alphabetically - A to Z',
              },
              {
                value: 'nameDesc',
                label: 'Alphabetically -  Z to A',
              },
              {
                value: 'newToOld',
                label: 'Most Recent',
              },
              {
                value: 'oldToNew',
                label: 'Old Products',
              },
              {
                value: 'highRate',
                label: 'Highest Products',
              },
              {
                value: 'lowRate',
                label: 'Lowest Rates',
              },
            ]}
          />
        </div>

        <div className="media">
          {isLoading ? (
            Array(8)
              .fill()
              .map((_, index) => <SkeletonProdsCard key={index} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                path={`/products/${product.id}`}
                prodTitle={product.title}
                prodImg={product.images}
                prodPrice={product.price}
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    )
  );
}
