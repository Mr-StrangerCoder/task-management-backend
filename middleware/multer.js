const multer = require('multer')
const path = require('path')
const fs = require('fs')


const uploadPath = path.join(__dirname, '../upload')


if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)  
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
        console.log("*****file*******", file)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only image files allowed"), false)
    }
}

const upload = multer({ storage, fileFilter })

module.exports = upload