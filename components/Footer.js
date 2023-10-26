import momentTz from "moment-timezone";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        · 집계기간 : 최종집계 {momentTz().tz("Asia/Seoul").format("YYYY-MM-DD")}
        <br></br>· 집계대상 : 모든 공연 데이터 전송기관
        <br></br>· 아래 집계 데이터는 공연예술통합전산망 연계기관의
        티켓판매시스템에서 발권된 분량을 기준으로 제공함으로 해당 공연의 전체
        관객 수와 차이가 있을 수 있습니다
        <br></br>· Api 인증키는 신청 직후 기재된 이메일 주소로 발급됩니다.
        인증키 사용 유효기간은 발급일로부터 1년으로 자동 설정되어 있으며, 3개월
        이상 미사용시 사용 승인이 취소됩니다. 유효기간 만료 또는 승인 취소 관련
        안내는 kopis@gokams.or.kr 메일로 발송되며, 유효기간 연장 희망시 해당
        메일로 신청해 주시기 바랍니다.
      </p>
    </div>
  );
};

export default Footer;
