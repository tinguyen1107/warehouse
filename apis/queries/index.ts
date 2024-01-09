import { gql, useQuery } from "@apollo/client";

const GET_DEVICE_BY_ID = gql`
  query GetDevices($id: Int!) {
    devices(where: { id: { _eq: $id } }) {
      id
      device_name
      device_description
      manufacture
      created_at
    }
  }
`;

type DeviceDto = {
  id: number;
  device_name: string;
  device_description: string;
  manufacture: string;
};

type Data = {
  devices: [DeviceDto];
};

export function useGetDeviceById(
  id: number,
  options?: Parameters<typeof useQuery<Data, { id: number }>>[1],
) {
  return useQuery<Data, { id: number }>(GET_DEVICE_BY_ID, {
    variables: { id },
    ...options,
  });
}
