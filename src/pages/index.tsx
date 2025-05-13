import MainLayout from "@/components/common/MainLayout";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Flex,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  TypographyText,
  TypographyTitle,
  Upload,
} from "@/lib/AntRegistry";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import AlertCard from "@/components/AlertCard";
import HenceforthIcons from "@/components/HenceforthIcons";
import StatsCard from "@/components/StatesCard";
import ActivityCard from "@/components/ActivityCard";
import ProcessSchedule from "@/components/ProcessSchedule";
import { GlobalContext } from "@/context/Provider";
import { useRouter } from "next/router";
import henceforthApi from "@/utils/henceforthApi";
import Link from "next/link";
import { Form, Select } from "antd";
import dynamic from "next/dynamic";
const MyBarChart = dynamic(() => import("@/components/MyBarChart"), {
  ssr: false,
});
const Home = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [formIgnore] = Form.useForm();
  const { raize: imgText, Video,Toast } = useContext(GlobalContext);
  // const imgText = raize.processText.map((element: any, index: any) => {
  //   return {
  //     img: raize.processImg[index],
  //     text: element,
  //   };
  // });
  const [data, setData] = useState({
    total_count: 0,
    data: [],
  });

  const dates = [
    {
      day: "Sun",
      count: dayjs().weekday(0).format("DD"),
    },
    {
      day: "Mon",
      count: dayjs().weekday(1).format("DD"),
    },
    {
      day: "Tue",
      count: dayjs().weekday(2).format("DD"),
    },
    {
      day: "Wed",
      count: dayjs().weekday(3).format("DD"),
    },
    {
      day: "Thu",
      count: dayjs().weekday(4).format("DD"),
    },
    {
      day: "Fri",
      count: dayjs().weekday(5).format("DD"),
    },
    {
      day: "Sat",
      count: dayjs().weekday(6).format("DD"),
    },
  ];
  const today = dayjs(); // Get current date
  const adjustedDates = [];
  // Generate dates array: one day before today and next 5 days
  for (let i = -1; i <= 5; i++) {
    const date = today.add(i, "day"); // Add/subtract days from today
    const dayLabel = date.format("ddd"); // Get day name (Sun, Mon, etc.)
    const dayNumber = date.format("DD"); // Get day number (e.g. 13)
    const timestamp = date.valueOf(); // Get Unix timestamp (seconds)

    adjustedDates.push({
      day: dayLabel,
      count: dayNumber,
      isToday: i === 0, // Check if this is today
      timestamp, // Store the timestamp for the current date
    });
  }
  
  const [scheduledProcess, setScheduledProcess] = useState([]);
  const [state, setState] = useState({
    activities: [],
    alert: [],
    completed_processes: 0,
    department_process: 0,
    my_processes: 0,
    scheduled_process: [],
    total_department_process: 0,
    total_processes: 0,
    total_members: 0,
    total_department: 0,
  });
  const [alertData , setAlertData] = useState([])
  const getCurrentDayIndex = () => {
    const today = dayjs();
    return today.day(); // Returns index (0 = Sunday, 6 = Saturday)
  };
  const [selectedDate, setSelectedDate] = useState(getCurrentDayIndex);

  const statsData = [
    {
      count: 7,
      statsName: "Total Users",
      href: `/user/page/1`,
    },
    {
      count: 3,
      statsName: "Total Drivers",
      href: `/driver/page/1`,
    },
    
  ];


 
  console.log(adjustedDates,"assss");
  

  const arr = [
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ];
  const person = {
    name: "jhon",
    age: 23,
  };
  const student: any = {
    id: 222,
    gpa: 23,
  };
  Object.setPrototypeOf(student, person);

  const person1 = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue",
  };

  // Create Source Object
  const person2 = { firstName: "Anne", lastName: "Smith" };

  // Assign Source to Target
  Object.assign(person1, person2);

  const personObj = {
    firstName: "John",
    lastName: "Doe",
    language: "EN",
  };

  // Change a Property
  Object.defineProperty(personObj, "language", { value: "NO" });

  const [loading, setLoading] = useState(false);

  const fetchProcessSchedule = async (res:any) => {
    debugger
    try {
      router.replace({
        query: { ...router.query, date: res?.timestamp },
      });
    } catch (error) {}
  };
  const [openModal, setOpenModal] = useState(false);
  const [rejectId, setRejectedId] = useState("");
  const [openModalIgnore, setOpenModalIgnore] = useState(false);
  const [processIgnoreId, setProcessIgnoreId] = useState("");
  

  // React.useEffect(() => {
  //   initData();
  //   workLoad(router?.query?.type ? router?.query?.type : "WEEKLY");
  // }, []);
  // React.useEffect(() => {
  //   initProcessSchdule();
  // }, [router.query.date]);

console.log( dayjs().date(),"dayjs().date()dayjs().date()");

  return (
    <>
      <section className="dashboard_section">
        <Spin spinning={loading}>
        <div className="container-fluid">
          <Row gutter={[24, 24]}>
            <Col span={24} lg={12} xl={12} xxl={12}>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <Flex
                    className="title mb-1"
                    justify="space-between"
                    align="center"
                  >
                    <TypographyTitle level={5} className="m-0">
                      Alerts
                    </TypographyTitle>
                    {state?.alert?.length > 6 && (
                      <Link href={`/alerts-activity/page/alert/1`}>
                        <Button
                          type="text"
                          className="text-secondary d-flex align-items-center gap-1 fs-12 p-0"
                        >
                          View All <HenceforthIcons.ChevronRight />
                        </Button>
                      </Link>
                    )}
                  </Flex>
                </Col>
                {/* <Spin spinning={loading} className="w-100"> */}

                {Array.isArray(state?.alert) && state?.alert?.length ? (
                  state?.alert?.slice(0, 6)?.map((res: any, index: any) => (
                    <Col key={index} span={24}>
                      <AlertCard
                        {...res}
                        setOpenModal={setOpenModal}
                        setRejectedId={setRejectedId}
                      />
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <div className="text-center">
                      <Empty description="No Alerts" />
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
            <Col span={24} lg={12} xl={12} xxl={12}>
              <Row gutter={[16, 16]} className="mb-4 pb-2">
                {/* Stats Card */}
                {statsData.map((res: any, index: any) => (
                  <Col key={index} span={24} md={12} lg={12} xl={12} xxl={12}>
                    <Link href={res?.href}>
                      <StatsCard res={res} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>

        </Spin>
      </section>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Home;
