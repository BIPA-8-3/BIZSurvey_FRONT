function Item() {
  return (
    <div style={{ padding: "0 12px", display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "230px",
          height: "48px",
          fontSize: "15px",
          fontWeight: "500px",
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
          borderRadius: "2px",
        }}
        className="workspaces"
      >
        New Workspace
        {/* <div style={{ margin: "4px 0" }}>New Workspace</div> */}
      </div>
          <div style={{
              backgroundColor: "#F2F9FF", color: "#007BE5",
            width: "40px", height: "20px MozAnimation,  border-radius: 6px; background-color: rgb(242, 249, 255); font-size: 10px; display: flex; align-items: center; justify-content: center; color: rgb(0, 123, 229); font-weight: bold
          
          }}>Free</div>
      <style>{`
        .workspaces:hover {
          background-color: #DEEBFF;
          color: #0052CC;
        }
      `}</style>
    </div>
  );
}

export default Item;
