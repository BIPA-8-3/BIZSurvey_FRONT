import { MdDateRange } from "react-icons/md";

export default function DateInfo({ value }) {
  return (
    <>
      <div
        style={{
          width: "580px",
          height: "40px",
          margin: "5px 0 5px 0",
          borderRadius: "3px",
          backgroundColor: "rgb(248, 249, 250)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ padding: "13px 0 0 10px" }}>{value}</div>
        <div
          style={{
            fontSize: "25px",
            marginTop: "7px",
            color: "#d6d6d6",
            marginRight: "10px",
          }}
        >
          <MdDateRange />
        </div>
      </div>
    </>
  );
}
