export default async function sendEmail() {
  try {
    await new Promise((res) => setTimeout(res, 1500));
    return { success: true };
  } catch (err) {
    console.error("Email failed:", err);
    return { success: false };
  }
}
