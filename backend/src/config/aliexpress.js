import dotenv from "dotenv";

dotenv.config();

const aliexpressConfig = {
  appKey: process.env.ALIEXPRESS_APP_KEY,
  appSecret: process.env.ALIEXPRESS_APP_SECRET,
  trackingId: process.env.ALIEXPRESS_TRACKING_ID,
};

export default aliexpressConfig;
