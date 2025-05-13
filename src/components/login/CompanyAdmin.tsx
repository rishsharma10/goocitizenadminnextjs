import React from "react";
import {
  Button,
  Space,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import LoginwithGoogleButton from "../LoginwithGoogleButton";

const CompanyAdmin = () => {
  return (
    <div className="auth_page p-3 text-center">
      {/* title */}
      <div className="title mb-4">
        <TypographyTitle level={2}>Welcome to Raize</TypographyTitle>
        <TypographyText type="secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          facilis, quis perspiciatis voluptatem voluptates quasi enim officia
          blanditiis optio veritatis culpa hic molestias inventore iusto.
        </TypographyText>
      </div>
      <Space direction="vertical" className="w-100">
        <div className="login-btn">
          <div id='signupGoogleButton' className="w-100 d-flex align-items-center justify-content-center gap-2 google-button-custom">Continue with Google</div>
        </div>
        <div className="login-btn">
          <Button ghost size="large" htmlType="submit" block type="primary">
            Continue with outlook
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default CompanyAdmin;
