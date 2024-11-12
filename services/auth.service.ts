export async function authLogin(email: string, password: string): Promise<any> {
  console.log(email, password, JSON.stringify({ email, password }));
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL_AUTH}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  console.log(response);
  const json = await response.json();
  console.log(json);
  if (response.ok) {
    console.log(json);
    return json;
  }
  throw new Error(json?.error || "Failed to login");
}
