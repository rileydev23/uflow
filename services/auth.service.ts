export async function authLogin(email: string, password: string): Promise<any> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL_UFLOW}/api/auth/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  throw new Error(json?.error || "Failed to login");
}

export async function setNotificationToken(
  notificationToken: string,
  token: string,
  userId: string
): Promise<any> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL_UFLOW}/api/users/${userId}/notification-token/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ notificationToken }),
    }
  );

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  throw new Error(json?.error || "Failed to set notification token");
}
