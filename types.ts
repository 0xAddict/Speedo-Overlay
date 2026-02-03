export interface LiveFeedData {
  location: string;
  temperature: string;
  windSpeed: string;
  time: string;
  date: string;
  duration: string;
}

export interface GoalsData {
  daily: {
    current: number;
    target: number;
  };
  monthly: {
    current: number;
    target: number;
  };
}