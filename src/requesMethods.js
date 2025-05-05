import axios from "axios";

const BASE_URL = "https://ecommerce-server-production-e4ae.up.railway.app/api";
// const BASE_URL = "https://ecommerce-api-virid.vercel.app/api";
// const BASE_URL = "http://localhost:5534/api";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDVhMDY3ZGVjNTQ5ZWJjZDFlY2ViMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjcxODQzNywiZXhwIjoxNzM0MDE0NDM3fQ.2ris9K5MZzKxEl_gsBbZAwnEIWASv66aNJT8kBsSNm0";

export const puplicRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
