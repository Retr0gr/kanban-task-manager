import { useEffect, useState } from "react";
import app from "./app";

export default function useUserInfo() {
    const [users, setUsers] = useState();

    useEffect(() => {
        app
            .get("//localhost:5001/api/v1/users")
            .then((res) => {
                setUsers(() => {
                    return res.data.users.map((user) => user);
                });

                //Object.keys(res.data.users).forEach(key => arr.push(res.data.users[key]))
            })
            .catch((err) => console.log(err));
    }, []);
    return { users };
}
