import multer from "multer";
import routes from "./routes";

const multerdVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" }); //이건 추천하지 않는 방식 이걸 아마존(AWS)에서 해줘야함

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerdVideo.single("videoFile"); //오직 하나의 파일만 upload할 수 있다는 것을 의미
export const uploadAvatar = multerAvatar.single("avatar");
