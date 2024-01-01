"use server"
import jwt, { JwtPayload } from "jsonwebtoken";


export const createInviteToken = async (email: string, inviteId: string, options = {}) => {
    return jwt.sign({ email, inviteId }, process.env.NEXTAUTH_SECRET as string, options);
}

export const verifyInviteToken = (token: string): { email: string, inviteId: string } => {
    try {
        const decoded = jwt.decode(token);
        const payload: JwtPayload = decoded as JwtPayload;
        const { email, inviteId } = payload;

        return {
            email,
            inviteId
        }
    } catch (error) {
        console.error("Error verifying invite token:", error);
        throw new Error("Invalid or expired invite token");
    }
}