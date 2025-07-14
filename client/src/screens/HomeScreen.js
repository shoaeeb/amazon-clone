import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // This is critical
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SEO from "../components/SEO";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams(); // First get all params
  const keyword = params.keyword || ""; // Safely access keyword with fallback

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <SEO 
        title={keyword ? `Search Results for "${keyword}" - Amazon Clone` : "Amazon Clone - Online Shopping | Electronics, Books, Clothing & More"}
        description={keyword ? `Find products matching "${keyword}" at Amazon Clone` : "Discover amazing products at great prices. Shop electronics, books, clothing and more with fast shipping and secure checkout."}
        keywords={keyword ? `${keyword}, online shopping, ecommerce` : "online shopping, ecommerce, electronics, books, clothing"}
      />
      <h1>🛍️ Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
