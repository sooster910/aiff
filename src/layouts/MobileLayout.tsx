import * as React from "react";
import { useRouter } from "next/router";

export interface MobileLayoutProps {
  children: React.ReactNode;
  maxWidth: string;
}

const MobileLayout: React.FunctionComponent<MobileLayoutProps> = ({
  maxWidth,
  children,
  ...props
}) => {
  const router = useRouter();

  return (
    <div
      className={router.pathname === "/booking" ? "bg" : "mobile"}
      style={{
        maxWidth:
          router.pathname === "/adminDashboard" ||
          router.pathname === "/adminWeeklySchedule"
            ? "1200px"
            : maxWidth,
        margin: "0 auto",
        // boxShadow: "0 0 20px rgb(0 0 0 / 5%)",
        // background: "#FAFBFC",
      }}
    >
      {children}
    </div>
  );
};

export default MobileLayout;
