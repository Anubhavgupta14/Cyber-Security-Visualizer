import React, { useState, useEffect } from "react";
import GraphContainer from "../components/graph/GraphContainer";
import { allList } from "./api/endpoint";
import { Toaster, toast } from 'sonner'

const Index = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({search:""});
  console.log(searchParams,"searchParams");
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await allList(searchParams);
      setData(response);
    }
    catch (error) {
      console.error(error);
      toast.error('Error fetching data');
    }
    finally {
      setLoading(false);
    }
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
      <GraphContainer data={data} loading={loading} setUpdate={setUpdate} handleSearch={handleSearch} />
    </main>
    </>
  );
};

export default Index;
