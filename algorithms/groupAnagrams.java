import java.util.*;

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Kiểm tra trường hợp mảng rỗng
        if (strs == null || strs.length == 0) {
            return new ArrayList<>();
        }

        // Khởi tạo HashMap để lưu trữ nhóm
        // Key: Chuỗi đã sắp xếp, Value: Danh sách các từ gốc
        Map<String, List<String>> map = new HashMap<>();

        for (String s : strs) {
            // 1. Chuyển chuỗi thành mảng ký tự để sắp xếp
            char[] characters = s.toCharArray();
            Arrays.sort(characters);

            // 2. Tạo key từ mảng ký tự đã sắp xếp
            String key = String.valueOf(characters);

            // 3. Nếu key chưa tồn tại, tạo danh sách mới
            if (!map.containsKey(key)) {
                map.put(key, new ArrayList<>());
            }

            // 4. Thêm từ gốc vào nhóm tương ứng với key
            map.get(key).add(s);
        }

        // Trả về danh sách các nhóm
        return new ArrayList<>(map.values());
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        String[] input = { "eat", "tea", "tan", "ate", "nat", "bat" };
        System.out.println(sol.groupAnagrams(input));
    }
}