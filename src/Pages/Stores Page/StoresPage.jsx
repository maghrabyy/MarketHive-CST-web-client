import { CollectionCard } from '../../Components/EcommerceCards.jsx';
import { SkeletonCollectionCard } from '../../Components/EcommerceCards.jsx';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { Select } from 'antd';
import { useOutlet } from 'react-router-dom';
import { EmptyList } from '../../Components/EmptyList.jsx';

export default function StoresPage() {
  const [StoresList, setStoresList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [filterStores, setFilterStores] = useState([]);
  const [isStoresLoading, setIsStoresLoading] = useState(true);
  const [getAll, setGetAll] = useState(false);
  const outlet = useOutlet();
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
  const handleSortBy = async (e) => {
    try {
      const filterData = [];
      let orderby = 'desc';
      let fieldName = '';

      if (e == 'OldToNew' || e == 'NewToOld') fieldName = 'creationDate';
      if (e == 'most' || e == 'leastProducts') fieldName = 'productsCount';
      if (e == 'leastProducts' || e == 'NewToOld') orderby = 'asc';

      const productsCollection = collection(db, 'Stores');
      const q = query(productsCollection, orderBy(fieldName, orderby));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        filterData.push(...StoresList.filter((store) => store.id == doc.id));
        setStoresList(filterData);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    outlet || (
      <div className="paddingX space-y-2 py-4">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            <Select
              className="min-w-36"
              onChange={(e) => {
                handleSelectChange(e);
              }}
              showSearch
              placeholder="Category"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
              className=" min-w-36"
              onChange={(e) => {
                handleStoresChange(e);
              }}
              showSearch
              placeholder="Search Stores"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: 'all', label: 'All' },
                ...filterStores.map((store) => ({
                  value: store.name,
                  label: store.name,
                })),
              ]}
            />
          </div>
          <Select
            className="min-w-36"
            defaultValue="Sort By"
            onChange={(e) => {
              handleSortBy(e);
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
              {
                value: 'most',
                label: 'Most Products',
              },
              {
                value: 'leastProducts',
                label: 'Least Products ',
              },
            ]}
          />
        </div>

        {isStoresLoading ? (
          Array(8)
            .fill()
            .map((_, index) => <SkeletonCollectionCard key={index} />)
        ) : StoresList.length > 0 ? (
          <div className="media">
            {StoresList.map((store) => (
              <CollectionCard
                key={store.id}
                path={`/stores/${store.id}`}
                prodImg={store.logo}
                prodTitle={store.name}
                contain
              />
            ))}
          </div>
        ) : (
          <EmptyList type="stores" />
        )}
      </div>
    )
  );
}
