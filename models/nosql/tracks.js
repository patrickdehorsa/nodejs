const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")
const TracksScheme = new mongoose.Schema(
    {
        name:{
            type:String
        },
        album:{
            type:String
        },
        cover:{
            type:String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERRROR_URL",
            },
        },
        artist:{
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },
        duration: {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Implementar metodo propio con relacion a storage

TracksScheme.statics.findAllData = function () {
    
    const joinData = this.aggregate([ // Tracks
        {
            $lookup: {
                from: "storages", // Tracks --> storages
                localField: "mediaId", // Tracks.mediaId
                foreignField: "_id", // Storages._id
                as: "audio" // Alias audio
            }
        },
        {
            $unwind:"$audio"
        }
    ]);
    return joinData;
}

TracksScheme.statics.findOneData = function (id) {
    
    const joinData = this.aggregate([ // Tracks
                {       
                    $match: {
                        _id: mongoose.Types.ObjectId(id),
                        },  
                },  
                {         
                    $lookup: {
                    from: "storages", // Tracks --> storages
                    localField: "mediaId", // Tracks.mediaId
                    foreignField: "_id", // Storages._id
                    as: "audio" // Alias audio
                }
                },
                {
                $unwind:"$audio"
                }
    ]);

    return joinData;
}


TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("tracks",TracksScheme);

// ejemplo tracks
// {
//     "name": "Leifer",
//     "album": "Album",
//     "cover": "http://ttt.com",
//     "artist": {
//         "name": "Leiferr",
//         "nickname": "test",
//         "nationality": "french"
//         },
//     "duration": {
//         "start": 1,
//         "end": 0
//     },
//     "mediaId": "612e7499a1f699063f5114bc" 
// }