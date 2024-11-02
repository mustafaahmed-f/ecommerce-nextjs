export async function refreshAccessToken(refreshToken: string) {
  try {
    // Example: Make a request to the OAuth provider's token endpoint
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const refreshedTokens = await response.json();
    return {
      access_token: refreshedTokens.access_token,
      expires_in: refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token || refreshToken, // Preserve old refresh token if none provided
    };
  } catch (error) {
    console.error("Error in refreshAccessToken:", error);
    throw error;
  }
}
