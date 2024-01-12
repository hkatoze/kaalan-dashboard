import "./ChartModel.css";
import Chart from "react-apexcharts";
import {
  CompanyModel,
  endpoint,
  headers,
} from "../../../../../../../../../constants";
import axios from "axios";
import { useQuery } from "react-query";
export const ChartModel = () => {
  const fetchAllCompanies = () => {
    return axios.get(`${endpoint}/api/companies`, { headers: headers });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["all-companies-list"],
    queryFn: fetchAllCompanies,
  });

  const companies = () => {
    const companiesLocal: String[] = !isLoading
      ? data?.data.data.map((company: CompanyModel) => company.companyName)
      : [];
    return companiesLocal;
  };

  const alerts = () => {
    const alertsLocal: number[] = !isLoading
      ? data?.data.alertNumber.map((alertNumber: number) => alertNumber)
      : [];
    return alertsLocal;
  };
  const chartData = {
    options: {
      chart: {
        id: "alerts-analyse-chart",
      },
      xaxis: {
        categories: companies(),
      },
    },
    series: [
      {
        name: "series-1",
        data: [3, 10, 5, 1, 4],
      },
    ],
  };
  return (
    <div className="chart">
      <h3>Companies activity</h3>
      <Chart
        className="chart"
        options={chartData.options}
        series={chartData.series}
        type="bar"
        
      />
    </div>
  );
};
