import { useRouter } from "next/router";
import Link from "next/link";
import momentTz from "moment-timezone";
import style from "../style/header.module.css";

const Category = () => {
  const router = useRouter();
  const categories = [
    {
      id: "classic",
      name: "클래식(서울)",
      url: "/",
    },
    {
      id: "exhibition",
      name: "전시(서울)",
      url: "/exhibition/list",
    },
    {
      id: "festival",
      name: "페스티벌(전국)",
      url: "/festival/list",
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
            <div
              className={
                router.pathname === category.url
                  ? style.highLightCategory
                  : style.normalCategory
              }
            >
              {category.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Header = () => {
  let from = momentTz()
    .tz("Asia/Seoul")
    .endOf("week")
    .add(1, "d")
    .format("YYYY.MM.DD");
  let to = momentTz()
    .tz("Asia/Seoul")
    .endOf("week")
    .add(1, "d")
    .endOf("week")
    .format("YYYY.MM.DD");

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
