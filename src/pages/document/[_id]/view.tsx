import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import {
  AntForm,
  Avatar,
  Button,
  Col,
  Dropdown,
  Flex,
  FormItem,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  SelectOption,
  Space,
  Table,
  Tabs,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import { Form, Grid, Tooltip } from "antd";
import Link from "next/link";
import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import profile from "@/assets/images/profile.png";
import { capitalizeFirstLetter } from "@/utils/henceforthValidations";
import CountryCode from "@/utils/CountryCode.json";
import { TabsProps } from "antd/lib";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { COOKIES_ADMIN_RAIZE_ACCESS_TOKEN } from "@/context/actionTypes";
import henceforthApi from "@/utils/henceforthApi";
import { GlobalContext } from "@/context/Provider";
const View = (props: any) => {
  const { userInfo } = useContext(GlobalContext);
  const [teamMateDetail, setTeamMateDetails] = useState(props as any);
  const [profileDriver, setProfileDriver] = useState({} as any);
  const router = useRouter();
  const query = router.query;
  const initData = async () => {
    try {
      henceforthApi.setToken(userInfo?.access_token);
      let urlSearchParam = new URLSearchParams();

      urlSearchParam.set(
        "pagination",
        String(Number(query.pagination ?? 1) - 1)
      );
      if (query.search) {
        urlSearchParam.set("search", String(query.search));
      }
      urlSearchParam.set("limit", String(10));
      let apiRes = await henceforthApi.Drivers.details(
        String(query._id),
        urlSearchParam.toString()
      );
      setTeamMateDetails(apiRes);
    } catch (error) {}
  };
  const initProfileDetails = async () => {
    try {
      henceforthApi.setToken(userInfo?.access_token);
      let apiRes = await henceforthApi.Drivers.list();
      let result = apiRes.data.find((res:any) => res._id == router.query._id)

      setProfileDriver(result);
    } catch (error) {}
  };
  console.log(teamMateDetail, "teamdetailsllss");

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (text: any, res: any, i: any) => {
        return router.query.pagination
          ? (Number(router.query.pagination) - 1) *
              Number(router.query.limit || 10) +
              (i + 1)
          : i + 1;
      },
    },
    // {
    //     title: <Checkbox />,
    //     dataIndex: 'checkbox',
    //     key: 'checkbox',
    //     render: (text: any, res: any, index: any) => { return <Checkbox /> }
    // },
    {
      title: "Drop address",
      dataIndex: "drop_address",
      key: "drop_address",
      render: (text: any, res: any, index: any) => {
        return res?.drop_address ?? "N/A";
      },
    },
    {
      title: "Pickup Address",
      dataIndex: "pickup_address",
      key: "pickup_address",
      render: (text: any, res: any, index: any) => {
        return res?.pickup_address ?? "N/A";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any, res: any, index: any) => {
        return res?.status ?? "Completed";
      },
    },
    // {
    //     title: 'Action',
    //     dataIndex: 'action',
    //     key: 'action',
    //     render: (text: any, res: any, index: any) =>
    //         <Link href={`/driver/${res._id}/view`} className="fw-semibold"><Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" ><EyeOutlined /></Button></Link>

    // },
  ];
console.log(profileDriver);

  useEffect(() => {
    initData();
    initProfileDetails()
  }, [router.query._id]);
  return (
    <React.Fragment>
      <section className="teammates_detail">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify={"space-between"} align={"middle"}>
            <Col span={24}>
              <TypographyTitle level={4}>Driver Details</TypographyTitle>
            </Col>
            <Col span={24} lg={14} xl={12} xxl={12}>
              <Flex gap={20}>
                <Avatar
                  src={henceforthApi.FILES.imageOriginal(
                    teamMateDetail?.profile_pic,
                    profile.src
                  )}
                  size={128}
                />
                <ul className="list-unstyled p-0 m-0">
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Name:
                    </TypographyText>
                    <TypographyText className="fw-medium fs-16 text-capitalize">
                      {profileDriver?.name || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Email:
                    </TypographyText>
                    <TypographyText className="fw-medium fs-16">
                      {profileDriver?.email || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Phone no:
                    </TypographyText>
                    <TypographyText className="fw-medium fs-16">
                      {profileDriver?.country_code}{" "}
                      {profileDriver?.phone_no || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Role:
                    </TypographyText>
                    {/* <Dropdown menu={{ items: action }} > */}

                    <TypographyText className="fw-medium fs-16">
                      {`Driver`}
                    </TypographyText>
                    {/* </Dropdown> */}
                  </li>
                </ul>
              </Flex>
            </Col>
            <Col span={24} lg={10} xl={10} xxl={8}>
              <Space direction="vertical" className="w-100">
                <Flex gap={8}>
                  <Button
                    className="btn-secondary"
                    onClick={() => {
                      router.replace(
                        {
                          query: { ...router.query, dl_type: "deactivate" },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                    size="large"
                    block
                  >
                    {teamMateDetail?.is_active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    onClick={() => {
                      router.replace(
                        {
                          query: { ...router.query, dl_type: "delete" },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                    size="large"
                    block
                  >
                    Delete
                  </Button>
                </Flex>
              </Space>
            </Col>
          </Row>
          <Row justify={"center"} className="mt-4 mb-4">
            <Col span={24} className="text-center">
              <Table
                scroll={{ x: "100%" }}
                pagination={false}
                dataSource={teamMateDetail.data}
                columns={columns}
              />
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};
View.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default View;
