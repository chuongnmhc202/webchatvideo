
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


db.getCollection("notifications").drop();
db.createCollection("notifications");
