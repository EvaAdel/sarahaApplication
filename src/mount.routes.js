 import userRouter from "./modules/user/user.router.js";
 import massageRouter from "./modules/massage/massage.router.js";


 const mountRoutes = (app) => {
    app.use("/user", userRouter); 
    app.use("/massage", massageRouter);

  };

  export default mountRoutes;  