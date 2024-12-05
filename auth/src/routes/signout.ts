import express, { Request, Response } from "express";
const router = express.Router();

router.post("/signout", async (req: Request, res: Response) => {
  req.session = null;
  return res.status(200).json({
    message: "Logged out",
    data: null,
  });
});

export default router;
