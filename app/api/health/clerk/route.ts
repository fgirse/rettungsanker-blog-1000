import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId, sessionId } = await auth();
    const user = await currentUser();

    return Response.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      authenticated: !!userId,
      hasUserData: !!user,
      userId,
      sessionId,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.username || `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      publicMetadata: user?.publicMetadata,
      clerkLoaded: true,
    });
  } catch (error: any) {
    console.error("❌ Health check error:", error);
    return Response.json({
      status: "error",
      timestamp: new Date().toISOString(),
      message: error.message,
      clerkLoaded: false,
    }, { status: 500 });
  }
}
