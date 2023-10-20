import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useObserver } from "../../lib/hooks/useObserver";
import ConcertItem from "../../components/classic/ConcertItem";
import style from "../../style/index.module.css";
import convert from "xml-js";
import moment from "moment";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Spinner";

const initPage = 1;
const initOffset = 9;
let from = moment().endOf("week").add(1, "d").format("YYYYMMDD");
let to = moment().endOf("week").add(1, "d").endOf("week").format("YYYYMMDD");

const getFestivalList = ({ pageParam = initPage }) =>
  axios
    .get(
      `/api/festival?service=${process.env.NEXT_PUBLIC_CONCERTKEY}&stdate=${from}&eddate=${to}&cpage=${pageParam}&rows=9&prfstate=01,02&signgucode=`
    )
    .then((response) => {
      const result = convert.xml2json(response.data, {
        compact: true,
        spaces: 4,
      });
      const jsonData = JSON.parse(result);

      const list = Array.isArray(jsonData.dbs.db)
        ? jsonData.dbs.db
        : [jsonData.dbs.db];

      return {
        list,
        cPage: pageParam,
      };
    });

const FestivalList = () => {
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage("festival_list_scroll", 0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("festivalList", getFestivalList, {
    getNextPageParam: (lastPage) => {
      const { cPage, list } = lastPage;

      if (list.length < 9) return undefined;

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
        {status === "loading" && <Loader />}

        {status === "error" && <p>{error.message}</p>}

        {status === "success" && (
          <div className={style.ConcertListBlock}>
            {data.pages.map((page) =>
              page.list.map((item) => (
                <ConcertItem
                  key={item.mt20id._text}
                  item={item}
                  category="festival"
                />
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

export default FestivalList;
