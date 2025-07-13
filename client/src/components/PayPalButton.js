import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const PayPalButton = ({ amount, onSuccess }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const paymentResult = {
        id: 'PAY_' + Date.now(),
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        payer: { email_address: 'customer@example.com' }
      };
      setProcessing(false);
      onSuccess(paymentResult);
    }, 2000);
  };

  return (
    <Card className="payment-form">
      <Card.Header style={{ background: 'transparent', border: 'none' }}>
        <h5 style={{ color: 'white', textAlign: 'center', marginBottom: '1.5rem' }}>💳 Secure Payment</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handlePayment}>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength="19"
              required
            />
          </Form.Group>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength="5"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength="4"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Cardholder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </Form.Group>
          
          <div className="mb-3">
            <strong>Amount: ${amount}</strong>
          </div>
          
          <Button
            type="submit"
            variant="warning"
            className="w-100"
            disabled={processing}
          >
            {processing ? 'Processing Payment...' : `Pay $${amount}`}
          </Button>
        </Form>
        
        <div className="mt-3 text-center">
          <small style={{ color: 'rgba(255,255,255,0.8)' }}>
            🔒 Test Card: 4111 1111 1111 1111 | Exp: 12/25 | CVV: 123
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PayPalButton;