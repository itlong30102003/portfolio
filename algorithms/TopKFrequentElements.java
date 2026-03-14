import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k){
        // Bước 1: Đếm tần suất xuất hiện của mỗi số
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int n : nums){
            countMap.put(n, countMap.getOrDefault(n, 0) + 1);
        }

        // Bước 2: Sử dụng PriorityQueue để giữ k phần tử xuất hiện nhiều nhất
        // Chúng ta tạo Min-Heap so sánh dựa trên giá trị (tần suất) trong Map
        PriorityQueue<Integer> heap = new PriorityQueue<>(
            (n1,n2) -> countMap.get(n1) - countMap.get(n2)
        );
        // Duyệt qua các key trong Map
        for(int n: countMap.keySet()){
            heap.add(n);
            // Nếu heap vượt quá kích thước k, bỏ phần tử có tần suất thấp nhất đi
            if (heap.size()>k) {
                heap.poll();
            }
        }
        // Bước 3: Chuyển kết quả từ Heap sang mảng int[]
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = heap.poll();
        }
        return result;
    }
}