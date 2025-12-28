//This only work if the importing file exports "module.exports" instead of normal "export"
const { validateRoomData } = require("../AddRooms_Server_validations");

describe("Backend Unit Test: Room Validation Middleware", () => {
  //set variables asked by express
  let req, res, next;
  beforeEach(() => {
    //mock 1: req is a just a object containing data
    req = {
      body: {},
    };
    //Mock 2: res is a spy object
    res = {
      status: jest.fn().mockReturnThis(),
      //see if it was called
      json: jest.fn(),
    };
    //mock 3: next is a simple spy function
    //see if it was called
    next = jest.fn();
  });
  //Test 1: all inputs are correct
  test("Should call next if all rooms data is valid", () => {
    //setup vaild data
    req.body = {
      roomName: "Ocean Suite",
      roomType: "Deluxe",
      roomDescription: "Beautiful view",
      roomLocation: "Colombo",
      roomPrice: 100,
      roomCapacity: "2",
      roomSize: 450,
      roomView: "Sea",
      floor: "3",
      defaultStatus: "Ready",
    };
    //run the validation function with the fake test data
    validateRoomData(req, res, next);
    //verify data is good and pass control to the next controller
    expect(next).toHaveBeenCalled(); //should not send an error
  });
  //Test 2: missing data (remove name from the datainputs)
  test("Should return 400 if Room name is missing", () => {
    req.body = {
      //roomName: "Ocean Suite",
      roomType: "Deluxe",
      roomDescription: "Beautiful view",
      roomLocation: "Colombo",
      roomPrice: 100,
      roomCapacity: "2",
      roomSize: 450,
      roomView: "Sea",
      floor: "3",
      defaultStatus: "Ready",
    };
    //call validation method
    validateRoomData(req, res, next);
    //Should stop and send the error
    expect(next).not.toHaveBeenCalled(); //should not move forward
    expect(res.status).toHaveBeenCalledWith(400); //need to send the 400 bad request error
    expect(res.json).toHaveBeenCalledWith({
      message: "Backend: Room Name is missing",
    });
  });
  //Test 3 invaild data type
  test("Should return 400 if price is not a number", () => {
    req.body = {
      roomName: "Ocean Suite",
      roomType: "Deluxe",
      roomDescription: "Beautiful view",
      roomLocation: "Colombo",
      roomPrice: "Test",
      roomCapacity: "2",
      roomSize: 450,
      roomView: "Sea",
      floor: "3",
      defaultStatus: "Ready",
    };
    //call validation
    validateRoomData(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Backend: Invalid Price",
    });
  });
});
