import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/app/styles/colors";
import { useEffect, useRef, useState } from "react";
import { DataInterface } from "@/app/interfaces/data.interface";
import formatNumberToCurrency from "@/app/utils/formatNumber";

interface Props {
  kafraData: DataInterface[];
}

export default function DataList({ kafraData }: Props) {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlashList<DataInterface>>(null);

  useEffect(() => {
    console.log("Reload Listing: ", kafraData.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const renderRow = ({ item }: { item: DataInterface }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardDate}>{item.Date}</Text>
          <Text style={styles.cardDate}>{item.Owner}</Text>
        </View>
        <View style={styles.cardMiddle}>
          <Text style={styles.cardDate}>{item.Category}</Text>
        </View>
        <View style={styles.cardrigth}>
          <Text
            style={[
              styles.cardText,
              item.Value < 0
                ? { color: colors.negative }
                : { color: colors.positive },
            ]}
          >
            {formatNumberToCurrency(item.Value)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlashList
      data={loading ? [] : kafraData}
      ref={listRef}
      renderItem={renderRow}
      estimatedItemSize={200}
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 5,
  },
  cardLeft: {
    width: "40%",
    alignItems: "flex-start",
  },
  cardMiddle: {
    width: "35%",
    alignItems: "flex-start",
  },
  cardrigth: {
    width: "25%",
    alignItems: "flex-end",
  },
  card: {
    borderRadius: 5,
    backgroundColor: colors.bg_info,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    color: colors.text,
    fontSize: 18,
  },
  cardDate: {
    color: colors.placeholderText,
  },
});
