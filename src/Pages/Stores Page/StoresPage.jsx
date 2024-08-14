import './style.css';
import { HomeSection } from '../../Components/Homepage-comp/HomeSection.jsx';
import { CollectionCard } from '../../Components/EcommerceCards.jsx';
import { SkeletonCollectionCard } from '../../Components/EcommerceCards.jsx';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { Card, Select } from 'antd';
import Meta from 'antd/es/card/Meta.js';
import { async } from '@firebase/util';
export default function StoresPage() {
  const [StoresList, setStoresList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [filterStores, setFilterStores] = useState([]);
  const [isStoresLoading, setIsStoresLoading] = useState(true);
  const [getAll, setGetAll] = useState(false);

  const handleSelectChange = async (e) => {
    try {
      if (e == 'all') {
        setGetAll(!getAll);
      } else {
        const filterData = [];
        const q = query(collection(db, 'Stores'), where('categoryId', '==', e));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          filterData.push({ id: doc.id, ...doc.data() });
        });
        setStoresList(filterData);
        setFilterStores(filterData);

        console.log(filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStoresChange = async (e) => {
    try {
      if (e == 'all') {
        setStoresList(filterStores);
      } else {
        const filterData = [];
        const q = query(collection(db, 'Stores'), where('name', '==', e));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          filterData.push({ id: doc.id, ...doc.data() });
        });
        setStoresList(filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //===Old&NewStores=======//
  const handleNewOldStores = async (e) => {
    try {
      const filterData = [];
      let orderby = 'desc';
      if (e == 'OldToNew') orderby = 'asc';
      const productsCollection = collection(db, 'Stores');
      const q = query(productsCollection, orderBy('creationDate', orderby));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        filterData.push(...StoresList.filter((store) => store.id == doc.id));
        setStoresList(filterData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //===Most&RecentProducts=======//
  const handleMostRecentProd = async (e) => {
    try {
      const filterData = [];
      let orderby = 'desc';
      if (e == 'recent') orderby = 'asc';
      const productsCollection = collection(db, 'Stores');
      console.log(productsCollection);
      const q = query(productsCollection, orderBy('productsCount', orderby)); // Sort by most products
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data().productsCount);
        filterData.push(...StoresList.filter((store) => store.id == doc.id));
        setStoresList(filterData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storeCategories = [];
        const categoriesSnapshot = await getDocs(collection(db, 'Categories'));
        categoriesSnapshot.forEach((category) => {
          storeCategories.push({ ...category.data(), id: category.id });
        });
        setCategoryList(storeCategories);
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
        setStoresList(storeData);
        setFilterStores(storeData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
    fetchCategories();
  }, [getAll]);
  return (
    <div className="container mx-auto">
      <div className="mt-10 ">
        <Select
          style={{ width: 110 }}
          onChange={(e) => {
            handleSelectChange(e);
          }}
          showSearch
          placeholder="Category"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: 'all', label: 'All' },
            ...CategoryList.map((category) => ({
              value: category.id,
              label: category.categoryName,
            })),
          ]}
        />
        {/* Filter By Stores */}
        <Select
          className=" ml-5 "
          style={{ width: 110 }}
          onChange={(e) => {
            handleStoresChange(e);
          }}
          showSearch
          placeholder="Stores"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: 'all', label: 'All' },
            ...filterStores.map((store) => ({
              value: store.name,
              label: store.name,
            })),
          ]}
        />
        <Select
          className=" ml-5 "
          defaultValue="Modified"
          style={{
            width: 120,
          }}
          onChange={(e) => {
            handleNewOldStores(e);
          }}
          options={[
            {
              value: 'NewToOld',
              label: 'New to Old',
            },
            {
              value: 'OldToNew',
              label: 'Old to New',
            },
          ]}
        />
        <Select
          className=" ml-5 "
          defaultValue="Modified"
          style={{
            width: 120,
          }}
          onChange={(e) => {
            handleMostRecentProd(e);
          }}
          options={[
            {
              value: 'most',
              label: 'Most',
            },
            {
              value: 'recent',
              label: 'Recent',
            },
          ]}
        />
      </div>

      <HomeSection className="pt-0 m-0">
        {isStoresLoading
          ? Array.from(Array(4)).map((_, index) => (
              <SkeletonCollectionCard key={index} />
            ))
          : StoresList.map((store) => {
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
    </div>
  );
}
