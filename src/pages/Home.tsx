import { useEffect, useContext, useRef } from "react";
import qs from "qs";
import { useNavigate, Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Paginations from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { list } from "../components/Sort";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage , searchValue} = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  // const categoryId = useSelector((state) => state.filter.categoryId);
  // const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const ChangeCategory = (id:number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    // fetch(
    //   `https://6298b336f2decf5bb749749e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoader(false);
    //   });

    // await axios
    //   .get(
    //     `https://6298b336f2decf5bb749749e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoader(false);
    //   })
    // .catch((err) => {
    //   setIsLoader(false);
    // })

    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
    isSearch.current = true;
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items

    .filter((obj: any) => {
      if (
        obj.title
          .toString()
          .toLowerCase()
          .includes(searchValue.toString().toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .map((obj: any) => (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock key={obj.id} {...obj} />
      </Link>
    ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} ChangeCategory={ChangeCategory}  />
        <Sort />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            ?????????????????? ????????????<span>????</span>
          </h2>
          <p>
            ?? ????????????????, ?????????????????? ???????????????? ??????????.
            <br />
            ???????????????????? ?????????????????? ?????????????? ??????????
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Paginations currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
export default Home;
