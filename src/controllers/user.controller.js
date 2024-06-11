import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.model.js"//To check if user already exists 
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "Ok"
    // }) This is just to test in postman

    /* STEPS
    1. Get user details from frontend
    2. Validation - not empty, unique etc
    3. Check if user already exists - we can check by username or email
    4. Check for images, check for avatar
    5. Upload them to cloudinary, check avatar uploaded or not
    6. Create user object (mongodb stores data in object bcz its noSql) - create entry in db
    7. Remove password and refresh token field from response
    8. Check response whether user created or not
    9. Return response
    */
    const { fullName, email, username, password } = req.body
    console.log("Email: ", email)

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // Checking if user already exists
    const existedUser = User.findOne({
        $or : [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    // FIle handling
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0].path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

// Uploading takes time so use await
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

// Again check avatar because its a required field
    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // check if user created or not by checking if the id exists in db or not (mongoDB gives this id by itself only)
    const createUser = await User.findById(user._id).select(
        "-password -refreshToken" //select all other fields except these two
    )

    // if the user is not found in the db
    if(!createUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // Send response
    return res.status(201).json(
        new ApiResponse(200, createUser, "User has been registered successfully")
    )
})


export { registerUser }