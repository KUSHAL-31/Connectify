import axios from "axios";

export const loginCall = async (userIdentity, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("auth/login", userIdentity);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });

    }
}