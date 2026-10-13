import mongoose from "mongoose";
const UserDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: 50,

  },
  age: {
    type: String,
    required: [true, "age is required"],
    trim: true
  },
  bio: {
    trpe: String,
    required: [true, "Bio is most important"]
  },
  education: {
    type: String,
    required: [true, "Education is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  skills: {
    type: Array,
    required: [true, "Skills are required"]
  },
  Certificate: {
    type: String,
    required: [true, "Certificate is required"],
    default: "No certificate"
  },
  contactNumber: {
    type: String,
    required: [true, "Number is required"],
    default: "No numbers",
    maxlength: 11
  }

},
  {
    timestamps: true,
  }
)
const UserDetails = mongoose.model("UserDetails", UserDetailsSchema)
export default UserDetails