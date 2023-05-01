import CategoryItem from "./category-item.component";

export default function CategoryListContainer(props) {
  const listItems = props.categories.map(category => <CategoryItem key={category.id} category={category} />);
  return (
    <ul>{listItems}</ul>
  );
}