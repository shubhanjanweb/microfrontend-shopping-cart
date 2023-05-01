export default function CategoryItem(props) {
  return (
    <li><a href={'/dashboard/category/' + props.category.id}>{props.category.categoryName}</a></li>
  );
}