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
const View = (props: any) => {
  const [teamMateDetail, setTeamMateDetails] = useState(props as any);
  const router = useRouter();

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (text: any, res: any, i: any) => {
        return router.query.process_page
          ? (Number(router.query.process_page) - 1) *
              Number(router.query.limit || 10) +
              (i + 1)
          : i + 1;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text: any, res: any, i: any) => {
        return res?.title;
      },
    },
    {
      title: "Created on",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: any, res: any, i: any) => {
        return dayjs(res?.created_at).format("DD/MM/YYYY");
      },
    },
    {
      title: "Updated on",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text: any, res: any, i: any) => {
        return dayjs(res?.updated_at).format("DD/MM/YYYY");
      },
    },
    {
      title: "Last Completed",
      dataIndex: "completed_at",
      key: "completed_at",
      render: (text: any, res: any, i: any) => {
        return res?.completed_at
          ? dayjs(res?.completed_at).format("DD/MM/YYYY")
          : "N/A";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any, res: any, i: any) => {
        return res?.status;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, res: any, index: any) => {
        return (
          <Fragment>
            {res.status == "PENDING" ? (
              "InProgress"
            ) : (
              <Link
                href={`/process/${res._id}/details`}
                className="fw-semibold"
              >
                <Button
                  type="text"
                  className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent"
                  size="small"
                >
                  <EyeOutlined />
                </Button>
              </Link>
            )}
          </Fragment>
        );
        // return <Dropdown menu={{ items: actions(res) } as any} >
        //     <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" ><HenceforthIcons.MoreFill /></Button>
        // </Dropdown>
      },
    },
  ];

  return (
    <React.Fragment>
      <section className="teammates_detail">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify={"space-between"} align={"middle"}>
            <Col span={24}>
              <TypographyTitle level={4}>User Details</TypographyTitle>
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
                      {teamMateDetail?.name || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Email:
                    </TypographyText>
                    <TypographyText className="fw-medium fs-16">
                      {teamMateDetail?.email || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Phone no:
                    </TypographyText>
                    <TypographyText className="fw-medium fs-16">
                      {teamMateDetail?.country_code}{" "}
                      {teamMateDetail?.phone_no || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Role:
                    </TypographyText>
                    {/* <Dropdown menu={{ items: action }} > */}

                    <TypographyText className="fw-medium fs-16">
                      {capitalizeFirstLetter(teamMateDetail?.role)}
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
        </div>
      </section>
    </React.Fragment>
  );
};
View.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    console.log(context, "context");
    const accessToken = parseCookies(context.req.cookies)[
      COOKIES_ADMIN_RAIZE_ACCESS_TOKEN
    ];
    if (accessToken) {
      henceforthApi.setToken(accessToken);
    }
    const apiRes = await henceforthApi.Users.details(
      context.query._id as string
    );
    console.log(apiRes, "apiiiiiiiii");

    return { props: { ...apiRes.data } };
  } catch (error) {
    return {
      props: {
        storeDetail: null,
        error: "Failed to fetch company detail",
      },
    };
  }
};
export default View;
