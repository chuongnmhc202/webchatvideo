/*
 Navicat Premium Dump Script

 Source Server         : Mongo_Local
 Source Server Type    : MongoDB
 Source Server Version : 60024 (6.0.24)
 Source Host           : localhost:27017
 Source Schema         : ChatDB

 Target Server Type    : MongoDB
 Target Server Version : 60024 (6.0.24)
 File Encoding         : 65001

 Date: 08/07/2025 18:19:26
*/


// ----------------------------
// Collection structure for messages
// ----------------------------
db.getCollection("messages").drop();
db.createCollection("messages");
db.getCollection("messages").createIndex({
    sender: Int32("1"),
    receiver: Int32("1"),
    timestamp: Int32("1")
}, {
    name: "sender_1_receiver_1_timestamp_1",
    background: true
});
db.getCollection("messages").createIndex({
    is_group: Int32("1")
}, {
    name: "is_group_1",
    background: true
});
db.getCollection("messages").createIndex({
    content_type: Int32("1")
}, {
    name: "content_type_1",
    background: true
});

// ----------------------------
// Documents of messages
// ----------------------------
db.getCollection("messages").insert([ {
    _id: ObjectId("686bd73a1e6e411596b79ea0"),
    sender: "03351288670",
    receiver: "0333657670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hi",
    timestamp: ISODate("2025-07-07T14:18:34.504Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686bd7631e6e411596b79ea6"),
    sender: "0333657670",
    receiver: "03351288670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hả",
    timestamp: ISODate("2025-07-07T14:19:15.166Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686bd7951e6e411596b79eaa"),
    sender: "0333657670",
    receiver: "03351288670",
    is_group: false,
    content_type: "image",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2F29f8212e-39a8-419e-b7c0-c680a9adf6a2_image.png?alt=media&token=f8b4518f-77e7-4142-bfa0-e0d2ebf689fe",
    name_file: "image.png",
    size_file: "378359",
    mime_type_file: "image/png",
    duration_video: "0",
    timestamp: ISODate("2025-07-07T14:20:05.941Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686bd89e1e6e411596b79eb3"),
    sender: "0333657670",
    receiver: "03351288670",
    is_group: false,
    content_type: "file",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2Ff23c35d7-038c-4a49-b3ca-8a584bef09a8_BangDiem.pdf?alt=media&token=c0957585-f9f1-4d0c-aa55-53b79a906b3d",
    name_file: "BangDiem.pdf",
    size_file: "177282",
    mime_type_file: "application/pdf",
    duration_video: "0",
    timestamp: ISODate("2025-07-07T14:24:30.611Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686bdb4c1e6e411596b79ee3"),
    sender: "0333657670",
    receiver: "03351288670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hi",
    timestamp: ISODate("2025-07-07T14:35:56.321Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686bdb551e6e411596b79ee8"),
    sender: "0333657670",
    receiver: "03351288670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "huhu",
    timestamp: ISODate("2025-07-07T14:36:05.717Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686bdf421e6e411596b79f11"),
    sender: "03351288670",
    receiver: "0333657670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "lủm",
    timestamp: ISODate("2025-07-07T14:52:50.817Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686be1541e6e411596b79f30"),
    sender: "03351288670",
    receiver: "09276533222",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "huhuhs",
    timestamp: ISODate("2025-07-07T15:01:40.051Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686be1f41e6e411596b79f37"),
    sender: "03351288670",
    receiver: "15",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "huhu",
    timestamp: ISODate("2025-07-07T15:04:20.097Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686be1fe1e6e411596b79f3c"),
    sender: "03351288670",
    receiver: "0333657670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "alo",
    timestamp: ISODate("2025-07-07T15:04:30.57Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686be3d71e6e411596b79f47"),
    sender: "03351288670",
    receiver: "0333657670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdnas",
    timestamp: ISODate("2025-07-07T15:12:23.581Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686be3da1e6e411596b79f49"),
    sender: "03351288670",
    receiver: "0333657670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cádcks",
    timestamp: ISODate("2025-07-07T15:12:26.091Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686be40c1e6e411596b79f51"),
    sender: "03351288670",
    receiver: "0333657670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "sao không trả lời",
    timestamp: ISODate("2025-07-07T15:13:16.946Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686be5be1e6e411596b79f63"),
    sender: "03351288670",
    receiver: "0333657670",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "alo",
    timestamp: ISODate("2025-07-07T15:20:30.286Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686be6201e6e411596b79f68"),
    sender: "03351288670",
    receiver: "15",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "alo",
    timestamp: ISODate("2025-07-07T15:22:08.391Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686beaae1e6e411596b79fce"),
    sender: "03351288670",
    receiver: "15",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "da",
    timestamp: ISODate("2025-07-07T15:41:34.27Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686beab01e6e411596b79fd0"),
    sender: "03351288670",
    receiver: "15",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "sa",
    timestamp: ISODate("2025-07-07T15:41:36.044Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686beab11e6e411596b79fd2"),
    sender: "03351288670",
    receiver: "15",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "sa",
    timestamp: ISODate("2025-07-07T15:41:37.603Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686beab31e6e411596b79fd4"),
    sender: "03351288670",
    receiver: "15",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "sa",
    timestamp: ISODate("2025-07-07T15:41:39.346Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686beabb1e6e411596b79fd9"),
    sender: "03351288670",
    receiver: "15",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "sa",
    timestamp: ISODate("2025-07-07T15:41:47.056Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("686beabc1e6e411596b79fdb"),
    sender: "03351288670",
    receiver: "15",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "sa",
    timestamp: ISODate("2025-07-07T15:41:48.854Z"),
    __v: Int32("0")
} ]);

// ----------------------------
// Collection structure for notifications
// ----------------------------
db.getCollection("notifications").drop();
db.createCollection("notifications");

// ----------------------------
// Documents of notifications
// ----------------------------
