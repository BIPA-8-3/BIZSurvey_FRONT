import style from "../../../../../style/survey/TextList.module.css";

export default function TextList({ values }) {
  //values : ['data1', 'data2', 'data3']

  if (values) {
    return (
      <>
        <div className={style.textList}>
          {values.map((text, index) => (
            <Text value={text} key={index} />
          ))}
        </div>
      </>
    );
  }
}

export function Text({ value, personal }) {
  return (
    <>
      <div className={style.textContainer}>
        <p className={`${personal ? style.textDisabled : style.text}`}>
          {value}
        </p>
      </div>
    </>
  );
}
