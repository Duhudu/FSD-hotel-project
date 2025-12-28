export const roomFilterService = {
  //Logic for Deluxe Rooms
  getDeluxeRooms: (rooms, type, location, capacity) => {
    const activeRooms = rooms.filter((room) => room.status !== "Deleted");
    //Check if default mode
    const isTypeDefault = type === "";
    const isLocationDefault = location === "";
    const isCapacityDefault = String(capacity) === "2";
    let change = "";
    //check if everything is true
    const isDefaultMode =
      isTypeDefault && isLocationDefault && isCapacityDefault;
    //if both are in default mode
    //logic to display 1 card from 1 location
    if (isDefaultMode) {
      //debugger
      change = "Inside defult room if condition";
      console.log(change);
      //Find Kandy
      const kandyRoom = activeRooms
        .filter(
          (room) =>
            room.roomTypeId?.hotelId?.location
              ?.toLowerCase()
              .includes("kandy") &&
            room.roomTypeId?.type?.toLowerCase().includes("deluxe")
        )
        .slice(0, 1); //get 1 set
      const colomboRoom = activeRooms
        .filter(
          (room) =>
            room.roomTypeId?.hotelId?.location
              ?.toLowerCase()
              .includes("colombo") &&
            room.roomTypeId?.type?.toLowerCase().includes("deluxe")
        )
        .slice(0, 1); //get 1 set

      //Combine them into one array and return it
      return [...kandyRoom, ...colomboRoom];
      //return activeRooms.slice(0, 2);
    }
    //Filtered data logic
    //get what the user picked: Only apply location filter if it's NOT default
    let filteredRooms = activeRooms;
    if (!isLocationDefault) {
      change = "Inside filtered/User selected changes room if condition";
      console.log(change);
      console.log(isLocationDefault, isTypeDefault, isCapacityDefault);
      filteredRooms = filteredRooms.filter(
        (room) => room.roomTypeId?.hotelId?.location === location
      );
    }
    console.log("Did it change: ", change);
    return filteredRooms;
  },
  //Executive Suites filter
  getExecutiveRooms: (rooms, type, location, capacity) => {
    console.log("Exexutive Room filter hit");
    const activeRooms = rooms.filter((room) => room.status !== "Deleted");
    //Check if default mode
    const isTypeDefault = type === "";
    const isLocationDefault = location === "";
    const isCapacityDefault = String(capacity) === "2";
    //check if everything is true
    const isDefaultMode =
      isTypeDefault && isLocationDefault && isCapacityDefault;
    //logic to display 1 card from 1 location
    if (isDefaultMode) {
      console.log("Default mode insdie exe hit");
      //Find Kandy
      const kandyRoom = activeRooms
        .filter(
          (room) =>
            room.roomTypeId?.hotelId?.location
              ?.toLowerCase()
              .includes("kandy") &&
            room.roomTypeId?.type?.toLowerCase().includes("executive")
        )
        .slice(0, 1); //get 1 set
      const colomboRoom = activeRooms
        .filter(
          (room) =>
            room.roomTypeId?.hotelId?.location
              ?.toLowerCase()
              .includes("colombo") &&
            room.roomTypeId?.type?.toLowerCase().includes("executive")
        )
        .slice(0, 1); //get 1 set

      //Combine them into one array and return it
      return [...kandyRoom, ...colomboRoom];
    }
    let executivefilteredRooms = activeRooms;
    if (!isLocationDefault) {
      console.log(isLocationDefault, isTypeDefault, isCapacityDefault);
      executivefilteredRooms = executivefilteredRooms.filter(
        (room) => room.roomTypeId?.hotelId?.location === location
      );
    }

    return executivefilteredRooms;
  },
  //Standard Collection
  getStandardRooms: (rooms, type, location, capacity) => {
    console.log("Standard Room filter hit");
    const activeRooms = rooms.filter((room) => room.status !== "Deleted");
    //Check if default mode
    const isTypeDefault = type === "";
    const isLocationDefault = location === "";
    const isCapacityDefault = String(capacity) === "2";
    //check if everything is true
    const isDefaultMode =
      isTypeDefault && isLocationDefault && isCapacityDefault;
    //logic to display 1 card from 1 location
    if (isDefaultMode) {
      console.log("Default mode insdie Standard hit");
      //Find Kandy
      const kandyRoom = activeRooms
        .filter(
          (room) =>
            room.roomTypeId?.hotelId?.location
              ?.toLowerCase()
              .includes("kandy") &&
            room.roomTypeId?.type?.toLowerCase().includes("standard")
        )
        .slice(0, 1); //get 1 set
      const colomboRoom = activeRooms
        .filter(
          (room) =>
            room.roomTypeId?.hotelId?.location
              ?.toLowerCase()
              .includes("colombo") &&
            room.roomTypeId?.type?.toLowerCase().includes("standard")
        )
        .slice(0, 1); //get 1 set

      //Combine them into one array and return it
      return [...kandyRoom, ...colomboRoom];
    }
    let standardfilteredRooms = activeRooms;
    if (!isLocationDefault) {
      console.log(isLocationDefault, isTypeDefault, isCapacityDefault);
      standardfilteredRooms = standardfilteredRooms.filter(
        (room) => room.roomTypeId?.hotelId?.location === location
      );
    }
    return standardfilteredRooms;
  },
};
