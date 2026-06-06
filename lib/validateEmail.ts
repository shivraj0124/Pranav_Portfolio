import axios from "axios";

export async function validateEmail(email: string) {

  try {

    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/`,
      {
        params: {
          api_key: process.env.ABSTRACT_API_KEY,
          email,
        },
      }
    );

    return response.data.deliverability === "DELIVERABLE";

  } catch (error) {

    return false;
  }
}