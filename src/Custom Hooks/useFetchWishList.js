import { auth, db } from '../firebase';
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useCustomerSnapshot } from './useFetchCustomer';
import toast, {  useToasterStore } from "react-hot-toast";
import { useEffect } from "react";

export const useFetchWishList = (productId) => {
  const notify = (text,icon="") =>{ 
    if(icon==""){
      toast.success(text)
    }else{
      toast(text,{icon:icon})
    }
 };
  const TOAST_LIMIT = 3;
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);



  const customerId=auth.currentUser.uid
  const {customer,isLoading} = useCustomerSnapshot(customerId)
  const wishlistHandler = ()=>{
    if(customer.wishlist.includes(productId)){
      updateDoc(doc(db,"Customers",customerId),{
        wishlist:arrayRemove(productId)
      })
      notify("item removed from wishlist",'🗑')
 
    }else{
        updateDoc(doc(db,"Customers",customerId),{
          wishlist:arrayUnion(productId)
        })
        notify("Item aded to wishlist")

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

