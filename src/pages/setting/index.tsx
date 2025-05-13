import HenceforthIcons from "@/components/HenceforthIcons";
import SettingCard from "@/components/SettingCard";
import MainLayout from "@/components/common/MainLayout";
import { GlobalContext } from "@/context/Provider";
import { Col, Row, TypographyTitle } from "@/lib/AntRegistry";
import { useRouter } from "next/router";
import React, { ReactElement, useContext } from "react";

const Setting = () => {
  const router = useRouter();
  const { userType } = useContext(GlobalContext);
  const data = [
    {
      icon: <HenceforthIcons.Teammates />,
      title: "Teammates",
      text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
      link: `/user/page/all/1`,
    },
    {
      icon: <HenceforthIcons.Departments />,
      title: "Departments",
      text: "Praesent ornare augue id diam tincidunt, ac ultrices dui ornare.",
      link: `/department/page/added/1`,
    },
    {
      icon: <HenceforthIcons.Privileges />,
      title: "Privileges",
      text: "Nulla condimentum dictum magna, et varius elit posuere vitae.",
      link: `/privilege/user/page/1`,
    },
    // {
    //     icon: <HenceforthIcons.Billing />,
    //     title: 'Billing',
    //     text: 'Maecenas non luctus ex. Fusce dignissim cursus viverra.',
    //     link: `/${user_type}/billing/page/1`
    // },
    {
      icon: <HenceforthIcons.CompanyDetails />,
      title: "Company Details",
      text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
      link: `/details`,
    },
    {
      icon: <HenceforthIcons.NotificationFill />,
      title: "Notification Settings",
      text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
      link: `/notification-setting/process`,
    },

    {
      icon: <HenceforthIcons.ImportExport />,
      title: "Import & Export",
      text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
      link: `/import/page/import/1`,
    },
    // {
    //   icon: <HenceforthIcons.ImportExport />,
    //   title: "Export",
    //   text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
    //   link: `/export/page/export/1`,
    // },
    {
      icon: <HenceforthIcons.SecurityPrivacy />,
      title: "Security & Privacy",
      text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
      link: `/content-page/security-and-privacy`,
    },
    {
      icon: <HenceforthIcons.TermsConditions />,
      title: "Terms & Conditions",
      text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
      link: "/content-page/terms-and-condition",
    },
    {
      icon: <HenceforthIcons.TermsConditions />,
      title: "Delete & Archieve",
      text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
      link: "/process/setting/deleted/1",
    },
    // {
    //   icon: <HenceforthIcons.TermsConditions />,
    //   title: "Schedule Process",
    //   text: "Maecenas non luctus ex. Fusce dignissim cursus viverra.",
    //   link: "/process/schedule/done/1",
    // },
    // {
    //     icon: <HenceforthIcons.DB />,
    //     title: 'DB Backup',
    //     text: 'Maecenas non luctus ex. Fusce dignissim cursus viverra.',
    //     link: `/${user_type}/db-backup/page/1`
    // },
  ];
  // const department = {
  //   icon: <HenceforthIcons.Departments />,
  //   title: "Departments",
  //   text: "Praesent ornare augue id diam tincidunt, ac ultrices dui ornare.",
  //   link: `/department/page/added/1`,
  // };
  // if (userType == "company" || userType == "admin") {
  //   data.splice(1, 0, department);
  // }
  

  return (
    <React.Fragment>
      <section className="alerts-activity">
        <div className="container-fluid">
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <TypographyTitle className="m-0" level={4}>
                Settings
              </TypographyTitle>
            </Col>
            {data.map((res, index) => (
              <Col key={index} span={24} md={12} lg={12} xl={8} xxl={8}>
                <SettingCard res={res} />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};
Setting.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Setting;
