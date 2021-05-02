import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'initial name',
    price: 1234,
    description: 'initial description',
  });
  return (
    <form>
      <label htmlFor="name">
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
        <input
          value={inputs.price}
          onChange={handleChange}
          type="number"
          id="price"
          name="price"
          placeholder="Price"
        />
      </label>
      <button onClick={clearForm} type="button">
        Clear Form
      </button>
      <button onClick={resetForm} type="button">
        Reset Form
      </button>
    </form>
  );
}
