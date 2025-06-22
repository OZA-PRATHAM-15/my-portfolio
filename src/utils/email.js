export default async function sendEmail(data) {
  try {
    console.log("Sending email to pratham.oza10@gmail.com with data:", data);

    await new Promise((res) => setTimeout(res, 1500));

    return { success: true };
  } catch (err) {
    console.error("Email failed:", err);
    return { success: false };
  }
}
