import axios from "axios";
import convert from "xml-js";
import Header from "./Header";
import Footer from "./Footer";
import usePromise from "@/lib/hooks/usePromise";
import Image from "next/image";
import style from "../style/detail.module.css";

const toJson = (xml) => {
  const jsonStr = convert.xml2json(xml.data, {
    compact: true,
    spaces: 4,
  });
  return JSON.parse(jsonStr);
};

const ConcertItemAndFestivalDetail = ({ itemId }) => {
  const [loading, response, error] = usePromise(() => {
    return axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/classic_and_festival/${itemId}?service=${process.env.NEXT_PUBLIC_CONCERTKEY}`
    );
  }, [itemId]);

  if (loading) {
    return (
      <>
        <Header />
        <div>
          <p>로딩중...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!response) return null;
  if (error)
    return (
      <>
        <Header />
        <div>
          <p>데이터 로딩 중 에러가 발생하였습니다.</p>
        </div>
        <Footer />
      </>
    );

  const jsonData = toJson(response);

  const {
    poster,
    prfnm,
    prfpdfrom,
    prfpdto,
    fcltynm,
    prfcrew,
    prfruntime,
    prfage,
    entrpsnm,
    sty,
    area,
    mt210,
    genrenm,
    openrun,
    prfstate,
    styurls,
    dtguidance,
    pcseguidance,
    prfcast,
  } = jsonData.dbs.db;

  console.log(styurls);
  return (
    <>
      <Header />
      {loading && (
        <div>
          <p>로딩중...</p>
        </div>
      )}
      {error && (
        <div>
          <p>데이터 호출에 실패하였습니다.</p>
        </div>
      )}
      {response && (
        <>
          <div className={style.contentsWrap}>
            <div className={style.imgBox}>
              <Image
                src={poster._text}
                alt="포스터 이미지"
                sizes="210px"
                width={300}
                height={400}
              />
            </div>
            <div className={style.description}>
              <div>{prfnm._text}</div>
              <div>
                기간 : {prfpdfrom._text} - {prfpdto._text}
              </div>
              <div>시간 : {dtguidance._text}</div>
              <div>장소 : {fcltynm._text}</div>
              <div>지역 : {area._text}</div>
              <div>가격 : {pcseguidance._text}</div>
              <div>런타임 : {prfruntime._text}</div>
              <div>관람연령제한 : {prfage._text}</div>
              <div>{prfstate._text}</div>
              <div>출연진 : {prfcast._text}</div>
              <div>오픈런 : {openrun._text}</div>
            </div>
          </div>
          <div className={style.subImgBox}>
            <Image
              src={styurls.styurl._text}
              alt="기타 이미지"
              layout="fill"
              sizes="180px"
              className="subImg"
            />
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default ConcertItemAndFestivalDetail;
