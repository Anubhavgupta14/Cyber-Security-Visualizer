import React, { useState, useEffect } from "react";
import GraphContainer from "@/components/Graph/GraphContainer";
import { allList } from "./api/endpoint";
import { Toaster, toast } from 'sonner'

const index = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  
  const fetchData = async () => {
    const response = await allList(searchParams);
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, [update]);


  return (
    <>
    <Toaster />
    <main className="min-h-screen">
      <GraphContainer data={data} setUpdate={setUpdate} />
    </main>
    </>
  );
};

export default index;
