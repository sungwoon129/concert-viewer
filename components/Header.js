import Link from "next/link";
import moment from "moment";
import style from "../style/header.module.css";

const Category = () => {
  const categories = [
    {
      id: "classic",
      name: "클래식(서울)",
      url: "/",
    },
    {
      id: "exhibition",
      name: "전시(서울)",
      url: "exhibition/list",
    },
    {
      id: "festival",
      name: "페스티벌(전국)",
      url: "festival/list",
    },
  ];

  return (
    <div className={style.categoryBlock}>
      {categories.map((category) => {
        return (
          <Link
            href={category.url}
            key={category.id}
            className={style.categoryLink}
          >
            <div className={style.category}>{category.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

const Header = () => {
  let from = moment().endOf("week").add(1, "d").format("YYYYMMDD");
  let to = moment().endOf("week").add(1, "d").endOf("week").format("YYYYMMDD");

  return (
    <>
      <div className={style.periodBox}>
        조회 기간 : {from} ~ {to}
      </div>
      <Category />
    </>
  );
};

export default Header;
