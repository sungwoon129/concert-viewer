import ConcertItemAndFestivalDetail from "@/components/ConcertAndFestivalDetail";
import ExhibitionDetail from "@/components/exhibition/ExhibitionDetail";
import { useRouter } from "next/router";

const Detail = () => {
  const router = useRouter();
  const { item, category } = router.query;

  return (
    <>
      {(category === "classic" || category === "festival") && (
        <ConcertItemAndFestivalDetail
          itemId={item}
        ></ConcertItemAndFestivalDetail>
      )}
      {category === "exhibition" && (
        <ExhibitionDetail itemId={item}></ExhibitionDetail>
      )}
    </>
  );
};

export default Detail;
