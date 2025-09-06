
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
    _id: ObjectId("68aaa1db23c4de7a4a6d1f87"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "chào cậu",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:23:39.182Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa1e023c4de7a4a6d1f8c"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "chào cậu",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:23:44.189Z"),
    __v: Int32("0"),
    deleted_by: [
        "0333657673",
        "0333657672"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa1e523c4de7a4a6d1f91"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "chào cậu",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:23:49.788Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa22123c4de7a4a6d1f9b"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "chào mọi người",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:24:49.818Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa29623c4de7a4a6d1fa7"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "bạn ơi",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:26:46.945Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa2ab23c4de7a4a6d1faa"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "chào",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    timestamp: ISODate("2025-08-24T05:27:07.313Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa2ae23c4de7a4a6d1fac"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "SMS cho phép gửi tin nhắn văn bản có độ dài khoảng 160 ký tự (chữ cái, số và ký hiệu). Đối với các ngôn ngữ khác có nhiều ký tự hơn, chẳng hạn như tiếng Trung hoặc tiếng Ả Rập, kích thước thư tối đa được giới hạn ở chỉ khoảng 70 ký tự.Apr 27, 2023",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    timestamp: ISODate("2025-08-24T05:27:10.229Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa2c423c4de7a4a6d1fb5"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "image",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2Fe60fd2aa-8688-4ab9-b417-036bab29cfce_demo-nghia-la-gi-2.jpg?alt=media&token=637c8be0-3617-4a15-84e7-3575d15074cf",
    name_file: "demo-nghia-la-gi-2.jpg",
    size_file: "23955",
    mime_type_file: "image/jpeg",
    duration_video: "0",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    timestamp: ISODate("2025-08-24T05:27:32.316Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa30323c4de7a4a6d1fb7"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "video",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2F7431594b-2cfb-42ee-a519-59043191bfcb_10.1%20EmptyDir%20Volume%20(Pod%20level).mp4?alt=media&token=2ea737f8-5d38-41f0-8d87-1fd265e6e73e",
    name_file: "10.1 EmptyDir Volume (Pod level).mp4",
    size_file: "5452717",
    mime_type_file: "video/mp4",
    duration_video: "0",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:28:35.036Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa31823c4de7a4a6d1fba"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T05:28:56.987Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa31e23c4de7a4a6d1fbc"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T05:29:02.019Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa35723c4de7a4a6d1fbf"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T05:29:59.906Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa37623c4de7a4a6d1fc5"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "chào cả nhà",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:30:30.932Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa39523c4de7a4a6d1fce"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "có chuyện gì không",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "",
    timestamp: ISODate("2025-08-24T05:31:01.193Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa3bc23c4de7a4a6d1fe1"),
    sender: "0333657671",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "không có chi",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    timestamp: ISODate("2025-08-24T05:31:40.198Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa3d623c4de7a4a6d1fe9"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "à oke",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T05:32:06.744Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa43423c4de7a4a6d2002"),
    sender: "0333657671",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "ủa",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    timestamp: ISODate("2025-08-24T05:33:40.683Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa45423c4de7a4a6d2004"),
    sender: "0333657671",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "hihi",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    timestamp: ISODate("2025-08-24T05:34:12.602Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa4d023c4de7a4a6d200d"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "tôi không nhận được file pdf bạn gửi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T05:36:16.742Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa69923c4de7a4a6d2033"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "hihi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T05:43:53.351Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa6ab23c4de7a4a6d2035"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "file",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2F4dff33a6-cf2d-494d-ae40-b4cbdc86c43c_file.pdf?alt=media&token=d16f0e94-3152-46ba-bd88-f03d8eb56a6c",
    name_file: "file.pdf",
    size_file: "11981",
    mime_type_file: "application/pdf",
    duration_video: "0",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T05:44:11.187Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa6b723c4de7a4a6d2038"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "image",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2Fb7f0562d-4f00-429a-b52e-0adfa9b79430_demo-la-gi-3-didongviet.jpg?alt=media&token=90ee882e-54e5-4082-923a-df1cdb73943b",
    name_file: "demo-la-gi-3-didongviet.jpg",
    size_file: "26211",
    mime_type_file: "image/jpeg",
    duration_video: "0",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:44:23.772Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa73123c4de7a4a6d2040"),
    sender: "0333657673",
    receiver: "23",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "nhóm ơi",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T05:46:25.632Z"),
    __v: Int32("0"),
    deleted_by: [
        "0333657673"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa73c23c4de7a4a6d2046"),
    sender: "0333657674",
    receiver: "23",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "sao đó",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T05:46:36.121Z"),
    __v: Int32("0"),
    deleted_by: [
        "0333657673"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaa74823c4de7a4a6d204c"),
    sender: "0333657674",
    receiver: "23",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "alo",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T05:46:48.331Z"),
    __v: Int32("0"),
    deleted_by: [
        "0333657673"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba0f23c4de7a4a6d2065"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "chào cậu",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T07:06:55.421Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba1623c4de7a4a6d206b"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "chào cậu",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T07:07:02.43Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba1e23c4de7a4a6d206e"),
    sender: "0333657674",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "bạn đang làm gì đó",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T07:07:10.204Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba2a23c4de7a4a6d2074"),
    sender: "0333657674",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "bạn đang làm gì đs",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T07:07:22.137Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba3323c4de7a4a6d2076"),
    sender: "0333657674",
    receiver: "0333657673",
    is_group: false,
    content_type: "image",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2F0ab96901-1253-44c3-8ebd-30c679970724_demo-nghia-la-gi-2.jpg?alt=media&token=f463b613-0498-4691-883b-0ed6fbe8d2d3",
    name_file: "demo-nghia-la-gi-2.jpg",
    size_file: "23955",
    mime_type_file: "image/jpeg",
    duration_video: "0",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T07:07:31.226Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba5923c4de7a4a6d2079"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "video",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2F51a1c490-ba87-433b-ab36-82b73c3f30d6_9.2%20Mount%20configMap%20to%20Pod%20as%20Volume.mp4?alt=media&token=33b777dc-70a8-4ab1-a26e-5522df05d33a",
    name_file: "9.2 Mount configMap to Pod as Volume.mp4",
    size_file: "5223574",
    mime_type_file: "video/mp4",
    duration_video: "0",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T07:08:09.909Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba7023c4de7a4a6d207d"),
    sender: "0333657674",
    receiver: "0333657673",
    is_group: false,
    content_type: "file",
    status: "sent",
    url_file: "https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2F74443f9f-25d9-4c8a-b6eb-6c696bd26bac_file.pdf?alt=media&token=1af422fc-481f-417e-a0ef-4773ff7802b8",
    name_file: "file.pdf",
    size_file: "11981",
    mime_type_file: "application/pdf",
    duration_video: "0",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T07:08:32.121Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba7623c4de7a4a6d207f"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:08:38.12Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba7b23c4de7a4a6d2081"),
    sender: "0333657674",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:08:43.617Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba9323c4de7a4a6d2083"),
    sender: "0333657674",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:09:07.442Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaba9723c4de7a4a6d2085"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:09:11.26Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aabacd23c4de7a4a6d2089"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "chào",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-24T07:10:05.001Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aabad823c4de7a4a6d208b"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "cả nhà đang làm gì đó",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T07:10:16.925Z"),
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aabae223c4de7a4a6d2090"),
    sender: "0333657671",
    receiver: "22",
    is_group: true,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:10:26.225Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aabae723c4de7a4a6d2092"),
    sender: "22",
    receiver: "0333657671",
    is_group: true,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:10:31.337Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aabaea23c4de7a4a6d2094"),
    sender: "22",
    receiver: "0333657671",
    is_group: true,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:10:34.691Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aac46923c4de7a4a6d20ca"),
    sender: "0333657674",
    receiver: "0333657671",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    timestamp: ISODate("2025-08-24T07:51:05.527Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aac60923c4de7a4a6d20cf"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:58:01.156Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0"),
    deleted_by: [
        "0333657673",
        "0333657672"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aac61823c4de7a4a6d20d3"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T07:58:16.744Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0"),
    deleted_by: [
        "0"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aadc1de952d52520bca304"),
    sender: "0333657671",
    receiver: "0333657674",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T09:32:13.967Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aadc1fe952d52520bca306"),
    sender: "0333657674",
    receiver: "0333657671",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T09:32:15.98Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b81"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.71Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b87"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.755Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b89"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.765Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b8d"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.778Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b8f"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.797Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b93"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.829Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b99"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.842Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b9d"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.854Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b9f"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.873Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841ba3"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.886Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841ba7"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.899Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bad"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.909Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841baf"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.923Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bb5"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.936Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bb7"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.952Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bbb"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:51.971Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bc1"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.01Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bc9"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.037Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bd1"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.055Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bd7"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.066Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bdd"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.077Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841be1"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.085Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841be5"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.095Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841be9"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.106Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841beb"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.112Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bef"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.119Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bf1"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.128Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bf5"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.137Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bfb"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.148Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c01"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.157Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c03"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.166Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c07"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.177Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c0b"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.183Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c0f"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.19Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c11"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.199Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c13"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.205Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c17"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.213Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c1b"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.223Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c21"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.232Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c23"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.238Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c29"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.252Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c2d"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.262Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c2f"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.268Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c33"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.279Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c37"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.286Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c39"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.293Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c3d"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.304Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c43"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.313Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c47"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.323Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c4b"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.338Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c4f"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.346Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c53"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.357Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c57"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.366Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c5b"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.374Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c5d"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.381Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c61"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.39Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c65"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.401Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c6b"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.411Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c6d"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.418Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c73"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.431Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c77"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.439Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c79"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.445Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c7b"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.453Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c81"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.461Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c83"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.47Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c85"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.483Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c8d"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.502Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c8f"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.51Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c91"),
    sender: "0900000049",
    receiver: "0900000050",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Ping from 0900000049 - 0900000050",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "ABC",
    timestamp: ISODate("2025-08-24T10:48:52.516Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0aea1fc106beda29ea8f"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:51:54.55Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0aec1fc106beda29ea91"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:51:56.347Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b011fc106beda29ea9a"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:52:17.685Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b011fc106beda29ea9c"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:52:17.857Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b0d1fc106beda29eaa3"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:52:29.788Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b0f1fc106beda29eaa5"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:52:31.524Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b241fc106beda29eaa7"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:52:52.925Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b281fc106beda29eaa9"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:52:56.091Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b5a1fc106beda29eaaf"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:53:46.642Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b5c1fc106beda29eab1"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:53:48.225Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b631fc106beda29eab5"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:53:55.921Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ab0b651fc106beda29eab7"),
    sender: "0333657671",
    receiver: "0333657673",
    is_group: false,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-24T12:53:57.654Z"),
    status: "sent",
    text: "🔴 Tham gia cuộc gọi",
    type_video_call: "answer",
    avt: "https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png",
    name: "Nguyễn Tấn Thành",
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac72119d601dfc49eb141b"),
    sender: "0333657673",
    receiver: "0333657671",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:24:17.072Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac72199d601dfc49eb1422"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ho",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:24:25.203Z"),
    __v: Int32("0"),
    deleted_by: [
        "0333657673",
        "0333657672"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac72209d601dfc49eb142a"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:24:32.053Z"),
    __v: Int32("0"),
    deleted_by: [
        "0333657673",
        "0333657672"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac722b9d601dfc49eb1432"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:24:43.681Z"),
    __v: Int32("0"),
    deleted_by: [
        "0333657673",
        "0333657672"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac72c49d601dfc49eb143a"),
    sender: "0333657673",
    receiver: "23",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "hi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:27:16.557Z"),
    __v: Int32("0"),
    deleted_by: [
        "0333657673"
    ]
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac74aa9d601dfc49eb1442"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "đậc",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:35:22.591Z"),
    __v: Int32("1"),
    deleted_by: [
        "0333657674",
        "0"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac74aa9d601dfc49eb1444"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "đậc",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:35:22.63Z"),
    __v: Int32("1"),
    deleted_by: [
        "0333657674",
        "0"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac74ad9d601dfc49eb1446"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "cdascsd",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:35:25.785Z"),
    __v: Int32("2"),
    deleted_by: [
        "0333657674",
        "0333657673",
        "0"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac74ad9d601dfc49eb1448"),
    sender: "0333657673",
    receiver: "22",
    is_group: true,
    content_type: "text",
    status: "sent",
    text: "cdascsd",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:35:25.827Z"),
    __v: Int32("1"),
    deleted_by: [
        "0333657674",
        "0"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac74b89d601dfc49eb1451"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "chào cậu",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:35:36.311Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac74b89d601dfc49eb1457"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cậu",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:35:36.343Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac750f9d601dfc49eb1468"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Mozilla/5.0 is the general token that says that the browser is Mozilla-compatible. For historical reasons, almost every browser today sends it.",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:03.32Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac75169d601dfc49eb146c"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "dcndjsacn cdasncjsdac đacnjsda ndcjsd",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:10.147Z"),
    __v: Int32("1"),
    deleted_by: [
        "0333657673"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac75169d601dfc49eb1472"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ndcjsd",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:10.171Z"),
    __v: Int32("1"),
    deleted_by: [
        "0333657673"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac752e9d601dfc49eb1475"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdjsncjas",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:34.932Z"),
    __v: Int32("2"),
    deleted_by: [
        "0333657673",
        "0333657674"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac752e9d601dfc49eb147b"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdjsncjas",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:34.968Z"),
    __v: Int32("2"),
    deleted_by: [
        "0333657673",
        "0333657674"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac752f9d601dfc49eb147d"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdjasncas",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:35.914Z"),
    __v: Int32("2"),
    deleted_by: [
        "0333657673",
        "0333657674"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac752f9d601dfc49eb1483"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdjasncas",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:35.941Z"),
    __v: Int32("2"),
    deleted_by: [
        "0333657673",
        "0333657674"
    ],
    is_recalled: false
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac75339d601dfc49eb1485"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:39.342Z"),
    __v: Int32("1"),
    deleted_by: [ ],
    is_recalled: true,
    name_file: "",
    url_file: ""
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac75339d601dfc49eb148b"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:37:39.364Z"),
    __v: Int32("1"),
    deleted_by: [ ],
    is_recalled: true,
    name_file: "",
    url_file: ""
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac75519d601dfc49eb1491"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    timestamp: ISODate("2025-08-25T14:38:09.782Z"),
    __v: Int32("1"),
    deleted_by: [ ],
    is_recalled: true,
    name_file: "",
    url_file: ""
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8c8d4fc07d2a72811556"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hihi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:17.329Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8c904fc07d2a72811558"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "bạn ơi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:20.081Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8c904fc07d2a7281155e"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ơi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:20.111Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8c934fc07d2a72811560"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "bạn ơi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:23.311Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8c934fc07d2a72811566"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ơi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:23.33Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8c974fc07d2a72811568"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "bnaj ơi",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:27.564Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8c9c4fc07d2a7281156c"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ủa dcvnjsakfnvjafsvn sfavawvasf",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:32.081Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8c9c4fc07d2a72811572"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "sfavawvasf",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:32.104Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8ca54fc07d2a72811576"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "fasvsfavfa",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:41.074Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8ca74fc07d2a7281157a"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "d",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:43.115Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8cab4fc07d2a7281157e"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ddddddddddddd",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673",
        "0333657672"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:17:47.106Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8dc74fc07d2a728115b0"),
    sender: "0333657672",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hả huicda",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Hoàng Chương",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:22:31.85Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8dc74fc07d2a728115b2"),
    sender: "0333657672",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "huicda",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Hoàng Chương",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:22:31.871Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8dca4fc07d2a728115b4"),
    sender: "0333657672",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdacad",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Hoàng Chương",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:22:34.395Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8dcf4fc07d2a728115b6"),
    sender: "0333657672",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "sao v bạn",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Hoàng Chương",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:22:39.556Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8dd34fc07d2a728115b8"),
    sender: "0333657672",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "dcadascsd",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Hoàng Chương",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:22:43.476Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8dd74fc07d2a728115ba"),
    sender: "0333657672",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "dcassssssssssssssssss",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Hoàng Chương",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:22:47.425Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f514fc07d2a728115d6"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ủa",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:05.721Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f514fc07d2a728115d8"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ủa",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:05.741Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f544fc07d2a728115da"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ủa",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:08.102Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f544fc07d2a728115dc"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ủa",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:08.126Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f554fc07d2a728115de"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdscd",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:09.843Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f554fc07d2a728115e0"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdscd",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:09.873Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f584fc07d2a728115e2"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "csacsa",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:12.614Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f5a4fc07d2a728115e4"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "acsdfvsfd",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:14.477Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f6a4fc07d2a728115ec"),
    sender: "0333657672",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "đấ",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Hoàng Chương",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:30.593Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f6c4fc07d2a728115ee"),
    sender: "0333657672",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "dấdsa",
    avt: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740",
    name: "Hoàng Chương",
    deleted_by: [
        "0333657672",
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:29:32.571Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8f974fc07d2a728115fc"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "ủa",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:30:15.822Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac8fba4fc07d2a72811603"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "hhhhhhhhhhhhhhhhhhh dddddddd hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:30:50.585Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac90324fc07d2a72811613"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "cdasdcs",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:32:50.241Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac906b4fc07d2a72811621"),
    sender: "0333657673",
    receiver: "0333657672",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "dsaac",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [
        "0333657673"
    ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:33:47.424Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac90c94fc07d2a7281163b"),
    sender: "0333657674",
    receiver: "0900000002",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "chào bạn",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    deleted_by: [ ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:35:21.017Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac92064fc07d2a72811667"),
    sender: "0333657673",
    receiver: "0333657674",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Thực ra đây cũng là vấn đề của rất nhiều người. Bản thân mình khi chưa có kinh nghiệm về mấy cái này thì thường hay lạm dụng jquery để check các case. Tuy nhiên sau khi phát hiện ra 1 số thuộc tính với cách sử dụng vô cùng đơn giản thì mình đã quăng jquery ra sau đầu ngay và luôn. Bây giờ cùng đi vào bài viết nhé.",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Linh",
    deleted_by: [ ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:40:38.362Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac92154fc07d2a7281166e"),
    sender: "0333657674",
    receiver: "0333657673",
    is_group: false,
    content_type: "text",
    status: "sent",
    text: "Thực ra đây cũng là vấn đề của rất nhiều người. Bản thân mình khi chưa có kinh nghiệm về mấy cái này thì thường hay lạm dụng jquery để check các case. Tuy nhiên sau khi phát hiện ra 1 số thuộc tính với cách sử dụng vô cùng đơn giản thì mình đã quăng jquery ra sau đầu ngay và luôn. Bây giờ cùng đi vào bài viết nhé.",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    deleted_by: [ ],
    is_recalled: false,
    timestamp: ISODate("2025-08-25T16:40:53.417Z"),
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac9f76a0a717571f76d110"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-25T17:37:58.611Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    deleted_by: [ ],
    is_recalled: false,
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68ac9fffa0a717571f76d113"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-25T17:40:15.203Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    deleted_by: [ ],
    is_recalled: false,
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aca0ada0a717571f76d11b"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-25T17:43:09.042Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    deleted_by: [ ],
    is_recalled: false,
    __v: Int32("0")
} ]);
db.getCollection("messages").insert([ {
    _id: ObjectId("68aca17da0a717571f76d11d"),
    sender: "0333657674",
    receiver: "22",
    is_group: true,
    content_type: "video_call_signal",
    timestamp: ISODate("2025-08-25T17:46:36.995Z"),
    status: "sent",
    text: "🔴 Cuộc gọi video bắt đầu",
    type_video_call: "offer",
    avt: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png",
    name: "Vương Thanh Huyền",
    deleted_by: [ ],
    is_recalled: false,
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
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaa18a23c4de7a4a6d1f7b"),
    type: "friend_request",
    content: "0333657673 đã gửi lời mời kết bạn.",
    sender: "0333657673",
    receiver: "0333657671",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T05:22:18.553Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaa18d23c4de7a4a6d1f7d"),
    type: "friend_request",
    content: "0333657673 đã gửi lời mời kết bạn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T05:22:21.055Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaa18f23c4de7a4a6d1f7f"),
    type: "friend_request",
    content: "0333657673 đã gửi lời mời kết bạn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "read",
    is_group: false,
    timestamp: ISODate("2025-08-24T05:22:23.145Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaa1db23c4de7a4a6d1f89"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657671",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T05:23:39.184Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaa1e023c4de7a4a6d1f8e"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T05:23:44.191Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaa1e523c4de7a4a6d1f93"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T05:23:49.79Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaba0f23c4de7a4a6d2067"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T07:06:55.425Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaba1e23c4de7a4a6d2070"),
    type: "message",
    content: "0333657674 đã gửi bạn một tin nhắn.",
    sender: "0333657674",
    receiver: "0333657673",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T07:07:10.206Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aac3dc23c4de7a4a6d20a2"),
    type: "friend_request",
    content: "0900000049 đã gửi lời mời kết bạn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "read",
    is_group: false,
    timestamp: ISODate("2025-08-24T07:48:44.95Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aac3e823c4de7a4a6d20a4"),
    type: "friend_request",
    content: "0900000049 đã gửi lời mời kết bạn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "read",
    is_group: false,
    timestamp: ISODate("2025-08-24T07:48:56.452Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aac3f423c4de7a4a6d20a8"),
    type: "friend_accept",
    content: "0900000050 đã chấp nhận lời mời kết bạn.",
    sender: "0900000050",
    receiver: "0900000049",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T07:49:08.008Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aac44b23c4de7a4a6d20b7"),
    type: "friend_request",
    content: "0333657671 đã gửi lời mời kết bạn.",
    sender: "0333657671",
    receiver: "0333657674",
    status: "read",
    is_group: false,
    timestamp: ISODate("2025-08-24T07:50:35.142Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aac45023c4de7a4a6d20bb"),
    type: "friend_accept",
    content: "0333657674 đã chấp nhận lời mời kết bạn.",
    sender: "0333657674",
    receiver: "0333657671",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T07:50:40.779Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b7f"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.706Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b83"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.72Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b85"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.733Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b8b"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.773Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b91"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.798Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b95"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.83Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b97"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.841Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841b9b"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.85Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841ba1"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.873Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841ba5"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.886Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841ba9"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.9Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bab"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.902Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bb1"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.924Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bb3"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.936Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bb9"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.952Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bbd"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.972Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee13dc452e71e2841bbf"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:51.982Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bc3"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.014Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bc5"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.016Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bc7"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.032Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bcb"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.047Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bcd"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.048Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bcf"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.054Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bd3"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.058Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bd5"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.064Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bd9"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.067Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bdb"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.076Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bdf"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.079Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841be3"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.093Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841be7"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.105Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bed"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.116Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bf3"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.129Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bf7"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.141Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bf9"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.145Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bfd"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.155Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841bff"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.155Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c05"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.17Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c09"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.182Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c0d"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.189Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c15"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.206Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c19"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.221Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c1d"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.23Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c1f"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.231Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c25"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.241Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c27"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.249Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c2b"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.259Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c31"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.274Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c35"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.282Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c3b"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.298Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c3f"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.31Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c41"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.312Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c45"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.32Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c49"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.337Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c4d"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.338Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c51"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.353Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c55"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.363Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c59"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.37Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c5f"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.388Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c63"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.394Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c67"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.402Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c69"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.41Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c6f"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.424Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c71"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.428Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c75"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.438Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c7d"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.456Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c7f"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.46Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c87"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.484Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c89"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.485Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68aaee14dc452e71e2841c8b"),
    type: "message",
    content: "0900000049 đã gửi bạn một tin nhắn.",
    sender: "0900000049",
    receiver: "0900000050",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-24T10:48:52.5Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac72119d601dfc49eb1419"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657671",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:24:17.068Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac72199d601dfc49eb1424"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:24:25.205Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac72209d601dfc49eb142c"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:24:32.056Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac722b9d601dfc49eb1434"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:24:43.682Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac74b89d601dfc49eb1453"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:35:36.319Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac74b89d601dfc49eb1455"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:35:36.322Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac750f9d601dfc49eb146a"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:03.323Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac75169d601dfc49eb146e"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:10.149Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac75169d601dfc49eb1470"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:10.155Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac752e9d601dfc49eb1477"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:34.936Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac752e9d601dfc49eb1479"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:34.939Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac752f9d601dfc49eb147f"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:35.916Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac752f9d601dfc49eb1481"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:35.928Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac75339d601dfc49eb1487"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:39.343Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac75339d601dfc49eb1489"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:37:39.349Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac75519d601dfc49eb1493"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T14:38:09.785Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8c8d4fc07d2a72811554"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:17.32Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8c904fc07d2a7281155a"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:20.085Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8c904fc07d2a7281155c"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:20.094Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8c934fc07d2a72811562"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:23.313Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8c934fc07d2a72811564"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:23.318Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8c974fc07d2a7281156a"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:27.567Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8c9c4fc07d2a7281156e"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:32.083Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8c9c4fc07d2a72811570"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:32.094Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8ca54fc07d2a72811578"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:41.076Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8ca74fc07d2a7281157c"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:43.117Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8cab4fc07d2a72811580"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:17:47.107Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8f974fc07d2a728115fe"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:30:15.825Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac8fba4fc07d2a72811605"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:30:50.587Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac90324fc07d2a72811615"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:32:50.244Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac906b4fc07d2a72811623"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657672",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:33:47.427Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac90c94fc07d2a7281163d"),
    type: "friend_request",
    content: "có tin nhắn tin người lạ",
    sender: "0333657674",
    receiver: "0900000002",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:35:21.037Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac90c94fc07d2a7281163f"),
    type: "message",
    content: "0333657674 đã gửi bạn một tin nhắn.",
    sender: "0333657674",
    receiver: "0900000002",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:35:21.064Z"),
    __v: Int32("0")
} ]);
db.getCollection("notifications").insert([ {
    _id: ObjectId("68ac92064fc07d2a72811669"),
    type: "message",
    content: "0333657673 đã gửi bạn một tin nhắn.",
    sender: "0333657673",
    receiver: "0333657674",
    status: "unread",
    is_group: false,
    timestamp: ISODate("2025-08-25T16:40:38.368Z"),
    __v: Int32("0")
} ]);
