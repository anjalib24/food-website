import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import viewsRouter from "./routes/views.routes.js";
import freeZipCodeRouter from "./routes/freeZipCode.routes.js";
import benchmarkRouter from "./routes/benchmark.routes.js";
import fixedShippingPriceRouter from "./routes/fixedShippingPrice.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/views", viewsRouter);
app.use("/api/v1/free-zip-codes", freeZipCodeRouter);
app.use("/api/v1/benchmarks", benchmarkRouter);
app.use("/api/v1/fixed-shipping-prices", fixedShippingPriceRouter);

export { app };
