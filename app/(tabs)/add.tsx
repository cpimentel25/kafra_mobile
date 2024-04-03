import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../styles/styles";
import { useState } from "react";
import { colors } from "../styles/colors";
import { Picker } from "@react-native-picker/picker";

const pickerData = [
  { label: "Home", value: "home" },
  { label: "Shopping", value: "shopping" },
  { label: "Grocery", value: "grocery" },
  { label: "Services", value: "services" },
  { label: "Bills", value: "bills" },
];

export default function Tab() {
  const [value, setValue] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  const submit = () => {
    console.log("submit");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Add new Value</Text>
      <View style={styles.content}>
        <TextInput
          style={globalStyles.input}
          placeholderTextColor={colors.placeholderText}
          placeholder="New value"
          value={value}
          onChangeText={(value) => setValue(value)}
          keyboardType="numeric"
        />
        <View style={globalStyles.picker}>
          <Picker
            style={{ color: colors.text }}
            selectedValue={selectCategory}
            onValueChange={(item, index) => setSelectCategory(item)}
          >
            {pickerData?.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.label}
                value={item.value}
                style={{
                  backgroundColor: colors.bg_primary,
                  color: colors.text,
                  fontSize: 16,
                }}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={globalStyles.btnPrimary} onPress={submit}>
          <Text style={globalStyles.btnPrimaryText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    padding: 30,
  },
  title: {
    color: colors.text,
    fontSize: 22,
  },
});
