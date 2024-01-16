export const test = (req: any, res: any) => {
  return res.json(req.user.userId);
};
