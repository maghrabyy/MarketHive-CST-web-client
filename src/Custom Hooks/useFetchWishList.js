import { auth, db } from '../firebase';
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useCustomerSnapshot } from './useFetchCustomer';

export const useFetchWishList = (productId) => {
  const customerId=auth.currentUser.uid
  const {customer,isLoading} = useCustomerSnapshot(customerId)
  const wishlistHandler = ()=>{
    if(customer.wishlist.includes(productId)){
      updateDoc(doc(db,"Customers",customerId),{
        wishlist:arrayRemove(productId)
      })
      }else{
        updateDoc(doc(db,"Customers",customerId),{
          wishlist:arrayUnion(productId)
        })
      }
  }
    
  const isAddedToWishlist=()=>{
    if(customer.wishlist.includes(productId)){
      return true ;
    }else{
      return false ;
    }

  }
  return {isAddedToWishlist,wishlistHandler,isLoading};
};

