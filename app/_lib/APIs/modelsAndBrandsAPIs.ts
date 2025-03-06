export async function getBrands() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/brands`, {
    next: { revalidate: 3600 * 24 },
  });
  // console.log("response", response.data);
  if (!response.ok) throw new Error("Couldn't get brands !!");

  return response.json();
}

export async function getModels() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/models`, {
    next: { revalidate: 3600 * 24 },
  });
  // console.log("response", response.data);
  if (!response.ok) throw new Error("Couldn't get models !!");

  return response.json();
}
