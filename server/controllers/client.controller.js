import Client from '../models/client.model.js';

export const createClient = async (req, res) => {
    try {
        const { name, email, phone, address, notes } = req.body;
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized : User Id not found."
            })
        }

        const client = new Client({
            name,
            email,
            phone,
            address,
            notes,
            user: userId,
        })
        await client.save();

        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            client,
        });


    } catch (error) {
        console.error("client creation error :", error.message)
        res.status(400).json({
            success: false,
            message: 'Failed to create client',
            error: error.message,
        });
    }
}