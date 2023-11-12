import UserProfile from "../components/UsersBooks";
import { Card } from "react-bootstrap";
const Home = () => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Burza učebnic</Card.Title>
        </Card.Body>
      </Card>
      <UserProfile />
    </div>
  );
};

export default Home;
