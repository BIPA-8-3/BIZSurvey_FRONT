// Header.jsx
import React from 'react';
import style from"../../style/community/Table.module.css"
import IconWithText from '../common/IconWithText';
import logo from "../../assets/img/avatar.png"
import { CiMemoPad } from "react-icons/ci";
import { Link } from 'react-router-dom';

function CommunityTable() {
  return (
    <div>
        <table className={style.communityTable}>
            <thead className={style.thead}>
                <tr>
                    <th style={{width:'10%'}}>번호</th>
                    <th >제목</th>
                    <th style={{width:'10%'}}>작성자</th>
                    <th style={{width:'10%'}}>조회수</th>
                    <th style={{width:'10%'}}>등록일</th>
                </tr>
            </thead>
            <tbody style={{textAlign:'center'}} className={style.tbody}>
                <tr>
                    <td style={{width:'10%'}}>1</td>
                    <td >
                        <span className={style.best}>[Best]</span>
                        <Link to={'/communityDetail'}>비즈서베이의 커뮤니티 게시글:)</Link>
                        <span className={style.comment}>[52]</span>
                        <span className={style.new}>new</span>
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>2</td>
                    <td >
                        <span className={style.best}>[Best]</span>
                        <Link to={'/communityDetail'}>아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ</Link>
                        <span className={style.comment}>[154]</span>
                        <span className={style.vote}>
                            <IconWithText className='item1' text={'투표'} fontsize={'12px'} fontweight={'700'} fontcolor={'#fff'}>
                                <CiMemoPad />
                            </IconWithText>
                        </span>
                        <span className={style.new}>new</span>
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>3</td>
                    <td >
                        <span className={style.best}>[Best]</span>
                        <Link to={'/communityDetail'}>아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ</Link>
                        <span className={style.comment}>[154]</span>
                        <span className={style.new}>new</span>
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>4</td>
                    <td >
                        <Link to={'/communityDetail'}>비즈서베이의 커뮤니티 게시글:)</Link>
                        <span className={style.comment}>[52]</span>
                        <span className={style.new}>new</span>
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>5</td>
                    <td>
                        <span className={style.best}>[Best]</span>
                        <Link to={'/communityDetail'}>아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ</Link>
                        <span className={style.comment}>[154]</span>
                    <span className={style.vote}>
                        <IconWithText className='item1' text={'투표'} fontsize={'12px'} fontweight={'700'} fontcolor={'#fff'}>
                            <CiMemoPad />
                        </IconWithText>
                    </span>
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>6</td>
                    <td >아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ<span className={style.comment}>[154]</span></td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>7</td>
                    <td >비즈서베이의 커뮤니티 게시글:)<span className={style.comment}>[52]</span></td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>8</td>
                    <td >아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ<span className={style.comment}>[154]</span>
                    
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>9</td>
                    <td >아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ<span className={style.comment}>[154]</span></td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>10</td>
                    <td >비즈서베이의 커뮤니티 게시글:)<span className={style.comment}>[52]</span>
                    <span className={style.vote}>
                        <IconWithText className='item1' text={'투표'} fontsize={'12px'} fontweight={'700'} fontcolor={'#fff'}>
                            <CiMemoPad />
                        </IconWithText>
                    </span>
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>6</td>
                    <td >아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ<span className={style.comment}>[154]</span></td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>7</td>
                    <td >비즈서베이의 커뮤니티 게시글:)<span className={style.comment}>[52]</span></td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>8</td>
                    <td >아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ<span className={style.comment}>[154]</span>
                    
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>9</td>
                    <td >아무말이나 그냥 적어서 테스트 해보는거야 왜냐하면 글자가 없으면 이상해보이니깐ㅎ<span className={style.comment}>[154]</span></td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
                <tr>
                    <td style={{width:'10%'}}>10</td>
                    <td >비즈서베이의 커뮤니티 게시글:)<span className={style.comment}>[52]</span>
                    <span className={style.vote}>
                        <IconWithText className='item1' text={'투표'} fontsize={'12px'} fontweight={'700'} fontcolor={'#fff'}>
                            <CiMemoPad />
                        </IconWithText>
                    </span>
                    </td>
                    <td style={{width:'10%'}}>
                        <div className={style.profil}>
                            <span className={style.photo}>
                                <img className='' src={logo}/>
                            </span>
                            <span className={style.nickname}>철수에오</span>
                        </div>
                    </td>
                    <td style={{width:'10%'}}>120</td>
                    <td style={{width:'10%'}}>2023-11-27</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default CommunityTable;
