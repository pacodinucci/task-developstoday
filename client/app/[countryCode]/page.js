"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import PopulationChart from "@/components/population-chart";
import { ArrowBigLeft } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

function CountryInfoPage() {
  const params = useParams();
  const router = useRouter();
  const countryCode = params.countryCode;
  const [countryInfo, setCountryInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios(
      `${process.env.NEXT_PUBLIC_API_URL}country?countryCode=${countryCode}`
    ).then((response) => setCountryInfo(response.data));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(countryInfo);
  }, [countryInfo]);

  const handleClickOnCountry = (countryCode) => {
    router.push(`/${countryCode}`);
  };

  return (
    <>
      {!countryInfo.flag ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ClipLoader />
        </div>
      ) : (
        <div className="p-8">
          <div className="flex items-center justify-between px-8 pb-4">
            <h1 className="text-7xl font-semibold text-neutral-800 self-end">
              {countryInfo.name}
            </h1>
            <Image
              src={countryInfo.flag}
              alt="country flag image"
              width={200}
              height={0}
            />
          </div>
          <Separator />
          <div className="p-8">
            <div className="flex justify-between">
              <h3 className="text-4xl">Border Countries</h3>
              <div
                className="text-neutral-800 cursor-pointer flex items-center gap-x-2 hover:text-blue-500"
                onClick={() => router.push("/")}
              >
                <ArrowBigLeft />
                Back to Home
              </div>
            </div>
            {countryInfo?.borders?.length === 0 ? (
              <h4 className="py-2 text-lg">
                This country has no border countries as it is an island.
              </h4>
            ) : (
              <ul className="py-6 flex flex-wrap gap-4">
                {countryInfo?.borders?.map((b) => (
                  <li
                    className="text-2xl text-neutral-800 py-2 px-4 border-2 border-neutral-800 rounded-md cursor-pointer hover:text-blue-900 hover:border-blue-900 hover:bg-gray-100 transition-all duration-300"
                    onClick={() => handleClickOnCountry(b.countryCode)}
                  >
                    {b.commonName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-8">
            <h3 className="text-4xl pb-4">Population History</h3>
            <PopulationChart data={countryInfo.population} />
          </div>
        </div>
      )}
    </>
  );
}

export default CountryInfoPage;
