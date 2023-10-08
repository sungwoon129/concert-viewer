import React from "react";
import Link from "next/link";
import styles from "../../style/index.module.css";

const ConcertItem = ({ item, category }) => {
  const {
    mt20id,
    prfnm,
    prfpdfrom,
    prfpdto,
    fcltynm,
    poster,
    genrenm,
    prfstate,
    openrun,
  } = item;

  const url = "/item/" + mt20id._text;

  return (
    <div className={styles.ConcertItemBlock}>
      {poster && (
        <div className={styles.thumbnail}>
          <Link href={{ pathname: url, query: { category } }}>
            <img
              className={styles.thum_img}
              src={poster._text}
              alt="thumbnail"
            />
          </Link>
        </div>
      )}
      <div className={styles.contents}>
        <h3 className={styles.sub}>{prfnm._text}</h3>
        <div>
          {prfpdfrom._text} - {prfpdto._text}
        </div>
        <div>{fcltynm._text}</div>
        <p>{genrenm._text}</p>
        <p>
          <b>{prfstate._text}</b>
        </p>
      </div>
    </div>
  );
};

export default ConcertItem;
