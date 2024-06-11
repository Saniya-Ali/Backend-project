import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) right now we dont need a unique suffix
        //   cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
        // usually we shouldn't use it bcz we can have multiple files with the same name. But we're only keeping the file on local storage for a very small time so we won't have a problem
    }
    // from the callback we will get the filepath
})

export const upload = multer({ storage: storage })