import style from "../style/back.module.css";

const Back = () => {
  return (
    <div className={style.btnWrap}>
      <div className={style.backBtn} onClick={() => history.back()}>
        뒤로가기
      </div>
    </div>
  );
};

export default Back;
