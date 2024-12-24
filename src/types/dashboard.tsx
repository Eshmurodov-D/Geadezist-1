// src/types/dashboard.ts

export interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  title: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderWidth: number;
    borderColor: string;
    tension: number;
  }[];
}

export interface ChartOptions {
  scales: {
    y: {
      beginAtZero: boolean;
    };
  };
}