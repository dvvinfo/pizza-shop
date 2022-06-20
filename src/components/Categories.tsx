
type CategoriesProps = {
  value:number;
  ChangeCategory: (i:number) => void;

};
const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
const Categories:React.FC<CategoriesProps>=({ value, ChangeCategory }) => {
  

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => ChangeCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories