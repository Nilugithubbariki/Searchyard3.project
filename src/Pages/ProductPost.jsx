import React, { useState } from "react";
import styles from "./Product.module.css";
const ProductPost = () => {
  // const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // console.log("cartHistory",cart)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("Hello",cart)
  return (
    
    <>
    <h1>Cart History</h1>
    {
      cart?.map((value)=>{
        return(
          <div>
          <div className={styles.CardContainer} key={value?.id}>
          <div className={styles.imgdiv}>
            <img src={value?.images} alt="phone_images" className={styles.img} />
          
          </div>
          <div className={styles.pricename}>
            <h4>{value?.brand}</h4>
            <h5>$ {value?.price}/-</h5>
          </div>
          <div className={styles.ratingcategory}>
            <h4> {value?.category}</h4>
            <h5>⭐⭐⭐⭐⭐</h5>
          </div>
          <h5>{value?.description}</h5>
          </div>
          </div>
        )
      })
    }
    </>
  );
};

export default ProductPost;
