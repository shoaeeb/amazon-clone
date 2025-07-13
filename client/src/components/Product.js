import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded h-100" style={{ border: '1px solid #ddd' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img 
          src={product.image} 
          variant="top" 
          style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#007185' }}>
          <Card.Title as="div" style={{ fontSize: '1rem', lineHeight: '1.3' }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="mb-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="div" className="mt-auto">
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#B12704' }}>
            ${product.price}
          </span>
        </Card.Text>
        
        {product.countInStock > 0 ? (
          <small className="text-success">In Stock</small>
        ) : (
          <small className="text-danger">Out of Stock</small>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
