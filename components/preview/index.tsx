import { Text, View } from "react-native";
import { useGetDeviceById } from "../../apis";

interface ProductPreviewProps {
  id: number;
}

export const ProductPreview = ({ id }: ProductPreviewProps) => {
  const { loading, error, data } = useGetDeviceById(id);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...{JSON.stringify(error)}</Text>;
  if (data) {
    return (
      <View>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
          {data.devices[0].device_name}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>
          {data.devices[0].device_description}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>
          {data.devices[0].manufacture}
        </Text>
      </View>
    );
  }
};
