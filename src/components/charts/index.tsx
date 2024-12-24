// components/ChartSection.tsx
import React, { useState, useEffect } from "react";
import { Select, Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { getChartData } from "./ChartSection.logic";
const { Option } = Select;
const ChartSection: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [optionSelected, setOptionSelected] = useState("0");
  const [headerChart, setHeaderChart] = useState(
    "Tháng " + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
  );
  const [title, setTitle] = useState("Bảng thống kê theo ngày");
  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    async function getData() {
      let tempData = await getChartData(optionSelected);
      console.log(new Date().getMonth() - 1);
      console.log(tempData);
      setData(tempData);
    }
    getData();

    // Cập nhật tiêu đề chính theo giá trị được chọn
    switch (optionSelected) {
      case "0":
        setTitle("Bảng thống kê theo ngày");
        break;
      case "1":
        setTitle("Bảng thống kê theo tuần");
        break;
      case "2":
        setTitle("Bảng thống kê theo tháng");
        break;
      default:
        setTitle("Bảng thống kê");
    }
  }, [optionSelected]);
  return (
    <div
      style={{
        padding: "16px",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <div>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Text type="secondary">{headerChart}</Typography.Text>
        </div>
        <Select
          defaultValue="Ngày"
          style={{ width: 120 }}
          onChange={(value) => setOptionSelected(value)}
        >
          <Option value="0">Ngày</Option>
          <Option value="1">Tuần</Option>
          <Option value="2">Tháng</Option>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              backgroundColor: "#4A90E2",
              color: "#fff",
            }}
            // formatter={(value: number) => value.toLocaleString()}
            content={({ payload }) => {
              return (
                <div className="custom-tooltip">
                  {payload && payload[0]?.value}
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4A90E2"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4A90E2"
            dot={{ stroke: "#4A90E2", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;
