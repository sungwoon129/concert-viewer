import Link from "next/link";
import moment from "moment";
import style from "../style/header.module.css";

const Category = () => {
  const categories = [
    {
      id: "01",
      name: "클래식(서울)",
    },
    {
      id: "02",
      name: "전시(서울)",
    },
    {
      id: "03",
      name: "페스티벌(전국)",
    },
  ];

  return (
    <div className={style.categoryBlock}>
      {categories.map((category, idx) => {
        return (
          <Link href={category.id} key={idx} className={style.categoryLink}>
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
