import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { Link } from "react-router-dom"; // Import Link here

export const NavBar = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setSelectedTab(newValue);
  };

  return (
    <div
      style={{ position: "fixed", top: "0px", left: "0px" }}
      className="flex items-center pr-[40px] p-2 z-10 w-full  bg-[#E9EDF7]"
    >
      <div className="flex-1" />
      <div className="xl:flex-co  ml-[120px] mr-[40px] mb-[20px]  box-border">
        <Tabs
          style={{
            fontSize: "52px",
          }}
          className="text-sky-800"
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            style={{
              fontWeight: "600",
            }}
            label={<Link to="/">Try On</Link>} // Add Link here
          />
          <Tab
            style={{
              fontWeight: "600",
            }}
            label={<Link to="/upload-garment">Upload Garment</Link>} // Add Link here
          />
          <Tab
            style={{
              fontWeight: "600",
            }}
            label={<Link to="/garment-list">View Garments</Link>} // Add Link here
          />
        </Tabs>
      </div>
    </div>
  );
};
