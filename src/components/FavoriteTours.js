import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaVideo, FaCamera } from 'react-icons/fa';
import './custom.css';
import Img1 from '../assets/Adv.jpeg';
import Img2 from '../assets/Travel.jpeg';
import Img3 from '../assets/hist.jpeg';
import BgCol from '../assets/bg-23.png';
import { blogs } from "../utils/constant"; // Make sure this is exported correctly
import { useNavigate } from "react-router-dom";

const tourData = [
  {
    id: 1,
    title: 'Adventure Blog', // Must match blog title exactly
    desc: 'Sed ut perspiciatis unde omnis iste natus error sit volupt laudan tium.',
    image: Img1,
  },
  {
    id: 2,
    title: 'Travel Blog',
    desc: 'Sed ut perspiciatis unde omnis iste natus error sit volupt laudan tium.',
    image: Img2,
  },
  {
    id: 3,
    title: 'Historical Blog', // This one won't have a blog, just to test
    desc: 'Sed ut perspiciatis unde omnis iste natus error sit volupt laudan tium.',
    image: Img3,
  },
];

const FavoriteTours = () => {
  const navigate = useNavigate();

  const bgStyle = {
    backgroundColor: '#f2f5f9',
    backgroundImage: `url(${BgCol})`,
    backgroundSize: 'contain',
    backgroundPosition: 'right top',
    backgroundRepeat: 'no-repeat',
    width: '100%',
  };

  return (
    <div style={bgStyle}>
      <Container className="pt-2 position-relative">
        <h5 className="text-center pt-5 text-primary fw-semibold mb-2 light-heading-blue">
          FEATURED
        </h5>
        <h2 className="text-center pt-5 pb-2 fw-bold mb-5">
          Most Favorite Tour Place
        </h2>
        <Row>
          {tourData.map((tour) => {
            // Safe check for blogs being undefined
            const matchedBlog = (blogs || []).find(
              (blog) =>
                blog?.title?.toLowerCase() === tour.title.toLowerCase()
            );

            return (
              <Col
                lg={4}
                md={6}
                sm={12}
                key={tour.id}
                className="mb-4 pt-3 bgColStyle"
              >
                <Card className="tour-card h-100 border-0 shadow-sm">
                  <div className="tour-img-wrapper position-relative">
                    <Card.Img
                      variant="top"
                      src={tour.image}
                      className="rounded-top"
                    />
                    <div className="tour-icons position-absolute bottom-0 start-0 p-2 d-flex gap-2">
                      <FaCamera className="bg-primary text-white p-1 rounded-circle" size={24} />
                      <FaVideo className="bg-primary text-white p-1 rounded-circle" size={24} />
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-semibold">{tour.title}</Card.Title>
                    <Card.Text className="small text-muted">
                      {tour.desc}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        variant="warning"
                        className="btn-more text-black px-4 py-2 fw-semibold"
                        onClick={() => {
                          const isLoggedIn = localStorage.getItem("user");

                          if (matchedBlog) {
                            const slug = matchedBlog.slug;

                            if (isLoggedIn) {
                              navigate(`/blog/${slug}`);
                            } else {
                              const confirmRedirect = window.confirm(
                                "You must be logged in to continue. Do you want to login now?"
                              );
                              if (confirmRedirect) {
                                navigate("/login", {
                                  state: { redirectTo: `/blog/${slug}` },
                                });
                              }
                            }
                          } else {
                            alert("No matching blog found for this tour.");
                          }
                        }}
                      >
                        Read More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default FavoriteTours;
