import java.util.*;

class Solution {
    public String mergeAlternately(String word1, String word2) {
        StringBuilder result = new StringBuilder();

        int n1 = word1.length();
        int n2 = word2.length();

        for (int i = 0; (i < n1 || i < n2); i++) {
            if (i < n1) {
                result.append(word1.charAt(i));
            }
            if (i < n2) {
                result.append(word2.charAt(i));
            }
        }
        return result.toString();
    }

}
