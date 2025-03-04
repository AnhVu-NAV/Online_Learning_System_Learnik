import mongoose from 'mongoose';

const uri = "mongodb://127.0.0.1:27017/education";  // Đảm bảo sử dụng địa chỉ IPv4
mongoose.connect(uri)
  .then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

