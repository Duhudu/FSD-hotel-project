import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddRooms from "./pages/AddRooms";
import EditDeleteRooms from "./pages/EditDeleteRooms";
import EditRoomsForm from "./pages/EditRoomsForm";
import UserRoomPage from "./pages/UserRoomPage";
function App() {
  return (
    <Router>
      <div className="App">
        {/* Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Rooms Page</Link>
            </li>
            <li>
              <Link to="/edit-delete">Edit/Delete Rooms</Link>
            </li>
            <li>
              <Link to="/rooms/add">Add Rooms</Link>
            </li>
          </ul>
        </nav>
        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<UserRoomPage />} />
          <Route path="/edit-delete" element={<EditDeleteRooms />} />
          <Route path="/rooms/edit/:id" element={<EditRoomsForm />} />;
          <Route path="/rooms/add" element={<AddRooms />} />;
        </Routes>
      </div>
    </Router>
  );
}

export default App;
