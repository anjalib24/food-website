import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import compression from "compression";
import helmet from "helmet";
// import { createProxyMiddleware } from "http-proxy-middleware";
// import { getShippoData } from "./utils/shippo.js";
// getShippoData();
const app = express();

// if (process.env.NODE_ENV === "production") {
//   app.use(
//     cors({
//       origin: process.env.PRODUCTION_APP_BASE_API,
//       credentials: true,
//     })
//   );
// } else {
//   app.use(
//     cors({
//       origin: `http://localhost:${process.env.PORT}`,
//       credentials: true,
//     })
//   );
// }

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
import shipmentRateStateRouter from "./routes/shipmentRateState.routes.js";
import dimensionsRouter from "./routes/dimensions.routes.js";
import taxRouter from "./routes/tax.routes.js";
import contactUsRouter from "./routes/contactUs.routes.js";
import { fileURLToPath } from "url";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/views", viewsRouter);
app.use("/api/v1/free-zip-codes", freeZipCodeRouter);
app.use("/api/v1/benchmarks", benchmarkRouter);
app.use("/api/v1/fixed-shipping-prices", fixedShippingPriceRouter);
app.use("/api/v1/shipment-rate-state", shipmentRateStateRouter);
app.use("/api/v1/dimensions", dimensionsRouter);
app.use("/api/v1/tax", taxRouter);
app.use("/api/v1/contact-us", contactUsRouter);

/* app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8000",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })
); */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* console.log(__dirname);

app.get("/admin/*", (req, res) =>
  res.sendFile(path.join(__dirname, "admin_ui.html"))
);
app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "shop_ui.html")));
 */
export { app };
