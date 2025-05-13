import SuperAdmin from "@/components/login/SuperAdmin";
import { GlobalContext } from "@/context/Provider";
import { Col, Row } from "@/lib/AntRegistry";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import henceforthApi from "@/utils/henceforthApi";
import { getRoleForUrl } from "@/utils/henceforthValidations";
import { destroyCookie, setCookie } from "nookies";
import { COOKIES_ADMIN_RAIZE_ACCESS_TOKEN, COOKIES_USER_TYPE } from "@/context/actionTypes";

const Login = () => {
  const {
    setUserInfo,
    setUserType,
    Toast,
  } = useContext(GlobalContext);
  const router = useRouter();
  const { user_type } = router.query;
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    console.log(values, "values");

    setLoading(true);
    try {
      destroyCookie(null, COOKIES_ADMIN_RAIZE_ACCESS_TOKEN, {
        maxAge: 0,
        path: "/",
      });
      let apiRes = await henceforthApi.SuperAdmin.login(values);
      setUserInfo({
        ...apiRes,
        access_token:apiRes?.access_token
      });
      henceforthApi.setToken(apiRes?.access_token)
      setCookie(this, COOKIES_ADMIN_RAIZE_ACCESS_TOKEN, apiRes?.access_token, {
        path: "/",
      });
      router.replace(`/`)
    } catch (error: any) {
      Toast.error(error);
      setLoading(false);
    }
  };
 
 



  return (
    <>
      <section className="auth_section">
        <div className="container">
          <Row justify={"end"}>
            <Col span={24} md={12} lg={12} xl={10} xxl={8}>
                <SuperAdmin handleSubmit={handleSubmit} loading={loading} />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
export default Login;
