import React from "react";
import { useParams } from "react-router-dom";
import { blogs } from "../utils/constant";
import { Container, Row, Col } from "react-bootstrap";


const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <Container className="py-5 text-center">
        <h3>Blog not found</h3>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="blog-hero" style={{ backgroundImage: `url(${blog.image})` }}>
        <div className="blog-hero-overlay ">
          <h1 className="blog-title ">{blog.title}</h1>
        </div>
      </div>

      {/* Blog Content */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="blog-content">
              <p>{blog.content}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogDetails;
