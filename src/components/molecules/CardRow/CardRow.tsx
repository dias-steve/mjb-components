/*===================================================================
=       CARD ROW MBJ UI        =
====================================================================*/
/**
 * Card Row for My Joule Box UI
 */
import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { FC, ReactNode, useState } from "react";
import Animated, {
  Easing,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

//ICONS
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useThemeMJB } from "../../../ThemeProvider/ThemeProvider";

//=========TYPES=========//

export type statusTypeCardRow =
  | "valided"
  | "invalid"
  | "pending"
  | "box"
  | "error"
  | null;

export type CardRowProps = {
  /**
   * title to the left
   */
  titleLeft?: string | number | null;
  /**
   * title to the right
   */
  titleRight?: string | number | null;
  /**
   * status
   */
  status?: statusTypeCardRow;

  /**
   * unity
   */
  unityTileRight?: string | null;
  /**
   * subtitle to the right
   */
  subtitleRight?: string | number | null;
  /**
   * subtitle to the left
   */
  subtitleLeft?: string | number | null;
  /**
   * Icon component to display
   * Type of the props : () => <Component>
   */
  IconComponentLeft?: FC;
  /**
   * Icon component to display for Button
   * Type of the props : () => <Component>
   */
  LeftComponentContainer?: FC;

  /**
   * Text between the title and subtitle
   */
  captionTitle?: string | number;

  /**
   * Above the left title
   */
  headerTitle?: string | number;

  /**
   * Label of the button to open the drawer
   */
  drawerButtonLabel?: string | number;

  /**
   * Drawer Content Component
   * Type of the props : () => <Component>
   */

  /**
   * Anable and display the drawer button
   */
  isWithDrawer?: boolean;

  /**
   * onPress card row
   * @returns
   */
  onPress?: () => void;

  /**
   * Drawer content
   *
   * @param handleClose Funtion to close the drawer
   * @returns
   */
  drawerContentComponents?: (handleClose: () => void) => ReactNode;
};

//=========COMPONENT ICON=========//
const IconStatus = ({ status }: { status: statusTypeCardRow }) => {


  const styles = StyleSheet.create({
    errorText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
  });
  if (status === "valided") {
    return <MaterialIcons name="done" size={18} color="white" />;
  }
  if (status === "invalid") {
    return <Text style={styles.errorText}>!</Text>;
  }

  if (status === "pending") {
    return <Feather name="more-horizontal" size={18} color="white" />;
  }

  if (status === "box") {
    return <FontAwesome5 name="box" size={11} color="white" />;
  }

  if (status === "error") {
    return <AntDesign name="close" size={18} color="white" />;
  }

  return <></>;
};

/**
 * Card Row  for My Joule Box UI
 * @param param0
 * @returns
 */
const CardRow = ({
  titleLeft,
  titleRight,
  subtitleLeft,
  subtitleRight,
  IconComponentLeft,
  LeftComponentContainer,
  status,
  drawerButtonLabel,
  isWithDrawer,
  onPress,
  drawerContentComponents,
  captionTitle,
  headerTitle,
  unityTileRight,
}: CardRowProps) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const {
    theme: { color, fontFamily },
  } = useThemeMJB();

  const styles: any = StyleSheet.create({
    ["status-pin"]: {
      height: 23,
      width: 23,
      borderRadius: 100,

      position: "absolute",
      right: 0,
      top: 0,
      marginTop: -5,
      marginLeft: -5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ["status-pin--"]: {},

    ["status-pin--pending"]: {
      backgroundColor: color.otherColor.orange.dark,
    },
    ["status-pin--valided"]: {
      backgroundColor: color.otherColor.green.dark,
    },
    ["status-pin--invalid"]: {
      backgroundColor: color.otherColor.red.dark,
    },
    ["status-pin--box"]: {
      backgroundColor: color.otherColor.blue.dark,
    },
    ["status-pin--error"]: {
      backgroundColor: "black",
    },

    ["card-row"]: {
      backgroundColor: color.otherColor.gray.light,
      borderRadius: 25,
      marginVertical: 10,
      display: "flex",
      flexDirection: "column",
    },
    ["card-row__container--glogal"]: {
      display: "flex",
      flexDirection: "row",
      paddingRight: 20,
      paddingVertical: 10,
      alignItems: "center",
      width: "100%",
      minHeight: 70,
    },

    ["card-row__btn-container"]: {},
    ["card-row__image-container"]: {},
    ["card-row__content-container"]: {
      flex: 1,
    },
    ["card-row__title-container"]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    ["card-row__title-text-container"]: {
      display: "flex",
      flexDirection: "row",
    },

    ["card-row__title-container__unity-container"]: {},
    ["card-row__title-container__unity-container__text"]: {
      marginTop: 2,
      marginLeft: 3,
      fontFamily: fontFamily.primary.regular,
      fontSize: 10,
    },
    ["card-row__subtitle-container"]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    ["card-row__subtitle-text"]: {
      marginTop: 4,
      color: color.secondary.normal,
      fontFamily: fontFamily.primary.light,
      fontSize: 11,
    },
    ["card-row__title-text"]: {
      fontSize: 16,
      fontFamily: fontFamily.primary.regular,
    },

    ["card-row__caption-title-container"]: {},

    ["card-row__caption-title-container__caption-text"]: {
      marginTop: 4,
      color: color.secondary.normal,
      fontFamily: fontFamily.primary.light,
      fontSize: 11,
    },

    ["card-row__header-title-container"]: {},

    ["card-row__header-title-container__header-text"]: {
      marginBottom: 5,
      color: color.secondary.normal,
      fontFamily: fontFamily.primary.light,
      fontSize: 11,
      opacity: 0.4,
    },
    ["card-row__drawer"]: {
      backgroundColor: color.otherColor.black.light,

      zIndex: 3,
      minWidth: "100%",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },

    ["card-row__drawer__btn__container"]: {
      height: 25,
      display: "flex",
      alignItems: "flex-end",
    },

    ["card-row__drawer__btn__container__btn"]: {
      display: "flex",
      flexDirection: "row",
      height: "100%",
      alignItems: "center",
      paddingLeft: 10,
    },

    ["card-row__drawer__btn__label"]: {
      color: "white",
      textTransform: "uppercase",
      fontFamily: fontFamily.primary.regular,
    },

    ["card-row__drawer__btn__label--icon"]: {
      marginLeft: 10,
      marginRight: 10,
    },
    ["card-row__drawer__content"]: {
      /*

        */
    },
    ["card-row__drawer__content__wrapper-content"]: {
      marginTop: 10,
      marginBottom: 20,
      paddingHorizontal: 20,
    },
  });

  const marginLeftcontentText =
    IconComponentLeft || LeftComponentContainer ? 15 : 0;
  const marginLeftcontainer = LeftComponentContainer ? 10 : 20;

  const maxheightDrawer = useSharedValue(0);
  const rotaionZ = useSharedValue(0);

  const handleOpenCloseDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
    if (!isOpenDrawer) {
      maxheightDrawer.value = withTiming(1000, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      });

      rotaionZ.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      });
    } else {
      maxheightDrawer.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      });
      rotaionZ.value = withTiming(100, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      });
    }
  };

  const handleCloseDrawer = () => {
    handleOpenCloseDrawer();
  };

  const dynamicStyle = StyleSheet.create({
    containerContent: {
      marginLeft: marginLeftcontentText,
    },

    container: {
      paddingLeft: marginLeftcontainer,
    },
  });

  const drawerContentComponentsNode = drawerContentComponents
    ? drawerContentComponents(handleCloseDrawer)
    : null;

  const statusTypeClass = status ? "status-pin--" + status : "status-pin--";
  return (
    <View style={[styles["card-row"]]}>
      {status && (
        <View style={[styles["status-pin"], styles[statusTypeClass]]}>
          <IconStatus status={status} />
        </View>
      )}
      <Pressable
        onPress={onPress || handleOpenCloseDrawer}
        style={[styles["card-row__container--glogal"], dynamicStyle.container]}
      >
        {LeftComponentContainer && (
          <View style={styles["card-row__btn-container"]}>
            <LeftComponentContainer />
          </View>
        )}
        {IconComponentLeft && (
          <View style={styles["card-row__image-container"]}>
            <IconComponentLeft />
          </View>
        )}
        <View
          style={[
            styles["card-row__content-container"],
            dynamicStyle.containerContent,
          ]}
        >
          {headerTitle && (
            <View style={styles["card-row__header-title-container"]}>
              <Text
                style={styles["card-row__header-title-container__header-text"]}
              >
                {headerTitle}
              </Text>
            </View>
          )}
          <View style={styles["card-row__title-container"]}>
            <Text style={styles["card-row__title-text"]}>{titleLeft}</Text>
            <View style={styles["card-row__title-text-container"]}>
              <Text style={styles["card-row__title-text"]}>{titleRight}</Text>

              {unityTileRight && (
                <View
                  style={[styles["card-row__title-container__unity-container"]]}
                >
                  <Text
                    style={[
                      styles[
                        "card-row__title-container__unity-container__text"
                      ],
                    ]}
                  >
                    FCFA
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles["card-row__subtitle-container"]}>
            <Text style={styles["card-row__subtitle-text"]}>
              {subtitleLeft}
            </Text>
            <Text style={styles["card-row__subtitle-text"]}>
              {subtitleRight}
            </Text>
          </View>
          {captionTitle && (
            <View style={styles["card-row__caption-title-container"]}>
              <Text
                style={
                  styles["card-row__caption-title-container__caption-text"]
                }
              >
                {captionTitle}
              </Text>
            </View>
          )}
        </View>
      </Pressable>

      {isWithDrawer && (
        <View style={styles["card-row__drawer"]}>
          <View style={styles["card-row__drawer__btn__container"]}>
            <Pressable
              onPress={handleOpenCloseDrawer}
              style={styles["card-row__drawer__btn__container__btn"]}
            >
              <Text style={styles["card-row__drawer__btn__label"]}>
                {!isOpenDrawer ? drawerButtonLabel : "Fermer"}
              </Text>
              <View
                style={{
                  transform: [{ rotateZ: (isOpenDrawer ? 180 : 0) + "deg" }],
                }}
              >
                <AntDesign
                  style={[styles["card-row__drawer__btn__label--icon"]]}
                  name="down"
                  size={18}
                  color="white"
                />
              </View>
            </Pressable>
          </View>
          {
            <Animated.View
              style={{ maxHeight: maxheightDrawer, overflow: "hidden" }}
            >
              {drawerContentComponentsNode && (
                <View
                  style={styles["card-row__drawer__content__wrapper-content"]}
                >
                  {drawerContentComponentsNode}
                </View>
              )}
            </Animated.View>
          }
        </View>
      )}
    </View>
  );
};

export default CardRow;
