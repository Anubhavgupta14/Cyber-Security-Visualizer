import React, { useState, useEffect } from "react";
import GraphContainer from "@/components/Graph/GraphContainer";
import { allList } from "./api/endpoint";
import { Toaster, toast } from 'sonner'
import { Const } from "../utils/Constant";

const index = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchParams, setSearchParams] = useState({search:""});
  console.log(searchParams,"searchParams");
  const fetchData = async () => {
    const response = await allList(searchParams);
    // const res = await fetch(
    //     Const.Link + `api/graph?search=${searchParams}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, [update, searchParams]);

  const handleSearch = (search) => {
    console.log(search,"search");
    setSearchParams((prev)=>({...prev,search}));
  }



  return (
    <>
    <Toaster />
    <main className="min-h-screen">
      <GraphContainer data={data} setUpdate={setUpdate} handleSearch={handleSearch} />
    </main>
    </>
  );
};

export default index;
