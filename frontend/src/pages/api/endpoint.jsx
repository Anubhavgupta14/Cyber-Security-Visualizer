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
  const res = await fetch(Const.Link + `api/graph/${id}/nodes/${agentId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  return ProcessAPI(res);
};

export const updateAgent = async (agentId, body) => {
  const res = await fetch(Const.Link + `api/graph/agents/${agentId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return ProcessAPI(res);
};

export const updateTool = async (toolId, body) => {
  const res = await fetch(Const.Link + `api/graph/tools/${toolId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return ProcessAPI(res);
};
