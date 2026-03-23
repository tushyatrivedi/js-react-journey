function SearchBar() {
  return (
    <div>
      <input type="text" />
      <label htmlFor="stocked">Only show stocked products</label>
      <input type="checkbox" name="isStocked" id="stocked" />
    </div>
  );
}

function ProductRow({ product }) {
  const name = stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}> product.name</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductTable({ products }) {
  return (
    <table>
      <thead>
        <th>Product</th>
        <th>Price</th>
      </thead>
      <tbody>
        {/* products.forEach((element) => {
        
      }); */}
      </tbody>
    </table>
  );
}

export default function FilterableProductTable() {
  const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  ];

  return (
    <div>
      <SearchBar />
      <ProductTable />
    </div>
  );
}
