import mongoose from "mongoose";

// Interface to describe properties required to create a user
interface UserAttributes {
    email: string;
    password: string;
};

// Interface that describes properties those a User model has - 
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttributes): UserDoc;
}

// Interface that describes properties that a User document has - 
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.statics.build = (attrs: UserAttributes) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };