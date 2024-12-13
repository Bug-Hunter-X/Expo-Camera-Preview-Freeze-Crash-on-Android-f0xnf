// bugSolution.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraRef = (ref) => {
    setCameraRef(ref);
  };

  const handleStopCamera = () => {
    if (cameraRef) {
      // Attempt to release resources - add further cleanup logic here
      cameraRef.pausePreview();  
      // Consider cameraRef.stopRecording() if recording is involved.
      // ... Add other resource clean up
      setCameraRef(null); 
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={handleCameraRef}>
        {/* ... Your camera UI ... */}
      </Camera>
       <Button title="Stop Camera" onPress={handleStopCamera} />
    </View>
  );
};
export default App;