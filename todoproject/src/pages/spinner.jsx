import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <MoonLoader
      color="red"
      loading={loading}
      cssOverride={override}
      size={70}
    />
  );
};

export default Spinner;
