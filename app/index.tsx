import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Dimensions } from "react-native";
import ScanFrame from "../assets/images/scan-frame.svg";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(`Scanned ${type} ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "red",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            flex: 1,
            backgroundColor: "blue",
            flexDirection: "column",
            width: deviceHeight,
          }}
        >
          <View style={styles.opacity} />
          <View style={{ alignItems: "stretch", flexDirection: "row" }}>
            <View style={styles.opacity} />
            <View
              style={{
                margin: -3,
                zIndex: 100,
                elevation: 100,
                borderColor: opacity,
              }}
            >
              <ScanFrame
                style={{
                  position: "relative",
                  width: "40%",
                }}
              />
            </View>
            <View style={styles.opacity} />
          </View>
          <View style={styles.opacity} />
        </BarCodeScanner>
        <View
          style={{
            position: "absolute",
            bottom: 15,
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: "#32323257",
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Point your camera at a barcode
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const opacity = "rgba(50, 50, 50, .34)";
const styles = {
  opacity: {
    flex: 1,
    backgroundColor: opacity,
  },
};
