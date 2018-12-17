import React, { Component } from "react";
import './NoResult.css'


const NoResults = () => {
  return (
    
      <div className="no-results">
        <img
          src="https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png"
          alt="Empty Tree"
        />
        <h2>Không có kết quả tìm kiếm phù hợp</h2>
        <p>Hãy dùng từ khóa khác</p>
      </div>
    
  );
};

export default NoResults;
