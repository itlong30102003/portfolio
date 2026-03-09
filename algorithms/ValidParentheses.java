/*Valid Parentheses
Input: Một chuỗi chỉ chứa các ký tự '(', ')', '{', '}', '[', ']'.
Output: true nếu chuỗi hợp lệ, false nếu không.
Ngoặc mở phải đóng cùng loại, đúng thứ tự.
*/
import java.util.Stack;

class Solution {
    public boolean isValid(String s){
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {
            // Gặp ngoặc mở thì push ngoặc đóng tương ứng vào stack 
            // Cách này lúc pop ra so sánh sẽ cực gọn
            if ( c == '(') {
                stack.push(')');
            }
            else if ( c == '[') {
                stack.push(']');
            }
            else if ( c == '{') {
                stack.push('}');
            }
            //Nếu là ngoặc đóng thì kiếm tra xem stack có rỗng hoặc phần tử trên cùng có khớp c không?
            //Khớp thì lấy top ra và xóa ; không thì false
            else if (stack.isEmpty() || stack.pop() != c) {
                return false;
            }
        }
        //Nếu stack rỗng tức là mọi dấu ngoặc đều đã được ghép cặp.
        return stack.isEmpty();
    }
}

public class ValidParentheses {
    public static void main(String[] args) {
        Solution sol = new Solution();
        String[] tests = {"()", "()[]{}", "(]", "([)]", "{[]}"};
        for (int i = 0; i < tests.length; i++) {
            System.out.println("Test " + (i + 1) + ": " + tests[i] + " -> " + sol.isValid(tests[i]));
        }
    }
}