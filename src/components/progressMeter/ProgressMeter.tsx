import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export const ProgressMeter = ({
  value,
  valueMax,
}: {
  value: number;
  valueMax: number;
}) => {
  return (
    <Gauge
      width={200}
      height={200}
      value={value}
      valueMax={valueMax}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
          transform: "translate(0px, 0px)",
        },
      }}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
    />
  );
};
