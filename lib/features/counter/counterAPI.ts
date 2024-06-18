import NotificationMessage from "@/utils/NotificationMessage";
import apiCall from "@/utils/apiCall";
import apiEndPoint from "@/utils/apiEndPoint";

// A mock function to mimic making an async request for data
export const fetchCount = async (amount = 1) => {
  // const response = await fetch("http://localhost:3000/api/counter", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ amount }),
  // });
  // console.log("response---->", await response);
  // const result: { data: number } = await response.json();

  // return result;

  return { data: 15 };
  try {
    const response = await apiCall.get(
      apiEndPoint.getOtherUserProfile + "/",
      true
    );
    if (response?.status_code === 200) {
      // NotificationMessage("success", response?.message);
      return response;
    } else {
      NotificationMessage("warning", response?.message);
      return response;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
