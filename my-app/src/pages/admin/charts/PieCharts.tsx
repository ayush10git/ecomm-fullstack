import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";

const categories = [
  {
    value: 40,
    heading: "Laptops",
  },

  {
    value: 100,
    heading: "Shoes",
  },
  {
    value: 80,
    heading: "Cameras",
  },
  {
    value: 60,
    heading: "Jeans",
  },
];

const PieCharts = () => {
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 9, 13]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order Fulfillment Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
              backgroundColor={categories.map(
                (i) => `hsl(${i.value * 4},${i.value}%, 50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
          <h2>Product category ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["In Stock", "Out of Stock"]}
              data={[40, 20]}
              backgroundColor={["hsl(269, 80%, 40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2>Stock availability</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 8, 5, 20, 25]}
              backgroundColor={[
                "hsl(110, 80%, 40%)",
                "hsl(19, 80%, 40%)",
                "hsl(69, 80%, 40%)",
                "hsl(300, 80%, 40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>
        <section>
          <div>
            <PieChart
              labels={[
                "Teenager (Below 20)",
                "Adult (20 - 40)",
                "Elder (Above 40)",
              ]}
              data={[30, 250, 70]}
              backgroundColor={[
                `hsl(110,${80}%, 80%)`,
                `hsl(110,${80}%, 50%)`,
                `hsl(110,${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users age group</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[40, 250]}
              backgroundColor={["hsl(335, 100%, 38%)", "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
