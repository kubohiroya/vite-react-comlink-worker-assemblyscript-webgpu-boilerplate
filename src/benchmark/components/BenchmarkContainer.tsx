import { Typography } from "@mui/material";
import { Grid } from "@mui/system";
import React, { ReactNode } from "react";

export const BenchmarkContainer = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Grid container spacing={2} height={290}>
      <Grid
        container
        size={{ xs: 2 }}
        alignContent={"center"}
        justifyContent={"end"}
      >
        <Typography fontSize={20}>{title}</Typography>
      </Grid>
      {React.Children.map(children, (child) => (
        <Grid
          container
          size={{ xs: 5 }}
          alignContent={"center"}
          justifyContent={"center"}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
};
