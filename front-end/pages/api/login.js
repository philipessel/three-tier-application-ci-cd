// import { getSession } from "@/lib/session";
// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const session = await getSession(req, res);
//   const { email, password } = req.body; // Changed from username to email
//   const loginUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/login";

//   try {
//     const response = await axios.post(loginUrl, { email, password });

//     if (response.status === 200) {
//       const { user, api_token } = response.data;

//       session.user = user;
//       session.api_token = api_token;
//       await session.save();

//       return res.json({ logged_in: true });
//     }

//     const status = response.data.message;
//     const errors = response.data.errors;
//     return res.json({ status, logged_in: false, errors });
//   } catch (err) {
//     let status = "Something went wrong";
//     let errors = null;

//     console.error(err);

//     if (err.response) {
//       status = err.response.data.message;
//       errors = err.response.data.errors;
//     }

//     return res.json({ logged_in: false, status, errors });
//   }
// }

// // Remove this after project
// console.log("BACKEND_API_HOST:", process.env.BACKEND_API_HOST);
// console.log("NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);










import { getSession } from "@/lib/session";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getSession(req, res);
  const { email, password } = req.body;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    // 🔹 STEP 1: Get CSRF token before logging in
    await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`, { withCredentials: true });

    // 🔹 STEP 2: Login request (with credentials)
    const response = await axios.post(
      `${apiBaseUrl}/login`,
      { email, password },
      { withCredentials: true } // 🔥 VERY IMPORTANT for session auth
    );

    if (response.status === 200) {
      const { user } = response.data;

      session.user = user;
      await session.save();

      return res.json({ logged_in: true, user });
    }

    return res.json({ status: response.data.message, logged_in: false, errors: response.data.errors });
  } catch (err) {
    console.error(err);
    let status = "Something went wrong";
    let errors = null;

    if (err.response) {
      status = err.response.data.message;
      errors = err.response.data.errors;
    }

    return res.json({ logged_in: false, status, errors });
  }
}
