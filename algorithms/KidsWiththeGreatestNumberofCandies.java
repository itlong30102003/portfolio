import java.util.*;

class Solution {
    public  List<Boolean> kidsWithCadies(int[] cadies, int extraCadies){
        // Bước 1: Tìm giá trị lớn nhất trong mảng ban đầu
            int max=0;
            for(int candy : candies) {
                max = Math.max(max, candy);
            }
            // Bước 2: Kiểm tra từng đứa trẻ
            List<Boolean> result = new ArrayList<>();
            for (int candy : candies){
                result.add(candy+extraCadies >= max);
            }
            return result;
    }
}