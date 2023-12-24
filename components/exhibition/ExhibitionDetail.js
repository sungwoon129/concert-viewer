import axios from "axios";
import convert from "xml-js";
import Header from "../Header";
import Footer from "../Footer";
import usePromise from "@/lib/hooks/usePromise";
import Image from "next/image";
import Link from "next/link";
import style from "../../style/detail.module.css";
import Back from "../Back";
import Loader from "../Spinner";

const toJson = (xml) => {
  const jsonStr = convert.xml2json(xml.data, {
    compact: true,
    spaces: 4,
  });
  return JSON.parse(jsonStr);
};

const ExhibitionDetail = ({ itemId }) => {
  const [loading, response, error] = usePromise(() => {
    return axios.get(
      `/api/exhibition/detail?serviceKey=${process.env.NEXT_PUBLIC_EXHIBITIONKEY}&seq=${itemId}`
    );
  }, [itemId]);

  if (loading) {
    return (
      <>
        <div className={style.contentsWrap}>
          <Loader />
        </div>
        <Footer />
      </>
    );
  }
  if (error)
    return (
      <>
        <Header />
        <Back />
        <div>
          <p>데이터 로딩 중 에러가 발생하였습니다.</p>
        </div>
        <Footer />
      </>
    );

  if (response) {
    const jsonData = toJson(response);

    const {
      seq,
      title,
      startDate,
      endDate,
      place,
      realmName,
      area,
      subTitle,
      price,
      contents1,
      contents2,
      url,
      phone,
      imgUrl,
      placeUrl,
      placeAddr,
    } = jsonData.response.msgBody.perforInfo;

    return (
      <>
        <Back />
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
                <img
                  src={imgUrl._text}
                  className={style.poster}
                  onClick={() => {
                    if (url._text) return window.open(`${url._text}`, "_blank");
                    else
                      return window.open(
                        `https://www.google.com/search?q=${encodeURI(
                          title._text
                        )}`,
                        "_blank"
                      );
                  }}
                  alt="포스터 이미지"
                  sizes="210px"
                  width={300}
                  height={400}
                />
              </div>
              <div className={style.description}>
                <div>
                  <div className={style.title}>{title._text}</div>
                  <br />
                  <div>{subTitle._text}</div>
                </div>
                <div>
                  <div>
                    {startDate._text} - {endDate._text}
                  </div>
                  <div>{placeAddr._text}</div>
                </div>
                <div>{price._text}</div>
                <div>문의처 {phone._text}</div>
                <div className={style.linkWrap}>
                  <div>
                    <Link
                      href={placeUrl._text}
                      className={style.link}
                      target="_blank"
                    >
                      공연장 홈으로 이동
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.subImgBox}>
              {/* 프로덕션 서버 성능이 매우 좋지 않아 <Image> 가 로딩 속도가 확연히 느려 <img>로 변경 */}
              <img
                src={imgUrl._text}
                alt="기타 이미지"
                width={180}
                className="subIgg"
              />

              {/* <Image
                src={imgUrl._text}
                alt="기타 이미지"
                layout="fill"
                sizes="180px"
                className="subImg"
              /> */}
            </div>
          </>
        )}
        <Footer />
      </>
    );
  }
};

export default ExhibitionDetail;
