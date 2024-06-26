import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import Cookies from "js-cookie";

import moment from "moment";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ParkingList = () => {
 const apiKey = Cookies.get("token");

 const { mutate } = useSWRConfig();
 const fetcher = async () => {
   const res = await axios.get(
     `http://localhost:5000/api/parkings?apiKey=${apiKey}`
   );
   return res.data;
 };

 const { data } = useSWR("parkingv1", fetcher);
 if (!data || !data.data) return <h2>Loading...</h2>;

 const parkingDatalOCAL = data.data;

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex flex-col mt-5">
            <div className="w-full mx-auto p-10">
              <div className="text-center">
                <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10">
                  List All Parking LOCAL
                </h1>
              </div>
              <div className="relative shadow rounded-lg mt-3">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="py-3 px-1 text-center">No</th>
                      <th className="py-3 px-6">Code</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6">Parking In</th>
                      <th className="py-3 px-6">Parking Out</th>
                      <th className="py-3 px-6">Total Time</th>
                      <th className="py-3 px-6">Price</th>
                      <th className="py-3 px-6">TransactionId</th>
                      <th className="py-3 px-6">Transaction Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parkingDatalOCAL.map((parkings, index) => (
                      <tr className="bg-white border-b" key={parkings.id}>
                        <td className="py-3 px-1 text-center">{index + 1}</td>
                        <td className="py-3 px-6 font-medium text-gray-900">
                          {parkings.code}
                        </td>
                        <td className="py-3 px-6">
                          <button class="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {parkings.status}
                          </button>
                        </td>
                        <td className="py-3 px-6">
                          {moment(parkings.parkingin)
                            .utc()
                            .add(7, "hours")
                            .format("YYYY-MM-DD HH:mm:ss")}
                        </td>

                        <td className="py-3 px-6">
                          {parkings.parkingout
                            ? moment(parkings.parkingout)
                                .utc()
                                .add(7, "hours")
                                .format("YYYY-MM-DD HH:mm:ss")
                            : "On Progress"}
                        </td>

                        <td className="py-3 px-6">
                          {parkings.totaltime !== null
                            ? `${parkings.totaltime} Hours`
                            : "On Progress"}
                        </td>
                        <td className="py-3 px-6">Rp.
                          {parkings.transactions
                            ? parkings.transactions.totalprice
                            : "N/A"}
                        </td>
                        <td className="py-3 px-6">
                          {parkings.transactions
                            ? parkings.transactions.transactionId
                            : "N/A"}
                        </td>
                        <td className="py-3 px-6">
                          {parkings.transactions
                            ? parkings.transactions.transactionstatus
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingList;
