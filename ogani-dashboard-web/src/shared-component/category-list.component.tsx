import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import CategoryListContainer from "./category-list-container.component";

export default function CategoryList(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.getCategoryList().then(rsp => {
      setCategories(rsp.data);
    });
  }, []);
  return (
    <CategoryListContainer categories={categories} />
  );
}