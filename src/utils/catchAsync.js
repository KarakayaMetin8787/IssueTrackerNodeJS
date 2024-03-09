export function catchAsync(
  controllerFn,
  // { message = "Internal server error" }
) {
  return (req, res) =>
    controllerFn(req, res).catch((error) => {
      res
        .status(500)
        .json({ succes: false, error });
    });
}

// example usage
// const postRegisterController = catchAsync(async (req, res) => {
//   const result = await UserService.registerUser();
//   res.json({ success: true, result });
// });

// userRouter.post("/register", postRegisterController);
