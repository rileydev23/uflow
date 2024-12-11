const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.uflow.kaisa.dev";
  }

  if (IS_PREVIEW) {
    return "com.uflow.kaisa.preview";
  }

  return "com.uflow.kaisa";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Medusa (Dev)";
  }

  if (IS_PREVIEW) {
    return "Medusa (Preview)";
  }

  return "Medusa";
};
export default {
  expo: {
    name: getAppName(),
    slug: "uflow",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "uflow",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: getUniqueIdentifier(),
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-secure-store", "expo-font"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "f1b1edc4-bb74-43fd-b60f-749e21bdecee",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/f1b1edc4-bb74-43fd-b60f-749e21bdecee",
    },
  },
};
