import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, Text, View, Dimensions } from "react-native";
import ScanFrame from "../assets/images/scan-frame.svg";
import BottomSheet from "@gorhom/bottom-sheet";
import { ProductPreview } from "../components";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const BARCODE_PREFIX = "ABC-abc-";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<number | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [70, "60%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    console.log("Scanned", type, data);
    if (data.startsWith(BARCODE_PREFIX)) {
      setScannedData(
        Number.parseInt(data.replace(new RegExp("^" + BARCODE_PREFIX), "")),
      );
    }
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
          onBarCodeScanned={handleBarCodeScanned}
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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          {scannedData && <ProductPreview id={scannedData} />}
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const opacity = "rgba(50, 50, 50, .34)";
const styles = {
  opacity: {
    flex: 1,
    backgroundColor: opacity,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
};
