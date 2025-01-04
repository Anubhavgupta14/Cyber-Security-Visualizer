import Headers from "./Header";
import { ProcessAPI, Const } from "../../utils/Constant";

export const createNode = async (body) => {
  const res = await fetch(Const.Link + "api/graph", {
    method: "POST",
    body: body,
  });
  return res.json();
};

export const allList = async (searchParams) => {
  const res = await fetch(
    Const.Link + `api/graph?search=${searchParams?.search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return ProcessAPI(res);
};

export const getNodeById = async (id) => {
  const res = await fetch(Const.Link + `api/graph/${id}`, new Headers("GET"));
  return ProcessAPI(res);
};

export const editNode = async (id, body, agentId) => {
  const res = await fetch(Const.Link + `api/users/${id}/nodes/${agentId}`, {
    method: "PUT",
    body: body,
  });
  return res.json();
};
