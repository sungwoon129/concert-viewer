import { useRouter } from "next/router";

const ClassicItem = ({ item }) => {
  return <></>;
};

const FestivalItem = ({ item }) => {
  return <></>;
};

const ExhibitionItem = ({ item }) => {
  return <></>;
};

const Detail = () => {
  const router = useRouter();
  const category = router.query;
  console.log(category);

  if (category === null || category === undefined)
    return <p>불러올 데이터가 존재하지 않습니다.</p>;

  {
    category === "classic" && <ClassicItem></ClassicItem>;
  }
  {
    category === "exhibition" && <ExhibitionItem></ExhibitionItem>;
  }
  {
    category === "festival" && <FestivalItem></FestivalItem>;
  }
};

export default Detail;
