"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const countries = axios("http://localhost:3000").then((response) =>
      setCountries(response.data)
    );
  }, []);

  const handleClickOnCountry = (countryCode) => {
    router.push(`/${countryCode}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-center text-white text-4xl sm:text-7xl py-8 bg-blue-500 w-full">
        Available Countries
      </h1>
      {/* <Separator className="h-2 mx-24" /> */}
      <ul className="py-16 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
        {countries?.map((country) => (
          <li
            className="px-4 py-2 rounded-md border-2 border-neutral-700 cursor-pointer font-semibold text-center text-neutral-800 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis"
            onClick={() => {
              handleClickOnCountry(country.countryCode);
            }}
          >
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
