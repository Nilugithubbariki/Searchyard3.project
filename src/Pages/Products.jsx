import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate } from "react-router-dom";
const Products = () => {
  
  const [products, setProducts] = useState([]);
  const [filteredProducts,setFilterProducts] = useState(products);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();
  //http://localhost:8080/api/product
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        console.log("Show_Data",res.data.products);
        setProducts(res.data.products);
        setFilterProducts(res.data.products)
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(()=>{
    const filteredProducts = products
    .filter((product) => {
      return product.brand.toLowerCase().includes(search.toLowerCase());
    });
    setFilterProducts(filteredProducts);
  },[search]);

  // const handleAddCart = () => {
  //   return(
  //     <AddCart/>
  //   )
  // }
  const handleCart = (product) => {
    console.log("handleCart",product);
    navigate("/post");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart?.find((item) => item?.id === product?.id);
    if (item) {
      item.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const ascendingPrice = () => {
    let result = [...products].sort((a, b) => a.price - b.price);
    setProducts(result);
    setFilterProducts(result)
  };
  const descendingPrice = () => {
    let result = [...products].sort((a, b) => b.price - a.price);
    setProducts(result);
    setFilterProducts(result)
  };
  const ascendingName = () => {
    let result = [...products].sort((a, b) => a.brand.localeCompare(b.brand));
    setProducts(result);
    setFilterProducts(result)
  };
  const descendingName = () => {
    let result = [...products].sort((a, b) => b.brand.localeCompare(a.brand));
    setProducts(result);
    setFilterProducts(result)
  };

  const options = {
    loop: true,
    items: 1,
    margin: 15,
    center: true,
    autoplay: true,
    navText:[
      '<span class="arrow prev">‹</span>',
      '<span class="arrow next">›</span>'
    ]
  };

  // const handleClick = () => {
  //   navigate("/post");
  // };

  return (
    <div className={styles.ProductsContainer}>
      <div className={styles.searchContainer}>
        <h1 style={{color:"red"}}> Ecommorce Site </h1>
        {/* <button className={styles.btnn} onClick={handleClick}>
          AddFruit
        </button> */}
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </div>
     

      <div className={styles.main}>
        <div className={styles.category}>
          <select
            value={filter}
            className={styles.option}
            onChange={handleFilter}
          >
            <option value="">--SelectCategory</option>

            <option value="smartphones">Product Section</option>
            <option value="laptops">Special Product Section</option>
          </select>
        </div>
        <div className={styles.price}>
          <h3 className={styles.h3}> Price:-</h3>
          <button onClick={ascendingPrice} className={styles.btn}>
            <TbSortAscending2 />
          </button>
          <button onClick={descendingPrice} className={styles.btn}>
            <TbSortDescending2 />
          </button>
        </div>

        <div className={styles.name}>
          <h3 className={styles.h3}> Name:-</h3>
          <button onClick={ascendingName} className={styles.btn}>
            <TbSortAscending2 />
          </button>
          <button onClick={descendingName} className={styles.btn}>
            <TbSortDescending2 />
          </button>
        </div>
      </div>

      <br />
      <br />
      <div className={styles.Container}>
        {filteredProducts.map((product) => (
          // <div className={styles.card}>

          // </div>
          <div className={styles.CardContainer} key={product.id}>
            {/* <Carousel> */}
            {/* {
              product.images?.forEach((value)=>{
                console.log("Show_images",value);
                <div className={styles.imgdiv}>
              <img src={value} alt="phone_images" className={styles.img} />
            </div>
              })
            } */}
            {/* <Carousel> */}
            <div className={styles.imgdiv}>
            <OwlCarousel  {...options}>
              { product?.images?.map(item => (
              <img src={item} alt="phone_images" className={styles.img} />
              ))}
              {/* <img src={product.thumbnail} alt="phone_images" className={styles.img} /> */}
            </OwlCarousel>
            </div>
            {/* </Carousel> */}
            <div className={styles.pricename}>
              <h4>{product.brand}</h4>
              <h5>$ {product.price}/-</h5>
            </div>
            <div className={styles.ratingcategory}>
              <h4> {product.category}</h4>
              <h5>⭐⭐⭐⭐⭐</h5>
            </div>
            <h5>{product.description}</h5>
            {/* <div className={styles.imgdiv}>
              <img src={product.images?.[1]} alt="phone_images" className={styles.img} />
            </div> */}
            {/* </Carousel> */}
            
            
            <button onClick={() => handleCart(product)} className={styles.btns}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
