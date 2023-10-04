import React from "react";
import Link from "next/link";
import styles from "../style/index.module.css";

const ConcertItem = ({ item }) => {
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

  const url = "pages/concert/" + mt20id._text;

  return (
    <div className={styles.ConcertItemBlock}>
      {poster && (
        <div className={styles.thumbnail}>
          <Link href={url}>
            <img
              className={styles.thum_img}
              src={poster._text}
              alt="thumbnail"
            />
          </Link>
        </div>
      )}
      <div className={styles.contents}>
        <h2 className={styles.sub}>
          <Link className={styles.sublink} href={url}>
            {prfnm._text}
          </Link>
        </h2>
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
