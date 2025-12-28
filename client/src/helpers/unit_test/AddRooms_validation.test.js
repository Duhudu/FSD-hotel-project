import { validateRoomForm } from "../AddRooms_validations";

//The describe keyword groups tests together in the report
describe("Unit Test: Add Rooms Validation Logic", () => {
  //Step one: test when everything is correct
  test("Should pass when all data is valid ", () => {
    //Create fake inputs that should work in the real system (add correct location and view)
    const goodData = {
      roomType: "Deluxe",
      roomName: "Kandy View",
      // Valid location
      roomLocation: "Kandy",
      roomDescription: "A nice room",
      roomPrice: "5000",
      roomCapacity: "2",
      roomSize: "40",
      // Valid view for Kandy
      roomView: "Mountains",
      numberOfRooms: "5",
      defaultStatus: "Ready",
      startingRoomNumber: "100",
      floor: "1",
      // Simulating 1 image
      roomImages: ["image1.jpg"],
    };
    //Run the valdation function
    const result = validateRoomForm(goodData);
    //Tell the system the expected result
    expect(result.isValid).toBe(true);
  });
  //Test 2: Check the validations with wrong inputs "Kandy + Sea" Logic
  test("Should fail if Location is Kandy but View is Sea", () => {
    //Input fake data to break  the validation logic
    const wrongData = {
      roomType: "Deluxe",
      roomName: "Kandy View",
      // Valid location
      roomLocation: "Kandy",
      roomDescription: "A nice room",
      roomPrice: "5000",
      roomCapacity: "2",
      roomSize: "40",
      // Valid view for Kandy
      roomView: "Sea",
      numberOfRooms: "5",
      defaultStatus: "Ready",
      startingRoomNumber: "100",
      floor: "1",
      // Simulating 1 image
      roomImages: ["image1.jpg"],
    };
    const result = validateRoomForm(wrongData);
    //Expected output
    expect(result.isValid).toBe(false);
    //expected error message
    expect(result.errors.roomImages).toBe(
      "The selected location and view cannot be linked togather"
    );
  });

  //Test 3: Empty name check
  test("Should fail if Room Name is missing", () => {
    const emptyNameData = {
      roomType: "Deluxe",
      roomName: "",
      // Valid location
      roomLocation: "Kandy",
      roomDescription: "A nice room",
      roomPrice: "5000",
      roomCapacity: "2",
      roomSize: "40",
      // Valid view for Kandy
      roomView: "Mountains",
      numberOfRooms: "5",
      defaultStatus: "Ready",
      startingRoomNumber: "100",
      floor: "1",
      // Simulating 1 image
      roomImages: ["image1.jpg"],
    };
    const result = validateRoomForm(emptyNameData);
    expect(result.isValid).toBe(false);
    expect(result.errors.roomName).toBe("Room Name is required");
  });
});
