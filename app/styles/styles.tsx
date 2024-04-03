import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg_primary,
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    color: colors.text,
    borderColor: colors.white,
    borderRadius: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    color: colors.text,
    borderColor: colors.white,
    borderRadius: 5,
    padding: 10,
    marginVertical: 7,
    fontSize: 16,
  },
  btnPrimary: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: colors.primary,
  },
  btnPrimaryText: {
    color: colors.text,
    fontSize: 16,
  },
  btnSecundary: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  btnSecundaryText: {
    color: colors.text,
    fontSize: 16,
  },
  buttonSocial: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.white,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  textButtonSocial: {
    color: colors.white,
    fontSize: 16,
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  title: {
    color: colors.text,
    fontSize: 26,
  },
});
