// 검색 자동 완성 창

export default function SearchResult({props}){

    const data = Array.isArray(props) ? props : [];

    return (
        <>  
            {data.map( item =>(
                    <div>{item.result}</div>

            ))}
            
        </>
    );
} 