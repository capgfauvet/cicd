import express, { Request, Response } from "express";
import ComputeUtil from "./util/compute.util";

const app = express();

app.get("/add/:a/:b", (request: Request, response: Response) => {
  const a = parseInt(request.params.a);
  const b = parseInt(request.params.b);
  const result = ComputeUtil.add(a, b);
  response.json(result);
});

app.get("/minus/:a/:b", (request: Request, response: Response) => {
  const a = parseInt(request.params.a);
  const b = parseInt(request.params.b);
  const result = ComputeUtil.minus(a, b);
  response.json(result);
});

app.get("/multiply/:a/:b", (request: Request, response: Response) => {
  const a = parseInt(request.params.a);
  const b = parseInt(request.params.b);
  const result = ComputeUtil.multiply(a, b);
  response.json(result);
});

app.get("/divide/:a/:b", (request: Request, response: Response) => {
  const a = parseInt(request.params.a);
  const b = parseInt(request.params.b);
  const result = ComputeUtil.divide(a, b);
  response.json(result);
});

const PORT = 8282;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Application: http://localhost:${PORT}`);
});
