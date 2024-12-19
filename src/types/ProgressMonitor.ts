export type ProgressMonitor = (params: {
  value: number;
  valueMax: number;
}) => Promise<void>;
