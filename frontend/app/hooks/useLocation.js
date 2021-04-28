import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        const {
          coords: { latitude, longitude },
        } = await Location.getLastKnownPositionAsync();
        setLocation({latitude , longitude});
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return location;
};
