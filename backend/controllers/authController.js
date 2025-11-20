const User = require("../models/User")


// ============================================
// 1. REGISTER USER
// ============================================

exports.registerUser  = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        if (!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                success: false, 
                message: 'Password must be at least 6 characters'
            });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser){
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        await newUser.save();

        const token = newUser.generateAuthToken();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token, 
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch(error){
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error', 
            error: error.message 
        });
        
    }
}

// ============================================
// 2. LOGIN USER    
// ============================================


