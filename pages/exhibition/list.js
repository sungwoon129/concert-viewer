import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useObserver } from "../../lib/hooks/useObserver";
import style from "../../style/index.module.css";
import convert from "xml-js";
import moment from "moment";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ExhibitionItem from "@/components/exhibition/ExhibitionItem";

const initPage = 1;
const initOffset = 9;
let from = moment().endOf("week").add(1, "d").format("YYYYMMDD");
let to = moment().endOf("week").add(1, "d").endOf("week").format("YYYYMMDD");

const getExhibitionList = ({ pageParam = initPage }) =>
  axios
    .get(
      `${process.env.NEXT_PUBLIC_URL}/api/exhibition?serviceKey=${process.env.NEXT_PUBLIC_EXHIBITIONKEY}&sido=서울&from=${from}&to=${to}&place=1&cPage=${pageParam}&rows=9&sortStdr=1`
    )
    .then((response) => {
      const result = convert.xml2json(response.data, {
        compact: true,
        spaces: 4,
      });

      const jsonData = JSON.parse(result);
      const { totalCount, perforList } = jsonData.response.msgBody;
      const { comMsgHeader } = jsonData.response;

      return {
        list: perforList,
        cPage: pageParam,
        total: totalCount,
        header: comMsgHeader,
      };
    });

const ExhibitionList = () => {
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage("exhibition_list_scroll", 0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("exhibitionList", getExhibitionList, {
    getNextPageParam: (lastPage) => {
      const { cPage, total } = lastPage;
      if (total < cPage * 9) return false;

      return Number(cPage) + 1;
    },
  });

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    ref: true,
    target: bottom,
    onIntersect,
  });

  useEffect(() => {
    if (scrollY !== "0") window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <>
      <Header />
      <div className={style.ConcertListBlock}>
        {status === "loading" && <p>불러오는 중</p>}

        {status === "error" && <p>{error.message}</p>}

        {status === "success" && (
          <div className={style.ConcertListBlock}>
            {data.pages.map((page) =>
              page.list.map((item) => (
                <ExhibitionItem key={item.seq._text} item={item} />
              ))
            )}
          </div>
        )}

        <div ref={bottom} />

        {isFetchingNextPage && <p>계속 불러오는 중</p>}
      </div>
      <Footer />
    </>
  );
};

export default ExhibitionList;
