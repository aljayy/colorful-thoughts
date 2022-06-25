import React, { useEffect, useState } from "react";
import Spacer from "../../Components/Spacer/Spacer";
import styles from "./Categories.module.scss";
import { commerce } from "../../Auth/commerce";
import PageLoader from "../../Components/Loaders/PageLoader/PageLoader";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const response = await commerce.categories.retrieve("categories", {
      type: "slug",
    });

    setCategories(
      response.children
        .map((category) => {
          return {
            name: category.name,
            id: category.id,
          };
        })
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }

          return 0;
        })
    );
  }, []);

  console.log(categories);
  return (
    <Spacer>
      {categories.length < 1 && <PageLoader />}
      {categories.length >= 1 && (
        <>
          <h2 className={styles["category-h2"]}>Categories</h2>
          {categories.map((category) => {
            return <h3 className={styles["category-h3"]}>{category.name}</h3>;
          })}
        </>
      )}
    </Spacer>
  );
}

export default Categories;
