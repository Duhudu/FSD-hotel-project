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
    }
    return [];
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
    return [];
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
    return [];
  },
  //filter method
  filteredRooms: (rooms, type, location, capacity) => {
    console.log("filteredRooms Room filter hit");
    //max cap
    const numGuests = parseInt(capacity, 10);
    //check max limit >8
    if (numGuests > 8) {
      //return empty array
      return [];
    }
    //Determince the closest cap
    let targetCapacity = 2;
    if (numGuests > 6) {
      targetCapacity = 8;
    } else if (numGuests > 4) {
      targetCapacity = 6;
    } else if (numGuests > 2) {
      targetCapacity = 4;
    } else {
      targetCapacity = 2;
    }
    console.log(
      `User asked for ${numGuests}, searching for capacity: ${targetCapacity}`
    );
    //Get the active rooms
    const activeRooms = rooms.filter((room) => room.status !== "Deleted");
    //check if the variables have different values
    const isDifferentType = type !== "";
    const isDifferentLocation = location !== "";

    console.log("filteredRooms type", type);
    console.log("filteredRooms", location);
    //check if something is different (if 1 = t then isD = t)
    const isDifferent = isDifferentType || isDifferentLocation || true;
    if (isDifferent) {
      const matchingRooms = activeRooms.filter((room) => {
        //if filter is empty OR if matches
        const dbType = room.roomTypeId?.type?.toLowerCase() || "";
        const filterType = type.toLowerCase();
        //check type
        const matchesType =
          type === "" ||
          filterType.includes(dbType) ||
          dbType.includes(filterType);
        //check location
        const dbLocation =
          room.roomTypeId?.hotelId?.location?.toLowerCase() || "";
        const filterLocation = location.toLowerCase();
        const matchesLocation =
          location === "" || dbLocation.includes(filterLocation);
        //Check Capacity
        //compare the rooms capacity to the calculated targetCapacity
        const roomCap = parseInt(room.roomTypeId?.capacity, 10);
        const matchesCapacity = roomCap === targetCapacity;
        if (matchesType && matchesLocation) {
          console.log(`Checking Room: ${room.roomTypeId?.name}`);
          console.log(
            `-- Data Capacity: ${roomCap} | Required: ${targetCapacity}`
          );
          console.log(`-- Match Status: ${matchesCapacity}`);
        }

        //ensure all conditions are correct and return
        return matchesType && matchesLocation && matchesCapacity;
      });
      //Create a map to hold unique name keys
      const uniqueRoomsMap = new Map();
      matchingRooms.forEach((room) => {
        //get the name
        const roomName = room.roomTypeId?.name;
        //if the name key is not already in the map yet add it if it is skip
        if (roomName && !uniqueRoomsMap.has(roomName)) {
          uniqueRoomsMap.set(roomName, room);
        }
      });
      //convert the map into an array
      const uniqueRoomsArray = Array.from(uniqueRoomsMap.values());
      return uniqueRoomsArray;
    }
    return [];
  },
};
