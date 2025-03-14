import React from "react";

interface BarChartProps {
  data: { day: string; time: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxTime = Math.max(...data.map((d) => d.time), 1); // Ensure no division by zero
  const yAxisLabels = ["0", "30m", "1hr", "1.5hr", "2hr"]; // More labels can be added

  return (
    <div style={styles.chartContainer}>
      {/* Y-Axis */}
      <div style={styles.yAxis}>
        {yAxisLabels.reverse().map((label, index) => ( // Reverse labels to start from 0
          <div key={index} style={styles.yAxisLabel}>
            {label}
          </div>
        ))}
      </div>

      {/* Bars Container */}
      <div style={styles.barsContainer}>
        {data.map((d, index) => (
          <div key={index} style={styles.barContainer}>
            {/* Bar */}
            <div
              style={{
                ...styles.bar,
                height: `${(d.time / maxTime) * 100}%`, // Bars grow upwards
              }}
            >
              <span style={styles.timeLabel}>{d.time}m</span>
            </div>
            {/* X-Axis Label */}
            <div style={styles.dayLabel}>{d.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chartContainer: {
    display: "flex",
    alignItems: "flex-end", // Bars grow from bottom to top
    height: "350px",
    width: "100%",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#222", // Dark background for contrast
    position: "relative",
    color: "#fff",
  },
  yAxis: {
    display: "flex",
    flexDirection: "column-reverse", // Reverse to start from 0 at bottom
    justifyContent: "space-between",
    marginRight: "15px",
    height: "100%",
  },
  yAxisLabel: {
    fontSize: "14px",
    color: "#bbb",
  },
  barsContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
  },
  barContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "12%",
    height: "100%",
  },
  bar: {
    width: "60px",
    backgroundColor: "#4CAF50",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "height 0.5s ease-in-out",
    borderRadius: "6px",
  },
  timeLabel: {
    fontSize: "12px",
    color: "#fff",
    padding: "2px",
  },
  dayLabel: {
    marginTop: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
  },
};

export default BarChart;
