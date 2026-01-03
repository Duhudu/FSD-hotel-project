import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddRooms from "./pages/AddRooms";
import EditDeleteRooms from "./pages/EditDeleteRooms";
import EditRoomsForm from "./pages/EditRoomsForm";
import UserRoomPage from "./pages/User/UserRoomPage";
import BookingPage from "./pages/User/BookingPage";
import ServiceAddOnsPage from "./pages/ServiceAddOns";
import ServicesManagement from "./pages/ServicesManagement";
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
            <li>
              <Link to="/service/add">Add Service</Link>
            </li>
            <li>
              <Link to="/service/edit-delete">Services Management</Link>
            </li>
            <li>
              <Link to="/user/booking/:userId/:roomId">Booking Page</Link>
            </li>
          </ul>
        </nav>
        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<UserRoomPage />} />
          <Route path="/edit-delete" element={<EditDeleteRooms />} />
          <Route path="/rooms/edit/:id" element={<EditRoomsForm />} />;
          <Route path="/rooms/add" element={<AddRooms />} />;
          <Route path="/service/add" element={<ServiceAddOnsPage />} />;
          <Route path="/service/edit-delete" element={<ServicesManagement />} />
          <Route
            path="/user/booking/:userId/:roomId"
            element={<BookingPage />}
          />
          ;
        </Routes>
      </div>
    </Router>
  );
}

export default App;
