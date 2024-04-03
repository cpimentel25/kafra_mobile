import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/styles";
import DataList from "../components/dataList/_layout";
import sumValues from "../utils/reducerTotal";
import kafraData from "../../assets/data/kafraData.json";
import formatNumberToCurrency from "../utils/formatNumber";

export default function Tab() {
  const totalValue = sumValues(kafraData);
  const valueFormat = formatNumberToCurrency(totalValue);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.content}>
        <View style={styles.display}>
          <Text style={styles.textDisplayTitle}>Total Bill</Text>
          <Text style={styles.textDisplay}>
            {valueFormat ? valueFormat : "$0.00"}
          </Text>
        </View>
      </View>
      <View style={styles.flashContainer}>
        <DataList kafraData={kafraData} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    padding: 20,
    marginTop: 50,
  },
  display: {
    justifyContent: "center",
    alignItems: "flex-end",
    borderWidth: 1,
    borderColor: colors.bg_secundary,
    backgroundColor: colors.bg_display,
    borderRadius: 15,
    padding: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  textDisplay: {
    color: colors.text_display,
    fontWeight: "900",
    fontSize: 40,
  },
  textDisplayTitle: {
    color: colors.text_display,
    fontWeight: "700",
    fontSize: 18,
  },
  flashContainer: {
    flex: 1, // Esto hace que el componente ocupe todo el espacio disponible
    width: "100%",
    padding: 20,
  },
});
