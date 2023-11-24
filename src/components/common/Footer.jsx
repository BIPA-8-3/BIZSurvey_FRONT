import style from"../../style/Footer.module.css"
import '../../style/Common.css'
import logo from '../../assets/img/logo.png'

function Footer(){
    return(
        <div id={style.mainFooter}>
            <div id={style.footerItemWrap}>
                <div className={style.footerLogoWrap}>
                    <a className="pointer"><img src={logo} alt="logo" className={style.logo} /></a>
                    {/* <div>
                        <span></span>
                        <span></span>
                    </div> */}
                </div>
                <ul>
                    <li>비즈서베이</li>
                    <li>오피스 | 부산광역시 수영구 수영로 112번길 4층 비즈서베이</li>
                    <li className="textBold">
                        <a className="pointer">이용약관</a> | <a className="pointer">개인정보보호정책</a>
                    </li>
                </ul>
                <div className={style.coryright}>
                    Copyright 2023. BIZSURVEY. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer;