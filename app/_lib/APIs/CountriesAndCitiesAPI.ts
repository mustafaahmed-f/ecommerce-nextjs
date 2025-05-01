export async function getCountries(): Promise<string[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  const finalCountries = countries.map((country: any) => {
    return country.name.common;
  });
  return finalCountries;
}

export async function getCities(country?: string): Promise<string[]> {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/cities",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    },
  );
  const cities = await response.json();
  const finalCities = cities.error ? [] : cities.data;
  return finalCities;
}
