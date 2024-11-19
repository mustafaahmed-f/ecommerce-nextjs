export async function checkUserInDB(googleUser: any) {
  const { email, image, name } = googleUser;
  await fetch(`${process.env.NEXTAUTH_URL}api/user/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
      image,
    }),
  });
}
