import localFont from "next/font/local";

export const mahoorFont = localFont({
  src: [
    {
      path: "../../public/fonts/Mahoor-Bold-HC.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Mahoor-ExtraBold-HC.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Mahoor-Medium-HC.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Mahoor-Regular-HC.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Mahoor-SemiBold-HC.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});
