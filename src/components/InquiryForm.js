import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InquiryForm = () => {
  const [form, setForm] = useState({
    destination: '',
    state: '',
    checkin: '',
    checkout: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.destination) newErrors.destination = 'Destination is required';
    if (!form.state) newErrors.state = 'State is required';
    if (!form.city) newErrors.city = 'City is required';
    // if (!form.checkin) newErrors.checkin = 'Check-in date is required';
    // if (!form.checkout) newErrors.checkout = 'Check-out date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
      // Submit logic here
    }
  };

  return (
    <div style={{ background: '#ffc107', padding: '50px 0' }}>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3 justify-content-center">
            <Col xs={12} md={6} lg={3}>
              <Form.Label className="text-black">Search Destination</Form.Label>
              <Form.Select
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className="rounded-pill"
              >
                <option value="">Enter Country..</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
                <option value="New York">New York</option>
              </Form.Select>
              {errors.destination && <div className="text-danger small">{errors.destination}</div>}
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Form.Label className="text-black">State</Form.Label>
              <Form.Select
               
                name="state"
                value={form.state}
                onChange={handleChange}
                className="rounded-pill"
                placeholder="No. of people.."
              >

               <option value="">Enter State..</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
                <option value="New York">New York</option>
                </Form.Select>
              {errors.state && <div className="text-danger small">{errors.state}</div>}
            </Col>

            <Col xs={12} md={6} lg={3}>
              {/* <Form.Label className="text-black">Checkin Date</Form.Label>
              <Form.Control
                type="date"
                name="checkin"
                value={form.checkin}
                onChange={handleChange}
                className="rounded-pill"
              />
              {errors.checkin && <div className="text-danger small">{errors.checkin}</div>} */}
                 <Form.Label className="text-black">City</Form.Label>
              <Form.Select
               
                name="state"
                value={form.city}
                onChange={handleChange}
                className="rounded-pill"
                placeholder="No. of people.."
              >

               <option value="">Enter City..</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
                <option value="New York">New York</option>
                </Form.Select>

              {errors.city && <div className="text-danger small">{errors.city}</div>}

            </Col>

            {/* <Col xs={12} md={6} lg={2}>
              <Form.Label className="text-black">Checkout Date</Form.Label>
              <Form.Control
                type="date"
                name="checkout"
                value={form.checkout}
                onChange={handleChange}
                className="rounded-pill"
              />
              {errors.checkout && <div className="text-danger small">{errors.checkout}</div>}
            </Col> */}

            <Col xs={12} md={6} lg={2} className="d-flex align-items-end">
              <Button type="submit" className="w-100 rounded-pill text-black border-black" style={{ background: 'transparent' }}>
                INQUIRY NOW
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default InquiryForm;
