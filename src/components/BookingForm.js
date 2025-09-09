import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import InnerBanner from "../components/InnerBanner"


const BookingForm = () => {
  return (
    <>
    <InnerBanner />
     <div className="booking-page py-5 my-5">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="booking-form shadow-lg border-0 w-100" style={{ maxWidth: '900px' }}>
          <Card.Body className="p-5">
            <h3 className="mb-4 text-center fw-bold text-dark">Book Your Stay</h3>
            <Form>
              <Row className="g-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-user me-2 text-secondary"></i>First Name</Form.Label>
                    <Form.Control className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-user me-2 text-secondary"></i>Last Name</Form.Label>
                    <Form.Control className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-envelope me-2 text-secondary"></i>Email</Form.Label>
                    <Form.Control type="email" className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-phone-alt me-2 text-secondary"></i>Phone</Form.Label>
                    <Form.Control className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-users me-2 text-secondary"></i>Guests (Adult)</Form.Label>
                    <Form.Control className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-child me-2 text-secondary"></i>Guests (Children)</Form.Label>
                    <Form.Control className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-calendar-alt me-2 text-secondary"></i>Check In</Form.Label>
                    <Form.Control type="date" className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-calendar-check me-2 text-secondary"></i>Check Out</Form.Label>
                    <Form.Control type="date" className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-home me-2 text-secondary"></i>Stay Type</Form.Label>
                    <Form.Control className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-building me-2 text-secondary"></i>Property Name</Form.Label>
                    <Form.Control className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-map-marker-alt me-2 text-secondary"></i>Address</Form.Label>
                    <Form.Control as="textarea" rows={2} className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label><i className="fas fa-rupee-sign me-2 text-secondary"></i>Final Amount</Form.Label>
                    <Form.Control className="form-control-lg" />
                  </Form.Group>
                </Col>
                <Col xs={12} className="text-center">
                  <Button type="submit" variant="primary" size="lg" className="rounded-pill px-5 fw-bold">
                    Book Now
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
    </>
   
  );
};

export default BookingForm;
