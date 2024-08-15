import { useOutlet } from 'react-router-dom';

export default function ProductsPage() {
  const outlet = useOutlet();
  return outlet || <div>Products</div>;
}
