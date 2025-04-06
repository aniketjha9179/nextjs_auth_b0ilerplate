import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../../models/userModel";
import { connect } from "../../../../dbConfig/dbConfig"; // Ensure the correct path
;

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;


        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }
        // checking if user exists  or not 
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "user does not exists, Invalid email " },
                { status: 401 }
            );
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid  password" },
                { status: 401 }
            );
        }

        //   token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // creating token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        const response = NextResponse.json({ message: "Login successful", success: true, token }, { status: 200 });
        response.cookies.set('token', token, {
            httpOnly: true,
        })
        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
