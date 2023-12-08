import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import cover from "./cover.jpg";
import cover2 from "./cover2.jpeg";
import cover3 from "./cover3.jpeg";
function CoverFade() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image src={cover} fluid />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={cover2} fluid />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={cover3} fluid />
      </Carousel.Item>
    </Carousel>
  );
}

export default CoverFade;
