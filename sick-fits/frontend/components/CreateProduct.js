import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'initial name',
    price: 1234,
    description: 'initial description',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await createProduct();
        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            onChange={handleChange}
            type="file"
            id="image"
            name="image"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            value={inputs.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            value={inputs.price}
            onChange={handleChange}
            type="number"
            id="price"
            name="price"
            placeholder="Price"
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            value={inputs.description}
            onChange={handleChange}
            id="description"
            name="description"
            placeholder="Description"
          />
        </label>
      </fieldset>
      <button type="submit">+ Add Product</button>
    </Form>
  );
}
