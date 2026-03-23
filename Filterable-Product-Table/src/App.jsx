import { useState } from "react";
const data = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
function SearchBar({ onFilter, onCheck }) {
  return (
    <div className="search">
      <input
        type="text"
        name="filter-product"
        onChange={(e) => {
          onFilter(e.target.value);
        }}
      />
      <div>
        <input
          type="checkbox"
          name="isStocked"
          id="stocked"
          onChange={(e) => {
            onCheck(e.target.checked);
          }}
        />
        <label htmlFor="stocked">Only show stocked products</label>
      </div>
    </div>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}> {product.name}</span>
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
  let previousCategory = null;
  let rows = [];
  products.forEach((product) => {
    if (previousCategory !== product.category)
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={`${product.category}${product.name}`}
        />,
      );

    rows.push(<ProductRow product={product} key={product.name} />);

    previousCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default function FilterableProductTable() {
  const [filter, setFilter] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  let items = data.filter((x) => x.name.toLowerCase().includes(filter));
  if (isChecked) {
    items = items.filter((x) => x.stocked);
  }
  function handleFilter(name) {
    setFilter(name);
  }

  return (
    <div className="container">
      <SearchBar onCheck={setIsChecked} onFilter={handleFilter} />
      <ProductTable products={items} />
    </div>
  );
}
