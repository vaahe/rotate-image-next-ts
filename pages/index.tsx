import type { NextPage } from "next";
import "../styles/Home.module.css";
import Header from "../src/components/Header";
import ImageUpload from "../src/components/ImageUpload";
import Footer from "../src/components/Footer";

const Home: NextPage = () => {
  return (
    <div className="App">
      <Header />
      <ImageUpload />
      <Footer />
    </div>
  );
};

export default Home;
