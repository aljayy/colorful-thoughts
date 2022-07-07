import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Categories.module.scss";
import { commerce } from "../../Auth/commerce";
import PageLoader from "../../Components/Loaders/PageLoader/PageLoader";

function Categories() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const path = location.pathname[1].toUpperCase() + location.pathname.slice(2);

  console.log(path);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await commerce.categories.retrieve(path.toLowerCase(), {
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
      setLoading(false);
    }
    fetchData();
  }, [path]);

  return (
    <section className={styles.category}>
      {(categories.length < 1 && <PageLoader />) || (loading && <PageLoader />)}
      {categories.length >= 1 && !loading && (
        <>
          <h2 className={styles["category-h2"]}>{path}</h2>
          {categories.map((category) => {
            return (
              <Link
                to={`/${path.toLowerCase()}/${category.name.toLowerCase()}`}
                style={{ textDecoration: "none" }}
              >
                <h3 className={styles["category-h3"]}>{category.name}</h3>
              </Link>
            );
          })}
        </>
      )}
    </section>
  );
}

export default Categories;
