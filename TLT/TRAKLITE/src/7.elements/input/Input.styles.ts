import { StyleSheet } from "react-native";
import { scale } from "../../8.core/scaling";
import { themes } from "../../8.core/themes";

export const styles = (props: any) =>
  StyleSheet.create({
    outerContainer: {
      borderWidth: 3,
      borderColor: props.borders.outer || "transparent",
      borderRadius: 11,
    },
    innerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: props.inputHeight === 0 ? scale("64px") : props.inputHeight,
      width: 327,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: props.borders.inner,
      backgroundColor: props.backgroundColor,
    },
    label: {
      color: props.labelColor,
      fontSize: 12,
      fontWeight: "500",
      paddingLeft: 16,
      marginBottom: 8,
      paddingTop: 15,
      marginTop: 10,
    },
    input: {
      color: props.color,
      fontSize: 14,
      fontWeight: "500",
      paddingLeft: 16,
      paddingBottom: 20,
    },
    error: {
      color: themes.input.shared.validationErrorColor,
      textAlign: "right",
      marginTop: 12,
    },
    icon: {
      paddingRight: 16,
    },
  });
