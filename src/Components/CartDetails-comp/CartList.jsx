import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { Select } from 'antd';

export default function CartList({ cartItems, setCartItems }) {
  const updateQuantity = async (itemId, newQuantity, prodPrice) => {
    const itemRef = doc(db, 'ShoppingCart', itemId);
    const newSubtotal = prodPrice * newQuantity;

    await updateDoc(itemRef, { quantity: newQuantity, subTotal: newSubtotal });

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, subTotal: newSubtotal }
          : item,
      ),
    );
  };

  const removeItem = async (itemId) => {
    await deleteDoc(doc(db, 'ShoppingCart', itemId));
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <CartItem
          key={item.prodId}
          item={item}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
}

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const { product, store } = useFetchProduct(item.prodId);

  return (
    <div className="flex flex-col lg:flex-row items-center bg-white shadow p-4 rounded-md">
      <img
        className="w-48  rounded-md object-cover"
        src={product.images}
        alt={product.title}
      />
      <div className="flex-grow lg:ml-6">
        <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-gray-500">Store: {store.name}</p>
        <p className="text-gray-500">Price: ${product.price}</p>
        <div className="mt-2">
          <Select
            defaultValue={item.quantity}
            style={{
              width: 120,
            }}
            onChange={(newQuantity) =>
              updateQuantity(item.id, newQuantity, product.price)
            }
            options={Array.from(
              { length: product.stockQuantity },
              (_, i) => i,
            ).map((i) => ({ value: i + 1, label: i + 1 }))}
          />
        </div>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-600 lg:ml-6 mt-4 lg:mt-0"
      >
        Remove
      </button>
    </div>
  );
};
