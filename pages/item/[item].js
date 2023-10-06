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
  const { category } = router.query;

  if (category === null || category === undefined)
    return <p>불러올 데이터가 존재하지 않습니다.</p>;

  {
    category.id === "01" && <ClassicItem></ClassicItem>;
  }
  {
    category.id === "02" && <ExhibitionItem></ExhibitionItem>;
  }
  {
    category.id === "03" && <FestivalItem></FestivalItem>;
  }
};

export default Detail;
