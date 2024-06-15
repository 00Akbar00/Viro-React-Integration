import React from "react";

const TableModel: React.FC = () => {
  return (
    <div style={styles.centered}>
      <h1>This is chair model</h1>
    </div>
  );
};

const styles = {
  centered: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center" as "center",
  },
};

export default TableModel;
