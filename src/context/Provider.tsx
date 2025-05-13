import React, {
  createContext,
  Fragment,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { message, theme, Tour } from "antd";
import { Outfit } from "next/font/google";
import { ConfigProvider } from "@/lib/AntRegistry";
import { useRouter } from "next/router";
import {
  COOKIES_ADMIN_RAIZE_ACCESS_TOKEN,
  COOKIES_USER_TYPE,
} from "./actionTypes";
import { destroyCookie, setCookie } from "nookies";
import henceforthApi from "@/utils/henceforthApi";
import { getRoleForUrl, getTypeForUrl } from "@/utils/henceforthValidations";

const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

type ToastFunction = (msg: any) => void;

interface CommonContextType {
  loading: boolean;
  requestNotification: () => string;
  initLoginWithGoogle: (str: string) => string;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  Toast: {
    error: ToastFunction;
    success: ToastFunction;
    warning: ToastFunction;
  };
  userInfo: any;
  logout: Function;
  user_info: any;
  setUserInfo: any;
  setUserType: any;
  userType: any;
  raize: [];
  Video: {
    startRecording: any;
    stopRecording: any;
    recording: any;
    recordedChunks: any;
    chunks: any;
    videoUrl: any;
    recordedVideoURL: any;
    duration: any;
    streaming: any;
    Recorder: any;
    screenRecording: any;
    screenRecordingChunks: any;
    startScreenRecording: any;
    setStreaming: any;
    setVideoUrl: any;
  };
  setVideoUrl:any,
  recording:any,
  setRecording:any,
  videoUrl:any,
  uploadImages: any;
  setClickedTexts: any;
  setPic: any;
}
export const GlobalContext = createContext({} as CommonContextType);
type GlobleContextProviderProps = {
  children: ReactNode;
  access_token: string;
  user_info: any;
  userType: string;
  signInPrivacy: string;
  theme?: {
    direction: string;
    colorPrimary: string;
  };
};

const { defaultAlgorithm, darkAlgorithm } = theme;

function GlobalProvider(props: GlobleContextProviderProps) {
  const router = useRouter();
  henceforthApi.setToken(props?.user_info?.access_token);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userType, setUserType] = useState(props?.user_info?.userType);
  const [recording, setRecording] = useState(false);
  const screenRecording = useRef<any>(null);
  const [Recorder, setRecorder] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<any>(null);
  const [streaming, setStreaming] = useState<any>(false);
  var t0 = useRef<number>(-1);
  const screenRecordingChunks: any = [];
  const [chunks, setChunks] = useState<any>([]);
  const [userInfo, setUserInfo] = useState(props?.user_info);
  const [colorPrimary, setColorPrimary] = React.useState(
    props?.theme?.colorPrimary || "#9778F7"
  );
  const [messageApi, contextHolder] = message.useMessage();
  const success = (success: any) => {
    messageApi.open({
      type: "success",
      content: success,
    });
  };

  const error = (error: any) => {
    let errorBody = error?.response?.body;
    let message = errorBody?.message;
    let error_message = errorBody?.error_description;
    messageApi.open({
      type: "error",
      content: message
        ? message
        : typeof error_message == "string"
          ? error_message
          : error_message
            ? JSON.stringify(error_message)
            : JSON.stringify(error),
      duration: 3,
    });
    setTimeout(messageApi.destroy, 3000);
  };
  const warning = (warning: any) => {
    messageApi.open({
      type: "warning",
      content: warning,
    });
  };
  const Toast = {
    success,
    warning,
    error,
  };

  const stopSpaceEnter = (event: any) => {
    if (String(event.target.value).length == 0 && event.which == 32) {
      event.preventDefault();
    }
    if (
      (event.keyCode < 65 || event.keyCode > 90) &&
      (event.keyCode < 97 || event.keyCode > 122) &&
      event.keyCode !== 32
    ) {
      return false;
    }
    return true;
  };
  const logout = async () => {
    setUserInfo(null as any)
    destroyCookie(null, COOKIES_ADMIN_RAIZE_ACCESS_TOKEN, {
      maxAge: 0,
      path: "/",
    });
    router.replace(`/auth/login`);
  };
  const getProfile = async () => {
    try {
      let apiRes = await henceforthApi.Auth.profile()
    } catch (error:any) {
      if(error){
        logout()
      }
    }
  };

  const startScreenRecording = async () => {
    debugger;
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
    setStreaming(stream);
    t0.current = performance.now();
    const recorder = new MediaRecorder(stream);
    setRecorder(recorder);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setChunks([...chunks, e.data]);
        screenRecordingChunks.push(e.data);
      }
    };
    recorder.onstop = async () => {
      debugger;
      recorder.stop()
      stream.getVideoTracks()[0].stop();
      const urlBlob = new File(screenRecordingChunks, "demo.mp4", {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(urlBlob);
      setVideoUrl(urlBlob);
      // screenRecording.current.src = url;
      console.log(videoUrl,"videourlll");
      setRecording(false);
      
    };

    recorder.start();
  };
  const Video = {
    startScreenRecording,
    Recorder,
    videoUrl,
    streaming,
    chunks,
    setVideoUrl,
    setStreaming,
    screenRecordingChunks,
    screenRecording,
  };
  // useEffect(() => {
  //   getProfile()
  // },[])

  return (
    <GlobalContext.Provider
      value={
        {
          ...props,
          logout,
          userType,
          loading,
          setLoading,
          setUserType,
          Toast,
          setUserInfo,
          userInfo,
          stopSpaceEnter,
          Video,
          videoUrl,
          recording,
          setRecording,
          setVideoUrl,
        } as any
      }
    >
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorPrimary: colorPrimary,
            fontFamily: outfit.style.fontFamily,
            // colorBorderBg: "#f6f6f6",
          },
          components: {
            DatePicker: {
              lineWidth: 1,
              borderRadiusLG: 40,
              borderRadius: 40,
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              controlHeight: 36,
              controlHeightLG: 40,
              fontWeightStrong: 600,
              colorBorder: "transparent",
              colorBgContainer: "rgba(255, 255, 255, 0.5)",
            },
            Form: {
              verticalLabelPadding: 0,
              labelColor: "#121212",
              itemMarginBottom: 16,
              labelHeight: 10,
            },
            InputNumber: {
              lineWidth: 2,
            },
            Input: {
              lineWidth: 1,
              colorBorder: "transparent",
              borderRadiusLG: 40,
              borderRadius: 40,
              borderRadiusOuter: 40,
              borderRadiusSM: 40,
              controlHeightLG: 40,
              controlHeight: 36,
              colorBgContainer: "rgba(255, 255, 255, 0.5)",
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              colorText: "#121212",
              paddingInlineLG: 20,
              fontWeightStrong: 400,
              colorFillTertiary: "#EDEDED",
            },

            Select: {
              lineWidth: 1,
              borderRadiusOuter: 40,
              borderRadius: 40,
              borderRadiusLG: 40,
              colorBorder: "transparent",
              colorText: "#828282",
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              controlHeightLG: 40,
              controlHeight: 36,
              colorBgContainer: "rgba(255, 255, 255, 0.5)",
            },
            Card: {
              paddingContentHorizontal: 0,
              paddingContentVertical: 0,
              colorBorderSecondary: "#E6E6E6",
              padding: 0,
              borderRadius: 12,
              borderRadiusLG: 12,
              colorBgContainer: "#ffffff",
              paddingLG: 0,
              paddingMD: 0,
              paddingSM: 0,
            },
            Radio: {
              colorPrimary: colorPrimary,
              dotSize: 9,
              radioSize: 18,
            },

            Button: {
              borderRadiusLG: 40,
              borderRadiusSM: 40,
              borderRadius: 40,
              lineWidth: 1,
              fontSize: 14,
              fontSizeLG: 14,
              controlHeightLG: 40,
              controlHeight: 36,
              controlHeightSM: 34,
              borderColorDisabled: "transparent",
              colorBgContainerDisabled: "#fdc8467a",
              colorTextDisabled: "#fff",
              fontWeight: 500,
              defaultColor: "#000000",
              defaultBorderColor: "#000000",
              defaultBg: "transparent",
              colorErrorBg: "yellow",
            },
            Tabs: {
              fontWeightStrong: 800,
              fontSize: 16,
              colorText: "#828282",
              colorPrimary: colorPrimary,
            },
            Pagination: {
              borderRadius: 8,
              // itemActiveBg: '#FDC846',
              colorPrimary: "#FDC846",
              colorPrimaryHover: "#FDC846",
            },
            Upload: {
              margin: 20,
              colorError: "#E6E6E6",
            },
            Typography: {
              fontSizeHeading1: 60,
              fontSizeHeading2: 32,
              fontSizeHeading3: 26,
              fontSizeHeading4: 24,
              fontSize: 14,
              fontSizeHeading5: 20,
              colorText: "#121212",
              colorTextHeading: "#121212",
              titleMarginTop: 0,
              colorTextSecondary: "#828282",
            },
            Switch: {
              colorPrimary: colorPrimary,
              handleSizeSM: 10,
              trackPadding: 4,
              colorTextQuaternary: "#EF8E8B",
              trackHeightSM: 20,
              trackMinWidthSM: 32,
            },
            Dropdown: {
              padding: 0,
              paddingLG: 0,
              controlItemBgHover: "transparent",
              boxShadow: "0px 4px 24px 0px #0000000A",
              colorBgElevated: "#ffffff",
              colorBorder: "#1A1A1A",
              colorText: "#121212",
              borderRadius: 12,
              borderRadiusLG: 12,
              borderRadiusSM: 12,
              borderRadiusXS: 12,
            },
            Rate: {
              controlHeight: 50,
              controlHeightLG: 50,
            },
            Checkbox: {
              lineWidth: 2,
              colorBorder: colorPrimary,
              borderRadiusLG: 0,
              borderRadiusSM: 0,
            },
            Breadcrumb: {
              lastItemColor: "#545454",
              linkHoverColor: "#545454",
              colorText: "#545454",
            },
            Divider: {
              lineWidth: 1,
              fontSize: 26,
              colorText: "#000000",
            },
            Collapse: {
              borderRadiusLG: 8,
              borderRadius: 8,
              colorBgElevated: "#000000",
              colorBorder: "#E5E5E5",
              colorFillAlter: "#000000",
              colorTextHeading: "#121212",
              fontSize: 16,
            },
            Modal: {
              borderRadius: 8,
              borderRadiusLG: 8,
              contentBg: "#ffffff",
              headerBg: "#ffffff",
              titleColor: "#000000",
            },
            Table: {
              colorTextHeading: "#828282",
              fontSize: 14,
              borderRadius: 24,
              headerBg: "rgba(246, 243, 254, 1)",
              colorBgContainer: "transparent",
              borderColor: "transparent",
              colorText: "#121212",
            },
            Statistic: {
              colorText: "#fff",
            },
            Spin: {
              colorPrimary: colorPrimary,
            },
            Tag: {
              borderRadius: 40,
              borderRadiusLG: 40,
              borderRadiusSM: 40,
            },
            Progress: {
              defaultColor: colorPrimary,
            },
            // Layout: {
            //     siderBg: '#000000'
            // }
          },
        }}
      >
        {props.children}
        {contextHolder}
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
