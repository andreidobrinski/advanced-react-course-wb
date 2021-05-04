import { useRouter } from 'next/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function ProductsPage() {
  const { query } = useRouter();

  return (
    <div>
      <Pagination page={query.page || 1} />
      <Products />
      <Pagination page={query.page || 1} />
    </div>
  );
}
