/* Linked List Cycle
input: Phần tử đầu tiên của một danh sách liên kết
Output: true nếu danh sách có vòng lặp, false nếu không
vòng lặp: nút cuối thay vì trỏ tới null thì trỏ ngược về nút nào đó phía trước nó tạo thành một vòng.
*/
/**
 * Definition for singly-linked list;
 * class ListNode {
 * int val;
 * ListNode next;
 * ListNode(int x){
 * val = x;
 * next = null;}
 * }
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class LinkedListCycle {
    public boolean hasCycle(ListNode head) {
        //Nếu list rỗng hoặc chỉ có 1 phần tử trỏ vào null thì thể có vòng
        if(head == null || head.next == null) {
            return false;
        }

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;       //Rùa đi 1 bước
            fast = fast.next.next;  //Thỏ đi 2 bước

            // Nếu Thỏ bắt kịp Rùa
            if (slow == fast){
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        LinkedListCycle solution = new LinkedListCycle();

        // Test case 1: No cycle
        ListNode head1 = new ListNode(1);
        head1.next = new ListNode(2);
        head1.next.next = new ListNode(3);
        System.out.println("Test 1 (no cycle): " + solution.hasCycle(head1)); // false

        // Test case 2: Cycle
        ListNode head2 = new ListNode(1);
        head2.next = new ListNode(2);
        head2.next.next = new ListNode(3);
        head2.next.next.next = head2.next; // cycle to node 2
        System.out.println("Test 2 (cycle): " + solution.hasCycle(head2)); // true

        // Test case 3: Single node, no cycle
        ListNode head3 = new ListNode(1);
        System.out.println("Test 3 (single node): " + solution.hasCycle(head3)); // false

        // Test case 4: Two nodes, cycle
        ListNode head4 = new ListNode(1);
        head4.next = new ListNode(2);
        head4.next.next = head4; // cycle to head
        System.out.println("Test 4 (two nodes cycle): " + solution.hasCycle(head4)); // true
    }
}