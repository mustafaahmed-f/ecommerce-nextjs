import { countries } from "../Coutries";

export async function getCountries(): Promise<string[]> {
  // const response = await fetch("https://www.apicountries.com/countries");
  // const countries = await response.json();
  // const finalCountries = countries.map((country: any) => {
  //   return country.name;
  // });
  const finalCountries = countries;
  return finalCountries;
}

export async function getCities(country?: string): Promise<string[]> {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/cities",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
      next: { revalidate: 3600 * 24 },
    },
  );
  const cities = await response.json();
  const finalCities = cities.error ? [] : cities.data;
  return finalCities;
}
