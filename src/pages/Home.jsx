import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Paginations from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };

  useEffect(() => {
    setIsLoader(true);
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    fetch(
      `https://6298b336f2decf5bb749749e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoader(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items
  
    .filter((obj) => {
      if (
        obj.title.toString().toLowerCase().includes(searchValue.toString().toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .map((obj) => (
      <PizzaBlock
        key={obj.id}
        {...obj}
      />
    ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          ChangeCategory={ChangeCategory}
        />
        <Sort  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoader ? skeletons : pizzas}</div>
      <Paginations onChangePage={(number) => setCurrentPage(number)}/>
    </div>
  );
}
export default Home;
