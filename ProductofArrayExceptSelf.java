class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        // Bước 1: Tính tích các phần tử bên trái
        // result[i] sẽ chứa tích của tất cả các số từ nums[0] đến nums[i-1]
        result[0] = 1; // Bên trái phần tử đầu tiên không có gì, mặc định là 1
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }

        // Bước 2: Tính tích các phần tử bên phải và nhân trực tiếp vào result
        // Dùng một biến tạm 'right' để giữ tích dồn từ bên phải sang
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            // Tích hiện tại (bên trái) * tích dồn từ bên phải
            result[i] = result[i] * right;
            // Cập nhật tích dồn bên phải cho phần tử tiếp theo (về phía bên trái)
            right = right * nums[i];
        }

        return result;
    }
}