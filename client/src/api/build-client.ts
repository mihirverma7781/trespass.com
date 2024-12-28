import axios from "axios";

export default ({ headers }: { headers: Headers }) => {
  const parsedHeaders = Object.fromEntries(headers.entries());

  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",

    headers: parsedHeaders,
  });
};
