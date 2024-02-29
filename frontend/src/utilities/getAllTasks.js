//import { useEffect, useState } from "react";
import app from "./app";


export const getAllTasks = async () => {
  try {
    const response = await app.get("//localhost:5001/api/v1/tasks");
    const allTasks = response.data.tasks.map(({ _id, __v, ...task }) => ({
      id: _id,
      ...task
    }));
    return allTasks;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return []; // Return an empty array in case of error
  }
};

// export default function useUserInfo() {
//   const [tasks, setTasks] = useState();

//   useEffect(() => {
//     app
//       .get("//localhost:5001/api/v1/tasks")
//       .then((res) => {
//         setTasks(() => {
//           return res.data.tasks.map((task) => task);
//         });

//         //Object.keys(res.data.users).forEach(key => arr.push(res.data.users[key]))
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   return { tasks };
// }