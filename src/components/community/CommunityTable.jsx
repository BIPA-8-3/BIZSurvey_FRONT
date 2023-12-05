import style from"../../style/community/Table.module.css"
import logo from "../../assets/img/avatar.png"
import { Link } from 'react-router-dom';

function CommunityTable({props}) {
  
  const data = Array.isArray(props) ? props : [];
  console.log(data)

  function renderIsBest(isBest){
    if(isBest === null){
      return null; 
    }

    return [isBest];
  }




  return (
    <div>
      <table className={style.communityTable}>
        <thead className={style.thead}>
          <tr>
            <th style={{width:'10%'}}>번호</th>
            <th>제목</th>
            <th style={{width:'10%'}}>작성자</th>
            <th style={{width:'10%'}}>조회수</th>
            <th style={{width:'10%'}}>등록일</th>
          </tr>
        </thead>
        <tbody style={{textAlign:'center'}} className={style.tbody}>
          {data.map(item => (
            <tr key={item.postId}>
              <td style={{width:'10%'}}>{item.postId}</td>
              <td>
                <span className={style.best}>{renderIsBest(item.isBest)}</span>
                <Link to={'/communityDetail'}>{item.title}</Link>
                <span className={style.comment}>[{item.commentSize}]</span>
                <span className={style.new}>{item.createType}</span>
              </td>
              <td style={{width:'10%'}}>
                <div className={style.profil}>
                  <span className={style.photo}>
                    <img className='' src={logo}/>
                  </span>
                  <span className={style.nickname}>{item.nickname}</span>
                </div>
              </td>
              <td style={{width:'10%'}}>{item.count}</td>
              <td style={{width:'10%'}}>{item.createTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommunityTable;
