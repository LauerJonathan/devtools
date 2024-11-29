import Footer from "../../components/footer";
import NavBar from "../../components/NavBar";
import PresentationHome from "../../components/presentationHome";
import "./index.css";

const Home = () => {
  return (
    <main className="mainContent">
      <NavBar />
      <PresentationHome />
      <Footer />
    </main>
  );
};

export default Home;
