export const constants = {
  localStorageToken: "fdlToken",
};

export const loader = (color = "white", size = 30) => (
  <></>
  // <CircularProgress size={size} sx={{ color: color }} />
);

export const calculateTimeDifference = (created_at: string): string => {
  const currentTime = new Date();
  const createdTime = new Date(created_at);
  const timeDifferenceInSeconds = Math.abs(
    (currentTime.getTime() - createdTime.getTime()) / 1000
  );
  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds.toFixed(0)} seconds ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
    return `${timeDifferenceInMinutes.toFixed(0)} minutes ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const timeDifferenceInHours = timeDifferenceInSeconds / 3600;
    return `${timeDifferenceInHours.toFixed(2)} hours ago`;
  } else {
    const timeDifferenceInDays = timeDifferenceInSeconds / 86400;
    return `${timeDifferenceInDays.toFixed(2)} days ago`;
  }
};
