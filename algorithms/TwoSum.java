import java.util.HashMap;
import java.util.Map;

/*  Input: Một mảng các số nguyên nums và một số nguyên target
    Output: Trả về chỉ số  (index) của hai số sao cho tổng của chúng bằng target
    Chỉ có một đáp án duy nhất
    Không được sử dụng cùng một phần tử hai lần
*/
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Map luu tru: Key = gia tri phan tu, Value = index cua phan tu do
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            // Neu phan bu da nam trong map, tuc la ta da duyet qua no truoc do
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            // Neu chua co, dua so hien tai va index vao map
            map.put(nums[i], i);
        }

        return new int[] {}; // Tra ve mang rong neu khong tim thay
    }
}

public class TwoSum {
    public static void main(String[] args) {
        LinkedListCycle solution = new LinkedListCycle();

        // Test case 1
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        int[] result1 = solution.twoSum(nums1, target1);
        System.out.println("Test 1: [" + result1[0] + ", " + result1[1] + "]");

        // Test case 2
        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        int[] result2 = solution.twoSum(nums2, target2);
        System.out.println("Test 2: [" + result2[0] + ", " + result2[1] + "]");

        // Test case 3
        int[] nums3 = {0, 1, 2, 3, 4, 5, 6};
        int target3 = 6;
        int[] result3 = solution.twoSum(nums3, target3);
        System.out.println("Test 3: [" + result3[0] + ", " + result3[1] + "]");
    }
}