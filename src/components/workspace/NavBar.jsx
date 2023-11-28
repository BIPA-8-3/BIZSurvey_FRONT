import AddIcon from "@mui/icons-material/Add";
import Item from "./Item";

function NavBar() {
  return (
    <div
      style={{
        position: "fixed",
        top: "68px",
        width: "256px",
        height: "1000px",
        border: "1px solid rgb(246, 246, 246)",
      }}
    >
      <div style={{ padding: "20px 12px 10px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="https://via.placeholder.com/45X45" style={{ borderRadius: "45px" }}></img>
            <div style={{ display: "inline-block", marginLeft: "10px" }}>
              <span style={{ fontWeight: "bold", fontSize: "14px", display: "block" }}>
                비즈서베이
              </span>
              <span style={{ fontSize: "10px", color: "rgb(107, 119, 140)" }}>
                hws6745@naver.com
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "0 5px",
              alignContent: "center",
              verticalAlign: "center",
              justifyContent: "space-between",
              display: "flex",
              marginTop: "5px",
            }}
          >
            <span
              style={{
                color: "rgb(107, 119, 140)",
                fontSize: "11px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              워크스페이스
            </span>
            <button
              style={{
                background: "#ffffff",
                border: "0",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              <AddIcon
                style={{
                  fontSize: "23px",
                  color: "grey",
                  borderRadius: "15px",
                }}
                className="add-icon"
              ></AddIcon>
            </button>
          </div>
        </div>
      </div>
      <div>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </div>
      <style>{`
        .add-icon:hover {
          background-color: rgb(245, 245, 245); /* Change this to the desired hover background color */
        }
      `}</style>
    </div>
  );
}

export default NavBar;
