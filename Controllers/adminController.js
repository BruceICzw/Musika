const Advert = require('../Models/Advert');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config')
const fs = require('fs')

//get pending adverts
exports.getAllPendingAdverts = async (req, res) => {

    try {

        let adverts = await Advert.find({ approved: false })

        //Convert image paths to base64
        adverts = adverts.map(advert => {
            const imagePath = Buffer.from(advert.image, 'base64')
            const imageBuffer = fs.readFileSync(imagePath)
            const imageBase64 = imageBuffer.toString('base64')

            //replace the image with the base64 data
            return { ...advert._doc, image: imageBase64 }
        })
        res.status(200).json(adverts)
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
//approve an advert
exports.approveAdvert = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        jwt.verify(token, jwtSecret);

        const advertId = req.params.id; // Get the ID of the advert from the request parameters

        await Advert.findByIdAndUpdate(advertId, { approved: true });
        res.status(200).json({ message: 'Advert approved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Delete an Update
exports.deleteAdvert = async (req, res) => {
    try {
        const { id } = req.params;
        await Advert.findByIdAndDelete(id);
        res.status(200).json({ message: 'Advert deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}