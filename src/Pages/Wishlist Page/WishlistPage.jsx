import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { useFetchWishList } from '../../Custom Hooks/useFetchWishList';
import { CustomersReviews } from './../../Components/ProductDetails-comp/CustomersReviews';
import { auth, db } from '../../firebase';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../Components/EcommerceCards';
import { useCustomerSnapshot } from '../../Custom Hooks/useFetchCustomer';

function WishlistPage() {
  const { customer, isLoading } = useCustomerSnapshot(auth.currentUser.uid);
console.log(customer.wishlist);

  return <div>      
    <div className="paddingX space-y-2 py-4">
    <div className="media">
   {isLoading?<>loooooooooooooooooood</>:
   customer.wishlist.map((item,index)=><WishlistItem key={index} id={item}></WishlistItem>

  
    )
   }
   </div>
   </div>
  </div>;
}

export default WishlistPage;




function WishlistItem({id}){
  const { product, isProductLoading}=useFetchProduct(id)
  console.log(product);
  
  return (
    <>{
      isProductLoading?<div>lllllllllllllllllllllllllllllllll</div>:<ProductCard product={product} ></ProductCard>

    }
    </>
  )
}

