import admin from "@/lib/firebase/admin";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    // verify firebase jwt
    const decodeToken = await admin.auth().verifyIdToken(token);

    return Response.json({
      success: true,
      user: decodeToken,
    });
  } catch (error) {
    console.error("Google login error", error);

    return Response.json(
      {
        success: false,
        message: "unauthorized",
      },
      { status: 401 },
    );
  }
}
