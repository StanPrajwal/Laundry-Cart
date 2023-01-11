import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Left from "../Left/Left";
import Right from "../Right/Right";
import "./Login.css";

export default function Login(props) {
  return (
    <div>
      <Header />
      <div className="login">
        <Left isLogin={true} />
        <Right isLogin={true} stateData={[]} districtData={[]} />
      </div>
      <Footer />
    </div>
  );
}
