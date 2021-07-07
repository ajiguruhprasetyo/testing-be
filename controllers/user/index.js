import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email} );
        if (!user) {
            return res.status(401).json({error: 'Login failed! Check authentication credentials'});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({error: 'Invalid login credentials'});
        }

        const token = await user.generateAuthToken();
        res.status(200).json({ user,token });
    } catch (error) {
        res.status(400).json({error});
    }
}

export const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const userSave = await user.save();
        const token = await userSave.generateAuthToken();
        res.status(201).json({userSave,token});
    } catch (error) {
        res.status(400).json(error);
    }
}

export const profileUser = async(req, res) => {
    console.log(req.user.tokens);
    res.status(200).json('user login fuck');
}

export const logout = async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.status(200).json('has been logout');
    } catch (error) {
        res.status(400).json(error);
    }
}

export const logoutAll = async  (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.status(200).json('has been logout all device');
    } catch (error) {
        res.status(400).json(error);
    }
}