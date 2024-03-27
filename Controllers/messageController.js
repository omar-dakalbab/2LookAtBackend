const Message = require('../Models/Message');

const sendMessage = async (req, res) => {
    const { sender, receiver, content } = req.body;

    try {
        const newMessage = await Message.create({
            sender,
            receiver,
            content
        });

        return res.status(201).json({
            message: 'Message sent successfully',
            data: newMessage
        });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getMessages = async (req, res) => {
    const { sender, receiver } = req.query;

    try {
        const messages = await Message.find({ sender, receiver }).sort({ createdAt: 'desc' });

        return res.status(200).json({
            messages,
            message: 'Messages retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMessage = await Message.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    deleteMessage
};
