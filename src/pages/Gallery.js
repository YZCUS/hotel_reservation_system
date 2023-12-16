import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import hotel_1 from "../img/Hyatt/hotel_1.jpg";
import hotel_2 from "../img/W_hotel/hotel_2.jpg";
import hotel_3 from "../img/W_hotel/hotel_3.jpg";
import room_1 from "../img/Hyatt/room_1.jpg";
import room_2 from "../img/Hyatt/room_2.jpg";
import room_3 from "../img/Hyatt/room_3.jpg";
import room_4 from "../img/W_hotel/room_4.jpg";
import room_5 from "../img/W_hotel/room_5.jpg";
import room_6 from "../img/W_hotel/room_6.jpg";
import room_7 from "../img/W_hotel/room_7.jpg";
import room_8 from "../img/W_hotel/room_8.jpg";
import dining_1 from "../img/Hyatt/dining_1.jpg";
import dining_2 from "../img/Hyatt/dining_2.jpg";
import dining_3 from "../img/W_hotel/dining_3.jpg";
import dining_4 from "../img/W_hotel/dining_4.jpg";
import activity_1 from "../img/W_hotel/activity_1.jpg";
import activity_2 from "../img/W_hotel/activity_2.jpg";
import destination_1 from "../img/Hyatt/destination_1.jpg";

const GallerySection = ({ title, images }) => {
  return (
    <div className="mb-4">
      <h3>{title}</h3>
      <Carousel fade>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 mx-3"
              src={image}
              alt={`${title} slide ${index}`}
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default function GalleryCarousel() {
  const sections = [
    {
      title: "Hotel",
      images: [hotel_1, hotel_2, hotel_3],
    },
    {
      title: "Room",
      images: [room_1, room_2, room_3, room_4, room_5, room_6, room_7, room_8],
    },
    {
      title: "Dining",
      images: [dining_1, dining_2, dining_3, dining_4],
    },
    {
      title: "Activities",
      images: [activity_1, activity_2],
    },
    {
      title: "Destination",
      images: [destination_1],
    },
  ];

  const rows = [];
  for (let i = 0; i < sections.length; i += 2) {
    rows.push(
      <Row key={i}>
        <Col md={6}>
          <GallerySection
            title={sections[i].title}
            images={sections[i].images}
          />
        </Col>
        {sections[i + 1] && (
          <Col md={6}>
            <GallerySection
              title={sections[i + 1].title}
              images={sections[i + 1].images}
            />
          </Col>
        )}
      </Row>
    );
  }

  return <Container>{rows}</Container>;
}
