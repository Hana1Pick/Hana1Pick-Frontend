import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguaeDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguaeDetector) // 사용자 언어 탐지
  .use(initReactI18next) // i18n 객체를 react-18next에 전달
  .init({
    // for all options read: https://www.i18next.com/overview/configuration-options
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: { // 번역본 쓸 공간

          counter_one: "Changed language just once",
          counter_other: "Changed language already {{count}} times",
          title: "CelubLog",
          subtitle: "Save with your favorite celebs",
          description: "Support your favorite celeb in CelubLog😍",
          startButton: "Start CelubLog"
          
        },
      },
      ch: {
        translation: { // 번역본 쓸 공간
            counter_one: "Changed language just once",
            counter_other: "Changed language already {{count}} times",
            title:"名人日志",
            subtitle:"与最爱一起养成储蓄习惯",
            description:"在Celuv Log里应援我的最爱😍",
            startButton:"开始名人日志"
        },
      },
      ko: {
        translation: { // 번역본 쓸 공간
            title: "셀럽로그",
            subtitle: "최애와 함께 저축습관 들이기",
            description: "셀럽로그에서 내 최애 응원해요😍",
            startButton: "셀럽로그 시작하기",
          counter_one: "언어를 한번 바꾸었습니다.",
          counter_other: "언어를 {{count}}번 바꾸었습니다.",
        },
      },
    },
  });

export default i18n;