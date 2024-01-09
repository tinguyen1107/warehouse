import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export type BaseItem = {
  label: string;
  value: string;
};

export type DropdownComponentProps = {
  placeholder?: string;
  items: BaseItem[];
  onSelected: (item: BaseItem) => void;
};

export const DropdownComponent: React.FC<DropdownComponentProps> = ({
  placeholder,
  items,
  onSelected,
}) => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        containerStyle={{ borderRadius: 8 }}
        itemContainerStyle={{ borderRadius: 8, backgroundColor: "transparent" }}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        iconColor="white"
        data={items}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        inverted
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelected(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 200,
  },
  dropdown: {
    height: 50,
    backgroundColor: "#3a3a3aaa",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
