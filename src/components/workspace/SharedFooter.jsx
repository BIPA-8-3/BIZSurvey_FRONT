import style from "../../style//workspace/SharedFooter.module.css";
import "../../style/Common.css";
import logo from "../../assets/img/logo.png";

function SharedFooter() {
  return (
    <div id={style.mainFooter}>
      <div id={style.footerItemWrap}>
        <div className={style.footerLogoWrap}>
          <a className="pointer">
            <img src={logo} alt="logo" className={style.logo} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SharedFooter;
