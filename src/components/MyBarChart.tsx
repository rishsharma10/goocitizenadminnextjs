import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",

    pv: 2400,
    amt: 24,
  },
  {
    name: "Page B",

    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",

    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",

    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",

    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  //   {
  //     name: "Page A1",

  //     pv: 2400,
  //     amt: 24,
  //   },
  //   {
  //     name: "Page B1",

  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C1",

  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D1",

  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E1",

  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F1",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G1",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },

  //   {
  //     name: "Page A2",

  //     pv: 2400,
  //     amt: 24,
  //   },
  //   {
  //     name: "Page B2",

  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C2",

  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D2",

  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E2",

  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F2",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G2",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },

  //   {
  //     name: "Page A3",

  //     pv: 2400,
  //     amt: 24,
  //   },
  //   {
  //     name: "Page B3",

  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C3",

  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D3",

  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E3",

  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F3",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G3",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
];

export default function MyBarChart(props: any) {
  console;
  const CustomRoundedBackgroundBar = (props: any) => {
    const { x, y, width, height } = props;
    const radius = 10;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill="#f1e0e7"
      />
    );
  };

  const CustomRoundedBar = (props: any) => {
    return <rect {...props} rx="10" ry="10" />;
  };
  let count = 7;
  let lef =
    (570 - 10 * props?.data?.total_count) / (props?.data?.total_count + 1);
  console.log(props, "lelelele");

  const CustomTooltip = ({ active, payload, label }: any) => {
    console.log(payload, "payload");
    
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`No of Hr: ${payload[0]?.payload?.hours_work_load}`}</p>
          <p className="intro">{`No of Process: ${payload[0]?.payload?.process_count}`}</p>
          {/* <p className="desc">{`Amount: ${payload[1] ? payload[1].value : 'N/A'}`}</p> */}
        </div>
      );
    }

    return null;
  };
  const filteredWorkload = props.data?.data?.map((day:any) => {
    return{
      hours_work_load:day?.hours_work_load > 8 ? 8 : day?.hours_work_load,
      process_count:day?.process_count,
      name:day?.name
    }
  } );
  //   lef=50
  console.log(filteredWorkload,"filteredWorkloadfilteredWorkload");
  
  const formatName = (name: string) => {
    debugger
    if (name.length > 3) {
      return name?.slice(0, 3);
    }
    return name;
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
    <BarChart
      width={570}
      height={300}
      data={filteredWorkload}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
      barSize={10}

    >
      <XAxis tickFormatter={(value: any) => formatName(value)}  dataKey="name" scale="point" padding={{ left: lef, right: lef }} />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      {/* <CartesianGrid  /> */}
      <Bar
        dataKey="hours_work_load"
        name={`Hours work load`}
        fill="#b971f9"
        background={<CustomRoundedBackgroundBar />}
        shape={<CustomRoundedBar />}
      />
    </BarChart>
    </ResponsiveContainer>
  );
}
