import { google } from "googleapis";
import { JWT } from "google-auth-library";

// Google Analytics API Scopes
const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

// Load environment variables (No need to import dotenv)
const PROPERTY_ID = "478275880";
const CLIENT_EMAIL = "codage-habitation@codage-habitation.iam.gserviceaccount.com";
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!CLIENT_EMAIL || !PRIVATE_KEY || !PROPERTY_ID) {
  throw new Error("Missing Google Analytics environment variables.");
}

// Authenticate with Google API
const auth = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: SCOPES,
});

const analyticsData = google.analyticsdata({
  version: "v1beta",
  auth,
});

export async function getMonthlyUsers() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  try {
    const response = await analyticsData.properties.runReport({
      property: `properties/${PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: firstDayOfMonth, endDate: lastDayOfMonth }],
        metrics: [{ name: "activeUsers" }],
      },
    });

    return response.data.rows?.[0]?.metricValues?.[0]?.value || "0";
  } catch (error) {
    console.error("Google Analytics API Error:", error);
    return "0";
  }
}
