import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { CollectionCard } from '../../Components/EcommerceCards';
import { useOutlet } from 'react-router-dom';
import { SkeletonCollectionCard } from '../../Components/EcommerceCards';

function CategoriesPage() {
  const outlet = useOutlet();
  const [categories, setCategories] = useState([]);
  const [isCatsLoading, setCatsLoading] = useState(true);
  const catData = [];
  const fetchCategories = async () => {
    try {
      const categorySnapshot = await getDocs(collection(db, 'Categories'));
      categorySnapshot.forEach((category) => {
        catData.push({ ...category.data(), id: category.id });
      });
      setCatsLoading(false);
      setCategories(catData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    outlet || (
      <div className="paddingX space-y-2 py-4">
        <div className="media">
          {isCatsLoading ? (
            Array(8)
              .fill()
              .map((_, index) => <SkeletonCollectionCard key={index} />)
          ) : categories.length > 0 ? (
            categories.map((cat) => {
              return (
                <CollectionCard
                  key={cat.id}
                  path={`/categories/${cat.id}`}
                  prodImg={cat.categoryImage}
                  prodTitle={cat.categoryName}
                  cover
                />
              );
            })
          ) : (
            <p>No categories available.</p>
          )}
        </div>
      </div>
    )
  );
}

export default CategoriesPage;
