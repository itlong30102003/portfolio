class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int left = 0;
        int right = height.length - 1;

        while (left < right) {
            // 1. Tính chiều cao của mực nước (thằng lùn hơn quyết định)
            int h = Math.min(height[left], height[right]);
            
            // 2. Tính khoảng cách giữa 2 cột
            int width = right - left;
            
            // 3. Cập nhật diện tích lớn nhất
            maxArea = Math.max(maxArea, h * width);

            // 4. Di chuyển con trỏ: Thằng nào lùn thì cho "nghỉ hưu"
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }
}